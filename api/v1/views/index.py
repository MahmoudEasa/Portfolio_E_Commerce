#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/login', methods=['Post'], strict_slashes=False)
def get_indexs():
    """
    Retrieves the list of all index objects
    or a specific index
    """
    all_indexs = storage.all(User).values()
    list_indexs = []
    for index in all_indexs:
        list_indexs.append(index.to_dict())

    return (jsonify(list_indexs))


@app_views.route('/indexs/<index_id>', methods=['GET'], strict_slashes=False)
def get_index(index_id):
    """ Retrieves an index """
    index = storage.get(User, index_id).first().to_dict()
    if not index:
        abort(404)

    return jsonify(index)


@app_views.route('/indexs/<index_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_index(index_id):
    """
    Deletes a index Object
    """

    index = storage.get(User, index_id).first()

    if not index:
        abort(404)

    storage.delete(index)
    storage.save()

    return make_response(jsonify({'message': 'User deleted successfully'}), 200)


@app_views.route('/indexs', methods=['POST'], strict_slashes=False)
def post_index():
    """
    Creates a index
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'indexname' not in request.get_json():
        abort(400, description="Missing indexname")
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
    index = instance.to_dict()

    return make_response(jsonify(index), 201)


@app_views.route('/indexs/<index_id>', methods=['PUT'], strict_slashes=False)
def put_index(index_id):
    """
    Updates a index
    """
    index = storage.get(User, index_id).first()

    if not index:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(index, key, value)
    storage.save()
    index = index.to_dict()

    return make_response(jsonify(index), 200)
