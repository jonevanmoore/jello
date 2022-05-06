from flask import Blueprint, request
from flask_login import current_user, login_required
from backend.models import db, List, Card
from backend.forms import NewCardForm

list_routes = Blueprint('lists', __name__)

# U P D A T E  L I S T
@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_list(id):
    list = List.query.get(id)

    if list.user_id != current_user.id:
        return {'errors': "Unauthorized edit"}, 401

    list.title = request.json['title']
    list.order = request.json['order']

    db.session.commit()
    return list.to_dict()

# TODO: How to manage shared board permissions?
# maybe a function which checks:
# does users_boards have a record of
# user_id == current_user.is
# and
# board_id == card.list.board.id ?

# D E L E T E  L I S T
@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
    list = List.query.get(id)

    if list.user_id != current_user.id:
        return {'errors': "Unauthorized delete"}, 401

    db.session.delete(list)
    db.session.commit()
    return list.to_short_dict()


# C R E A T E  C A R D
@list_routes.route('/<int:id>/cards', methods=['POST'])
@login_required
def new_card(id):
    form = NewCardForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        card = Card(
            user_id=form.data['user_id'],
            list_id=id,
            content=form.data['content'],
            description=form.data['description'],
            order=form.data['order'],
            due_date=form.data['due_date']
        )
        db.session.add(card)
        db.session.commit()
        return card.to_dict()
    return {'errors': ["Unsuccessful Card Submission"]}, 400
