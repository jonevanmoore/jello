from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from backend.forms import NewBoardForm, NewListForm
from backend.models import User, Board, List, db, users_boards, Card 
from backend.api.auth_routes import validation_errors_to_error_messages

board_routes = Blueprint('boards', __name__)


# R E A D  A L L  B O A R D S
@board_routes.route('/', methods = [ 'GET' ])
@login_required
def read_all_boards():
    boards = Board.query.filter(Board.user_id == current_user.id).all()
    stmt = db.select(Board).join(Board.shared_users).where(db.text(f"users_boards_1.user_id = {current_user.id}"))
#    print('---------------------------------')
#    print(stmt);
#    print('---------------------------------')
    shared_boards = db.session.execute(stmt);
   # for board in shared_boards:
   #     print(board[0].to_dict())
    boards_list = [b.to_dict() for b in boards]
    shared_boards_list =  [b[0].to_dict() for b in shared_boards]
#    print(boards_list + shared_boards_list)

    print('---------------------------------')
    return {'boards': boards_list + shared_boards_list }
    # TODO:figure out how to eager load everything and also convert that into a JSON response

# R E A D  O N E  B O A R D
@board_routes.route('/<int:id>', methods=['GET'])
def read_one_board(id):
    board = Board.query.get(id)
    return board.to_dict()

# C R E A T E  B O A R D
@board_routes.route('/new-board', methods = [ 'GET', 'POST' ])
def new_board():
    form = NewBoardForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        board = Board(
            user_id=form.data['user_id'],
            title=form.data['title'],
            avatar_id=form.data['avatar_id'],
            # workspace_id=form.data['workspace_id']
        )
        db.session.add(board)
        db.session.commit()
        return board.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# U P D A T E  B O A R D
@board_routes.route('/<int:id>', methods = [ 'PUT' ])
def update_board(id):
    board = Board.query.get(id)

    title = request.json['title']
    avatar_id = request.json['avatar_id']

    board.title = title
    board.avatar_id = avatar_id

    db.session.commit()
    return board.to_dict()


# D E L E T E  B O A R D
@board_routes.route('/<int:id>', methods = [ 'DELETE' ])
def delete_board(id):
    board = Board.query.get(id)

    db.session.delete(board)
    db.session.commit()
    return { 'id': id }

# S H A R E  B O A R D
@board_routes.route('/<int:id>/sharing', methods = ['POST'])
def share_board(id):
    board = Board.query.get(id)
    email = request.json['email']
    user = User.query.filter(User.email == email).first()

    if user:
        board.shared_users += [user]
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': ['Unable to share']}, 400

# R E V O K E   B O A R D 
@board_routes.route('/<int:board_id>/sharing/<int:user_id>', methods = ['delete'])
def revoke_board(board_id, user_id):
    board = Board.query.get(board_id)

    board.shared_users = [user for user in board.shared_users if user.id != int(user_id)]

    db.session.commit()
    
    return {'user_id': user_id} 

# C R E A T E   L I S T
@board_routes.route('/<int:id>/lists', methods = [ 'POST' ])
def create_list(id):
    form = NewListForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list = List(
            user_id=form.data['user_id'],
            board_id=id,
            title=form.data['title'],
            order=form.data['order'],
        )
        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': ["Unsuccessful List Submission"]}, 400

# U P D A T E   L I S T   O R D E R
@board_routes.route('/<int:id>/list-order', methods = [ 'POST' ])
def update_list_order(id):
    board = Board.query.get(id)

    list_order = request.json['listOrder']
#    print(list_order, "<<<<<<<<<<<<<<<<<<<<<")

    lists = List.query.filter(List.id.in_(list(list_order))) # this grabs all changing lists in a single DB query
    for a_list in lists:    # this loop is still only O(n)!
        a_list.order = list_order[str(a_list.id)] # this is a O( log( n ) ) operation — basically constant-time

    db.session.commit()

    return board.to_dict()

# U P D A T E  C A R D  O R D E R
@board_routes.route('/<int:id>/card-order', methods=['POST'])
def update_card_order(id):
    
    card_order = request.json['cardOrder']
    
    cards = Card.query.filter(Card.id.in_(list(card_order)))

    for a_card in cards:
        a_card.order = card_order[str(a_card.id)][0]
        a_card.list_id = card_order[str(a_card.id)][1]
    
    db.session.commit()
    board = Board.query.get(id)
    
    return board.to_dict()
