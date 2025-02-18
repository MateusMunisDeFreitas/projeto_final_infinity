from flask import Blueprint, render_template, redirect, url_for, jsonify, json
from flask_login import current_user
from app import login_required, db
from models import Users
import json

home_pg = Blueprint('home', __name__, template_folder='templates')

@home_pg.route('/', methods=['GET'])
@login_required
def home():
    # return render_template('home.html', nome=current_user.nome, nivelAcesso=current_user.nivelAcesso)
    return render_template('home.html', nome=current_user.nome, nivelAcesso=current_user.nivelAcesso)

@home_pg.route('/listaUsuarios')
@login_required
def listaUsuarios():
    lista = []
    
    usuarios = db.session.query(Users).all()
    for i in usuarios:
        dados = {}
        dados['id'] = str(i.id)
        dados['nome'] = i.nome
        dados['nivelAcesso'] = i.nivelAcesso
        lista.append(dados)

    return jsonify(lista)

@home_pg.route('/excluirUser/<int:id>', methods=['DELETE'])
@login_required
def deleteUser(id):
    if current_user.nivelAcesso != 'administrador':
        return jsonify({'message':'Somente administrador tem permissao!'}), 403
    
    if current_user.id == id:
        return jsonify({'message':'Não pode deletar você mesmo!'}), 400
    
    user = db.session.query(Users).get(id)
    if user:  
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message':'Deletado com sucesso!'}), 200
    return jsonify({'message':'Usuario nao encontrado!'}), 404
            

