const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on('ready', () => {
    console.log(`hello ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if(message.content.startsWith("!dice")) {
        dice(message);
    }else if(message.content.startsWith("!count")){
        count(message);
    }else if(message.content.startsWith("!coin")){
        coin(message);
    }
});

client.login(token);

function dice(message){
    const num = Math.floor(Math.random() * 101).toString();
    message.channel.send(num);
}

function count(message){
    let params = message.content.split(" ");
    let count = 5;

    if(params.length > 1){
        let param = Number(params[1]);
        if(Number.isInteger(param)){
            count = Math.min(param,100);
        }
    }

    let playAlert = setInterval(function() {
        message.channel.send((count--).toString());
        if(count === 0){
            clearInterval(playAlert);
        }
    }, 1000);
}
function coin(message){
    const num = Math.floor(Math.random() * 2);
    const result = (num === 0)?"앞":"뒤";
    message.channel.send(result);
}