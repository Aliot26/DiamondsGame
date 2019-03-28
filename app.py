from flask import Flask, render_template, request, session, send_from_directory
import re

import data_handler

app = Flask(__name__)
app.secret_key = 'mysecretkey'


@app.route('/')
def index():
    return render_template('mainpage.html')


@app.route('/todatabase', methods=['POST'])
def todatabase():
    score = request.values.get('score', '')
    print(score)
    result = re.search(r'\d+', score).group(0)
    result_int = int(result)
    user = {
        'username': session['username'],
        'score': result_int
    }
    data_handler.add_user_score_to_db(user)
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

    # data_handler.add_user_to_db(user)

    return render_template('gameplay.html',
                           user=user,
                           row_num=row_num,
                           col_num=col_num)


@app.route('/endgame')
def endgame():
    scoreboard = data_handler.select_5_highest_scores()
    return render_template('scoreboard.html',
                           scoreboard=scoreboard)


@app.route('/service-worker.js', methods=['GET'])
def sw():
    return app.send_static_file('service-worker.js')


@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')


if __name__ == '__main__':
    app.run()
