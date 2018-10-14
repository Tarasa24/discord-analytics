import json
from pprint import pprint
import json
import datetime

with open('dht.txt', encoding="utf8") as f:
    data = json.load(f)

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
for i in range(len(data["meta"]["userindex"]) - 1):

    for ID in nicknameDict.keys():
        if data["meta"]["userindex"][i] == ID:
            nick = nicknameDict.get(ID)
            userindexDict.update({nick: i})      


# =========================================
# Number of messages, per user

# {'Tarasa24': 896}
messagesPerUserDict = {}
total_number_of_messages = 0
for name in userindexDict.keys():
    messagesPerUserDict.update({name: 0})

for channelIndex in channelsDict.keys():
    messageList = []
    for key in data["data"][channelIndex]:
        total_number_of_messages += 1
        messageList.append(key)

    for messageIndex in messageList:     
        for userID in userindexDict.keys():
            if data["data"][channelIndex][messageIndex]["u"] == userindexDict.get(userID):
                current_number = messagesPerUserDict.get(userID)
                messagesPerUserDict.update({userID: current_number + 1})

# =========================================
# Number of messages, per channel

# {'deprese': 427}
messagesPerChannelDict = {}
for name in channelsDict.values():
    messagesPerChannelDict.update({name: 0})

for channelID in channelsDict.keys():
    number_of_messages = len(data["data"][channelID])
    name = channelsDict.get(channelID)
    messagesPerChannelDict.update({name: number_of_messages})
# =========================================

# json making
with open("../data/discord-scrape.json", "w") as outfile:
    finaljson = {"messages_per_user": messagesPerUserDict, "messages_per_channel": messagesPerChannelDict}
    json.dump(finaljson, outfile)

now = datetime.datetime.now()
with open("../data/discord-scrape-historical.json") as file:
        old_json = json.load(file)    
        with open("../data/discord-scrape-historical.json", "w") as outfile:
            new_json = {now.strftime("%Y-%d-%m"): total_number_of_messages}
            old_json.update(new_json)
            json.dump(old_json, outfile)  

  

print("Json files have been successfully created/updated")
