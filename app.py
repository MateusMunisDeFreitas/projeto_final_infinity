from flask import Flask, render_template, redirect
from flask_login import LoginManager, login_user, login_required, logout_user
from db import db
from models import Users
from dotenv import load_dotenv
import hashlib
import os

load_dotenv()

app = Flask(__name__)
lm = LoginManager(app)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

def senha_cript(key):
    hash = hashlib.sha256(key.encode('utf-8'))
    return hash.hexdigest()

@lm.user_loader
def user_loader(id):
    user = db.session.query(Users).filter_by(id=id).first()
    return user

# --------- ROTAS ------------------

@app.route('/')
def index():
    return render_template('index.html')


def registradores():
    from routes.login import login_pg
    from routes.cadastrar import cadastrar_pg
    from routes.home import home_pg
    from routes.logout import logout_rt
    app.register_blueprint(login_pg, url_prefix='/login')
    app.register_blueprint(cadastrar_pg, url_prefix='/cadastrar')
    app.register_blueprint(home_pg, url_prefix='/home')
    app.register_blueprint(logout_rt, url_prefix='/logout')

if __name__ == '__main__':

    with app.app_context():
        db.create_all()
        registradores()
    app.run(debug=True)