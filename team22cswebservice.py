import http.server
from http.server import BaseHTTPRequestHandler
import json
import mysql.connector as sqldb
from random import randint
import bcrypt


def connectToSQLDB(myDB):
    str = f'team22{myDB}'
    print(str)
    return sqldb.connect(user='root', password='password', database=f'team22{myDB}', port=6022)


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    ver = '0.2.0'

    # How to convert the body from a string to a dictionary
    # use 'loads' to convert from byte/string to a dictionary!
    def getPOSTBody(self):
        length = int(self.headers['content-length'])
        body = self.rfile.read(length)
        return json.loads(body)

    def do_POST(self):
        status = 404
        responseBody = {}
        path = self.path
        print(path)
        dictionary = self.getPOSTBody()
        print(dictionary)
        myCloud = dictionary.pop('cloud')
        isSupply = 'supply' == myCloud
        cloud = 'demand'
        userTable = 'customers'
        print(path)
        print(isSupply)
        if isSupply:
            cloud = 'supply'
            userTable = 'fleetmanagers'

        sqlConnection = connectToSQLDB(cloud)
        cursor = sqlConnection.cursor()

        if '/cs/user/login' in path:
            status = 401
            username = dictionary['username']
            password = dictionary['password'].encode()
            print(username)
            print(password)

            # We want to support a user login in with their username so that's why we'll need to ask about both
            # username AND email when querying the database
            statement = f'SELECT password FROM {userTable} WHERE username = %s OR email = %s'
            print(userTable)
            cursor.execute(statement, (username, username))
            rows = cursor.fetchone()

            if rows is not None:
                dbPassword = rows[0]
                if bcrypt.checkpw(password, dbPassword.encode()):
                    status = 200


        # If we are receiving a request to register an account
        elif '/cs/user/register' in path:
            status = 401
            firstname = dictionary['firstname']
            lastname = dictionary['lastname']
            phone = dictionary['phonenumber']
            # phone = phone.replace(' ','')
            email = dictionary['email']
            password = dictionary['password'].encode()
            print(phone)
            statement = f'SELECT email FROM {userTable} where email = %s'
            cursor.execute(statement, (email,))
            row = cursor.fetchone()
            print(row is None)
            if row is None:
                print(email)
                print(password)

                hashedPassword = bcrypt.hashpw(password, bcrypt.gensalt())
                statement = f'INSERT INTO {userTable} VALUES (Null, %s, %s, %s, %s, %s, %s)'
                # By default, our user's username will be their email, but we want to support allowing a user to login
                # a username AND to change their username after registration
                data = (email, email, hashedPassword, phone, firstname, lastname,)
                cursor.execute(statement, data)
                sqlConnection.commit()

                status = 200

        cursor.close()
        sqlConnection.close()
        self.send_response(status)
        self.end_headers()
        res = json.dumps(responseBody)
        bytesStr = res.encode('utf-8')
        self.wfile.write(bytesStr)

    def do_GET(self):
        path = self.path
        status = 200
        responseDict = {}

        self.send_response(status)
        self.end_headers()
        res = json.dumps(responseDict)
        bytesStr = res.encode('utf-8')
        self.wfile.write(bytesStr)


def main():
    port = 4023
    # Create an http server using the class and port you defined
    httpServer = http.server.HTTPServer(('', port), SimpleHTTPRequestHandler)
    print("Running on port", port)
    # this next call is blocking! So consult with Devops Coordinator for
    # instructions on how to run without blocking other commands frombeing
    # executed in your terminal!
    httpServer.serve_forever()


if __name__ == '__main__':
    main()
