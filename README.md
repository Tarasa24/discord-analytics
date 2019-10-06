<center>
<img align="left" src="https://i.imgur.com/4GK9mkm.png">
<h1>Discord Analytics</h1>
Analyze your own Discord Guild and see the statistics
</center> 
</br>

---

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Requirements and Setup](#requirements-and-setup)
  - [DHT](#DHT)
- [Execution](#execution)
  - [Parser](#Parser)
- [Preview](#Preview)

## General info

Have you ever wanted to see who is the top chatter in your favorite Discord guild? Or have you ever wondered, what are the most active hours during the period of the day? Maybe you want to see user-specific statistics. Or are you simply a data-lover like me?

---

**Currently supported features:**

- ➤ User-specific stats
- ➤ Messages per user
- ➤ Words per user
- ➤ Messages per channel
- ➤ Message count every single day of guild history
- ➤ Message count in specific hours
- ➤ Frequently used words
- ➤ Number showing how many times was user mentioned
- ➤ Information about individual users
- ➤ Pictures sent by individual users

## Technologies

Project is created with:

- <a href="https://github.com/chylex/Discord-History-Tracker" target="_blank">Discord History Tracker</a>
- <a href="https://github.com/chartjs/Chart.js" target="_blank">chart.js</a>

## Requirements and Setup

#### DHT

Using _Discord History Tracker_, scrape server of your choice and save the generated file.

When in doubt how to use mentioned tracker, head to the official website: <a href="https://dht.chylex.com/" target="_blank">dht.chylex.com</a>

## Execution

#### Parser

```
 $ cd py_parser
 $ python app.py "<path to the generated file>"
```

## Preview

[Live version](https://tarasa24.ddns.net): All features, limited uptime

[Static version](https://tarasa24.github.io/discord-analytics/): Limited features, unlimited uptime
