from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
import json
import base64
import uuid
import os
import re
from models import db, User, JokiOrder

api_bp = Blueprint('api', __name__)

def save_base64_image(b64_string, filename_prefix="Image"):
    if not b64_string or not b64_string.startswith('data:image'):
        return b64_string
    try:
        header, encoded = b64_string.split(",", 1)
        ext = header.split(";")[0].split("/")[1]
        safe_prefix = re.sub(r'[^a-zA-Z0-9_-]', '_', filename_prefix)
        filename = f"{safe_prefix}_{uuid.uuid4().hex[:6]}.{ext}"
        filepath = os.path.join('uploads', filename)
        with open(filepath, "wb") as f:
            f.write(base64.b64decode(encoded))
        return f"http://localhost:5000/uploads/{filename}"
    except Exception as e:
        print(f"Error saving image: {e}")
        return None

# ===== Auth Routes =====

@api_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'Email sudah terdaftar'}), 400
    
    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({'error': 'Username sudah terdaftar'}), 400

    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        full_name=data.get('full_name'),
        phone_number=data.get('phone_number'),
        address=data.get('address'),
        city=data.get('city'),
        postal_code=data.get('postal_code'),
        company_name=data.get('company_name'),
        role='client' # Default role
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'Registrasi berhasil', 'user': new_user.to_dict()}), 201

@api_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and check_password_hash(user.password_hash, data.get('password')):
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'token': access_token, 'user': user.to_dict()}), 200
        
    return jsonify({'error': 'Email atau password salah'}), 401

@api_bp.route('/auth/me', methods=['GET'])
@jwt_required()
def get_me():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'error': 'User tidak ditemukan'}), 404
    return jsonify({'user': user.to_dict()}), 200


# ===== Client Routes =====

@api_bp.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    current_user_id = get_jwt_identity()
    data = request.json
    
    branding_data = data.get('branding_data')
    business_name = data.get('business_name', 'Toko')
    
    if branding_data and 'logo' in branding_data and branding_data['logo']:
        branding_data['logo'] = save_base64_image(branding_data['logo'], f"{business_name}_Logo")
        
    products_data = data.get('products_data')
    if products_data:
        for idx, p in enumerate(products_data):
            if 'image' in p and p['image']:
                p['image'] = save_base64_image(p['image'], f"{business_name}_Produk_{idx+1}")
    
    new_order = JokiOrder(
        user_id=current_user_id,
        domain_request=data.get('domain_request'),
        business_name=data.get('business_name'),
        category=data.get('category'),
        whatsapp=data.get('whatsapp'),
        product_count=data.get('product_count', 0),
        total_price=data.get('total_price'),
        branding_data=json.dumps(branding_data) if branding_data else None,
        products_data=json.dumps(products_data) if products_data else None,
        payment_status='Lunas', # Disimulasikan langsung lunas untuk prototype
        status='Belum Dikerjakan'
    )
    
    db.session.add(new_order)
    db.session.commit()
    
    return jsonify({'message': 'Pesanan berhasil dibuat', 'order': new_order.to_dict()}), 201

@api_bp.route('/orders/me', methods=['GET'])
@jwt_required()
def get_my_orders():
    current_user_id = get_jwt_identity()
    orders = JokiOrder.query.filter_by(user_id=current_user_id).order_by(JokiOrder.created_at.desc()).all()
    return jsonify({'orders': [order.to_dict() for order in orders]}), 200


# ===== Admin Routes =====

@api_bp.route('/admin/orders', methods=['GET'])
@jwt_required()
def get_all_orders():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.role != 'admin':
        return jsonify({'error': 'Akses ditolak'}), 403
        
    orders = JokiOrder.query.order_by(JokiOrder.created_at.desc()).all()
    return jsonify({'orders': [order.to_dict() for order in orders]}), 200

@api_bp.route('/admin/orders/<int:order_id>', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.role != 'admin':
        return jsonify({'error': 'Akses ditolak'}), 403
        
    data = request.json
    order = JokiOrder.query.get(order_id)
    if not order:
        return jsonify({'error': 'Pesanan tidak ditemukan'}), 404
        
    if 'status' in data:
        order.status = data['status']
        if data['status'] == 'Selesai':
            # Auto delete images to save storage
            branding = None
            if order.branding_data:
                try:
                    branding = json.loads(order.branding_data)
                    if branding and 'logo' in branding and branding['logo']:
                        filename = branding['logo'].split('/')[-1]
                        filepath = os.path.join('uploads', filename)
                        if os.path.exists(filepath):
                            os.remove(filepath)
                        branding['logo'] = None
                    order.branding_data = json.dumps(branding)
                except Exception as e:
                    print(f"Error parsing branding data: {e}")
                    
            if order.products_data:
                try:
                    products = json.loads(order.products_data)
                    for p in products:
                        if 'image' in p and p['image']:
                            filename = p['image'].split('/')[-1]
                            filepath = os.path.join('uploads', filename)
                            if os.path.exists(filepath):
                                os.remove(filepath)
                            p['image'] = None
                    order.products_data = json.dumps(products)
                except Exception as e:
                    print(f"Error parsing products data: {e}")
                    
    if 'payment_status' in data:
        order.payment_status = data['payment_status']
    if 'live_url' in data:
        order.live_url = data['live_url']
        
    db.session.commit()
    return jsonify({'message': 'Status pesanan berhasil diupdate', 'order': order.to_dict()}), 200
