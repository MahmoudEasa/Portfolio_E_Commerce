#!/usr/vin/python3
""" DB Storage
"""
from models import storage
from models.base_model import BaseModel, Base
from models.user import User
from models.buy import Buy
from models.cart import Cart
from models.item import Item
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {
        'User': User
        'Buy': Buy
        'Cart': Cart
        'Item': Item
        }


class DBStorage:
    """ Class DB Storage """
    __engine = None
    __session = None

    def __init__(self):
        MYSQL_USER = "ecommerce_dev"
        MYSQL_PWD = "ecommerce_pwd"
        MYSQL_HOST = "localhost"
        MYSQL_DB = "ecommerce_db"

        self.__enging = create_engine("mysql+mysqldb://{}:{}@{}/{}".
                                      format(MYSQL_USER,
                                             MYSQL_PWD,
                                             MYSQL_HOST,
                                             MYSQL_DB))

    def all(self, cls=None):
        """Query on the curret database session all objects of the given class.
            If cls is None: queries all types of objects.
            Return:
                Dict of queried classes in the format <class name>.<obj id> = obj.
        """
        new_dict = {}
        if cls is None:
            for clss in classes:
                new_dict.extend(self.__session.query(clss).all())
        else:
            if cls in classes:
                new_dict = self.__session.query(cls)

        return ({"{}.{}".
                format(type(obj).__name__, obj.id): obj for obj in new_dict})

    def new(self, obj):
        """ add the object to the current database session """
        self.__session.add(obj)

    def save(self):
        """ commit all changes of the current database session """
        self.__session.commit()

    def delete(self, obj=None):
        """ delete from the current database session """
        if obj:
            self.__session.delete(obj)

    def reload(self):
        """ create all tables in the database &
            the current database session
        """
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine,
                                       expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session()

    def close(self):
        """ close working session"""
        self.__session.close()

    def get(self, cls, id):
        """ Returns the object based on the class name and its ID, or
            None if not found
        """
        if cls not in classes.values():
            return (None)

        all_cls = storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return (value)

        return (None)

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(storage.all(clas).values())
        else:
            count = len(storage.all(cls).values())

        return (count)
