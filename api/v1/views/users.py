#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from api.v1.views import app_views
from api.v1.views.validation import validate
from flask import abort, jsonify, make_response, request


@app_views.route('/users', methods=['GET'], strict_slashes=False)
def get_users():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    try:
        all_users = storage.all(User).values()
        list_users = []
        for user in all_users:
            list_users.append(user.to_dict())

        return (jsonify(list_users))
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id):
    """ Retrieves an user """
    try:
        user = storage.get(User, user_id).first()

        if not user:
            abort(404)

        return jsonify(user.to_dict())
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a user Object
    """
    try:
        user = storage.get(User, user_id).first()

        if not user:
            abort(404)

        storage.delete(user)
        storage.save()

        return make_response(jsonify({'message': 'User deleted successfully'}), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def post_user():
    """
    Creates a user
    """
    try:
        data = request.get_json()

        if not data:
            abort(400, description="Not a JSON")

        if 'username' not in data:
            abort(400, description="Missing username")
        if 'email' not in data:
            abort(400, description="Missing email")
        if 'password' not in data:
            abort(400, description="Missing password")
        if 'phone' not in data:
            abort(400, description="Missing phone")
        if 'address' not in data:
            abort(400, description="Missing address")
        if 'is_admin' not in data:
            abort(400, description="Missing is_admin")

        valid = validate(data)
        if valid is not None:
            return make_response(jsonify({'message': valid}), 400)

        instance = User(**data)
        instance.save()
        user = instance.to_dict()

        return make_response(jsonify(user), 201)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user
    """
    try:
        user = storage.get(User, user_id).first()

        if not user:
            abort(404)

        data = request.get_json()
        if not data:
            abort(400, description="Not a JSON")

        ignore = ['id', 'created_at', 'updated_at']

        valid = validate(data)
        if valid is not None:
            return make_response(jsonify({'message': valid}), 400)

        for key, value in data.items():
            if key not in ignore:
                setattr(user, key, value)
        storage.save()
        user = user.to_dict()

        return make_response(jsonify(user), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)
