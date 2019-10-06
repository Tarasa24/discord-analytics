from datetime import datetime
import re
from sorting_n_normalisation import normalise, order_sort, history_sort
import user


def if_not_in(element, per_dict, n=1):
    if element in per_dict:
        c = per_dict.get(element)
        per_dict.update({element: c + n})
    else:
        per_dict.update({element: n})
    return per_dict


def get_messages_pool(data, nicknameDict, UserIndexDict, channelsDict):
    # init dicts
    messages_per_channel = {}
    total_message_count = 0
    messages_per_user = {}
    history = {}
    perHourDict = {}
    words_per_user = {}
    total_word_count = 0
    mentions_count = {}
    word_frequency = {}
    emotes_frequency = {}

    # hour prep
    for x in range(24):
        if x < 10:
            perHourDict.update({"0" + str(x) + ":00": 0})
        else:
            perHourDict.update({str(x) + ":00": 0})

    # users prep
    user.create(UserIndexDict, nicknameDict)

    # looping
    for channel in data:
        for message in data[channel]:

            messages_per_channel = if_not_in(channel, messages_per_channel)
            total_message_count += 1

            # Read "u"
            u = data[channel][message]["u"]

            messages_per_user = if_not_in(u, messages_per_user)

            # Read "t"
            # History
            time = int(data[channel][message]["t"] / 1000)
            time_formated_date = datetime.utcfromtimestamp(
                time).strftime('%Y-%m-%d')
            history = if_not_in(time_formated_date, history)
            # PerHour
            time_formated_hour = datetime.utcfromtimestamp(time).strftime('%H')
            i = int(perHourDict.get(time_formated_hour + ":00")) + 1
            perHourDict.update({time_formated_hour + ":00": i})

            # Read "m"
            content = data[channel][message]["m"]
            # words_per_user
            words = content.split(" ")
            words_per_user = if_not_in(u, words_per_user, len(words))
            # total_words
            total_word_count += len(words)
            # word frequency
            for word in words:
                word = word.lower()
                if len(word) >= 4 and word[:2] != "<@":
                    if word[:2] == "<:" and word[-1] == ">":
                        emotes_frequency = if_not_in(word, emotes_frequency)
                    else:
                        word_frequency = if_not_in(re.sub(r'[^\w]', '', word), word_frequency)
            # mentions
            if "@everyone" in content:
                mentions_count = if_not_in("@everyone", mentions_count)
            elif "@" in content:
                for mention in re.findall(r"[0-9]+", content):
                    nick = "@" + str(nicknameDict.get(mention))
                    if nick != "@None":
                        mentions_count = if_not_in(nick, mentions_count)
                        user.mentioned(list(UserIndexDict.values()).index(
                            str(nicknameDict.get(mention))))

            # Read "a"
            if "a" in data[channel][message].keys():
                files = data[channel][message]["a"]
                for f in files:
                    user.images(u, int(data[channel][message]["t"]), f["url"])

            # user class
            user.mostActiveChannel(u, channel)
            user.firstMessage(u, time)
            user.lastMessage(u, time)
            user.history(u, time_formated_date)
            user.perHour(u, time_formated_hour)
            user.messagesCount(u)
            user.wordsCount(u, len(words))
            user.mostUsedWord(u, words)

    # Normalisation
    messages_per_user = normalise(UserIndexDict, messages_per_user)
    words_per_user = normalise(UserIndexDict, words_per_user)
    messages_per_channel = normalise(channelsDict, messages_per_channel)

    # Sorting
    history = history_sort(history)
    messages_per_channel = order_sort(messages_per_channel, 50)
    messages_per_user = order_sort(messages_per_user, 50)
    words_per_user = order_sort(words_per_user, 50)
    mentions_count = order_sort(mentions_count, 50)
    word_frequency = order_sort(word_frequency, 50)
    emotes_frequency = order_sort(emotes_frequency, 10)

    # Users finalisation
    users = {}
    for i in UserIndexDict.keys():
        users.update({UserIndexDict.get(i): user.show(i, channelsDict)})

    return (total_message_count, total_word_count, messages_per_channel, messages_per_user, words_per_user, mentions_count, history, perHourDict, word_frequency, users, emotes_frequency)
