from flask import Flask, url_for, flash, render_template, request
import data_handler

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('mainpage.html')


@app.route('/login', methods=['POST'])
def show_mainpage():
    username = request.form.get('username')
    avatar = request.form.get('avatar')

    user = {
        'username': username,
        'avatar': avatar
    }
    col_num = 5
    row_num = 5

    data_handler.add_user_to_db(user)

    return render_template('gameplay.html',
                           user=user,
                           row_num=row_num,
                           col_num=col_num)


if __name__ == '__main__':
    app.run()

