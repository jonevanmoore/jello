from backend.models import db, Board, List, Card, Comment, User

# Adds a demo user, you can add other users here if you want
def seed_boards():
    
    user1 = User.query.get(2);
    user2 = User.query.get(3);
    user3 = User.query.get(4);

    board_01 = Board(
        user_id=1, title='This is a Title', avatar_id=1, shared_users=[user1, user2, user3])
    board_02 = Board(
        user_id=1, title='This is a Second Title', avatar_id=3)
    board_03 = Board(
        user_id=2, title='This is the Third Title Limit.', avatar_id=2)

    list_01 = List( user_id=1, board_id=1, title="test list 1", order=1 )
    list_02 = List( user_id=1, board_id=1, title="test list 2", order=2 )
    list_03 = List( user_id=1, board_id=1, title="test list 3", order=3 )

    c1 = Card( user_id=1, list_id=1, content="this card has comments", order=1 )
    c2 = Card( user_id=1, list_id=1, content="this card also has comments", order=2 )
    c3 = Card( user_id=1, list_id=1, content="c3 l1", order=3 )
    c4 = Card( user_id=1, list_id=2, content="c4 l2", order=1 )
    c5 = Card( user_id=1, list_id=2, content="c5 l2", order=2 )
    c6 = Card( user_id=1, list_id=3, content="c6 l3", order=1 )
    c7 = Card( user_id=1, list_id=3, content="c7 l3", order=2 )

    comment1 = Comment(user_id=1, card_id=1, body='commit often!')
    comment2 = Comment(user_id=2, card_id=1, body='this is my comment :)')
    comment3 = Comment(user_id=3, card_id=1, body='body - meg the stallion')
    comment4 = Comment(user_id=1, card_id=2, body='body for a comment')
    comment5 = Comment(user_id=2, card_id=2, body='lorem ipsum')
    comment6 = Comment(user_id=3, card_id=2, body="""According to all known laws of aviation, there is no way a bee should be able to fly.
Its wings are too small to get its fat little body off the ground.
The bee, of course, flies anyway because bees don't care what humans think is impossible.
Yellow, black. Yellow, black. Yellow, black. Yellow, black.
Ooh, black and yellow!
Let's shake it up a little.
Barry! Breakfast is ready!
Coming!
Hang on a second.
Hello?
Barry?
Adam?
Can you believe this is happening?
I can't.
I'll pick you up.
Looking sharp.
Use the stairs, Your father paid good money for those.
Sorry. I'm excited.
Here's the graduate.
We're very proud of you, son.
A perfect report card, all B's.
Very proud.
Ma! I got a thing going here.
You got lint on your fuzz.
Ow! That's me!
Wave to us! We'll be in row 118,000.
Bye!
Barry, I told you, stop flying in the house!
Hey, Adam.
Hey, Barry.""")

    db.session.add_all([board_01, board_02, board_03, list_01, list_02, list_03])
    db.session.add_all([c1, c2, c3, c4, c5, c6, c7])
    db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
