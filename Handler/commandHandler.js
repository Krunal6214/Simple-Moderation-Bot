function loadCommands(client) {
  const fs = require('fs');
  const config = require('../config');
  require('@colors/colors');
  let commandsArray = [];
  let developerArray = [];

  const commandsFolder = fs.readdirSync('./Commands');
  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./Commands/${folder}`)
      .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);
      client.commands.set(commandFile.data.name, commandFile);
      if (commandFile.developer) developerArray.push(commandFile.data.toJSON());
      else commandsArray.push(commandFile.data.toJSON());
      console.log('[Commands]'.red + ` ${file.split('.')[0]} has been loaded.`);
      continue;
    }
  }

  client.application.commands.set(commandsArray);
}

module.exports = { loadCommands };
