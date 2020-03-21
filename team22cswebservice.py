import http.server
from http.server import BaseHTTPRequestHandler
import json
import mysql.connector as sqldb
import bcrypt

def connectToSQLDB(myDB):
    str = f'team22{myDB}'
    print(str)
    return sqldb.connect(user = 'root', password = 'password', database = f'team22{myDB}', port = 6022)


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    ver = '0.2.0'
    
    # How to convert the body from a string to a dictionary
    # use 'loads' to convert from byte/string to a dictionary!
    def getPOSTBody(self):
        length = int(self.headers['content-length'])
        body = self.rfile.read(length)
        return json.loads(body)
    
    def do_POST(self):
        path = self.path
        print(path)
        responseDict = {}
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
            print(dictionary)
            username = dictionary['username']
            password = dictionary['password']

            statement = f'SELECT username, password FROM {cloud["table"]}'
            sqlConnection = connectToSQLDB(cloud['name'])
            cursor = sqlConnection.cursor()
            cursor.execute(statement)
            rows = cursor.fetchall()
            usernameList = [x[0] for x in rows]
            passwordList = [x[1] for x in rows]
            cursor.close()

            # Make a dictionary from the usernameList and passwordList where
            # key:value ==> username:password
            userpass = dict(zip(usernameList, passwordList))

            if username in userpass.keys() and bcrypt.checkpw(password, userpass[username]):
                status = 200

            # We'll send a 401 code back to the client if the user hasn't registered in our database
            else:
                status = 401
                responseDict['Reason'] = 'Credentials do no exist in the database'
        
        # If we are receiving a request to register an account
        elif '/registerHandler' in path:
            print(dictionary)
            username = dictionary['username']
            password = b"dictionary['password']"
            email = dictionary['email']
            phone = dictionary['phoneNumber']

            statement = f'SELECT username FROM {cloud["table"]}'
            sqlConnection = connectToSQLDB(cloud['name'])
            cursor = sqlConnection.cursor()
            cursor.execute(statement)
            rows = cursor.fetchall()
            usernameList = [x[0] for x in rows]
            cursor.close()
    
            # The equivalent of arr.contains(e)
            if username in usernameList:
                status = 401
                responseDict['Reason'] = 'Username already exists'
    
            else:
                print(username)
                print(password)
    
                hashedPassword = bcrypt.hashpw(password, bcrypt.gensalt())
                statement = f'INSERT INTO {cloud["table"]} (username, password, email, phone) VALUES (%s, %s, %s, %s)'
                data = (username, hashedPassword, email, phone)
                # with sqlConnection.cursor() as cursor:
                cursor = sqlConnection.cursor()
                cursor.execute(statement, data)
                sqlConnection.commit()
                cursor.close()
    
                status = 200

        else:
            status = 404
            responseDict['Reason'] = 'Endpoint doesn\'t exists'
    
        sqlConnection.close()
        self.send_response(status)
        self.end_headers()
        res = json.dumps(responseDict)
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
