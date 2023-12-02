#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Items """
from models.item import Item
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


def get_items_array():
    """
    Retrieves the list of all item objects
    or a specific item
    """
    try:
        all_items = storage.all(Item).values()
        list_items = []
        for item in all_items:
            list_items.append(item.to_dict())

        return (list_items)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/items', methods=['GET'], strict_slashes=False)
def get_items():
    """
    Retrieves the list of all item objects
    or a specific item
    """
    try:
        all_items = get_items_array()
        return (jsonify(all_items))
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/items/<item_id>', methods=['GET'], strict_slashes=False)
def get_item(item_id):
    """ Retrieves an item """
    try:
        item = storage.get(Item, item_id).first()

        if not item:
            abort(404)

        return jsonify(item.to_dict())
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/items/<item_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_item(item_id):
    """
    Deletes a item Object
    """
    try:
        item = storage.get(Item, item_id).first()

        if not item:
            abort(404)

        storage.delete(item)
        storage.save()

        return make_response(jsonify({'message': 'Item deleted successfully'}), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/items', methods=['POST'], strict_slashes=False)
def post_item():
    """
    Creates a item
    """
    try:
        data = request.get_json()
        if not data:
            abort(400, description="Not a JSON")

        if 'name' not in data:
            abort(400, description="Missing name")
        if 'price' not in data:
            abort(400, description="Missing price")
        if 'color' not in data:
            abort(400, description="Missing color")
        if 'discription' not in data:
            abort(400, description="Missing discription")
        if 'image' not in data:
            abort(400, description="Missing image")

        all_items = get_items_array()

        for i in all_items:
            if (i['name'] == data['name']):
                return make_response(jsonify({
                    'message': 'Product name should be unique.'
                    }), 400)


        instance = Item(**data)
        instance.save()
        item = instance.to_dict()

        return make_response(jsonify(item), 201)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/items/<item_id>', methods=['PUT'], strict_slashes=False)
def put_item(item_id):
    """
    Updates a item
    """
    try:
        item = storage.get(Item, item_id).first()

        if not item:
            abort(404)

        data = request.get_json()
        if not data:
            abort(400, description="Not a JSON")

        ignore = ['id', 'created_at', 'updated_at']

        all_items = get_items_array()

        for i in all_items:
            if (i['name'] == data['name']):
                if i['id'] != item.id:
                    return make_response(jsonify({
                        'message': 'Product name should be unique.'
                        }), 400)

        for key, value in data.items():
            if key not in ignore:
                setattr(item, key, value)
        storage.save()
        item = item.to_dict()

        return make_response(jsonify(item), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)
