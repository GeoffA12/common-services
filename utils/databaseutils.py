from dotenv import load_dotenv

load_dotenv()
ver = '0.1.0'


def connectToSQLDB(myDB):
    str = f'team22{myDB}'
    print(str)
    import os
    import mysql.connector as sqldb
    password = os.getenv('DB_PASSWORD')
    return sqldb.connect(user='root', password=password, database=f'team22{myDB}', port=6022)


def getUserByCredentials(cloud, username, userTable):
    sqlConnection = connectToSQLDB(cloud)
    cursor = sqlConnection.cursor()

    statement = f'SELECT password FROM {userTable} WHERE username = %s OR email = %s'
    cursor.execute(statement, (username, username))
    row = cursor.fetchone()

    cursor.close()
    sqlConnection.close()

    return row


def checkIfEmailExists(cloud, email, userTable):
    sqlConnection = connectToSQLDB(cloud)
    cursor = sqlConnection.cursor()

    statement = f'SELECT email FROM {userTable} where email = %s'
    cursor.execute(statement, (email,))
    row = cursor.fetchone()

    cursor.close()
    sqlConnection.close()

    return row


def addNewUser(cloud, userTable, email, hashedPassword, phone, firstname, lastname):
    sqlConnection = connectToSQLDB(cloud)
    cursor = sqlConnection.cursor()

    statement = f'INSERT INTO {userTable} VALUES (Null, %s, %s, %s, %s, %s, %s)'
    data = (email, email, hashedPassword, phone, firstname, lastname,) if cloud == 'supply' else (email, hashedPassword, email, phone, firstname, lastname,)
    cursor.execute(statement, data)
    sqlConnection.commit()

    cursor.close()
    sqlConnection.close()
