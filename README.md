<center>
<img align="left" src="https://i.imgur.com/4GK9mkm.png">
<h1>Discord Analytics</h1>
<a href="https://tarasa24.github.io/discord-analytics/" target="_blank">Analyze your own Discord Guild and see the statistics</a>
</center> 
</br>


___
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Requirements and Setup](#requirements-and-setup)
* [Execution](#execution)
* [Conclusion](#conclusion)

## General info
Have you ever wanted to see who is the top chatter in your favorite Discord guild? Or have you ever wondered, what are the most active hours during the period of the day? Or are you simply just a data-lover? 

This project might catch your attention... <a href="https://tarasa24.github.io/discord-analytics/" target="_blank">link</a>

___

**Currently supported charts:**

* ➤ Messages per user
* ➤ Messages per channel
* ➤ Message count every single day of guild history
* ➤ Message count in specific hours
* ➤ Most frequently used words
* ➤ Number showing how many times was user mentioned

	
## Technologies
Project is created with:
* <a href="https://github.com/chartjs/Chart.js" target="_blank">chart.js</a>
* <a href="https://dht.chylex.com/" target="_blank">Discord History Tracker</a>
* <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>


## Requirements and Setup
Using *Discord History Tracker*, scrape server of your choice and final .txt file put into ./py_parser/dht

When in doubt how to use mentioned tracker, head to the official website: <a href="https://dht.chylex.com/" target="_blank">dht.chylex.com</a>

## Execution
Simply run **execute.bat** when you want to parse ever single .txt file in /dht folder. It will open one cmd window per file parsed due the speed reasons. No need to be scared 👌

___

Alternatively, if you want to parse .txt files individually, use file path as an argument:
```
 $ cd ./discord-analytics/py_parser
 $ python app.py "<path to the file>"
```

## Conclusion
In case of any question, contact me directly on Discord: **Tarasa24#1761**

Whole ide of making this project came from <a href="https://www.reddit.com/r/discordapp/comments/7pk88f/an_analysis_of_760000_messages_from_the/" target="_blank">this Reddit post</a>.

This project should more or less act as proof of concept, rather than real-world web application.