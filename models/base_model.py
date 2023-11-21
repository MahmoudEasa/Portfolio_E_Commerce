#!/usr/bin/python3
""" Base Model
"""
import uuid
import sqlalchemy
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import models

Base = declarative_base()
time = "%Y-%m-%dT%H:%M:%S.%f"


class BaseModel:
    """Class Base Model
    """
    id = Column(String(60), nullable=False,primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """ Initialization of the base model """
        if kwargs:
            for key, val in kwargs.items():
                if key != "__class__":
                    setattr(self, key, val)
            if kwargs.get('created_at', None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs['created_at'], time)
            else:
                self.created_at = datetime.utcnow()

            if kwargs.get('updated_at', None) and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs['updated_at'], time)
            else:
                self.updated_at = datetime.utcnow()

            if kwargs.get('id', None) is None:
                self.id = str(uuid.uuid4())
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at
        
    def __str__(self):
        return (f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}")

    def save(self):
        """ Function Save
        """
        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def to_dict(self, save_password=None):
        """Returns a dictionary containing all models
        """
        dict_copy = self.__dict__.copy()
        dict_copy['created_at'] = self.created_at.isoformat()
        dict_copy['updated_at'] = self.updated_at.isoformat()
        dict_copy['__class__'] = self.__class__.__name__

        if '_sa_instance_state' in dict_copy:
            del dict_copy['_sa_instance_state']

        if save_password is None:
            if 'password' in dict_copy:
                del dict_copy['password']

        return (dict_copy)

    def delete(self):
        """ delete the current instance from the storage """
        models.storage.delete(self)
