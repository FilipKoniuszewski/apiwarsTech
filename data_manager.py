import connection


@connection.connection_handler
def check_if_user_in_database(cursor, email):
    query = f""" SELECT * 
                FROM users 
                WHERE username = '{email}'

            """
    cursor.execute(query)
    result = cursor.fetchone()
    return result


@connection.connection_handler
def find_user_id_by_email(cursor, email):
    query = f"""SELECT id
                FROM users
                WHERE username = '{email}'
            """
    cursor.execute(query)
    return cursor.fetchone()


@connection.connection_handler
def save_user(cursor, email, password):
    query = f"""INSERT INTO users(username,password)
                VALUES  ('{email}', '{password}')  

            """
    return cursor.execute(query)


@connection.connection_handler
def get_password_by_email(cursor, email):
    query = f"""SELECT password
                FROM users
                WHERE username = '{email}' 
            """
    cursor.execute(query)
    result = cursor.fetchone()
    return result