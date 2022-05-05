from .db import db
from sqlalchemy.sql import func

class List(db.Model):
    __tablename__ = 'lists'

    id          = db.Column(db.Integer, primary_key = True)
    user_id     = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    board_id    = db.Column(db.Integer, db.ForeignKey('boards.id'), nullable = False)
    title       = db.Column(db.String(30), nullable = False)
    order       = db.Column(db.Integer, nullable = False)
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())
    updated_at  = db.Column(db.DateTime(timezone = True), onupdate = func.now())

    cards       = db.relationship('Card', back_populates='list')

    def to_dict(self):
        return {
                'id': self.id,
                'user_id': self.user_id,
                'board_id': self.board_id,
                'title': self.title,
                'order': self.order,
                'created_at': self.created_at,
                'updated_at': self.updated_at,
                'cards': [ card.to_dict() for card in self.cards ]
                }

    def to_short_dict(self):
        return {
                'id': self.id,
                'board_id': self.board_id
                }
