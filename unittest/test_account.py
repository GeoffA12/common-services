import unittest
import sys

sys.path.insert(1, '../')
from account import Account

postBody = {
    'username': 'komoto415',
    'email': 'komoto415@gmail.com',
    'password': 'password',
    'firstname': 'Jeffrey',
    'lastname': 'Ng',
    'phonenumber': '1234567890'
    }


class MyTestCase(unittest.TestCase):
    def test_createAccount(self):
        a = Account(**postBody)
        self.assertEqual('komoto415', a.username)
        self.assertEqual('komoto415@gmail.com', a.email)
        self.assertEqual('password', a.password)
        self.assertEqual('Jeffrey', a.firstname)
        self.assertEqual('Ng', a.lastname)
        self.assertEqual('1234567890', a.phonenumber)
        print(a)


if __name__ == '__main__':
    unittest.main()
