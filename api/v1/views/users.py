#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/users', methods=['GET'], strict_slashes=False)
def get_users():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        user_o = user.to_dict()
        user_obj = {"username": user_o['username'],
                    "email": user_o['email'],
                    "phone": user_o['phone'],
                    "address": user_o['address'],
                    "is_admin": user_o['is_admin'],
                    "id": user_o['id'],
                    "created_at": user_o['created_at'],
                    "updated_at": user_o['updated_at'],
                    }
        list_users.append(user_obj)
    return (jsonify(list_users))


@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id):
    """ Retrieves an user """
    user = storage.get(User, user_id).first().to_dict()
    if not user:
        abort(404)

    user_obj = {"username": user['username'],
                "email": user['email'],
                "phone": user['phone'],
                "address": user['address'],
                "is_admin": user['is_admin'],
                "id": user['id'],
                "created_at": user['created_at'],
                "updated_at": user['updated_at'],
                }

    return jsonify(user_obj)


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a user Object
    """

    user = storage.get(User, user_id).first()

    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return make_response(jsonify({'message': 'User deleted successfully'}), 200)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def post_user():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'username' not in request.get_json():
        abort(400, description="Missing username")
    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")
    if 'phone' not in request.get_json():
        abort(400, description="Missing phone")
    if 'address' not in request.get_json():
        abort(400, description="Missing address")
    if 'is_admin' not in request.get_json():
        abort(400, description="Missing is_admin")

    data = request.get_json()
    instance = User(**data)
    instance.save()
    user = instance.to_dict()
    user_obj = {"username": user['username'],
                "email": user['email'],
                "phone": user['phone'],
                "address": user['address'],
                "is_admin": user['is_admin'],
                "id": user['id'],
                "created_at": user['created_at'],
                "updated_at": user['updated_at'],
                }

    return make_response(jsonify(user_obj), 201)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user
    """
    user = storage.get(User, user_id).first()

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)
    storage.save()
    user = user.to_dict()
    user_obj = {"username": user['username'],
                "email": user['email'],
                "phone": user['phone'],
                "address": user['address'],
                "is_admin": user['is_admin'],
                "id": user['id'],
                "created_at": user['created_at'],
                "updated_at": user['updated_at'],
                }


    return make_response(jsonify(user_obj), 200)
