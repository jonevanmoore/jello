from backend.models import db, Board


# Adds a demo user, you can add other users here if you want
def seed_boards():
    board_01 = Board(
        user_id=1, title='This is a Title', avatar_id=1)
    board_02 = Board(
        user_id=1, title='This is a Second Title', avatar_id=3)
    board_03 = Board(
        user_id=2, title='This is the Third Title Limit.', avatar_id=2)

    db.session.add_all([board_01, board_02, board_03])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
