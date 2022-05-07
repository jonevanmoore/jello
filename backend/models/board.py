from .db import db
from sqlalchemy.sql import func
from backend.models.users_boards import users_boards

class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    title = db.Column(db.String(30), nullable = False)
    avatar_id = db.Column(db.Integer, nullable = False)
    # workspace_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone = True), server_default = func.now())
    updated_at = db.Column(db.DateTime(timezone = True), onupdate = func.now())


    user = db.relationship('User', back_populates='boards')

    shared_users = db.relationship('User', back_populates='shared_boards', secondary=users_boards, cascade="all, delete")
    # note that the above cascade is only supposed to delete association table records, and not users. So says the docs.

    lists = db.relationship('List', cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'avatar_id': self.avatar_id,
            # 'workspace_id': self.workspace_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'lists': [ list.to_dict() for list in self.lists ],
            'shared_users': [ user.to_dict() for user in self.shared_users ]
        }
