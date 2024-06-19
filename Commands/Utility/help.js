const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View all commands'),
    
  
  async execute (interaction) {
    const helpembed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('**Here are all the commands:**\n\n**Moderation:**\n> `/ban`: Bans a user\n> `/kick`: Kicks a user\n> `/warn`: Warns a user\n> `/lock`: Locks a channel\n> `/mute`: mutes an user\n\n **Utility:**\n> `/embeded`: Sends an Embed\n> `/help`: Help module of this bot\n> `/ping`: BOT ping\n> `/serverinfo`: Sends server info\n')
      .setFooter({text: 'Created by KAP6214 💖'})
      .setColor('Random')
      .addFields({ name: 'Created By KAP6214 💖', value: 'To contact us join [here](https://discord.gg/DTsCMgQE93)', inline: true });

    await interaction.reply ({embeds: [helpembed]});
  }
};
