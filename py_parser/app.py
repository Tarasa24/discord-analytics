import json
from pprint import pprint
from datetime import datetime, timedelta, date
import re
import sys
from multiprocessing.pool import ThreadPool
import time


start = time.time()

print(sys.argv[-1])
with open(sys.argv[-1], encoding="utf8") as infile:
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

# {'1: Tarasa24'}
userindexDict = {}
for i in range(len(data["meta"]["userindex"])):

    for ID in nicknameDict.keys():
        if data["meta"]["userindex"][i] == ID:
            nick = nicknameDict.get(ID)
            userindexDict.update({i: nick})


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
    for channelIndex in channelsDict.keys():
        messageList = []
        try:
            for key in data["data"][channelIndex]:
                messageList.append(key)
        except Exception as e:
            pass
                      
        for messageIndex in messageList:     
            user = userindexDict.get(data["data"][channelIndex][messageIndex]["u"])
            if user in messagesPerUserDict:
                current_number = messagesPerUserDict.get(user)
                messagesPerUserDict.update({user: current_number + 1})
            else:
                messagesPerUserDict.update({user: 0})

    sorted_d = sorted(messagesPerUserDict.items(), key=lambda x: x[1])
    sorted_d.reverse()

    finalDict = {}
    for x in range(0,49):
        try:
            key = sorted_d[x][0]
            value = sorted_d[x][1]
        except Exception as e:
            pass
        finalDict.update({key: value})

    return finalDict


def messages_per_channel (channelsDict):
    "{'deprese': 427}"

    messagesPerChannelDict = {}
    for name in channelsDict.values():
        messagesPerChannelDict.update({name: 0})
    

    for channelID in channelsDict.keys():
        try:
            number_of_messages = len(data["data"][channelID])
            name = channelsDict.get(channelID)
            messagesPerChannelDict.update({name: number_of_messages})
        except Exception as e:
            pass

    sorted_d = sorted(messagesPerChannelDict.items(), key=lambda x: x[1])
    sorted_d.reverse()

    finalDict = {}
    for x in range(0,49):
        try:
            key = sorted_d[x][0]
            value = sorted_d[x][1]
        except Exception as e:
            pass
        finalDict.update({key: value})

    return finalDict


def word_frequency (channelsDict):
    ""

    wordList = []
    wordFreqDict = {}
    for channelIndex in channelsDict.keys():
        messageList = []
        try:
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
        except Exception as e:
            pass
    
    sorted_d = sorted(wordFreqDict.items(), key=lambda x: x[1])
    sorted_d.reverse()

    finalDict = {}
    for x in range(0,49):
        key = sorted_d[x][0]
        value = sorted_d[x][1]

        finalDict.update({key: value})
    
    return finalDict


def total_number_of_messages (channelsDict):

    total_number_of_messages_count = 0
    
    for channelIndex in channelsDict.keys():
        messageList = []
        try:
            for key in data["data"][channelIndex]:
                total_number_of_messages_count += 1
        except Exception as e:
            pass
        

    return total_number_of_messages_count


def history(channelsDict):
    daysDict = {}  
    for channelIndex in channelsDict.keys():
        messageList = []
        try:
            for key in data["data"][channelIndex]:
                messageList.append(key)
        except Exception as e:
            pass
        for messageIndex in messageList:     
            
            time = int(data["data"][channelIndex][messageIndex]["t"] / 1000)
            time_formated = datetime.utcfromtimestamp(time).strftime('%Y-%m-%d')
            if time_formated in daysDict:
                i = int(daysDict.get(time_formated)) + 1
                daysDict.update({time_formated: i})
            else:
                daysDict.update({time_formated: 1})

    sorted_d = sorted(daysDict.items(), key=lambda x: x[0])

    # Adding days with no messages
    start = datetime.strptime(sorted_d[0][0], '%Y-%m-%d')
    end = datetime.strptime(sorted_d[-1][0], '%Y-%m-%d')
    date_generated = [start + timedelta(days=x) for x in range(0, (end-start).days)]
    
    for date in date_generated:
        if date.strftime("%Y-%m-%d") not in daysDict:
            daysDict.update({date.strftime("%Y-%m-%d"): 0})

    sorted_d = sorted(daysDict.items(), key=lambda x: x[0])

    finalDict = {}
    for x in range(len(sorted_d)):
        key = sorted_d[x][0]
        value = sorted_d[x][1]

        finalDict.update({key: value})

    return finalDict


def first_and_last_message(history):
    List = list(history.keys())
    return (List[0], List[-1])


def messages_per_hour (channelsDict):
    perHourDict = {}

    for x in range(24):
        if x < 10:
            perHourDict.update({"0" + str(x) + ":00": 0})
        else:
            perHourDict.update({str(x) + ":00": 0})

    for channelIndex in channelsDict.keys():
        messageList = []
        try:
            for key in data["data"][channelIndex]:
                messageList.append(key)
        except Exception as e:
            pass
        for messageIndex in messageList:     
            
            time = int(data["data"][channelIndex][messageIndex]["t"] / 1000)
            time_formated = datetime.utcfromtimestamp(time).strftime('%H')

            i = int(perHourDict.get(time_formated + ":00")) + 1
            perHourDict.update({time_formated + ":00": i})

    return perHourDict

# multi threading
pool = ThreadPool()

messages_per_user_res = pool.apply_async(messages_per_user, (userindexDict, channelsDict,))
time.sleep(5/1000)
messages_per_channel_res = pool.apply_async(messages_per_channel, (channelsDict,))
time.sleep(5/1000)
word_frequency_res = pool.apply_async(word_frequency, (channelsDict,))
time.sleep(5/1000)
history_res = pool.apply_async(history, (channelsDict,))
time.sleep(5/1000)
messages_per_hour_res = pool.apply_async(messages_per_hour, (channelsDict,))
time.sleep(5/1000)

# json making
with open("../data/discord-scrape_" + server_name().replace(" ", "-") + ".json", "w") as outfile:
    finaljson = {"head": 
    {"server_name": server_name(),
    "number_of_messages": total_number_of_messages(channelsDict),
    "number_of_users": number_of_users(userindexDict),
    "number_of_channels": number_of_channels(channelsDict),
    "first_message": first_and_last_message(history_res.get())[0],
    "last_message": first_and_last_message(history_res.get())[-1],
    "last_update": datetime.now().strftime("%Y-%m-%d %H:%M")},
    "data": 
    {"messages_per_user": messages_per_user_res.get(), 
    "messages_per_channel": messages_per_channel_res.get(),
    "word_frequency": word_frequency_res.get(),
    "historical_data": history_res.get(),
    "messages_per_hour": messages_per_hour_res.get()}
    }
    json.dump(finaljson, outfile) 


end = time.time()
print("Json files have been successfully created/updated in {} s".format(end - start))

