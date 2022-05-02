from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from sqlalchemy.sql import func

# from backend.models import User

class NewBoardForm(FlaskForm):
    title = StringField('Board Title', validators = [DataRequired()])
    user_id = IntegerField('User ID', validators = [DataRequired()])
    avatar_id = IntegerField(validators = [DataRequired()])
    workspace_id = IntegerField('Workspace ID')
