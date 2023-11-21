#!/usr/bin/python3
""" objects that handle all default RestFul API actions for ItemCounts """
from models.item_count import ItemCount
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/item_counts', methods=['GET'], strict_slashes=False)
def get_item_counts():
    """
    Retrieves the list of all item_count objects
    or a specific item_count
    """
    all_item_counts = storage.all(ItemCount).values()
    list_item_counts = []
    for item_count in all_item_counts:
        list_item_counts.append(item_count.to_dict())

    return (jsonify(list_item_counts))


@app_views.route('/item_counts/<item_count_id>', methods=['GET'], strict_slashes=False)
def get_item_count(item_count_id):
    """ Retrieves an item_count """
    item_count = storage.get(ItemCount, item_count_id).first()

    if not item_count:
        abort(404)

    return jsonify(item_count.to_dict())


@app_views.route('/item_counts/<item_count_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_item_count(item_count_id):
    """
    Deletes a item_count Object
    """

    item_count = storage.get(ItemCount, item_count_id).first()

    if not item_count:
        abort(404)

    storage.delete(item_count)
    storage.save()

    return make_response(jsonify({'message': 'ItemCount deleted successfully'}), 200)


@app_views.route('/item_counts', methods=['POST'], strict_slashes=False)
def post_item_count():
    """
    Creates a item_count
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'item_count' not in request.get_json():
        abort(400, description="Missing item_count")
    if 'item_name' not in request.get_json():
        abort(400, description="Missing item_name")

    try:
        data = request.get_json()
        instance = ItemCount(**data)
        instance.save()
        item_count = instance.to_dict()

        return make_response(jsonify(item_count), 201)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/item_counts/<item_count_id>', methods=['PUT'], strict_slashes=False)
def put_item_count(item_count_id):
    """
    Updates a item_count
    """

    item_count = storage.get(ItemCount, item_count_id).first()

    if not item_count:
        abort(404)

    try:
        if not request.get_json():
            abort(400, description="Not a JSON")

        ignore = ['id', 'created_at', 'updated_at']

        data = request.get_json()
        for key, value in data.items():
            if key not in ignore:
                setattr(item_count, key, value)
        storage.save()
        item_count = item_count.to_dict()

        return make_response(jsonify(item_count), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)
