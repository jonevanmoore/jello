from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Board(db.Model, UserMixin):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, nullable = False)
    title = db.Column(db.String(30), nullable = False)
    avatar_id = db.Column(db.Integer, nullable = False)
    # workspace_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone = True), server_default = func.now())
    updated_at = db.Column(db.DateTime(timezone = True), onupdate = func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'avatar_id': self.avatar_id,
            # 'workspace_id': self.workspace_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
