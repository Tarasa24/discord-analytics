import json
import time
import sys
from initial_pool import get_initial_pool
from messages_pool import get_messages_pool

# Start time tracker
start = time.time()

# Reading file given in last argument
print(sys.argv[1])
with open(sys.argv[1], encoding="utf8") as infile:
    data = json.load(infile)

# Data unwrapping
initial_pool = get_initial_pool(data["meta"])
nicknameDict = initial_pool[0]
userIndexDict = initial_pool[1]
number_of_users = initial_pool[2]
server_name = initial_pool[3]
channelsDict = initial_pool[4]
number_of_channels = initial_pool[5]

messages_pool = get_messages_pool(data["data"], nicknameDict, userIndexDict, channelsDict)
number_of_messages = messages_pool[0]
total_word_count = messages_pool[1]
messages_per_channel = messages_pool[2]
messages_per_user = messages_pool[3]
words_per_user = messages_pool[4]
mentions_count = messages_pool[5]
history = messages_pool[6]
perHourDict = messages_pool[7]
word_frequency = messages_pool[8]
users = messages_pool[9]
emotes_frequency = messages_pool[10]

word_message_ratio = round(total_word_count / number_of_messages, 2)

path_server_name = server_name.replace("/", "_").replace("\\", "_").replace(" ", "-")

path = "../webserver/discord-analytics-frontend/website/data/discord-scrape_" + path_server_name + ".json"
with open(path, "w") as outfile:
    finaljson = {
        "head":
                {
                    "server_name": server_name,
                    "number_of_messages": number_of_messages,
                    "number_of_words": total_word_count,
                    "words_per_message_ratio": word_message_ratio,
                    "number_of_users": number_of_users,
                    "number_of_channels": number_of_channels,
                    "first_message": list(history.keys())[0],
                    "last_message": list(history.keys())[-1]
                },
        "body":
        {
                    "messages_per_user": messages_per_user,
                    "messages_per_channel": messages_per_channel,
                    "words_per_user": words_per_user,
                    "word_frequency": word_frequency,
                    "historical_data": history,
                    "messages_per_hour": perHourDict,
                    "number_of_mentions": mentions_count
                },
        "users": users,
        "test": emotes_frequency
    }
    json.dump(finaljson, outfile)

end = time.time()
end_msg = "Json file have been successfully created/updated in " \
    "{} s".format(round((end - start), 2))
print(end_msg)
