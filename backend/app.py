import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from routes import api_bp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='uploads', static_url_path='/uploads')

# Basic Config
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///cuanin.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Extensions
CORS(app)
db.init_app(app)
jwt = JWTManager(app)

# Register Blueprint
app.register_blueprint(api_bp, url_prefix='/api')

# Buat database jika belum ada
with app.app_context():
    db.create_all()
    # Opsional: Buat dummy admin user jika belum ada
    from models import User
    from werkzeug.security import generate_password_hash
    if not User.query.filter_by(role='admin').first():
        admin_password = os.getenv('ADMIN_PASSWORD', 'admin123')
        admin = User(
            username='admin',
            email='admin@cuan.in',
            password_hash=generate_password_hash(admin_password),
            full_name='Super Admin Cuan.in',
            role='admin'
        )
        db.session.add(admin)
        db.session.commit()
        print("Default admin user created.")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
