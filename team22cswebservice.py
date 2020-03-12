import http.server
from http.server import BaseHTTPRequestHandler
import json
import mysql.connector as sqldb


def connectToSQLDB(myDB):
    return sqldb.connect(user = 'root', password = 'password', database = f'team22{myDB}', port = 6022)


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    ver = '0.1.0'
    
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
        isSupply = 'supply' in path
        cloud = {
            'name': None,
            'table': None,
            }
        if isSupply:
            cloud['name'] = 'supply'
            cloud['table'] = 'fleetmanagers'
        else:
            cloud['name'] = 'demand'
            cloud['table'] = 'customers'
        
        if '/loginHandler' in path:
            print(dictionary)
            username = dictionary['username']
            password = dictionary['password']
            
            usernameList = None
            passwordList = None
            statement = f'SELECT username, password FROM {cloud["table"]}'
            sqlConnection = connectToSQLDB(cloud['name'])
            with sqlConnection.cursor() as cursor:
                cursor.execute(statement)
                rows = cursor.fetchall()
                usernameList = [x[0] for x in rows]
                passwordList = [x[1] for x in rows]
                sqlConnection.close()
            
            # Make a dictionary from the usernameList and passwordList where the key:value pairs
            # are username:password
            userpass = dict(zip(usernameList, passwordList))
            
            if username in userpass and userpass[username] == password:
                status = 200
                responseDict['Success'] = True
            
            # We'll send a 401 code back to the client if the user hasn't registered in our database
            else:
                status = 401
        
        # If we are receiving a request to register an account
        elif '/registerHandler' in path:
            print(dictionary)
            username = dictionary['username']
            password = dictionary['password']
            email = dictionary['email']
            phone = dictionary['phoneNumber']
            
            usernameList = None
            statement = f'SELECT username, password FROM {cloud["table"]}'
            sqlConnection = connectToSQLDB(cloud['name'])
            with sqlConnection.cursor() as cursor:
                cursor.execute(statement)
                rows = cursor.fetchall()
                usernameList = [x[~0] for x in rows]
            
            # The equivalent of arr.contains(e)
            if username in usernameList:
                status = 401
            
            else:
                print(username)
                print(password)
                statement = 'INSERT INTO %s (username, password, email, phone) VALUES (%s, %s, %s, %s)'
                data = (cloud['table'], username, password, email, phone)
                with sqlConnection.cursor() as cursor:
                    cursor.execute(statement, data)
                    sqlConnection.commit()
                    sqlConnection.close()
                
                status = 200
                responseDict['Success'] = True
        else:
            status = 404
        
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
    port = 4022
    # Create an http server using the class and port you defined
    httpServer = http.server.HTTPServer(('', port), SimpleHTTPRequestHandler)
    print("Running on port", port)
    # this next call is blocking! So consult with Devops Coordinator for
    # instructions on how to run without blocking other commands frombeing
    # executed in your terminal!
    httpServer.serve_forever()


if __name__ == '__main__':
    main()
