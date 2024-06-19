const Discord = require('discord.js');
const ActivityType = require('discord.js');
const client = new Discord.Client({intents: 3276799});
const config = require('./config');
const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
require('@colors/colors');
const foot = 'Created by KAP6214 💖';
client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.selectMenus = new Discord.Collection();
client.modals = new Discord.Collection();
client
  .login(config.token)
  .then(() => {
    console.clear();
    console.log('[Discord API] '.green + client.user.username + ' is been logged.');
    client.user.setPresence({ activities: [{ name: config.status, type: ActivityType.Listening }]});
    loadEvents(client);
    loadCommands(client);
    })
  .catch((err) => console.log(err));

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === config.welcomechannel); 
    if (!channel) return;

    channel.send(`Welcome to the server, ${member}!`);
});



