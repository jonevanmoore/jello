from backend.models import db, User, Board


# Adds a demo user, you can add other users here if you want
def seed_users_boards():
    fourth_user = User(
        first_name='Andres', last_name='Miotnik', avatar_id=1, email='andres@aa.io', password='password')
    fifth_user = User(
        first_name='Caroline', last_name='Gonzalez', avatar_id=1, email='caroline@aa.io', password='password')
    board_04 = Board(
        user_id=4, title='This is a Title', avatar_id=1, shared_users=[fifth_user])

    db.session.add_all([fourth_user, fifth_user, board_04])
    db.session.commit()


def undo_users_boards():
    db.session.execute('TRUNCATE users_boards RESTART IDENTITY CASCADE;')
    db.session.commit()
