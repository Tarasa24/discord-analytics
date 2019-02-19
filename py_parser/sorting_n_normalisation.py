from datetime import datetime, timedelta


def normalise(KeyDict, second_dict):
    # replacing UserIndex or ID with string names
    newDict = {}
    indexes = KeyDict.keys()
    for index in indexes:
        key = KeyDict.get(index)
        value = second_dict.get(index)
        if value != None:
            newDict.update({key: value})
    return newDict


def order_sort(GivenDict, ran=None):
    sorted_d = sorted(GivenDict.items(), key=lambda x: x[1])
    sorted_d.reverse()

    if ran == None:
        ran = len(sorted_d)

    return sorted_d[:ran]


def history_sort(daysDict):
    sorted_d = sorted(daysDict.items(), key=lambda x: x[0])

    # Adding days with no messages
    start = datetime.strptime(sorted_d[0][0], '%Y-%m-%d')
    end = datetime.strptime(sorted_d[-1][0], '%Y-%m-%d')
    date_generated = [start + timedelta(days=x)
                      for x in range(0, (end-start).days)]

    for date in date_generated:
        if date.strftime("%Y-%m-%d") not in daysDict:
            daysDict.update({date.strftime("%Y-%m-%d"): 0})

    finalDict = {}
    for x in range(len(sorted_d)):
        key = sorted_d[x][0]
        value = sorted_d[x][1]

        finalDict.update({key: value})

    return finalDict
