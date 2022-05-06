from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class NewCommentForm(FlaskForm):
    body    = StringField('body', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    card_id = IntegerField('card_id', validators=[DataRequired()])