from flask import Blueprint, redirect
from flask_login import login_required, logout_user
from app import lm

logout_rt = Blueprint('logout', __name__)

@logout_rt.route('/')
# @login_required
def logout():
    logout_user()
    return redirect('/')