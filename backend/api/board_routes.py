from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from backend.forms import NewBoardForm, NewListForm
from backend.models import User, Board, List, db
from backend.api.auth_routes import validation_errors_to_error_messages

board_routes = Blueprint('boards', __name__)


# R E A D  A L L  B O A R D S
@board_routes.route('/', methods = [ 'GET' ])
@login_required
def read_all_boards():
    boards = Board.query.filter(Board.user_id == current_user.id).all()
    return {'boards': [board.to_dict() for board in boards]}
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
