from flask import Flask, request, Response
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route("/<foo>", methods=['GET'])
def boolean(foo):
    if foo != 'foo':
        return 'false'
    else:
        return 'true'

@app.route("/", methods=['POST'])
def form():
    body = request.get_json()

    return Response()

