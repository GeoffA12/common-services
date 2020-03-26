from random import randint

username = "a"
usernameLen = len(username)
tup = (
    ("a-",),
    ("a-1",),
    ("a-2",),
    ("a-3",),
    ("a-4",),
    ("a-1-1")
    )

lst1 = [x[0] for x in tup]

print(tup)
print(lst1)
if username in lst1:
    lst2 = [int(x[usernameLen + 1:]) for x in lst1 if x.count('-') == 1 and len(x[usernameLen + 1:]) != 0]
    print(lst2)
    print(max(lst2))

i = 0
while i < 5:
    username = f'{username[:usernameLen]}-{randint(0, 1_000_000)}'
    print(username)
    i += 1
