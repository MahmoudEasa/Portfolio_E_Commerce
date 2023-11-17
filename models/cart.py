#!/usr/bin/python3
"""Cart Model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from models.user import User
from models.item import Item


class Cart(BaseModel, Base):
    """ Cart Class """
    __tablename__ = "carts"
    user_id = Column(String(60), nullable=False, ForeignKey("users.id",
                     onupdate='CASCADE', ondelete='CASCADE'))
    item_id = Column(String(60), nullable=False, ForeignKey("items.id",
                     onupdate='CASCADE', ondelete='CASCADE'))


    def __init__(self, *args, **kwargs):
        """initializes"""
        super().__init__(*args, **kwargs)
