from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateTimeField
from wtforms.validators import DataRequired

class NewListForm(FlaskForm):
    title    = StringField('Title', validators=[DataRequired()])
    order    = IntegerField('Order', validators=[DataRequired()])
    user_id  = IntegerField('User ID', validators=[DataRequired()])
    board_id = IntegerField('Board ID')