#!/usr/bin/python3
""" Buy Model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from user import User
from item import Item


class Buy(BaseModel, Base):
    """Buy Class """
    __tablename__ = "buys"
    user_id = Column(String(60), nullable=False, ForeignKey("users.id",
                     onupdate='CASCADE', ondelete='CASCADE'))
    item_id = Column(String(60), nullable=False, ForeignKey("items.id",
                     onupdate='CASCADE', ondelete='CASCADE'))

    def __init__(self, *args, **kwargs):
        """initializes"""
        super().__init__(*args, **kwargs)
