#!/usr/bin/python3
"""User Model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Boolean
from hashlib import md5


class User(BaseModel, Base):
    """User Class
    """
    __tablename__ = 'users'
    username = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    phone = Column(String(20), nullable=False)
    address = Column(String(128), nullable=False)
    is_admin = Column(Boolean, nullable=False)



    def __init__(self, *args, **kwargs):
        """initializes"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
