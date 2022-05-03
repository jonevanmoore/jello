# from backend.models.db import db

# users_boards = db.Table(
#     'users_boards',
#     db.Column('board_id', db.Integer, db.ForeignKey('boards.id'), primary_key=True),
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
# )