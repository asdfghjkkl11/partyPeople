
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on('ready', () => {
    console.log(`hello ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if(message.content.startsWith("!dice")) {
        const num = Math.floor(Math.random() * 101).toString();
        message.channel.send(num);
    }else if(message.content.startsWith("!count")){
        let count = 5;
        let playAlert = setInterval(function() {
            message.channel.send((count--).toString());
            if(count === 0){
                clearInterval(playAlert);
            }
        }, 1000);
    }else if(message.content.startsWith("!coin")){
        const num = Math.floor(Math.random() * 2);
        const result = (num === 0)?"앞":"뒤";
        message.channel.send(result);
    }
});

client.login(token);
