from flask import Blueprint
from flask_login import current_user, login_required
from backend.models import db, Card


card_routes = Blueprint("card_routes", __name__)

# U P D A T E
@card_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_card(id):
    card = Card.query.get(id)

    if card.user_id != current_user.id:
        return {'errors': "Unauthorized edit"}, 401

    card.content = request.json('content')
    card.description = request.json('description')
    card.order = request.json('order')
    card.due_date = request.json('due_date')
    card.list_id = request.json('list_id')

    db.session.commit()
    return card.to_dict()

#D E L E T E
@card_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_card(id):
    card = Card.query.get(id)

    if list.user_id != current_user.id:
        return {'errors': "Unauthorized delete"}, 401

    db.session.delete(card)
    db.session.commit()

    return {'id': id} 