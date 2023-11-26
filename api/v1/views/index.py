#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from api.v1.views import app_views
from api.v1.views.validation import validate
from flask import abort, jsonify, make_response, request, session
from hashlib import md5


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """ Login User """

    data = request.get_json()
    if not data:
        abort(400, description="Not a JSON")

    if 'email' not in data:
        abort(400, description="Missing email")
    if 'password' not in data:
        abort(400, description="Missing password")
 
    all_users = storage.all(User).values()

    if not all_users:
        abort(404)

    valid = validate(data)
    if valid is not None:
        return make_response(jsonify({'message': valid}), 400)

    hash_password = md5(data['password'].encode()).hexdigest()

    for user in all_users:
        if user.email == data['email'] and\
           user.password == hash_password:
            user_o = user.to_dict()
            session['user'] = user_o
            return (jsonify(user_o))

    return (make_response(jsonify({'message': 'Something is wrong'}), 400))


@app_views.route('/logout', methods=['GET'], strict_slashes=False)
def logout():
    """ Log out User """
    session.pop('user', None)
    return (jsonify({'message': 'Logged out'}))


@app_views.route('/me', methods=['GET'], strict_slashes=False)
def me():
    """ Get User Loged in """
    user = session.get('user')
    if user is not None:
        return (jsonify(user))
    return (make_response(jsonify({'message': 'Not Found'}), 404))
