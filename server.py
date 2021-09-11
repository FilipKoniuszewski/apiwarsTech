from flask import Flask, render_template, redirect, request, session
import connection
import data_manager,util

app = Flask(__name__)


@app.route('/')
def main():
    return render_template("index.html")


@app.route('/register', methods=['POST', 'GET'])
def register():
    # if request.method == 'POST':
    #     if not data_manager.check_if_user_in_database(request.form['email']):
    #         email = request.form['email']
    #         password = util.hash_password(request.form['password'])
    #         data_manager.save_user(email, password)
    #         return redirect('/')
    #     else:
    #         return render_template('register.html', info="Sorry but that mail is already in use")
    return render_template('register.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        if data_manager.check_if_user_in_database(request.form['email']):
            password = request.form['password']
            saved_password = data_manager.get_password_by_email(request.form['email'])['password']
            if util.verify_password(password, saved_password):
                user = request.form['email']
                user_id = data_manager.find_user_id_by_email(user)
                session['id'] = user_id['id']
                session['user'] = user
                return redirect('/')
            else:
                return render_template('login.html', info="Your login or password is incorrect")
        else:
            return render_template('login.html', info="user with such e-mail does not exist")
    return render_template('login.html')


if __name__ == "__main__":
    app.run()
