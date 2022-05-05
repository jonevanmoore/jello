from .db import db
from sqlalchemy.sql import func

class Card(db.Model):
    __tablename__ = 'cards'

    id          = db.Column(db.Integer, primary_key = True)
    user_id     = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    list_id     = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable = False)
    content     = db.Column(db.String(255), nullable = False)
    order       = db.Column(db.Integer, nullable = False)
    description = db.Column(db.Text)
    due_date    = db.Column(db.DateTime(timezone = True))
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())
    updated_at  = db.Column(db.DateTime(timezone = True), onupdate = func.now())

    list        = db.relationship('List', back_populates='cards')

    def to_dict(self):
        return {
                'id': self.id,
                'user_id': self.user_id,
                'list_id': self.list_id,
                'content': self.content,
                'order':   self.order,
                'description': self.description,
                'due_date': self.due_date,
                'created_at': self.created_at,
                'updated_at': self.updated_at,
                'list': self.list
                }
