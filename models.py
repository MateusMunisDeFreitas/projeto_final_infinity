from flask_login import UserMixin
from db import db

class Users(UserMixin, db.Model):
    __tablename__ = 'Usuarios'

    id = db.Column(db.Integer(), primary_key=True)
    nome = db.Column(db.String(50), unique=True)
    senha = db.Column(db.String())
    nivelAcesso = db.Column(db.String(50))

class Resoucers(UserMixin, db.Model):
    __tablename__ = 'Recursos'

    id = db.Column(db.Integer(), primary_key=True)
    nome = db.Column(db.String(100), unique=True)
    tipo = db.Column(db.String(50))
    status = db.Column(db.String(30), default='Disponivel')
