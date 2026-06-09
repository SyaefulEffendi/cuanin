from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    
    # Detail Lengkap User
    full_name = db.Column(db.String(150), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    address = db.Column(db.Text, nullable=True)
    city = db.Column(db.String(100), nullable=True)
    postal_code = db.Column(db.String(20), nullable=True)
    company_name = db.Column(db.String(150), nullable=True)
    
    role = db.Column(db.String(20), default='client', nullable=False) # 'client' or 'admin'
    is_active = db.Column(db.Boolean, default=True)
    
    last_login = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relasi
    orders = db.relationship('JokiOrder', backref='client', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'phone_number': self.phone_number,
            'address': self.address,
            'city': self.city,
            'postal_code': self.postal_code,
            'company_name': self.company_name,
            'role': self.role,
            'is_active': self.is_active,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class JokiOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    domain_request = db.Column(db.String(150), nullable=False)
    business_name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(100), nullable=True)
    whatsapp = db.Column(db.String(20), nullable=True) # Kontak darurat spesifik pesanan
    
    product_count = db.Column(db.Integer, default=0)
    total_price = db.Column(db.Integer, nullable=False)
    
    payment_status = db.Column(db.String(50), default='Menunggu Pembayaran') # Lunas, Menunggu Pembayaran
    status = db.Column(db.String(50), default='Belum Dikerjakan') # Belum Dikerjakan, Sedang Dikerjakan, Selesai
    live_url = db.Column(db.String(255), nullable=True)
    
    branding_data = db.Column(db.Text, nullable=True) # JSON string
    products_data = db.Column(db.Text, nullable=True) # JSON string
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        branding = None
        if self.branding_data:
            try:
                branding = json.loads(self.branding_data)
            except:
                pass
                
        products = []
        if self.products_data:
            try:
                products = json.loads(self.products_data)
            except:
                pass

        return {
            'id': self.id,
            'user_id': self.user_id,
            'clientName': self.client.full_name or self.client.username,
            'domainRequest': self.domain_request,
            'businessName': self.business_name,
            'category': self.category,
            'productCount': self.product_count,
            'totalPrice': self.total_price,
            'paymentStatus': self.payment_status,
            'status': self.status,
            'liveUrl': self.live_url,
            'brandingData': branding,
            'productsData': products,
            'date': self.created_at.strftime('%Y-%m-%d') if self.created_at else None
        }
