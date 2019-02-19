import json
from datetime import datetime
from sorting_n_normalisation import order_sort, normalise


# Handy helper function
def if_not_in(element, per_dict, n=1):
    if element in per_dict:
        c = per_dict.get(element)
        per_dict.update({element: c + n})
    else:
        per_dict.update({element: n})
    return per_dict


usersDict = {}


class User():
    def __init__(self, id):
        self.id = id
        self.perHourDict = {}
        for x in range(24):
            if x < 10:
                self.perHourDict.update({"0" + str(x) + ":00": 0})
            else:
                self.perHourDict.update({str(x) + ":00": 0})

        self.firstMessage = 0
        self.lastMessage = 0
        self.mostActiveChannel = {}
        self.history = {}
        self.messagesCount = 1
        self.wordsCount = 0
        self.mostUsedWord = {}
        self.mentioned = 0

    def serialize(self, channelsDict):
        self.mostActiveChannel = normalise(
            channelsDict, self.mostActiveChannel)

        final = {
            "id": self.id,
            "firstMessage": datetime.utcfromtimestamp(self.firstMessage).strftime('%Y-%m-%d %H:%M:%S UTC'),
            "lastMessage": datetime.utcfromtimestamp(self.lastMessage).strftime('%Y-%m-%d %H:%M:%S UTC'),
            "messagesCount": self.messagesCount - 1,
            "wordsCount": self.wordsCount,
            "words_per_message_ratio": round(self.wordsCount/self.messagesCount, 2),
            "mostActiveChannel": order_sort(self.mostActiveChannel, 1),
            "mostUsedWord": order_sort(self.mostUsedWord, 3),
            "mentioned": self.mentioned,
            "history": order_sort(self.history, 1)
        }
        return final


def create(UserIndexDict, nicknameDict):
    for key in UserIndexDict.keys():
        for id, nick in nicknameDict.items():
            if nick == UserIndexDict.get(key):
                usersDict[key] = User(id)


def firstMessage(u, time):
    user = usersDict.get(u)
    if user.firstMessage == 0:
        user.firstMessage = time
    elif time < user.firstMessage:
        user.firstMessage = time


def lastMessage(u, time):
    user = usersDict.get(u)
    if time > user.lastMessage:
        user.lastMessage = time


def perHour(u, time_formated_hour):
    user = usersDict.get(u)
    i = int(user.perHourDict.get(time_formated_hour + ":00")) + 1
    user.perHourDict.update({time_formated_hour + ":00": i})


def mostActiveChannel(u, channel):
    user = usersDict.get(u)
    user.mostActiveChannel = if_not_in(channel, user.mostActiveChannel)


def history(u, time_formated_date):
    user = usersDict.get(u)
    user.history = if_not_in(time_formated_date, user.history)


def messagesCount(u):
    user = usersDict.get(u)
    user.messagesCount += 1


def wordsCount(u, words):
    user = usersDict.get(u)
    user.wordsCount += words


def mostUsedWord(u, words):
    user = usersDict.get(u)
    for word in words:
        if len(word) >= 4:
            user.mostUsedWord = if_not_in(word, user.mostUsedWord)


def mentioned(u):
    user = usersDict.get(u)
    user.mentioned += 1


def show(u, channelsDict):
    user = usersDict.get(u)
    return user.serialize(channelsDict)
