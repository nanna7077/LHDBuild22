import datetime

def myRandom() -> int:
    """Returns a single digit random number"""
    return str((int(datetime.datetime.now().timestamp()))^42)[-1]

print(myRandom())
