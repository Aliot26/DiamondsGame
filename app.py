from flask import Flask, url_for, flash, render_template, request, redirect,session
import data_handler

app = Flask(__name__)
app.secret_key = 'mysecretkey'


@app.route('/')
def index():
    return render_template('mainpage.html')


@app.route('/login', methods=['POST'])
def show_mainpage():
    session['username'] = request.form.get('username')
    session['avatar'] = request.form.get('avatar')

    user = {
        'username': session['username'],
        'avatar': session['avatar']
    }
    col_num = 5
    row_num = 5

    data_handler.add_user_to_db(user)

    return render_template('gameplay.html',
                           user=user,
                           row_num=row_num,
                           col_num=col_num)


@app.route('/endgame')
def endgame():
    scoreboard = data_handler.select_5_highest_scores()
    return render_template ('scoreboard.html',
                            scoreboard = scoreboard)

if __name__ == '__main__':
    app.run()

