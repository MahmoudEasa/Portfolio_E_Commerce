#!/usr/bin/python3
""" Flask Application """
from models import storage
from api.v1.views import app_views
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask_login import LoginManager
import secrets

app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})
login_manager = LoginManager(app)
app.config['SECRET_KEY'] = secrets.token_hex(16)


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


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    return 'Unauthorized Access', 401


if __name__ == "__main__":
    host = '0.0.0.0'
    port = '5001'
    app.run(host=host, port=port, threaded=True, debug=True)
