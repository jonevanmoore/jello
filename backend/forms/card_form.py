from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateTimeField, TextAreaField
from wtforms.validators import DataRequired

class NewCardForm(FlaskForm):
    content     = StringField('content', validators=[DataRequired()])
    order       = IntegerField('order', validators=[DataRequired()])
    description = TextAreaField('description')
    due_date    = DateTimeField('due_date')
    user_id     = IntegerField('user_id', validators=[DataRequired()])
    list_id     = IntegerField('list_id', validators=[DataRequired()])