from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from backend.models.users_boards import users_boards

class Board(db.Model, UserMixin):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    title = db.Column(db.String(30), nullable = False)
    avatar_id = db.Column(db.Integer, nullable = False)
    # workspace_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone = True), server_default = func.now())
    updated_at = db.Column(db.DateTime(timezone = True), onupdate = func.now())


    user = db.relationship('User', back_populates='boards')

    users = db.relationship('User', back_populates='shared_boards', secondary=users_boards)


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