from flask import Flask, render_template, request, redirect, json
import jinja2
import os
from utils import *
from pymongo import *

app = Flask(__name__)

client = MongoClient(os.environ.get('MONGO_URL'))
db = client['listsapp']
users = db['Users']

@app.route('/')
def hello():
	return render_template("index.html")


@app.route('/lists')
def lists():
	return render_template("lists.html")

@app.route('/signIn', methods=['POST'])
def signIn():
	username = request.form.get('username')
	password = request.form.get('password')

	if not(username):
		return json.jsonify(error="No username given.", status="error")
	if not(password):
		return json.jsonify(status="error", error="No password given.")

	username = username.lower()
	user = users.find_one({'username':username})

	if user is None:
		return json.jsonify(status="error", error="No account found!")
	if not(valid_pw(username,password,user.get('password'))):
		return json.jsonify(status="error", error="Invalid username or password.")

	session_login(username, user.get('name'))
	return json.jsonify(status="success")

if __name__ == '__main__':
	port = int(os.environ.get('PORT', 8000))
	app.run(host='0.0.0.0', port=port,debug=True)