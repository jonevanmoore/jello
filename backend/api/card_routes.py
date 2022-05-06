from flask import Blueprint, request
from flask_login import current_user, login_required
from backend.models import db, Card, Comment
from backend.forms import NewCommentForm


card_routes = Blueprint("card_routes", __name__)

# U P D A T E  C A R D
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

# D E L E T E  C A R D
@card_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_card(id):
    card = Card.query.get(id)

    if list.user_id != current_user.id:
        return {'errors': "Unauthorized delete"}, 401

    db.session.delete(card)
    db.session.commit()

    return card.to_dict()


# C R E A T E  C O M M E N T
@card_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def new_comment(id):
    comment = NewCommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=form.data['user_id'],
            card_id=id,
            body=form.data['content']
        )
        
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()