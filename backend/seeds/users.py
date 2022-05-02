from backend.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Doug', last_name='Demodome', avatar_id=1, email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name='kate', avatar_id=4, email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie', last_name='Bouchay', avatar_id=3, email='bobbie@aa.io', password='password')

    db.session.add_all([demo, marnie, bobbie])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
