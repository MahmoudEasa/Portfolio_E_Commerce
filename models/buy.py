#!/usr/bin/python3
""" Buy Model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Integer
from models.user import User
from models.item import Item


class Buy(BaseModel, Base):
    """Buy Class """
    __tablename__ = "buys"
    user_id = Column(String(60), ForeignKey("users.id", onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                            nullable=False)
    item_id = Column(String(60), ForeignKey("items.id", onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                            nullable=False)
    qty = Column(Integer, nullable=False, default=1)

    def __init__(self, *args, **kwargs):
        """initializes"""
        super().__init__(*args, **kwargs)
