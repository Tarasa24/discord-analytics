function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

var decodeHTML = function(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

function get_scrapelist() {
    var filePath = 'https://allorigins.me/get?url=' + encodeURIComponent('https://github.com/Tarasa24/discord-analytics/tree/master/data')
    var html = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        html = xmlhttp.responseText;
    }
    html = JSON.parse(html)

    scrapeList = []
    var index = 0
    while (true) {
        var correction = 'title=\\"discord-scrape_'.length - 1
        index = html.contents.indexOf('title="discord-scrape_', index) + correction
        var index2 = html.contents.indexOf('.json', index)
        var result = decodeHTML(html.contents.substring(index, index2).split('-').join(' '));

        if (scrapeList.indexOf(result) > -1) {
            break
        } else if (result.indexOf("<") > -1) {
            break
        } else {
            scrapeList.push(result)
        }
    }

    console.log(scrapeList)
    return scrapeList
}


var scrapeList = get_scrapelist()
var select = document.getElementById("select")

url = decodeURI(window.location)
index = url.indexOf('s=')
SelectItem = url.substr(index + 2)
console.log(SelectItem)

if (index == -1) {
    for (var i = 0; i < scrapeList.length; i++) {
        select.innerHTML += "<option>" + scrapeList[i] + "</option>"
    }

    var discord_scrape = loadFile("https://raw.githubusercontent.com/Tarasa24/discord-analytics/master/data/discord-scrape_" + scrapeList[0].split(' ').join('-') + ".json");
    var discord_data = JSON.parse(discord_scrape);
} else {
    select.innerHTML = "<option>" + SelectItem + "</option>"
    document.title = 'Discord Analytics - ' + SelectItem;
    for (var i = 0; i < scrapeList.length; i++) {
        if (SelectItem != scrapeList[i]) {
            select.innerHTML += "<option>" + scrapeList[i] + "</option>"
        }
        var discord_scrape = loadFile("https://raw.githubusercontent.com/Tarasa24/discord-analytics/master/data/discord-scrape_" + SelectItem.split(' ').join('-') + ".json");
        var discord_data = JSON.parse(discord_scrape);
    }
}

// For testing purposses
/*
if (true){
  var discord_data = {"head": {"server_name": "\ud83d\uddfd citymanlive", "number_of_messages": 101570, "number_of_users": 826, "number_of_channels": 24, "first_message": "2016-06-08", "last_message": "2018-10-20", "last_update": "2018-10-25 20:48"}, "data": {"messages_per_user": {"Rafko": 13515, "AvatarGames": 11075, "kubo009": 8574, "CityMan": 5527, "Xtroisko": 4819, "robazcz \ud83d\udc7b\ud83d\udd77\ud83c\udf83": 4788, "wooderCZ": 4518, "MartinNemi03": 3944, "Hani": 3875, "Dificator": 3123, "LurkCZE": 2796, "Liisha": 2696, "Rythm": 2399, "CrazzyCatt": 2184, "DaPo \ud83c\udf83": 2119, "Prcek203": 1708, "\ud83c\udd71olcanic\ud83c\udd71oom": 1339, "Low pc": 1295, "Lokmon11": 1264, "LeHydrak": 1231, "polarkac": 1225, "Fira": 1136, "Bleader": 1095, "Night_Fury_CZ \"Cheery Berserker\"": 1034, "LukasBonni": 842, "Woodlander \u2694": 816, "Garb": 623, "Altisek": 615, "Myslik22": 612, "Medo": 565, "alexysz": 472, "NomisCode": 449, "Ketchupnik": 430, "frozetka": 425, "Lovec51cz": 349, "\ud83d\udc49Tot\u00e1ln\u011b ne Kupra\ud83d\udc48": 348, "Star_Hunter": 339, "otrozon": 320, "HadrDisk": 285, "TypicalBot": 274, "Kvetka\ud83d\udc51": 270, "Whisperer_": 225, "MatejGame": 219, "Sodar": 211, "ArcadeBulls": 198, "vordis": 180, "christian0012": 169, "Jakubman625": 166, "heltkova.k": 162}, "messages_per_channel": {"n\u00e1m\u011bst\u00ed": 81228, "radio": 5328, "minecraft": 2487, "clips": 2044, "restaurace": 1510, "hahaha": 1418, "sd\u00edlej": 1410, "\u017eiv\u011b": 978, "boti": 966, "technology": 783, "ets": 772, "po\u010das\u00ed": 690, "ozn\u00e1men\u00ed": 454, "buduj": 413, "hudba": 356, "fb-posty": 344, "citymeme": 179, "klikej": 121, "ud\u00e1losti": 39, "citydev": 33, "hobby": 10, "v\u00edtejte": 4, "spolupr\u00e1ce": 2, "role": 1}, "word_frequency": {"https": 98509, "kappa": 93657, "jsem": 87767, "keepo": 65046, "r\u00e1no": 63481, "twitch": 62316, "dobr\u00e9": 54935, "citylul": 47684, "minglee": 40746, "bude": 35902, "kdy\u017e": 33248, "taky": 30862, "je\u0161t\u011b": 27570, "nebo": 27012, "pogchamp": 26875, "clips": 26690, "jako": 26425, "citymanlive": 24607, "kappavote": 23915, "bych": 22315, "nen\u00ed": 21947, "toho": 21508, "kreygasm": 20901, "tak\u017ee": 20687, "cityhmm": 19952, "wutface": 19934, "dnes": 18894, "live": 18166, "everyone": 18100, "here": 17792, "dneska": 17664, "tady": 17437, "city": 16860, "zase": 16507, "nessi": 16316, "n\u011bco": 16308, "stream": 15443, "jsou": 14610, "n\u011bkdo": 14372, "dansgame": 13608, "failfish": 12668, "dobre": 12462, "opieop": 11757, "pro\u010d": 11731, "bylo": 11473, "youtube": 11437, "dobr\u00fd": 11380, "doma": 11339, "budu": 11303}, "historical_data": {"2016-06-08": 226, "2016-06-09": 137, "2016-06-10": 49, "2016-06-11": 36, "2016-06-12": 65, "2016-06-13": 16, "2016-06-14": 36, "2016-06-15": 96, "2016-06-16": 62, "2016-06-17": 23, "2016-06-18": 324, "2016-06-19": 43, "2016-06-20": 106, "2016-06-21": 40, "2016-06-22": 141, "2016-06-23": 437, "2016-06-24": 342, "2016-06-25": 116, "2016-06-26": 47, "2016-06-27": 51, "2016-06-28": 58, "2016-06-29": 80, "2016-06-30": 332, "2016-07-01": 270, "2016-07-02": 343, "2016-07-03": 189, "2016-07-04": 274, "2016-07-05": 103, "2016-07-06": 99, "2016-07-07": 103, "2016-07-08": 63, "2016-07-09": 112, "2016-07-10": 195, "2016-07-11": 259, "2016-07-12": 98, "2016-07-13": 65, "2016-07-14": 222, "2016-07-15": 42, "2016-07-16": 163, "2016-07-17": 82, "2016-07-18": 34, "2016-07-19": 46, "2016-07-20": 457, "2016-07-21": 478, "2016-07-22": 71, "2016-07-23": 59, "2016-07-24": 234, "2016-07-25": 158, "2016-07-26": 164, "2016-07-27": 104, "2016-07-28": 173, "2016-07-29": 56, "2016-07-30": 55, "2016-07-31": 35, "2016-08-01": 14, "2016-08-02": 32, "2016-08-03": 28, "2016-08-04": 43, "2016-08-05": 23, "2016-08-06": 42, "2016-08-07": 23, "2016-08-08": 52, "2016-08-09": 28, "2016-08-10": 36, "2016-08-11": 28, "2016-08-12": 130, "2016-08-13": 26, "2016-08-14": 147, "2016-08-15": 99, "2016-08-16": 18, "2016-08-17": 143, "2016-08-18": 268, "2016-08-19": 41, "2016-08-20": 54, "2016-08-21": 18, "2016-08-22": 49, "2016-08-23": 97, "2016-08-24": 25, "2016-08-25": 44, "2016-08-26": 171, "2016-08-27": 133, "2016-08-28": 112, "2016-08-29": 121, "2016-08-30": 86, "2016-08-31": 105, "2016-09-01": 164, "2016-09-02": 50, "2016-09-03": 83, "2016-09-04": 42, "2016-09-05": 52, "2016-09-06": 38, "2016-09-07": 36, "2016-09-08": 96, "2016-09-09": 349, "2016-09-10": 107, "2016-09-11": 20, "2016-09-12": 78, "2016-09-13": 189, "2016-09-14": 180, "2016-09-15": 255, "2016-09-16": 156, "2016-09-17": 156, "2016-09-18": 79, "2016-09-19": 82, "2016-09-20": 68, "2016-09-21": 32, "2016-09-22": 50, "2016-09-23": 32, "2016-09-24": 105, "2016-09-25": 20, "2016-09-26": 43, "2016-09-27": 42, "2016-09-28": 107, "2016-09-29": 224, "2016-09-30": 44, "2016-10-01": 21, "2016-10-02": 48, "2016-10-03": 74, "2016-10-04": 65, "2016-10-05": 115, "2016-10-06": 19, "2016-10-07": 43, "2016-10-08": 43, "2016-10-09": 23, "2016-10-10": 36, "2016-10-11": 42, "2016-10-12": 27, "2016-10-13": 27, "2016-10-14": 38, "2016-10-15": 51, "2016-10-16": 25, "2016-10-17": 50, "2016-10-18": 180, "2016-10-19": 107, "2016-10-20": 61, "2016-10-21": 106, "2016-10-22": 27, "2016-10-23": 34, "2016-10-24": 25, "2016-10-25": 86, "2016-10-26": 26, "2016-10-27": 40, "2016-10-28": 21, "2016-10-29": 57, "2016-10-30": 23, "2016-10-31": 384, "2016-11-01": 55, "2016-11-02": 129, "2016-11-03": 36, "2016-11-04": 20, "2016-11-05": 107, "2016-11-06": 70, "2016-11-07": 53, "2016-11-08": 55, "2016-11-09": 113, "2016-11-10": 65, "2016-11-11": 45, "2016-11-12": 24, "2016-11-13": 94, "2016-11-14": 39, "2016-11-15": 21, "2016-11-16": 62, "2016-11-17": 56, "2016-11-18": 37, "2016-11-19": 42, "2016-11-20": 54, "2016-11-21": 70, "2016-11-22": 54, "2016-11-23": 40, "2016-11-24": 104, "2016-11-25": 164, "2016-11-26": 91, "2016-11-27": 42, "2016-11-28": 32, "2016-11-29": 34, "2016-11-30": 62, "2016-12-01": 50, "2016-12-02": 119, "2016-12-03": 80, "2016-12-04": 17, "2016-12-05": 56, "2016-12-06": 18, "2016-12-07": 67, "2016-12-08": 45, "2016-12-09": 99, "2016-12-10": 78, "2016-12-11": 57, "2016-12-12": 28, "2016-12-13": 20, "2016-12-14": 15, "2016-12-15": 43, "2016-12-16": 60, "2016-12-17": 19, "2016-12-18": 240, "2016-12-19": 36, "2016-12-20": 153, "2016-12-21": 185, "2016-12-22": 78, "2016-12-23": 62, "2016-12-24": 87, "2016-12-25": 36, "2016-12-26": 32, "2016-12-27": 55, "2016-12-28": 28, "2016-12-29": 39, "2016-12-30": 49, "2016-12-31": 85, "2017-01-01": 100, "2017-01-02": 69, "2017-01-03": 74, "2017-01-04": 27, "2017-01-05": 125, "2017-01-06": 50, "2017-01-07": 18, "2017-01-08": 37, "2017-01-09": 23, "2017-01-10": 24, "2017-01-11": 94, "2017-01-12": 78, "2017-01-13": 65, "2017-01-14": 28, "2017-01-15": 21, "2017-01-16": 38, "2017-01-17": 28, "2017-01-18": 159, "2017-01-19": 57, "2017-01-20": 57, "2017-01-21": 60, "2017-01-22": 135, "2017-01-23": 97, "2017-01-24": 37, "2017-01-25": 29, "2017-01-26": 30, "2017-01-27": 169, "2017-01-28": 67, "2017-01-29": 25, "2017-01-30": 70, "2017-01-31": 69, "2017-02-01": 77, "2017-02-02": 49, "2017-02-03": 173, "2017-02-04": 50, "2017-02-05": 35, "2017-02-06": 49, "2017-02-07": 67, "2017-02-08": 29, "2017-02-09": 132, "2017-02-10": 116, "2017-02-11": 35, "2017-02-12": 169, "2017-02-13": 177, "2017-02-14": 95, "2017-02-15": 46, "2017-02-16": 130, "2017-02-17": 99, "2017-02-18": 88, "2017-02-19": 126, "2017-02-20": 72, "2017-02-21": 58, "2017-02-22": 160, "2017-02-23": 50, "2017-02-24": 54, "2017-02-25": 81, "2017-02-26": 521, "2017-02-27": 171, "2017-02-28": 62, "2017-03-01": 64, "2017-03-02": 46, "2017-03-03": 155, "2017-03-04": 39, "2017-03-05": 148, "2017-03-06": 81, "2017-03-07": 54, "2017-03-08": 147, "2017-03-09": 60, "2017-03-10": 107, "2017-03-11": 116, "2017-03-12": 210, "2017-03-13": 79, "2017-03-14": 100, "2017-03-15": 123, "2017-03-16": 291, "2017-03-17": 114, "2017-03-18": 50, "2017-03-19": 104, "2017-03-20": 55, "2017-03-21": 43, "2017-03-22": 76, "2017-03-23": 94, "2017-03-24": 101, "2017-03-25": 269, "2017-03-26": 113, "2017-03-27": 36, "2017-03-28": 33, "2017-03-29": 131, "2017-03-30": 215, "2017-03-31": 76, "2017-04-01": 229, "2017-04-02": 65, "2017-04-03": 63, "2017-04-04": 136, "2017-04-05": 167, "2017-04-06": 120, "2017-04-07": 481, "2017-04-08": 159, "2017-04-09": 113, "2017-04-10": 158, "2017-04-11": 204, "2017-04-12": 78, "2017-04-13": 63, "2017-04-14": 166, "2017-04-15": 82, "2017-04-16": 122, "2017-04-17": 469, "2017-04-18": 81, "2017-04-19": 308, "2017-04-20": 284, "2017-04-21": 315, "2017-04-22": 86, "2017-04-23": 131, "2017-04-24": 251, "2017-04-25": 107, "2017-04-26": 77, "2017-04-27": 84, "2017-04-28": 182, "2017-04-29": 152, "2017-04-30": 275, "2017-05-01": 232, "2017-05-02": 127, "2017-05-03": 160, "2017-05-04": 42, "2017-05-05": 352, "2017-05-06": 888, "2017-05-07": 260, "2017-05-08": 265, "2017-05-09": 127, "2017-05-10": 98, "2017-05-11": 69, "2017-05-12": 482, "2017-05-13": 86, "2017-05-14": 110, "2017-05-15": 133, "2017-05-16": 330, "2017-05-17": 379, "2017-05-18": 113, "2017-05-19": 95, "2017-05-20": 81, "2017-05-21": 118, "2017-05-22": 195, "2017-05-23": 57, "2017-05-24": 51, "2017-05-25": 96, "2017-05-26": 51, "2017-05-27": 89, "2017-05-28": 78, "2017-05-29": 27, "2017-05-30": 20, "2017-05-31": 29, "2017-06-01": 120, "2017-06-02": 110, "2017-06-03": 56, "2017-06-04": 44, "2017-06-05": 207, "2017-06-06": 195, "2017-06-07": 16, "2017-06-08": 100, "2017-06-09": 102, "2017-06-10": 37, "2017-06-11": 107, "2017-06-12": 31, "2017-06-13": 25, "2017-06-14": 43, "2017-06-15": 42, "2017-06-16": 43, "2017-06-17": 51, "2017-06-18": 68, "2017-06-19": 65, "2017-06-20": 67, "2017-06-21": 110, "2017-06-22": 125, "2017-06-23": 131, "2017-06-24": 102, "2017-06-25": 65, "2017-06-26": 82, "2017-06-27": 63, "2017-06-28": 101, "2017-06-29": 178, "2017-06-30": 384, "2017-07-01": 56, "2017-07-02": 115, "2017-07-03": 26, "2017-07-04": 46, "2017-07-05": 41, "2017-07-06": 39, "2017-07-07": 79, "2017-07-08": 32, "2017-07-09": 91, "2017-07-10": 29, "2017-07-11": 39, "2017-07-12": 77, "2017-07-13": 78, "2017-07-14": 35, "2017-07-15": 86, "2017-07-16": 56, "2017-07-17": 79, "2017-07-18": 116, "2017-07-19": 43, "2017-07-20": 76, "2017-07-21": 92, "2017-07-22": 29, "2017-07-23": 63, "2017-07-24": 54, "2017-07-25": 54, "2017-07-26": 173, "2017-07-27": 100, "2017-07-28": 181, "2017-07-29": 298, "2017-07-30": 97, "2017-07-31": 132, "2017-08-01": 110, "2017-08-02": 214, "2017-08-03": 251, "2017-08-04": 194, "2017-08-05": 122, "2017-08-06": 90, "2017-08-07": 68, "2017-08-08": 61, "2017-08-09": 47, "2017-08-10": 123, "2017-08-11": 301, "2017-08-12": 35, "2017-08-13": 2630, "2017-08-14": 975, "2017-08-15": 116, "2017-08-16": 233, "2017-08-17": 404, "2017-08-18": 81, "2017-08-19": 83, "2017-08-20": 73, "2017-08-21": 96, "2017-08-22": 79, "2017-08-23": 178, "2017-08-24": 157, "2017-08-25": 119, "2017-08-26": 39, "2017-08-27": 146, "2017-08-28": 101, "2017-08-29": 209, "2017-08-30": 148, "2017-08-31": 504, "2017-09-01": 62, "2017-09-02": 174, "2017-09-03": 388, "2017-09-04": 257, "2017-09-05": 66, "2017-09-06": 68, "2017-09-07": 58, "2017-09-08": 33, "2017-09-09": 103, "2017-09-10": 144, "2017-09-11": 156, "2017-09-12": 46, "2017-09-13": 217, "2017-09-14": 144, "2017-09-15": 88, "2017-09-16": 105, "2017-09-17": 57, "2017-09-18": 77, "2017-09-19": 301, "2017-09-20": 95, "2017-09-21": 155, "2017-09-22": 95, "2017-09-23": 62, "2017-09-24": 85, "2017-09-25": 88, "2017-09-26": 82, "2017-09-27": 69, "2017-09-28": 218, "2017-09-29": 56, "2017-09-30": 44, "2017-10-01": 99, "2017-10-02": 236, "2017-10-03": 67, "2017-10-04": 109, "2017-10-05": 73, "2017-10-06": 150, "2017-10-07": 44, "2017-10-08": 68, "2017-10-09": 98, "2017-10-10": 146, "2017-10-11": 44, "2017-10-12": 70, "2017-10-13": 83, "2017-10-14": 79, "2017-10-15": 88, "2017-10-16": 54, "2017-10-17": 28, "2017-10-18": 25, "2017-10-19": 84, "2017-10-20": 58, "2017-10-21": 97, "2017-10-22": 32, "2017-10-23": 70, "2017-10-24": 25, "2017-10-25": 25, "2017-10-26": 64, "2017-10-27": 49, "2017-10-28": 83, "2017-10-29": 132, "2017-10-30": 162, "2017-10-31": 51, "2017-11-01": 268, "2017-11-02": 113, "2017-11-03": 79, "2017-11-04": 91, "2017-11-05": 97, "2017-11-06": 92, "2017-11-07": 106, "2017-11-08": 97, "2017-11-09": 83, "2017-11-10": 128, "2017-11-11": 57, "2017-11-12": 54, "2017-11-13": 47, "2017-11-14": 63, "2017-11-15": 131, "2017-11-16": 47, "2017-11-17": 62, "2017-11-18": 134, "2017-11-19": 54, "2017-11-20": 83, "2017-11-21": 104, "2017-11-22": 43, "2017-11-23": 51, "2017-11-24": 67, "2017-11-25": 53, "2017-11-26": 118, "2017-11-27": 273, "2017-11-28": 238, "2017-11-29": 129, "2017-11-30": 109, "2017-12-01": 171, "2017-12-02": 48, "2017-12-03": 45, "2017-12-04": 111, "2017-12-05": 68, "2017-12-06": 72, "2017-12-07": 63, "2017-12-08": 52, "2017-12-09": 53, "2017-12-10": 102, "2017-12-11": 56, "2017-12-12": 90, "2017-12-13": 94, "2017-12-14": 55, "2017-12-15": 207, "2017-12-16": 67, "2017-12-17": 49, "2017-12-18": 149, "2017-12-19": 200, "2017-12-20": 68, "2017-12-21": 180, "2017-12-22": 162, "2017-12-23": 84, "2017-12-24": 174, "2017-12-25": 32, "2017-12-26": 84, "2017-12-27": 77, "2017-12-28": 136, "2017-12-29": 229, "2017-12-30": 67, "2017-12-31": 46, "2018-01-01": 54, "2018-01-02": 45, "2018-01-03": 194, "2018-01-04": 58, "2018-01-05": 87, "2018-01-06": 15, "2018-01-07": 119, "2018-01-08": 238, "2018-01-09": 27, "2018-01-10": 37, "2018-01-11": 23, "2018-01-12": 246, "2018-01-13": 164, "2018-01-14": 31, "2018-01-15": 65, "2018-01-16": 77, "2018-01-17": 63, "2018-01-18": 61, "2018-01-19": 67, "2018-01-20": 49, "2018-01-21": 60, "2018-01-22": 97, "2018-01-23": 69, "2018-01-24": 71, "2018-01-25": 27, "2018-01-26": 75, "2018-01-27": 197, "2018-01-28": 58, "2018-01-29": 112, "2018-01-30": 41, "2018-01-31": 98, "2018-02-01": 54, "2018-02-02": 63, "2018-02-03": 17, "2018-02-04": 34, "2018-02-05": 131, "2018-02-06": 97, "2018-02-07": 81, "2018-02-08": 58, "2018-02-09": 82, "2018-02-10": 101, "2018-02-11": 58, "2018-02-12": 306, "2018-02-13": 79, "2018-02-14": 179, "2018-02-15": 46, "2018-02-16": 93, "2018-02-17": 212, "2018-02-18": 16, "2018-02-19": 79, "2018-02-20": 32, "2018-02-21": 70, "2018-02-22": 128, "2018-02-23": 301, "2018-02-24": 127, "2018-02-25": 51, "2018-02-26": 178, "2018-02-27": 98, "2018-02-28": 135, "2018-03-01": 190, "2018-03-02": 233, "2018-03-03": 141, "2018-03-04": 328, "2018-03-05": 160, "2018-03-06": 249, "2018-03-07": 59, "2018-03-08": 80, "2018-03-09": 152, "2018-03-10": 149, "2018-03-11": 240, "2018-03-12": 143, "2018-03-13": 107, "2018-03-14": 269, "2018-03-15": 127, "2018-03-16": 116, "2018-03-17": 52, "2018-03-18": 47, "2018-03-19": 106, "2018-03-20": 111, "2018-03-21": 86, "2018-03-22": 88, "2018-03-23": 51, "2018-03-24": 78, "2018-03-25": 47, "2018-03-26": 217, "2018-03-27": 109, "2018-03-28": 109, "2018-03-29": 142, "2018-03-30": 226, "2018-03-31": 199, "2018-04-01": 123, "2018-04-02": 205, "2018-04-03": 149, "2018-04-04": 184, "2018-04-05": 176, "2018-04-06": 82, "2018-04-07": 61, "2018-04-08": 205, "2018-04-09": 154, "2018-04-10": 67, "2018-04-11": 212, "2018-04-12": 247, "2018-04-13": 85, "2018-04-14": 68, "2018-04-15": 198, "2018-04-16": 135, "2018-04-17": 103, "2018-04-18": 125, "2018-04-19": 35, "2018-04-20": 120, "2018-04-21": 85, "2018-04-22": 88, "2018-04-23": 168, "2018-04-24": 68, "2018-04-25": 87, "2018-04-26": 258, "2018-04-27": 79, "2018-04-28": 80, "2018-04-29": 124, "2018-04-30": 273, "2018-05-01": 125, "2018-05-02": 150, "2018-05-03": 69, "2018-05-04": 64, "2018-05-05": 102, "2018-05-06": 80, "2018-05-07": 229, "2018-05-08": 82, "2018-05-09": 285, "2018-05-10": 148, "2018-05-11": 75, "2018-05-12": 52, "2018-05-13": 112, "2018-05-14": 526, "2018-05-15": 67, "2018-05-16": 307, "2018-05-17": 125, "2018-05-18": 153, "2018-05-19": 90, "2018-05-20": 129, "2018-05-21": 176, "2018-05-22": 209, "2018-05-23": 226, "2018-05-24": 154, "2018-05-25": 113, "2018-05-26": 75, "2018-05-27": 209, "2018-05-28": 142, "2018-05-29": 181, "2018-05-30": 169, "2018-05-31": 114, "2018-06-01": 169, "2018-06-02": 128, "2018-06-03": 196, "2018-06-04": 185, "2018-06-05": 126, "2018-06-06": 145, "2018-06-07": 180, "2018-06-08": 111, "2018-06-09": 138, "2018-06-10": 312, "2018-06-11": 149, "2018-06-12": 98, "2018-06-13": 105, "2018-06-14": 109, "2018-06-15": 282, "2018-06-16": 73, "2018-06-17": 94, "2018-06-18": 57, "2018-06-19": 108, "2018-06-20": 83, "2018-06-21": 263, "2018-06-22": 91, "2018-06-23": 40, "2018-06-24": 30, "2018-06-25": 158, "2018-06-26": 230, "2018-06-27": 176, "2018-06-28": 76, "2018-06-29": 219, "2018-06-30": 148, "2018-07-01": 70, "2018-07-02": 70, "2018-07-03": 135, "2018-07-04": 154, "2018-07-05": 86, "2018-07-06": 101, "2018-07-07": 218, "2018-07-08": 115, "2018-07-09": 159, "2018-07-10": 109, "2018-07-11": 103, "2018-07-12": 70, "2018-07-13": 71, "2018-07-14": 49, "2018-07-15": 136, "2018-07-16": 76, "2018-07-17": 104, "2018-07-18": 157, "2018-07-19": 75, "2018-07-20": 132, "2018-07-21": 235, "2018-07-22": 71, "2018-07-23": 170, "2018-07-24": 151, "2018-07-25": 96, "2018-07-26": 110, "2018-07-27": 72, "2018-07-28": 67, "2018-07-29": 143, "2018-07-30": 109, "2018-07-31": 221, "2018-08-01": 106, "2018-08-02": 208, "2018-08-03": 301, "2018-08-04": 99, "2018-08-05": 118, "2018-08-06": 40, "2018-08-07": 172, "2018-08-08": 137, "2018-08-09": 178, "2018-08-10": 144, "2018-08-11": 155, "2018-08-12": 121, "2018-08-13": 85, "2018-08-14": 146, "2018-08-15": 136, "2018-08-16": 286, "2018-08-17": 197, "2018-08-18": 109, "2018-08-19": 234, "2018-08-20": 215, "2018-08-21": 198, "2018-08-22": 248, "2018-08-23": 174, "2018-08-24": 175, "2018-08-25": 78, "2018-08-26": 100, "2018-08-27": 247, "2018-08-28": 375, "2018-08-29": 158, "2018-08-30": 351, "2018-08-31": 377, "2018-09-01": 288, "2018-09-02": 439, "2018-09-03": 279, "2018-09-04": 134, "2018-09-05": 92, "2018-09-06": 180, "2018-09-07": 246, "2018-09-08": 44, "2018-09-09": 59, "2018-09-10": 155, "2018-09-11": 73, "2018-09-12": 210, "2018-09-13": 102, "2018-09-14": 177, "2018-09-15": 52, "2018-09-16": 361, "2018-09-17": 161, "2018-09-18": 93, "2018-09-19": 131, "2018-09-20": 166, "2018-09-21": 142, "2018-09-22": 134, "2018-09-23": 158, "2018-09-24": 157, "2018-09-25": 133, "2018-09-26": 68, "2018-09-27": 152, "2018-09-28": 68, "2018-09-29": 188, "2018-09-30": 146, "2018-10-01": 77, "2018-10-02": 96, "2018-10-03": 83, "2018-10-04": 144, "2018-10-05": 63, "2018-10-06": 90, "2018-10-07": 50, "2018-10-08": 75, "2018-10-09": 75, "2018-10-10": 70, "2018-10-11": 53, "2018-10-12": 114, "2018-10-13": 72, "2018-10-14": 57, "2018-10-15": 70, "2018-10-16": 38, "2018-10-17": 71, "2018-10-18": 62, "2018-10-19": 30, "2018-10-20": 46}, "messages_per_hour": {"00:00": 1163, "01:00": 528, "02:00": 494, "03:00": 530, "04:00": 1012, "05:00": 1684, "06:00": 2160, "07:00": 2481, "08:00": 3630, "09:00": 3653, "10:00": 4302, "11:00": 5129, "12:00": 7040, "13:00": 8189, "14:00": 9289, "15:00": 8320, "16:00": 7948, "17:00": 8908, "18:00": 8161, "19:00": 4947, "20:00": 3914, "21:00": 3244, "22:00": 2812, "23:00": 2032}, "number_of_mentions": {"@Rafko": 6159, "@AvatarGames": 4108, "@CityMan": 3143, "@kubo009": 2608, "@Dificator": 2540, "@Hani": 1892, "@wooderCZ": 1789, "@MartinNemi03": 1656, "@Xtroisko": 1626, "@robazcz \ud83d\udc7b\ud83d\udd77\ud83c\udf83": 1619, "@Liisha": 1217, "@LurkCZE": 1070, "@everyone": 947, "@CrazzyCatt": 808, "@DaPo \ud83c\udf83": 752, "@polarkac": 686, "@Fira": 607, "@Prcek203": 582, "@Lokmon11": 467, "@LeHydrak": 449, "@Woodlander \u2694": 407, "@Night_Fury_CZ \"Cheery Berserker\"": 357, "@Low pc": 339, "@Bleader": 291, "@alexysz": 285, "@\ud83c\udd71olcanic\ud83c\udd71oom": 277, "@frozetka": 270, "@Altisek": 215, "@Myslik22": 194, "@LukasBonni": 190, "@Medo": 189, "@Garb": 172, "@Star_Hunter": 120, "@Kvetka\ud83d\udc51": 105, "@NomisCode": 99, "@HadrDisk": 89, "@ArcadeBulls": 83, "@\ud83d\udc49Tot\u00e1ln\u011b ne Kupra\ud83d\udc48": 81, "@otrozon": 71, "@Lovec51cz": 69, "@hanzxD": 67, "@Jakubman625": 63, "@christian0012": 57, "@Thaly": 48, "@heltkova.k": 48, "@Whisperer_": 46, "@Sodar": 43, "@Crafak": 41, "@tynkatunak": 40}}}
}
*/

var table = document.getElementById("table")
var server_name = discord_data.head.server_name
var number_of_messages = discord_data.head.number_of_messages
var number_of_users = discord_data.head.number_of_users
var number_of_channels = discord_data.head.number_of_channels
var first_message = discord_data.head.first_message
var last_message = discord_data.head.last_message
var last_update = discord_data.head.last_update
table.innerHTML = "<tr><th>Server name</th><td><i>" + server_name + "</i></td></tr> <tr><th>Number of messages</th><td><i>" + number_of_messages + "</i></td></tr> <tr><th>Number of users</th><td><i>" + number_of_users + "</i></td></tr><tr><th>Number of channels</th><td><i>" + number_of_channels + "</i></td></tr><tr><th>First message</th><td><i>" + first_message + "</i></td></tr><tr><th>Last message</th><td><i>" + last_message + "</i></td></tr><tr><th>Updated</th><td>" + last_update + "</td></tr>"


var messages_per_user = [];
for (var x in discord_data.data.messages_per_user) {
    messages_per_user.push(discord_data.data.messages_per_user[x]);
};
var Names = Object.keys(discord_data.data.messages_per_user);

console.log(Names)
console.log(messages_per_user)

var messages_per_channel = [];
for (var x in discord_data.data.messages_per_channel) {
    messages_per_channel.push(discord_data.data.messages_per_channel[x]);
};
var Channels = Object.keys(discord_data.data.messages_per_channel);

console.log(Channels)
console.log(messages_per_channel)


var messages_freq = [];
for (var x in discord_data.data.word_frequency) {
    messages_freq.push(discord_data.data.word_frequency[x]);
};
var Words = Object.keys(discord_data.data.word_frequency);

console.log(Words)
console.log(messages_freq)


var number_of_messages_per_day = [];
for (var x in discord_data.data.historical_data) {
    number_of_messages_per_day.push(discord_data.data.historical_data[x]);
};
var Dates = Object.keys(discord_data.data.historical_data);

console.log(Dates)
console.log(number_of_messages_per_day)


var messages_per_hour = [];
for (var x in discord_data.data.messages_per_hour) {
    messages_per_hour.push(discord_data.data.messages_per_hour[x]);
};
var Hours = Object.keys(discord_data.data.messages_per_hour);

console.log(Hours)
console.log(messages_per_hour)


var mentions_per_user = [];
for (var x in discord_data.data.number_of_mentions) {
    mentions_per_user.push(discord_data.data.number_of_mentions[x]);
};
var Pinged = Object.keys(discord_data.data.number_of_mentions);

console.log(Pinged)
console.log(mentions_per_user)

// COLORS!
function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.8 + ')';
}

function generate_color_list(list) {
    var color_list = []
    for (var i = 0; i < list.length; i++) {
        color_list.push(random_rgba());
    }
    return color_list
}

function generate_one_color_list(list, color) {
    var color_list = []
    for (var i = 0; i < list.length; i++) {
        color_list.push(color);
    }
    return color_list
}

function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.6)';
    }
    throw new Error('Bad Hex');
}

function sin_to_hex(i, phase, size) {
    var sin = Math.sin(Math.PI / size * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);

    return hex.length === 1 ? "0" + hex : hex;
}


function generate_rainbow(size) {
    var rainbow = new Array(size);

    for (var i = 0; i < size; i++) {
        var red = sin_to_hex(i, 0 * Math.PI * 2 / 3, size); // 0   deg
        var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3, size); // 120 deg
        var green = sin_to_hex(i, 2 * Math.PI * 2 / 3, size); // 240 deg

        rainbow[i] = hexToRgbA("#" + red + green + blue);
    }

    return rainbow
}

//End preloader
document.getElementById('main_body').className = '';
document.getElementById('preloader').className = 'hide';

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 16;
Chart.defaults.global.defaultFontColor = '#ffffff';
Chart.defaults.global.animation.easing = 'easeInOutCirc';

// Messages per user chart
let messages_per_userCHART = new Chart(myChart, {
    type: 'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: Names,
        datasets: [{
            label: 'Users',
            data: messages_per_user,
            //backgroundColor:'green',
            backgroundColor: generate_rainbow(Names.length),
            borderWidth: 0.2,
            borderColor: 'white',
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff'
        }]
    },
    options: {
        title: {
            display: false,
            text: 'Messages per user',
            fontSize: 25
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: '#ffffff'
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 50,
                top: 20
            }
        },
        tooltips: {
            enabled: true
        }
    }
});

//Messages per channel chart
let messages_per_channelCHART = new Chart(myChart2, {
    type: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: Channels,
        datasets: [{
            label: 'Number of messages',
            data: messages_per_channel,
            //backgroundColor:'green',
            backgroundColor: generate_color_list(Channels),
            borderWidth: 0.5,
            borderColor: 'white',
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff'
        }]
    },
    options: {
        title: {
            display: false,
            text: 'Messages per Channel',
            fontSize: 25
        },
        legend: {
            display: true,
            position: 'right',
            labels: {
                fontColor: '#ffffff'
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 50,
                top: 50
            }
        },
        tooltips: {
            enabled: true
        }
    }
});

let historicCHART = new Chart(myChart3, {
    type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: Dates,
        datasets: [{
            label: 'Number of messages',
            data: number_of_messages_per_day,
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "white",
            hoverBorderWidth: 1,
            hoverBorderColor: '#ffffff',
            pointRadius: 2,
            pointHitRadius: 8,
            fill: false
        }]
    },
    options: {
        elements: {
            line: {
                tension: 0.3, // disables bezier curves
            }
        },
        title: {
            display: false,
            text: 'Messages per Day',
            fontSize: 25
        },
        legend: {
            display: false,
            position: 'right',
            labels: {
                fontColor: '#ffffff'
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 50,
                top: 50
            }
        },
        tooltips: {
            enabled: true
        }
    }
});

let hourCHART = new Chart(myChart4, {
    type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: Hours,
        datasets: [{
            label: 'Number of messages',
            data: messages_per_hour,
            backgroundColor: generate_one_color_list(Hours, "#367588"),
            borderWidth: 1,
            borderColor: "white",
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff',
            pointRadius: 2,
            pointHitRadius: 8,
            fill: false
        }]
    },
    options: {
        elements: {
            line: {
                tension: 0.3, // disables bezier curves
            }
        },
        title: {
            display: false,
            text: 'Messages per Day',
            fontSize: 25
        },
        legend: {
            display: false,
            position: 'right',
            labels: {
                fontColor: '#ffffff'
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 50,
                top: 50
            }
        },
        tooltips: {
            enabled: true
        }
    }
});

//Word frequency
let message_freqCHART = new Chart(myChart5, {
    type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: Words,
        datasets: [{
            label: '',
            data: messages_freq,
            //backgroundColor:'green',
            backgroundColor: generate_color_list(Words),
            borderWidth: 0.5,
            borderColor: 'white',
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff'
        }]
    },
    options: {
        title: {
            display: false,
            text: 'Word Frequency',
            fontSize: 25
        },
        legend: {
            display: false,
            position: 'right',
            labels: {
                fontColor: '#ffffff'
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 50
            }
        },
        tooltips: {
            enabled: true
        }
    }
});

let mentions_per_userCHART = new Chart(myChart6, {
    type: 'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: Pinged,
        datasets: [{
            label: '',
            data: mentions_per_user,
            //backgroundColor:'green',
            backgroundColor: generate_rainbow(Pinged.length),
            borderWidth: 0.5,
            borderColor: 'white',
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff'
        }]
    },
    options: {
        title: {
            display: false,
            text: 'Word Frequency',
            fontSize: 25
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: '#ffffff'
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 50
            }
        },
        tooltips: {
            enabled: true
        }
    }
});