#!/usr/bin/python3
""" Item Count Model
"""
from models.base_model import Base
from sqlalchemy import Column, String, Integer


class ItemCount(Base):
    """Item Count Class """
    __tablename__ = "item_counts"
    item_name = Column(String(128), nullable=False)
    item_count = Column(Integer, nullable=False, default=1)

    def __init__(self, *args, **kwargs):
        """initializes"""
        super().__init__(*args, **kwargs)
