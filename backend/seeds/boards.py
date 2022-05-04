from backend.models import db, Board, List, Card

# Adds a demo user, you can add other users here if you want
def seed_boards():
    board_01 = Board(
        user_id=1, title='This is a Title', avatar_id=1)
    board_02 = Board(
        user_id=1, title='This is a Second Title', avatar_id=3)
    board_03 = Board(
        user_id=2, title='This is the Third Title Limit.', avatar_id=2)

    list_01 = List( user_id=1, board_id=1, title="test list 1", order=1 )
    list_02 = List( user_id=1, board_id=1, title="test list 2", order=2 )
    list_03 = List( user_id=1, board_id=1, title="test list 3", order=3 )

    c1 = Card( user_id=1, list_id=1, content="c1 l1", order=1 )
    c2 = Card( user_id=1, list_id=1, content="c2 l1", order=2 )
    c3 = Card( user_id=1, list_id=1, content="c3 l1", order=3 )
    c4 = Card( user_id=1, list_id=2, content="c4 l2", order=1 )
    c5 = Card( user_id=1, list_id=2, content="c5 l2", order=2 )
    c6 = Card( user_id=1, list_id=3, content="c6 l3", order=1 )
    c7 = Card( user_id=1, list_id=3, content="c7 l3", order=2 )

    db.session.add_all([board_01, board_02, board_03, list_01, list_02, list_03])
    db.session.add_all([c1, c2, c3, c4, c5, c6, c7])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
