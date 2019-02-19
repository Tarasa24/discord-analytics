<center>
<img align="left" src="https://i.imgur.com/4GK9mkm.png">
<h1>Discord Analytics</h1>
Analyze your own Discord Guild and see the statistics
</center> 
</br>


___
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Requirements and Setup](#requirements-and-setup)
    * [General](#General)
    * [DHT](#DHT)
    * [Webserver](#Webserver-setup)
* [Execution](#execution)
    * [Parser](#Parser)
    * [Webserver](#Webserver-execution)
* [Conclusion](#conclusion)
    * [Preview](#Preview)

## General info
Have you ever wanted to see who is the top chatter in your favorite Discord guild? Or have you ever wondered, what are the most active hours during the period of the day? Maybe you want to see user-specific statistics. Or are you simply a data-lover like me?

___

**Currently supported features:**

* ➤ User-specific stats
* ➤ Messages per user
* ➤ Words per user
* ➤ Messages per channel
* ➤ Message count every single day of guild history
* ➤ Message count in specific hours
* ➤ Frequently used words
* ➤ Number showing how many times was user mentioned

	
## Technologies
Project is created with:
* <a href="https://dht.chylex.com/" target="_blank">Discord History Tracker</a>
* <a href="https://github.com/chartjs/Chart.js" target="_blank">chart.js</a>
* <a href="https://github.com/discordjs/discord.js" target="_blank">discord.js</a>
* <a href="https://github.com/expressjs/express" target="_blank">express</a>
* <a href="https://github.com/strongloop/node-foreman" target="_blank">Node Foreman</a>


## Requirements and Setup

#### General
1. Python (for parser)
2. Node.js (for webserver)
3. Discord bot (for backend)
___
#### DHT
Using *Discord History Tracker*, scrape server of your choice and put the generated file inside `py_parser/dht` folder.

When in doubt how to use mentioned tracker, head to the official website: <a href="https://dht.chylex.com/" target="_blank">dht.chylex.com</a>
___
#### <a name="Webserver-setup">Webserver</a>
```
 $ cd webserver
 $ npm install
```
Inside `.env` specify your <a href="https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token" target="_blank">discord bot token</a> + frontend and backend port.
> Note that frontend and backend ports **must** be different

## Execution

#### Parser
Simply run **execute.bat** when you want to parse ever single .txt file in /dht folder. It will open one cmd window per file parsed due the speed reasons. No need to be scared 👌

Alternatively, if you want to parse .txt files individually, use file path as an argument:
```
 $ cd py_parser
 $ python app.py "<path to the file>"
```
___
#### <a name="Webserver-execution">Webserver</a>
```
 $ cd webserver
 $ nf start
```
or
```
 $ cd webserver
 $ npm start
```

## Conclusion
This project has finally come to major rebuild. Now with optimalised parser, more  features and of course, not fogetting real-life webserver architecture that can be easily initegated with reverse shells like *nginx* etc..

In case of any question, contact me directly on Discord: **Tarasa24#1761**

#### Preview
> ![User](https://i.imgur.com/hRHVD7i.png)
> ![Main](https://i.imgur.com/2AX4f3h.png)
> ![Charts](https://i.imgur.com/bNIzXI1.png)