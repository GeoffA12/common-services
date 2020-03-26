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
        cloud = {
            'name': 'demand',
            'table': 'customers'
            }
        print(path)
        print(isSupply)
        if isSupply:
            cloud['name'] = 'supply'
            cloud['table'] = 'fleetmanagers'

        if '/loginHandler' in path:
            status = 401
            username = dictionary['username']
            password = dictionary['password'].encode()
            print(username)
            print(password)
    
            statement = f'SELECT email, username, password FROM {cloud["table"]}'
            sqlConnection = connectToSQLDB(cloud['name'])
            cursor = sqlConnection.cursor()
            cursor.execute(statement)
            rows = cursor.fetchall()
            emailList = [x[0] for x in rows]
            usernameList = [x[1] for x in rows]
            passwordList = [x[2] for x in rows]
            cursor.close()
    
            compositeIndetifiers = zip(emailList, usernameList)
            if any(username in x for x in compositeIndetifiers):
                dictEmailKey = dict(zip(emailList, passwordList))
                dictUsernameKey = dict(zip(usernameList, passwordList))
                if bcrypt.checkpw(password, dictEmailKey[username].encode()) or \
                        bcrypt.checkpw(password, dictUsernameKey[username].encode()):
                    status = 200


        # If we are receiving a request to register an account
        elif '/registerHandler' in path:
            status = 401
            firstname = dictionary['firstname']
            lastname = dictionary['lastname']
            phone = dictionary['phoneNumber']
            email = dictionary['email']
            password = dictionary['password'].encode()
    
            statement = f'SELECT email FROM {cloud["table"]}'
            sqlConnection = connectToSQLDB(cloud['name'])
            cursor = sqlConnection.cursor()
            cursor.execute(statement)
            rows = cursor.fetchall()
            emailList = [x[0] for x in rows]
    
            if email not in emailList:
                print(email)
                print(password)
        
                username = email[:email.rindex('@')]
                usernameLen = len(username)
        
                statement = f'''SELECT username FROM {cloud['table']}
                            WHERE username = %s OR username LIKE %s'''
                # cursor = sqlConnection.cursor()
                cursor.execute(statement, (username, username + '-%',));
                similarUsernames = cursor.fetchone()
                if similarUsernames is not None:
                    checker = [x[0] for x in similarUsernames]
                    while username in checker:
                        username = f'{username[:usernameLen]}-{randint(0, 1_000_000)}'
        
                hashedPassword = bcrypt.hashpw(password, bcrypt.gensalt())
                statement = f'''INSERT INTO {cloud["table"]}
                            (firstname, lastname, username, password, email, phone)
                            VALUES (%s, %s, %s, %s, %s, %s)'''
                data = (firstname, lastname, username, hashedPassword, email, phone)
                # with sqlConnection.cursor() as cursor:
                cursor = sqlConnection.cursor()
                cursor.execute(statement, data)
                sqlConnection.commit()
                cursor.close()
        
                status = 200

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
