from flask import Blueprint, request
from flask_login import current_user, login_required
from backend.models import db, Comment

comment_routes = Blueprint('comment_routes', __name__)

# D E L E T E  C O M M E N T
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)

    if comment.user_id != current_user.id:
        return {'errors': "Unauthorized delete"}, 401

    board_id = comment.card.list.board_id
    list_id = comment.card.list_id

    db.session.delete(comment)
    db.session.commit()

    return { 'id': id, 'board_id': board_id, 'list_id': list_id, 'card_id': comment.card_id}
