from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError

# from backend.models import User

class NewBoardForm(FlaskForm):
    title = StringField('Board Title', validators = [DataRequired()])
    user_id = IntegerField('User ID', validators = [DataRequired()])
    avatar_id = IntegerField(validators = [DataRequired()])
    workspace_id = IntegerField('Workspace ID')
    # created_at = DateField('Created at')
    # updated_at = DateField('Updated at')
