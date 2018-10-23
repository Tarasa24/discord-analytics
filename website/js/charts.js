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

var decodeHTML = function (html) {
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
  for (var i = 0; i < scrapeList.length; i++) {
    if (SelectItem != scrapeList[i]) {
      select.innerHTML += "<option>" + scrapeList[i] + "</option>"
    }
    var discord_scrape = loadFile("https://raw.githubusercontent.com/Tarasa24/discord-analytics/master/data/discord-scrape_" + SelectItem.split(' ').join('-') + ".json");
    var discord_data = JSON.parse(discord_scrape);
  }
}

/*  
  if (true){
    var discord_data = {"head": {"server_name": "Crew Humorn\u00edk\u016f", "number_of_messages": 3296, "number_of_users": 9, "number_of_channels": 11, "first_message": "2018-10-03", "last_message": "2018-10-19", "last_update": "2018-10-23 20:10"}, "data": {"messages_per_user": {"butter": 1613, "Tarasa24": 1046, "Rythm": 257, "pekis02": 245, "Michelle26": 82, "Rizkozrout": 27, "Dank Memer": 17, "Groovy": 0, "Poll Bot": 0}, "messages_per_channel": {"general": 1014, "private": 811, "jukebox": 700, "deprese": 427, "meme": 231, "lenny-face": 37, "no-judge-zone": 33, "links": 20, "optimismus": 10, "announcements": 10, "board": 3}, "word_frequency": {"that": 1161, "like": 683, "this": 653, "have": 533, "what": 501, "also": 443, "just": 438, "know": 428, "dont": 421, "yeah": 392, "well": 370, "then": 360, "would": 337, "they": 326, "will": 318, "thats": 301, "think": 291, "mean": 280, "really": 269, "there": 254, "right": 243, "good": 242, "some": 238, "here": 237, "guess": 232, "nice": 232, "https": 220, "lennythink": 218, "about": 218, "because": 212, "more": 207, "keepo": 190, "play": 183, "your": 180, "from": 179, "with": 175, "wait": 169, "still": 162, "were": 157, "want": 154, "thing": 153, "something": 148, "jsem": 144, "does": 136, "anything": 135, "isnt": 134, "actually": 134, "everyone": 132, "even": 128}, "historical_data": {"2018-10-03": 353, "2018-10-04": 766, "2018-10-05": 522, "2018-10-06": 157, "2018-10-07": 203, "2018-10-08": 21, "2018-10-09": 320, "2018-10-10": 175, "2018-10-11": 97, "2018-10-12": 25, "2018-10-13": 300, "2018-10-14": 43, "2018-10-15": 75, "2018-10-16": 18, "2018-10-17": 9, "2018-10-18": 160, "2018-10-19": 52}, "messages_per_hour": {"00:00": 0, "01:00": 2, "02:00": 0, "03:00": 2, "04:00": 37, "05:00": 4, "06:00": 59, "07:00": 13, "08:00": 13, "09:00": 15, "10:00": 68, "11:00": 1, "12:00": 4, "13:00": 52, "14:00": 170, "15:00": 60, "16:00": 165, "17:00": 289, "18:00": 355, "19:00": 779, "20:00": 838, "21:00": 333, "22:00": 36, "23:00": 1}}}
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

// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#ffffff';

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
      position: 'top',
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
        bottom: 0,
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