function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200 || xmlhttp.status == 409) {
        result = xmlhttp.responseText;
    }
    return result;
}

//inital options construct and json loading
var scrapeList = JSON.parse(loadFile("/data/list"))
var select = document.getElementById("select")

url = decodeURI(window.location)
index = url.indexOf('s=')
SelectItem = url.substr(index + 2)
var discord_data = ""

//Checks if parameter (name of .json file) is set
//If so, it will load and construct other options
//If not, it will load alphabetically first one in the array of all .json files
if (index == -1) {
    for (var i = 0; i < scrapeList.length; i++) {
        select.innerHTML += "<option>" + decodeURI(scrapeList[i]) + "</option>"
    }

    var discord_scrape = loadFile("/data/" + scrapeList[0]);
    discord_data = JSON.parse(discord_scrape);
} else {
    select.innerHTML = "<option>" + SelectItem + "</option>"
    document.title = 'Discord Analytics - ' + SelectItem;
    for (var i = 0; i < scrapeList.length; i++) {
        if (SelectItem != scrapeList[i]) {
            select.innerHTML += "<option>" + decodeURI(scrapeList[i]) + "</option>"
        }
    }

    var discord_scrape = loadFile("/data/" + SelectItem);
    discord_data = JSON.parse(discord_scrape);
}


//Inital table loading
var table = document.getElementById("table")
var server_name = discord_data.head.server_name
var number_of_messages = discord_data.head.number_of_messages
var number_of_words = discord_data.head.number_of_words
var words_per_message_ratio = discord_data.head.words_per_message_ratio
var number_of_users = discord_data.head.number_of_users
var number_of_channels = discord_data.head.number_of_channels
var first_message = discord_data.head.first_message
var last_message = discord_data.head.last_message
table.innerHTML = "<tr><th>Server name</th><td><i>" + server_name + "</i></td></tr> <tr><th>Number of messages</th><td><i>" + number_of_messages + "</i></td></tr> <tr><th>Number of words</th><td><i>" + number_of_words + "</i></td></tr> <tr><th>Words per message ratio</th><td><i>" + words_per_message_ratio + "</i></td></tr> <tr><th>Number of users</th><td><i>" + number_of_users + "</i></td></tr> <tr><th>Number of channels</th><td><i>" + number_of_channels + "</i></td></tr> <tr><th>First message</th><td><i>" + first_message + "</i></td></tr> <tr><th>Last message</th><td><i>" + last_message + "</i></td></tr>"

//Lists loading and logging
var messages_per_user = [];
var Names = [];
var Names_original = [];
for (var x in discord_data.body.messages_per_user) {
    messages_per_user.push(discord_data.body.messages_per_user[x][1]);
    Names.push(discord_data.body.messages_per_user[x][0]);
    Names_original.push(discord_data.body.messages_per_user[x][0]);
};

Names = Names.slice(0, 50)
messages_per_user = messages_per_user.slice(0, 50)
console.log(Names)
console.log(messages_per_user)

var words_per_user = [];
var Names2 = [];
for (var x in discord_data.body.words_per_user) {
    words_per_user.push(discord_data.body.words_per_user[x][1]);
    Names2.push(discord_data.body.words_per_user[x][0]);
};

Names2 = Names2.slice(0, 50)
words_per_user = words_per_user.slice(0, 50)
console.log(Names2)
console.log(words_per_user)

var messages_per_channel = [];
var Channels = [];
for (var x in discord_data.body.messages_per_channel) {
    messages_per_channel.push(discord_data.body.messages_per_channel[x][1]);
    Channels.push(discord_data.body.messages_per_channel[x][0]);
};

Channels = Channels.slice(0, 50)
messages_per_channel = messages_per_channel.slice(0, 50)
console.log(Channels)
console.log(messages_per_channel)


var messages_freq = [];
var Words = [];
for (var x in discord_data.body.word_frequency) {
    messages_freq.push(discord_data.body.word_frequency[x][1]);
    Words.push(discord_data.body.word_frequency[x][0]);
};

Words = Words.slice(0, 50)
messages_freq = messages_freq.slice(0, 50)
console.log(Words)
console.log(messages_freq)


var number_of_messages_per_day = [];
for (var x in discord_data.body.historical_data) {
    number_of_messages_per_day.push(discord_data.body.historical_data[x]);
};
var Dates = Object.keys(discord_data.body.historical_data);

console.log(Dates)
console.log(number_of_messages_per_day)


var messages_per_hour = [];
for (var x in discord_data.body.messages_per_hour) {
    messages_per_hour.push(discord_data.body.messages_per_hour[x]);
};
var Hours = Object.keys(discord_data.body.messages_per_hour);

console.log(Hours)
console.log(messages_per_hour)


var mentions_per_user = [];
var Pinged = []
for (var x in discord_data.body.number_of_mentions) {
    mentions_per_user.push(discord_data.body.number_of_mentions[x][1]);
    Pinged.push(discord_data.body.number_of_mentions[x][0]);
};

Pinged = Pinged.slice(0, 50)
mentions_per_user = mentions_per_user.slice(0, 50)
console.log(Pinged)
console.log(mentions_per_user)
//End of lists loading and loggin


//User sidebar dropdown construct
var select = document.getElementById("myDropdown")
Names_original.forEach(function (name){
    select.innerHTML += `<a onclick="reloadName(this.innerHTML)">` + name + "</a>"
})

//Inital name table construct
var table_name = document.getElementById("table_name")
var name_select = document.getElementById("name_select")
var User = discord_data.users[Names_original[0]]
var api_response = JSON.parse(loadFile(`http://localhost:${loadFile("/env")}/?id=` + User["id"]))
var table_avatar = document.getElementById("table_avatar")
function user_tables_construct(api_response, User) {
    const createdTimestamp = new Date(api_response["createdTimestamp"]).toISOString().slice(0, 19).replace('T',' ') + " UTC"
    var mostUsedWord = User["mostUsedWord"]
    if (User["mostUsedWord"].length < 2){
        mostUsedWord = [[undefined, NaN], [undefined, NaN], [undefined, NaN]]
    }

    table_avatar.innerHTML = `<tr><th align="left"><img id="avatar" src="${api_response["avatarURL"]}"></th><td> <b>${api_response["name"]}</b> <img id="bot" src="/media/bot.svg"> <br style="line-height: 35px;">${api_response["tag"]}<br>${api_response["id"]}</td></tr>`
    table_name.innerHTML = "<tr><th>Account created at</th><td><i>" + createdTimestamp + "</i></td></tr> <tr><th>First message</th><td><i>" + User["firstMessage"] + "</i></td></tr> <tr><th>Last message</th><td><i>" + User["lastMessage"] + "</i></td></tr> <tr><th>Message count</th><td><i>" + User["messagesCount"] + "</i></td></tr> <tr><th>Word count</th><td><i>" + User["wordsCount"] + "</i></td></tr> <tr><th>Words per message ratio</th><td><i>" + User["words_per_message_ratio"] + "</i></td></tr> <tr><th>Most active channel</th><td><i>" + `#${User["mostActiveChannel"][0][0]} (${User["mostActiveChannel"][0][1]} msg)` + "</i></td></tr> <tr><th>Most used word</th><td><i>" + `${mostUsedWord[0][0]} (${mostUsedWord[0][1]} times)` + "</i></td></tr> <tr><th>Most active day</th><td><i>" + `${User["history"][0][0]} (${User["history"][0][1]} msg)` + "</i></td></tr>"

    if (api_response["bot"] == false) {
        document.getElementById("bot").style.display = "none";
    }
}

//Loading of the first user in a list
if (api_response.response.code == 200) {
    user_tables_construct(api_response, User)
}
else {
    table_avatar.innerHTML = `<p align="center">User <b style="font-size: 1rem !important">${Names_original[0]}</b> <i>(${User["id"]})</i> is unreachable</p>`
    table_name.innerHTML= ""
}

//Loading of selected user
//This function is called from html
function reloadName(val) {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("myInput").value = val;

    var User = discord_data.users[val]
    var api_response = JSON.parse(loadFile(`http://localhost:${loadFile("/env")}/?id=` + User["id"]))
    var table_avatar = document.getElementById("table_avatar")
    if (api_response.response.code == 200) {
        user_tables_construct(api_response, User)
    }
    else {
        table_avatar.innerHTML = `<p align="center">User <b style="font-size: 1rem !important">${val}</b> <i>(${User["id"]})</i> is unreachable</p>`
        table_name.innerHTML= ""
    }
}


// COLOURS!
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

function generate_rainbow(size) {
    function sin_to_hex(i, phase, size) {
        var sin = Math.sin(Math.PI / size * 2 * i + phase);
        var int = Math.floor(sin * 127) + 128;
        var hex = int.toString(16);
    
        return hex.length === 1 ? "0" + hex : hex;
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
document.getElementById('main_body').style = "";
document.getElementById('sidenav').style = "";
document.getElementById('preloader').style = "display: none";


//CHARTS
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 16;
Chart.defaults.global.defaultFontColor = '#ffffff';
Chart.defaults.global.animation.easing = 'easeInOutCirc';

var messages_per_userCHART=new Chart(myChart,{type:"pie",data:{labels:Names,datasets:[{label:"Users",data:messages_per_user,backgroundColor:generate_rainbow(Names.length),borderWidth:.2,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Messages per user",fontSize:25},legend:{display:!0,position:"bottom",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:20}},tooltips:{enabled:!0}}}),
words_per_userCHART=new Chart(myChart1,{type:"pie",data:{labels:Names2,datasets:[{label:"Users",data:words_per_user,backgroundColor:generate_rainbow(Names.length),borderWidth:.2,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Messages per user",fontSize:25},legend:{display:!0,position:"bottom",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:20}},tooltips:{enabled:!0}}}),
messages_per_channelCHART=new Chart(myChart2,{type:"doughnut",data:{labels:Channels,datasets:[{label:"Number of messages",data:messages_per_channel,backgroundColor:generate_color_list(Channels),borderWidth:.5,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Messages per Channel",fontSize:25},legend:{display:!0,position:"right",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:50}},tooltips:{enabled:!0}}}),
historicCHART=new Chart(myChart3,{type:"line",data:{labels:Dates,datasets:[{label:"Number of messages",data:number_of_messages_per_day,backgroundColor:"white",borderWidth:2,borderColor:"white",hoverBorderWidth:1,hoverBorderColor:"#ffffff",pointRadius:2,pointHitRadius:8,fill:!1}]},options:{elements:{line:{tension:.3}},title:{display:!1,text:"Messages per Day",fontSize:25},legend:{display:!1,position:"right",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:50}},tooltips:{enabled:!0}}}),
hourCHART=new Chart(myChart4,{type:"bar",data:{labels:Hours,datasets:[{label:"Number of messages",data:messages_per_hour,backgroundColor:generate_one_color_list(Hours,"#367588"),borderWidth:1,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff",pointRadius:2,pointHitRadius:8,fill:!1}]},options:{elements:{line:{tension:.3}},title:{display:!1,text:"Messages per Day",fontSize:25},legend:{display:!1,position:"right",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:50}},tooltips:{enabled:!0}}}),
message_freqCHART=new Chart(myChart5,{type:"bar",data:{labels:Words,datasets:[{label:"",data:messages_freq,backgroundColor:generate_color_list(Words),borderWidth:.5,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Word Frequency",fontSize:25},legend:{display:!1,position:"right",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:0,top:50}},tooltips:{enabled:!0}}}),
mentions_per_userCHART=new Chart(myChart6,{type:"pie",data:{labels:Pinged,datasets:[{label:"",data:mentions_per_user,backgroundColor:generate_rainbow(Pinged.length),borderWidth:.2,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Word Frequency",fontSize:25},legend:{display:!0,position:"bottom",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:0,top:50}},tooltips:{enabled:!0}}});