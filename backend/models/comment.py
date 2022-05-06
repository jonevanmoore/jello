from .db import db
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = 'comments'

    id          = db.Column(db.Integer, primary_key=True)
    user_id     = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    card_id     = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    body        = db.Column(db.Text, nullable=False)
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())
    updated_at  = db.Column(db.DateTime(timezone = True), onupdate = func.now())

    card        = db.relationship('Card', back_populates='comments')

    def to_dict(self):
        return {
                'id': self.id,
                'user_id': self.user_id,
                'card_id': self.card_id,
                'body': self.body,
                'created_at': self.created_at,
                'updated_at': self.updated_at,
                'card': self.card.to_short_dict()
                }