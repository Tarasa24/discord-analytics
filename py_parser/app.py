import json
from pprint import pprint
import json
from datetime import datetime
import re

with open('dht.txt', encoding="utf8") as infile:
    data = json.load(infile)

# Inital dict making

# {'190921538646704128': 'Tarasa24'}
nicknameDict = {}
for ID in data["meta"]["users"].keys():
    nickname = data["meta"]["users"][ID]["name"]
    nicknameDict.update({ID: nickname})

# {'497110103225401344': 'general'}
channelsDict = {}
for channelID in data["meta"]["channels"].keys():
    channel_name = data["meta"]["channels"][channelID]["name"]
    channelsDict.update({channelID: channel_name})

# {'Tarasa24': 1}
userindexDict = {}
for i in range(len(data["meta"]["userindex"])):

    for ID in nicknameDict.keys():
        if data["meta"]["userindex"][i] == ID:
            nick = nicknameDict.get(ID)
            userindexDict.update({nick: i})


def server_name ():
    name = data["meta"]["servers"][0]["name"]
    return name


def number_of_users(userindexDict):
    return len(userindexDict)


def number_of_channels(channelsDict):
    return len(channelsDict)


def messages_per_user (userindexDict, channelsDict):
    "{'Tarasa24': 896}"

    messagesPerUserDict = {}
    for name in userindexDict.keys():
        messagesPerUserDict.update({name: 0})
    
    for channelIndex in channelsDict.keys():
        messageList = []
        for key in data["data"][channelIndex]:
            messageList.append(key)
    
        for messageIndex in messageList:     
            for userID in userindexDict.keys():
                if data["data"][channelIndex][messageIndex]["u"] == userindexDict.get(userID):
                    current_number = messagesPerUserDict.get(userID)
                    messagesPerUserDict.update({userID: current_number + 1})

    return messagesPerUserDict


def messages_per_channel (channelsDict):
    "{'deprese': 427}"

    messagesPerChannelDict = {}
    for name in channelsDict.values():
        messagesPerChannelDict.update({name: 0})
    
    for channelID in channelsDict.keys():
        number_of_messages = len(data["data"][channelID])
        name = channelsDict.get(channelID)
        messagesPerChannelDict.update({name: number_of_messages})

    return messagesPerChannelDict


def word_frequency (channelsDict):
    ""

    wordList = []
    wordFreqDict = {}
    for channelIndex in channelsDict.keys():
        messageList = []
        for key in data["data"][channelIndex]:
            messageList.append(key)
    
        for messageIndex in messageList:     
            message = data["data"][channelIndex][messageIndex]["m"].lower()

            wordList.extend(re.sub("[^\w]", " ",  message).split())
    
    for word in wordList:
        if len(word) >= 4:
            if not word.isdigit():
                if word in wordFreqDict:
                    i = int(wordFreqDict.get(word)) + 1
                    wordFreqDict.update({word: i})
                else:
                    wordFreqDict.update({word: 1})
    
    sorted_d = sorted(wordFreqDict.items(), key=lambda x: x[1])
    sorted_d.reverse()

    finalDict = {}
    for x in range(0,49):
        key = sorted_d[x][0]
        value = sorted_d[x][1]

        finalDict.update({key: value})    
    
    return finalDict


def total_number_of_messages (channelsDict):
    "{'2018-18-10': 3229}"

    total_number_of_messages_count = 0
    
    for channelIndex in channelsDict.keys():
        messageList = []
        for key in data["data"][channelIndex]:
            total_number_of_messages_count += 1

    return total_number_of_messages_count


def history(channelsDict):
    daysDict = {}  
    for channelIndex in channelsDict.keys():
        messageList = []
        for key in data["data"][channelIndex]:
            messageList.append(key)

        for messageIndex in messageList:     
            
            time = int(data["data"][channelIndex][messageIndex]["t"] / 1000)
            time_formated = datetime.utcfromtimestamp(time).strftime('%Y-%m-%d')
            if time_formated in daysDict:
                i = int(daysDict.get(time_formated)) + 1
                daysDict.update({time_formated: i})
            else:
                daysDict.update({time_formated: 1})

    sorted_d = sorted(daysDict.items(), key=lambda x: x[0])


    finalDict = {}
    for x in range(len(sorted_d)):
        key = sorted_d[x][0]
        value = sorted_d[x][1]

        finalDict.update({key: value}) 

    return finalDict


def first_message(channelsDict):
    List = list(history(channelsDict).keys())
    return List[0]


# json making
with open("../data/discord-scrape.json", "w") as outfile:
    finaljson = {"head": 
    {"server_name": server_name(),
    "number_of_messages": total_number_of_messages(channelsDict),
    "number_of_users": number_of_users(userindexDict),
    "number_of_channels": number_of_channels(channelsDict),
    "first_message": first_message(channelsDict),
    "last_update": datetime.now().strftime("%Y-%m-%d %H:%M")},
    "data": 
    {"messages_per_user": messages_per_user(userindexDict, channelsDict), 
    "messages_per_channel": messages_per_channel(channelsDict),
    "word_frequency": word_frequency(channelsDict),
    "historical_data": history(channelsDict)}}
    json.dump(finaljson, outfile) 

print("Json files have been successfully created/updated")

