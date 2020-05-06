from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# initialize app
app = Flask(__name__)

# enable CORS for api calls from React client
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/veerdb'

# initialize db
db = SQLAlchemy(app)

# import model and form validation
from .models import Contact
from .forms import ContactForm

@app.route('/')
def index():
    return 'Hello, World!'

@app.route("/foo/<foo>", methods=['GET', 'POST'])
def boolean(foo):
    if foo != 'foo':
        return Response(response="Incorrect..", status=200)
    else:
        return Response(response="Correct!", status=200)

@app.route("/", methods=['POST'])
def form():
    # check for form data from client
    if request.form:
        # instantiate form validation
        form = ContactForm()

        # execute db and successful response if form fields are valid
        if form.validate_on_submit():
            contact = Contact(
                name=request.form["name"],
                email=request.form["email"],
                phone=request.form["phone"],
                message=request.form["message"],
            )

            db.session.add(contact)
            db.session.commit()

            return Response(response="Message sent", status=201)

        else:
            return Response(response="Invalid form submission", status=400)
    else:
        return Response(response="Internal Server Error", status=500)
