from flask import Flask, render_template, redirect, request, session
import connection
import data_manager, util

app = Flask(__name__)
app.secret_key = "GoodEveningVietnam"


@app.route('/')
def main():
    return render_template("index.html")


@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        if not data_manager.check_if_user_in_database(request.form['email']):
            email = request.form['email']
            password = util.hash_password(request.form['password'])
            data_manager.save_user(email, password)
            return render_template('register.html', after_register=True)
        else:
            return render_template('register.html', username_taken=True)
    return render_template('register.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        if data_manager.check_if_user_in_database(request.form['email']):
            password = request.form['password']
            saved_password = data_manager.get_password_by_email(request.form['email'])['password']
            if util.verify_password(password, saved_password):
                user = request.form['email']
                username = user.split('@')
                user_id = data_manager.find_user_id_by_email(user)
                session['id'] = user_id['id']
                session['user'] = user
                session['username'] = username[0]
                return redirect('/')
            else:
                return render_template('login.html', wrong_data=True)
        else:
            return render_template('login.html', wrong_data=True)
    return render_template('login.html')


@app.route("/logout")
def logout():
    session.pop("id", None)
    session.pop("user", None)
    return redirect('/')


if __name__ == "__main__":
    app.run()
