import db_connection


@db_connection.connection_handler
def add_user_to_db(cursor, user):
    cursor.execute("""
                    INSERT INTO user_score(username)
                    VALUES (%(username)s)
                       
                    """,
                   {'username': user['username']})


@db_connection.connection_handler
def add_user_score_to_db(cursor, user):
    cursor.execute("""
                    INSERT INTO user_score(username,score, date_time)
                    VALUES (%(username)s, %(score)s, now()) 
                    """,
                   {'score': user['score'], 'username': user['username']})


@db_connection.connection_handler
def select_5_highest_scores(cursor):
    cursor.execute("""
                    SELECT username, score FROM user_score 
                    ORDER BY score desc 
                    limit 5
    
                    """)
    scoreboard = cursor.fetchall()
    return scoreboard
