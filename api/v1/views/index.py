#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from hashlib import md5


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def get_index():
    """ Retrieves an index """

    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")
 
    all_users = storage.all(User).values()

    if not all_users:
        abort(404)

    req = request.get_json()
    hash_password = md5(req['password'].encode()).hexdigest()

    for user in all_users:
        if user.email == req['email'] and\
           user.password == hash_password:
            return (user.to_dict())

    return (make_response(jsonify({'message': 'Something is wrong'}), 400))
