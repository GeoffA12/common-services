# TODO: Full suite validation
def validateEmail(email):
    if '@' not in email:
        raise ValueError('Not a valid email!')
    return email


# TODO: Full suite validation
def validatePassword(password):
    if len(password) < 8:
        raise ValueError('Not a valid password')
    return password


class Account(object):
    ver = '0.1.0'

    def __init__(self, username, email, password, firstname, lastname, phonenumber):
        self._username = username
        self._email = validateEmail(email)
        self._password = validatePassword(password)
        self._firstname = firstname
        self._lastname = lastname
        self._phonenumber = phonenumber

    @property
    def username(self):
        return self._username

    @property
    def email(self):
        return self._email

    @property
    def password(self):
        return self._password

    @property
    def firstname(self):
        return self._firstname

    @property
    def lastname(self):
        return self._lastname

    @property
    def phonenumber(self):
        return self._phonenumber

    def __repr__(self):
        return f'Account({self._username}, {self._email}, {self._password}, {self._firstname}, {self._lastname},' \
               f' {self._phonenumber})'

    def __str__(self):
        return f'''Username: {self._username}
Email: {self._email}
Password: {self._password}
First Name: {self._firstname}
Last Name: {self._lastname}
Phone Number: {self._phonenumber}
'''
