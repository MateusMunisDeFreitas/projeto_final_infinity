from flask import Blueprint, request, redirect, render_template, jsonify
from models import Users
from app import lm, db, senha_cript, login_user

login_pg = Blueprint('login', __name__, template_folder='templates')
 
@login_pg.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    
    if request.method == 'POST':  
        nome = request.form['nome']
        senha = request.form['senha']
        user = db.session.query(Users).filter_by(nome=nome, senha=senha_cript(senha)).first()

        if not user:
            return '''<script>
                alert("Nome ou senha incorreto!")
                window.location.replace("http://127.0.0.1:5000/login/");
            </script>'''
        
        login_user(user)
        # return redirect(f'/home')
        return redirect('/home')