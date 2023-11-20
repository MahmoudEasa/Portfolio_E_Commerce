#!/usr/bin/python3
"""Item Model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer


class Item(BaseModel, Base):
    """Item Class
    """
    __tablename__ = "items"
    name = Column(String(128), nullable=False, unique=True)
    discription = Column(String(1024), nullable=True)
    color = Column(String(60), nullable=False)
    image = Column(String(128), nullable=True)
    price = Column(Integer, nullable=False)


    def __init__(self, *args, **kwargs):
        """initializes"""
        super().__init__(*args, **kwargs)
