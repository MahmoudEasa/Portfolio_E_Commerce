#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Buys """
from models.buy import Buy
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/buys', methods=['GET'], strict_slashes=False)
def get_buys():
    """
    Retrieves the list of all buy objects
    or a specific buy
    """
    try:
        all_buys = storage.all(Buy).values()
        list_buys = []
        for buy in all_buys:
            list_buys.append(buy.to_dict())

        return (jsonify(list_buys))
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/buys/<buy_id>', methods=['GET'], strict_slashes=False)
def get_buy(buy_id):
    """ Retrieves an buy """
    try:
        buy = storage.get(Buy, buy_id).first()

        if not buy:
            abort(404)

        return jsonify(buy.to_dict())
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/buys/<buy_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_buy(buy_id):
    """
    Deletes a buy Object
    """
    try:
        buy = storage.get(Buy, buy_id).first()

        if not buy:
            abort(404)

        storage.delete(buy)
        storage.save()

        return make_response(jsonify({'message': 'Buy deleted successfully'}), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/buys', methods=['POST'], strict_slashes=False)
def post_buy():
    """
    Creates a buy
    """
    try:
        if not request.get_json():
            abort(400, description="Not a JSON")

        if 'item_id' not in request.get_json():
            abort(400, description="Missing item_id")
        if 'user_id' not in request.get_json():
            abort(400, description="Missing user_id")

        data = request.get_json()
        instance = Buy(**data)
        instance.save()
        buy = instance.to_dict()

        return make_response(jsonify(buy), 201)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/buys/<buy_id>', methods=['PUT'], strict_slashes=False)
def put_buy(buy_id):
    """
    Updates a buy
    """
    try:
        buy = storage.get(Buy, buy_id).first()

        if not buy:
            abort(404)

        if not request.get_json():
            abort(400, description="Not a JSON")

        ignore = ['id', 'created_at', 'updated_at']

        data = request.get_json()
        for key, value in data.items():
            if key not in ignore:
                setattr(buy, key, value)
        storage.save()
        buy = buy.to_dict()

        return make_response(jsonify(buy), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)
