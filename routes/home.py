from flask import Blueprint, render_template, jsonify, request
from flask_login import current_user
from app import login_required, db
from models import Users, Resoucers

home_pg = Blueprint('home', __name__, template_folder='templates')

@home_pg.route('/', methods=['GET'])
@login_required
def home():
    return render_template('home.html', nome=current_user.nome, nivelAcesso=current_user.nivelAcesso)

# --------- PAGINA USUARIOS --------------------
@home_pg.route('/listaUsuarios', methods=['GET'])
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

@home_pg.route('/editarUser/<int:id>', methods=['PUT'])
@login_required
def editarUser(id):
    if current_user.nivelAcesso != 'administrador':
        return jsonify({'message':'Somente administrador tem permissao!'}), 403
    
    user = db.session.query(Users).get(id)

    if not user:
        return jsonify({'message':'Usuario nao encontrado!'}), 404
    
    dados = request.json
    if dados['nome'] == '' or dados['nivelAcesso'] == '':
        return jsonify({'message': 'Campos vazios!'})
    
    user.nome = dados['nome']
    user.nivelAcesso = dados['nivelAcesso']

    db.session.commit() 
    return jsonify({'message':'Atualizado com sucesso!'}), 200

# ------------- PAGINA RECURSOS ----------------------
@home_pg.route('/listaRecursos/<int:id>', methods=['GET','POST','PUT','DELETE'])
@login_required
def lista_recursos(id):
    if request.method == 'GET':
        lista = []
        recursos = db.session.query(Resoucers).all()

        if not recursos:
            return jsonify({'message':'Lista vazia!'})
        
        for i in recursos:
            recur_local = {}
            recur_local['id'] = str(i.id)
            recur_local['nome'] = i.nome
            recur_local['tipo'] = i.tipo
            recur_local['status'] = i.status
            lista.append(recur_local)
        print(jsonify(lista))
        return jsonify(lista)

    if request.method == 'POST':
        dados = request.json
        print(dados)
        existe = db.session.query(Resoucers).filter_by(nome=dados['nome']).first()

        if existe: return jsonify({'message':'Recurso ja cadastrado!'})
        if dados['nome'] == '' or dados['tipo'] == '' or dados['status'] == '': 
            return jsonify({'message':'Campos vazio!'})
        
        novo_recurso = Resoucers(nome=dados['nome'], tipo=dados['tipo'], status=dados['status'])
        db.session.add(novo_recurso)
        db.session.commit()
        return jsonify({'message':'Recurso cadastrado com sucesso!'})
    
    if request.method == 'PUT':
        if current_user == 'funcionario': return jsonify({'message':'Somente administrador e gerente tem permisão!'}), 403

        dados = request.json
        atualizar_recurso = db.session.query(Resoucers).get(id)

        if not atualizar_recurso: return jsonify({'message':'Recurso não cadastrado!'}), 404
        if not dados['status']: return jsonify({'message':'Campo vazio!'})

        atualizar_recurso.status = dados['status']
        db.session.commit()
        return jsonify({'message':'Atualizado com sucesso!'}), 200
    
    if request.method == 'DELETE':
        if current_user == 'funcionario': return jsonify({'message':'Somente administrador e gerente tem permisão!'}), 403

        recurso = db.session.query(Resoucers).get(id)

        if not recurso: return jsonify({'message':'Recurso não encontrado!'}), 404

        db.session.delete(recurso)
        db.session.commit()

        return jsonify({'message':'Recurso deletado com sucesso!'}), 200