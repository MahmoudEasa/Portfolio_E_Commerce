#!/usr/bin/python3
"""
import DBStorage class in this file
create an instance of DBStorage and store it in the variable storage
"""

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
