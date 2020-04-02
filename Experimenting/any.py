l1 = [1, 2, 3, 4, 5]
l2 = ['a', 'b', 'c', 'd', 'e']
l3 = ['z', 'y', 'x', 'w', 'v']

tup = (
    (1, 'a', 'z',),
    (2, 'b', 'y',),
    (3, 'c', 'x',),
    )

l1 = [x[0] for x in tup]
l2 = [x[1] for x in tup]
composite = zip(l1, l2)
if any(1 in x for x in composite):
    print('found!')
    l3 = [x[2] for x in tup]
    
    d1 = dict(zip(l1, l3))
    d2 = dict(zip(l2, l3))
    
    for k, v, in d1.items():
        print(k, v)
    
    for k, v in d2.items():
        print(k, v)
