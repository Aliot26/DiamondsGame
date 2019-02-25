from flask import Flask, url_for, flash, render_template, request

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

    return render_template('gameplay.html',
                           user=user)


if __name__ == '__main__':
    app.run()
