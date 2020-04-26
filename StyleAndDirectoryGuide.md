# Coding Practices and Guidelines
Authored by Jeffrey Ng
Coauthored by Geoff Arroyo
> First, your return to shore was not part of our negotiations nor our agreement so I must do nothing. And secondly, you must be a pirate for the pirate's code to apply and you're not. And thirdly, the code is more what you'd call "guidelines" than actual rules. Welcome aboard the Black Pearl, Miss Turner - Barbossa

## Getting Started
Some of these are things that we've all been doing so far, but now we should streamline it. Remember, **these are not rules**. They are guidelines, so of course you don't have to follow it, but if you are able to set up your code in a way where transitions from each other's code is as smooth as possible, we then spend less time trying to figure out what the hell things mean from a purely readability style. And yes, shit gets busy and complex real fast so sometimes who wants to go back and format all their code when they just want it to work. With that said, **correctness should always come first!** And most IDE's will have some form of baseline style-guide formatter as well as the options to make our own. I will review these once we've finalised this. Heck, maybe I'll write a script that'll do it for you.

## Setting Up Your Upcoming Task
Moving forward, particularly working with code, we want everyone to begin taking responsibility with both their design, specs and expectations. Here are some steps to taking the initiative:
1. Research
2. Design your specs collaboratively with whoever you're working with 
3. Code 
4. Test
5. Get feedback from the team, and refactor
6. Test some more 
7. Git push with readme documentation or comments explaining what your code is doing. 

## Files and Directory Structure
With that said, file naming directory structures are something that we will all learn to follow and will be treated as though we are working on the implementation itself. This will be a fundamental of all our specs, just like a style guide, to make transitions between code, and ESPECIALLY testing, as easy and seamless as possible. For example. if one person is making a UnitTest file, if two different people working on the same impl with different directory structures and different names, the test's `from x import y` will be all kinds of broken. 

### File Naming
| Type      | Style                                     | Example
|:----------|:------------------------------------------|:---------
| Repos     | word-word-word                            | supply-front-end
| Branches  | feature-name                              | mapservice
| Modules   | featurename                               | mapservice
| Unit Tests| test\_modulename                          | test\_mapservice
| Documents | TitlePurpose                              | StatusReport

### Directories
#### Front end Repositories
```
/repository-name
    /images
    /js
    /styling
    /index.html
    /subsequent pages...
```

#### Back end Repositories
```
/repository-name
    /unittests
    /utils
    /class.py
    /webservice.py
```

## Implementation Level Naming
| type          | Style                                                                             | Example
|:--------------|:----------------------------------------------------------------------------------|:---
| Classes       | Starts with uppercase and is camel cased                                          | `MapServiceRouting`
| Methods       | Starts with lowercase and is camel cased                                          | `getGPSLocationByName(name)`
| Test methods  | **Must always** start with `test_`, followed with class method then parameter(s)  | `test_getGPSLocationByName_Gordoughs()`
| Variables     | Starts with lowercase and is camel cased                                          | `gpsLocation`
| Constants     | All uppercase separated by underscores                                            | `WAREHOUSE_ONE_GPS_LOCATION`

A couple notes:
* Where there are acronyms, uniformly apply to the whole acronym
Yes: `getGPSlocation`
No: `getGpsLocation`
* Subscripts of variable names
Yes: `r = r_0 + v_0*t + (1/2)*a*t`
No: `r = r0 + v0*t + (1/2)*a*t`
* Try to keep it short, but descriptive and readability are your first priorities. First run through, just give it the name that makes most sense to you. As your codebase evolves and code reviews happen, you can update for shortening.

## Commenting
You might be wondering, 'why the hell is there a section on commenting in a style guide?' Well, just like code, I want to be able to read your comments and know pretty immediately or with little effort and understand what it is I'm reading. In fact, it's almost like that's what our comments should be doing!
* Comments will refer to the things below them with the exception of over-arching method descriptions with their signatures. Comments above methods will be reserved for pre, post conditions, and example outcomes if necessary. 
* All `#` will be followed by a space.
* Comment blocks will be treated like they are written like paragraphs, in that a new paragraph will imply that we've moved on to another part of our code such that it was necessary to give it its own explanation.
* Use **MINIMAL** amount of inline commenting.
* The indentation should align with the block or line that you are intending on commenting on.
* Helping Methods!!!!!!
Now you may wonder, why are helper methods in the commenting section? Because they will help carry the burden of what your code is doing! Now I am pesonally not a fan of the named boolean. I think it's clunky and it makes my Python code hideous, but thematically they serve the same purpose. Just one looks better and all the logic doesn't have to exist in the middle of your algorithim's block C: With that said, it never hurts to provide a couple lines of explicit explanation of what's going on. 

Here are some code snippets of friend's CS1 project that I made, so yes there are missing bits, but in terms of the commenting structure, it will display both weaknesses and strengths as according to this guide.
##### Code Snippet #1:
```python
def mainMenu():
    userResponse = -1
    state = 0
    # While will force the user to stay in the main menu until they input a valid entry
    while (userResponse != 4):
        # Checks if the user has run the application before
        # State simply makes it so that the previous selections don't appear everytime if the case the user
        # puts invalid inputs and just presents on launch
        if path.exists('showroomInfo.txt') and beenHereBefore() and state == 0:
                state = 1

        menuDelimeter()
        print('Welcome to our showroom! ')
        menuList(['BMW', 'Chevy', 'Audi', 'Exit Program'])

        # Input validation
        try:
            userResponse = int(input("Please select the make you desire: "))
        except ValueError as e:
            print(e)
        if (userResponse > 4 or userResponse < 1):
            print('\nThat is not a valid option. Select between 1-4 only.')
        elif userResponse != 4:
            menuDelimeter()
            print('Model: ')
            # Get a list of the desired make and its model
            # Contains model selection subcomponent
            baseList = makeChosen(userResponse)

            menuDelimeter()
            addOnList = selectAccessories();
            allInOne = baseList + addOnList # Combine lists to align with printAll() 
            menuDelimeter()

            print('List of your choices:')
            printAll(allInOne)

            # Checking if user has selected everything they've wanted
            done = False
            while not done:
                done = input('Are you sure this is what you want? (y/n)? ')
                if not re.match("^n|y$", done):
                    print("\nNot valid option")
                else:
                    if re.match("^y$", done):
                        if path.exists('showroomInfo.txt') and beenHereBefore():
                            removeExisting()
                        # We want this at the very end in case the user manual turns off the program
                        # preventing uncompleted data from entering out table
                        addToFile(allInOne)
                        userResponse = 4
                    done = True;
```
Now truth be told, this is not the best example of amazing commented code. In fact it's quite sparse, but this also may also be a byproduct of the fact that it's the top level component of a lot of sub components and that there isn't a lot of algorithmic logic here. 
##### Code Snippet #2:
```python
def beenHereBefore():
    # This, removeExisting and addToFile methods utilises "with open('file.txt', 'r') as"
    # Allows us to represent the text file as an accessible object and allows
    # us the usage of the "in" keyword, and doesn't require the potential side effect of
    # forgetting to close a file
    with open('showroomInfo.txt', 'r') as showroomInfo:
        for line in showroomInfo:
            splitInfo = line.split()
            if userName == splitInfo[0]:
                menuDelimeter()
                print('Welcome back ' + userName + '! Here are your previous selection:')
                printAll(splitInfo[1:])
                return True
    return False
```
As you can see in this one, it's still not the greatest because all it does is explain what context managers are and their usages with files and not what our method actually does. 
###### Code Snippet #3:
```python
def makeChosen(make):
    model = False
    # While loop makes sure user stays in the menu in case of invalid input
    # Here we are abusing Python's dynamic typing
    # The idea is that in the case of invalid input we break out of the selectModeOf methods immediately model as a boolean value,
    # if proper input, model is then a string. Kind of hacky, but works
    # Returns container because it will allow us to send multiple values in one method. Additionally, its ordering is structured
    # such that it is one-to-one with how we want our table to look like in our file
    while not model:
        if make == 1:
            menuList(['M3', 'X5', 'I8'])
            model = selectModelOf('BMW')
            if model:
                baseList = ['BMW', model]
        elif make == 2:
            menuList(['Silverado', 'Malibu', 'Tahoe'])
            model = selectModelOf('Chevy')
            if model:
                baseList = ['Chevy', model]
        else:
            menuList(['A6', 'Q3', 'S3'])
            model = selectModelOf('Audi')
            if model:
                baseList = ['Audi', model]
    return baseList
```
Now this, this I like. It explains what exactly our method is suppose to do, how it's doing it, and a bit of why it's doing it. Perhaps one critique is maybe explain some of our magic numbers seeing as I don't have symbolic constants, but overall, this is much better than the previous two.

And just a little tip, just like Java has block commenting,
```java
/*  Java
    My comment block
    ...
    ...
*/
```
Python has something similar with its triple quotations
```python

'''
    My comments block
    ...
    ...
'''
```

## Tabbing and Spacing

### Tabs
Our tabbing will be configured to 4 spaces. You should be able to configure this in your respective IDEs. However, while most IDEs can be pretty good at adjusting and identifying tabs moving from DIFFERENT IDEs are not so nice. And as we all know, tab exists as its own character, and even though our IDEs will interpret that as 'make four spaces', `len('\t') != len(' '*4)`. Not always at least. And particularly in Python where indentation is integral to its grammar structure, we will not TAB to indent, but rather we will whitespace four times.
```python
  2 spaces      # no
    tab         # fine..
    4 spaces    # nicer
```
* Yes they may look **EXACTLY** the same, and perhaps you'll never have noticed it considering you've work in the same one or two IDEs forever, but move things to a Linux text editor and things could get all kinds of funky.


### Spaces
Write it like you're writing an English paper! Spaces should follow every word.
* Binary Operations e.g `+`, `-`, `*`, `/`,`=` will be tailed by singles spaces
Yes: `a = b + c`
No: `a=b+c`
* However in the case of mixed binary operates, where `+` or `-` exists with `*` or `/`, space the `+,-` and not the `*,/`
Yes: `a = b + c*d + e`
No: `a = b + c * d + e`


### Line Wrapping
120 characters. This should also be configured in your IDEs.

### In Functions
* Defining a Function:
Yes: `def myFunction(num1, num2, num3)`
No: `def myFunction(num1,num2,num3)`
* Calling a Function: While we're here, here's a tip for increasing readability of your code just that little bit much. This however is an acceptable exception for spaces before and after assignment.
Yes: `myFunction(name="Jeffrey", age=20, awesome=True)`
No: `myFunction("Jeffrey","20",True)`

## Some Python Catch Up
So, I know it's been a while since a lot of us have worked in Python, but here's a short little run down of some handy-dandy tools that you may find useful with the types of things we might be in our project. 

### Dictionaries
Dictionaries are mutable, non-indexed containers which store a key:value pairing. So say I want a way to store the first name's of people and their age. You could store it in a 2d list where name and age are index 0 and 1 of the nested list but why would you do that? There's no semantic way of us access those values. Meaning that if we want to access the names of our list we would reference the array with something looking like this: `list[n][0]`. Perhaps we can solve this with a named constant, but that's dumb. *Use a dictionary*. There are some things to be said about the space and time complexities of lists and dictionaries, but that is most likely out of scope for this project.   
```python
l = [['Jeffrey', 20], ['Geoff', 23], ['Claudia', 57]]
d = {'Jeffrey': 20, 'Geoff': 23, 'Claudia': 57}
```
You tell me which one is more beautiful.
Note: there are also different use cases for both. For example, my enigma machine has been implemented using both, with each one posing their own difficulties throughout different parts of the implementation. So as usual, it comes down to use cases.
Now, because dictionaries utilise key based pointers we can easily access our values with our keys
```python
d = {'Jeffrey': 20, 'Geoff': 23, 'Claudia': 57}
print(d['Jeffrey'])
print(d['Geoff'])
```
Output:
```python
20
23
```
Our dictionaries also come with some sweet methods, which can be particularly useful when we only care about one and not the other. 
```python
d = {'Jeffrey': 20, 'Geoff': 23, 'Claudia': 57}
print(list(d.keys()))
print(list(d.values()))
```
Output:
```python
['Jeffrey', 'Geoff', 'Claudia']
[20, 23, 57]
```
Don't forget to use `list()` if you actually want a list! or else you'll get the iterable object. 
```python
d = {'Jeffrey': 20, 'Geoff': 23, 'Claudia': 57}
print(d.keys())
print(d.values())
```
Output:
```python
dict_keys(['Jeffrey', 'Geoff', 'Claudia'])
dict_values([20, 23, 57])
```
With that said, that isn't exactly a problem if you want to iterate over the dictionary. Heres a basic dictionary iteration.
```python
d = {'Jeffrey': 20, 'Geoff': 23, 'Claudia': 57}
for k in d:
    print(k)
```
Output:
```python
Jeffrey
Geoff
Claudia
```

### enumerate()
When iterating through a list and you want access to both the index and it's value, you would do something like this:
```python
list = ["Claudia", "Geoff", "Zoe", "Jeffrey", "Daphne"]
for i in range(len(list)):
    print(f'TM{i + 1} --> {list[i]})
```
Gross, it is neither pretty or readable, and is much slower. Instead, do this:
```python
list = ["Claudia", "Geoff", "Zoe", "Jeffrey", "Daphne"]
for i, value in enumerate(list, 1):
    print(f'TM{i} --> {value}')
```
Output:
```python
TM1 --> Claudia
TM2 --> Geoff
TM3 --> Zoe
TM4 --> Jeffrey
TM5 --> Daphne
```
Both are outputs are the same, but as you can see it is far more readable and beautiful. You can almost treat `enumerate()` as though we are directly accessing the values through their 'keys'; and in the case of lists their indexes. In fact, a list is really an ordered dictionary where all the indices are the 'keys' of their associated values. Also, no more of that `i + 1` shit, `enumerate()` will let you choose the starting index, while maintaining the integrity of your list traversal as you are accessing the iterable's value directly instead of by index; therefore no IndexOutOfBounds errors. 
So you can actually replace the second argument to `enumerate()` with any integer and will set that as the initial value of `i`. With that said, if it is left empty it will default to `0`:
```python
list = ["Claudia", "Geoff", "Zoe", "Jeffrey", "Daphne"]
for i, value in enumerate(list):
    print(f'TM{i} --> {value}')
```
Output:
```python
TM0 --> Claudia
TM1 --> Geoff
TM2 --> Zoe
TM3 --> Jeffrey
TM4 --> Daphne
```

















