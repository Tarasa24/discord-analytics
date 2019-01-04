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
    var filePath = 'https://api.allorigins.ml/get?method=raw&url=' + encodeURIComponent('https://github.com/Tarasa24/discord-analytics/tree/master/data');
    var html = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        html = xmlhttp.responseText;
    }

    scrapeList = []
    var index = 0
    while (true) {
        var correction = 'title=\\"discord-scrape_'.length - 1
        index = html.indexOf('title="discord-scrape_', index) + correction
        var index2 = html.indexOf('.json', index)
        var result = decodeHTML(html.substring(index, index2).split('-').join(' '));

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

var messages_per_userCHART=new Chart(myChart,{type:"pie",data:{labels:Names,datasets:[{label:"Users",data:messages_per_user,backgroundColor:generate_rainbow(Names.length),borderWidth:.2,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Messages per user",fontSize:25},legend:{display:!0,position:"bottom",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:20}},tooltips:{enabled:!0}}}),
messages_per_channelCHART=new Chart(myChart2,{type:"doughnut",data:{labels:Channels,datasets:[{label:"Number of messages",data:messages_per_channel,backgroundColor:generate_color_list(Channels),borderWidth:.5,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Messages per Channel",fontSize:25},legend:{display:!0,position:"right",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:50}},tooltips:{enabled:!0}}}),
historicCHART=new Chart(myChart3,{type:"line",data:{labels:Dates,datasets:[{label:"Number of messages",data:number_of_messages_per_day,backgroundColor:"white",borderWidth:2,borderColor:"white",hoverBorderWidth:1,hoverBorderColor:"#ffffff",pointRadius:2,pointHitRadius:8,fill:!1}]},options:{elements:{line:{tension:.3}},title:{display:!1,text:"Messages per Day",fontSize:25},legend:{display:!1,position:"right",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:50}},tooltips:{enabled:!0}}}),
hourCHART=new Chart(myChart4,{type:"bar",data:{labels:Hours,datasets:[{label:"Number of messages",data:messages_per_hour,backgroundColor:generate_one_color_list(Hours,"#367588"),borderWidth:1,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff",pointRadius:2,pointHitRadius:8,fill:!1}]},options:{elements:{line:{tension:.3}},title:{display:!1,text:"Messages per Day",fontSize:25},legend:{display:!1,position:"right",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:50,top:50}},tooltips:{enabled:!0}}}),
message_freqCHART=new Chart(myChart5,{type:"bar",data:{labels:Words,datasets:[{label:"",data:messages_freq,backgroundColor:generate_color_list(Words),borderWidth:.5,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Word Frequency",fontSize:25},legend:{display:!1,position:"right",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:0,top:50}},tooltips:{enabled:!0}}}),
mentions_per_userCHART=new Chart(myChart6,{type:"pie",data:{labels:Pinged,datasets:[{label:"",data:mentions_per_user,backgroundColor:generate_rainbow(Pinged.length),borderWidth:.2,borderColor:"white",hoverBorderWidth:3,hoverBorderColor:"#ffffff"}]},options:{title:{display:!1,text:"Word Frequency",fontSize:25},legend:{display:!0,position:"bottom",labels:{fontColor:"#ffffff"}},layout:{padding:{left:0,right:0,bottom:0,top:50}},tooltips:{enabled:!0}}});