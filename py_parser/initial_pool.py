from multiprocessing.pool import ThreadPool


def get_initial_pool(data):

    def users_loop(data):
        def get_nicknameDict(keys):
            "{'190921538646704128': 'Tarasa24'}"
            nicknameDict = {}
            for ID in keys:
                nickname = data[ID]["name"]
                nicknameDict.update({ID: nickname})
            return nicknameDict

        def get_number_of_users(keys):
            return len(keys)

        keys = data.keys()
        return (get_nicknameDict(keys), get_number_of_users(keys))

    def userindex_loop(data, nicknameDict):
        def get_userindexDict():
            "{'1: Tarasa24'}"
            userindexDict = {}
            for i in range(len(data)):
                for ID in nicknameDict.keys():
                    if data[i] == ID:
                        nick = nicknameDict.get(ID)
                        userindexDict.update({i: nick})
            return userindexDict

        return get_userindexDict()

    def servers_loop(data):
        def get_serverName():
            name = data[0]["name"]
            return name

        return get_serverName()

    def channels_loop(data):
        def get_channelsDict():
            "{'497110103225401344': 'general'}"
            channelsDict = {}
            for channelID in data.keys():
                channel_name = data[channelID]["name"]
                channelsDict.update({channelID: channel_name})
            return channelsDict
        return get_channelsDict()

    pool = ThreadPool()
    req_users_loop = pool.apply_async(users_loop, (data["users"],))
    req_servers_loop = pool.apply_async(servers_loop, (data["servers"],))
    req_channels_loop = pool.apply_async(channels_loop, (data["channels"],))

    users_loop_tuple = req_users_loop.get()

    nicknameDict = users_loop_tuple[0]
    number_of_users = users_loop_tuple[1]
    serverName = req_servers_loop.get()
    channelsDict = req_channels_loop.get()
    number_of_channels = len(channelsDict)
    userindexDict = userindex_loop(data["userindex"], nicknameDict)

    return (nicknameDict, userindexDict, number_of_users, serverName, channelsDict, number_of_channels)
