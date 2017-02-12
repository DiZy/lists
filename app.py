from flask import Flask, render_template, request, redirect, json
import jinja2
import os
from utils import *
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = 'listsapp'

client = MongoClient(os.environ['MONGO_URL'])
db = client.listsapp
users = db.Users
lists = db.Lists
items = db.Items

@app.errorhandler(404)
def page_not_found(e):
	return redirect("/")

@app.errorhandler(403)
def page_is_forbidden(e):
	return redirect("/")

@app.errorhandler(410)
def page_is_gone(e):
	return redirect("/")

@app.errorhandler(500)
def page_has_error(e):
	return redirect("/")

@app.route('/')
def hello():
	print session
	if logged_in():
		return redirect('/lists')
		print 'logged in'
	return render_template("index.html")


@app.route('/lists')
def lists():
	print logged_in();
	if logged_in() == False:
		return redirect('/')
	return render_template("lists.html")

@app.route('/removeItem', methods=['POST'])
def removeItem():
	itemId = request.form.get('itemId')
	items.delete_one({'_id': itemId})


@app.route('/logout')
def logout():
	session_logout();
	return redirect('/')

@app.route('/signUp', methods=['POST'])
def signUp():
	full_name = request.form.get('full_name')
	username = request.form.get('username')
	email = request.form.get('email')
	password = request.form.get('password')
	password_confirm = request.form.get('password_confirm')
	if not full_name:
		return json.jsonify(status="error", error="Please enter a name.")
	if not username:
		return json.jsonify(status="error", error="Please enter a username.")
	if not email:
		return json.jsonify(status="error", error="Please enter an email.")
	if not valid_email(email):
		return json.jsonify(status="error", error="Please enter a valid email.")
	if not password:
		return json.jsonify(status="error", error="Please enter a password.")
	if not password_confirm:
		return json.jsonify(status="error", error="Please re-type your password.")
	if not valid_username(username):
		return json.jsonify(status="error", error="Enter a valid username.")
	if not valid_password(password):
		return json.jsonify(status="error", error="Enter a valid password.")
	if password != password_confirm:
		return json.jsonify(status="error", error="Passwords must match")

	email = email.lower()
	username = username.lower()

	result = users.find_one({"username":username})
	email_result = users.find_one({"email":email})

	#already a user or already a user
	if not result is None:
			return json.jsonify(status="error", error="Username taken.")
	if not email_result is None:
		return json.jsonify(status="error", error="Email taken.")

	password = make_pw_hash(username,password)
	
	user_id = users.insert({"username": username,"password": password,"name":full_name,'email':email})
	session_login(username, full_name)
	return json.jsonify(status="success")

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