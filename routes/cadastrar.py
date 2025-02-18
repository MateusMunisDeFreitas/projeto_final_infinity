from flask import Blueprint, request, render_template, redirect, jsonify
from app import db, login_user, senha_cript
from models import Users

cadastrar_pg = Blueprint('cadastrar', __name__, template_folder='templates')
 
@cadastrar_pg.route('/', methods=['GET', 'POST'])
def cadastrar():
    if request.method == 'GET':
        return render_template('cadastrar.html')
    if request.method == 'POST':
        print(request.form)
        nome = request.form['nome'] 
        senha = request.form['senha']
        acesso = request.form['option']
        user = db.session.query(Users).filter_by(nome=nome, senha=senha_cript(senha)).first()

        if not user:
            novoUser = Users(nome=nome, senha=senha_cript(senha), nivelAcesso=acesso)
            db.session.add(novoUser)
            db.session.commit()
            login_user(novoUser)
            jsonify({'menssagem':'cadastrado com sucesso!'}), 201
            return redirect('/home')
        
        jsonify({'menssagem':'Usuario ja existe!'})
        return redirect('/cadastrar')