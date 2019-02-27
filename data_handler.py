import db_connection

@db_connection.connection_handler
def add_user_to_db(cursor, user):
    cursor.execute ("""
                    INSERT INTO user_score(username)
                    VALUES (%(username)s)
                       
                    """,
                    {'username': user['username']})