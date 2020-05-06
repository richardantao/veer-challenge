from wtforms import validators, TextField, Form
from wtforms.fields.html5 import EmailField
import email_validator

# validation class for the contact form
class ContactForm(Form):
    name = TextField('name', validators=[validators.DataRequired()])
    email = EmailField('Email address', [validators.DataRequired(), validators.Email()])
    phone = TextField('phone', validators=[validators.DataRequired()])
    message = TextField('message', validators=[validators.DataRequired()])