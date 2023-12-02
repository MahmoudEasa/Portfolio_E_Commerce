#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Carts """
from models.cart import Cart
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/carts', methods=['GET'], strict_slashes=False)
def get_carts():
    """
    Retrieves the list of all cart objects
    or a specific cart
    """
    try:
        all_carts = storage.all(Cart).values()
        list_carts = []
        for cart in all_carts:
            list_carts.append(cart.to_dict())

        return (jsonify(list_carts))
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/carts/<cart_id>', methods=['GET'], strict_slashes=False)
def get_cart(cart_id):
    """ Retrieves an cart """
    try:
        cart = storage.get(Cart, cart_id).first()

        if not cart:
            abort(404)

        return jsonify(cart.to_dict())
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/carts/<cart_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_cart(cart_id):
    """
    Deletes a cart Object
    """
    try:
        cart = storage.get(Cart, cart_id).first()

        if not cart:
            abort(404)

        storage.delete(cart)
        storage.save()

        return make_response(jsonify({'message': 'Cart deleted successfully'}), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)


@app_views.route('/carts', methods=['POST'], strict_slashes=False)
def post_cart():
    """
    Creates a cart
    """
    try:
        if not request.get_json():
            abort(400, description="Not a JSON")

        if 'item_id' not in request.get_json():
            abort(400, description="Missing item_id")
        if 'user_id' not in request.get_json():
            abort(400, description="Missing user_id")

        data = request.get_json()
        instance = Cart(**data)
        instance.save()
        cart = instance.to_dict()

        return make_response(jsonify(cart), 201)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)
        


@app_views.route('/carts/<cart_id>', methods=['PUT'], strict_slashes=False)
def put_cart(cart_id):
    """
    Updates a cart
    """
    try:
        cart = storage.get(Cart, cart_id).first()

        if not cart:
            abort(404)

        if not request.get_json():
            abort(400, description="Not a JSON")

        ignore = ['id', 'created_at', 'updated_at']

        data = request.get_json()
        for key, value in data.items():
            if key not in ignore:
                setattr(cart, key, value)

        storage.save()
        cart = cart.to_dict()

        return make_response(jsonify(cart), 200)
    except Exception:
        return make_response(jsonify({'message': 'Something is wrong'}), 400)
