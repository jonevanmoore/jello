from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateTimeField, TextAreaField
from wtforms.validators import DataRequired

class NewCardForm(FlaskForm):
    content     = StringField('Content', validators=[DataRequired()])
    order       = IntegerField('Order', validators=[DataRequired()])
    description = TextAreaField('Description')
    due_date    = DateTimeField('Due Date')
    user_id     = IntegerField('User ID', validators=[DataRequired()])
    list_id     = IntegerField('List ID', validators=[DataRequired()])