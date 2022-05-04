from flask import Blueprint
from flask_login import current_user, login_required
from backend.models import db

list_routes = Blueprint('lists', __name__)

# U P D A T E
@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_list(id):
    list = List.query.get(id)

    if list.user_id != current_user.id:
        return {'errors': "Unauthorized edit"}, 401

    list.title = request.json('title')
    list.order = request.json('order')

    db.session.commit()
    return list.to_dict()

# TODO: How to manage shared board permissions?
# maybe a function which checks:
# does users_boards have a record of 
# user_id == current_user.is
# and 
# board_id == card.list.board.id ?

# D E L E T E
@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
    list = List.query.get(id)

    if list.user_id != current_user.id:
        return {'errors': "Unauthorized delete"}, 401

    db.session.delete(list)
    db.session.commit()
    return {'id':id}
