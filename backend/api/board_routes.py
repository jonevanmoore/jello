from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required
from backend.forms.new_board_form import NewBoardForm
from backend.models.board import Board
from backend.api.auth_routes import validation_errors_to_error_messages

board_routes = Blueprint('boards', __name__)


# R E A D  A L L
@board_routes.route('/', methods = [ 'GET' ])
# @login_required
def read_all_boards():
    boards = Board.query.filter(Board.user_id == User.id).all()
    return {'boards': [boards.to_dict() for board in boards]}

# C R E A T E
@board_routes.route('/new-board', methods = [ 'GET', 'POST' ])
# @login_required
def new_board():
    form = NewBoardForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        board = Board(
            user_id=form.data['user_id'],
            title=form.data['title'],
            avatar_id=form.data['avatar_id'],
            workspace_id=form.data['workspace_id'],
            # created_at=form.data['created_at'],
            # updated_at=form.data['updated_at']
        )
        db.session.add(board)
        db.session.commit()
        return board.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# U P D A T E
@board_routes.route('/<int:id>', methods = [ 'PUT' ])
@login_required
def update_board(id):
    board = Board.query.get(Board.id)
    form = NewBoardForm(board)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # form.populate_obj(board)
        board = Board(
            user_id=form.data['user_id'],
            title=form.data['title'],
            avatar_id=form.data['avatar_id'],
            workspace_id=form.data['workspace_id']
        )
        db.session.add(board)
        db.session.commit()
        return board.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# D E L E T E
@board_routes.route('/<int:id>', methods = [ 'DELETE' ])
@login_required
def delete_board():
    pass
