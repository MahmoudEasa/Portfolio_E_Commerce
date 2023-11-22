#!/usr/bin/python3
""" Flask Application """
from models import storage
from api.v1.views import app_views
from flask import Flask, make_response, jsonify
from flask_cors import CORS
import secrets
from datetime import timedelta


app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})
app.secret_key = secrets.token_urlsafe(32)
app.permanent_session_lifetime = timedelta(days=1000)


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


if __name__ == "__main__":
    host = '0.0.0.0'
    port = '5001'
    app.run(host=host, port=port, threaded=True, debug=True)
