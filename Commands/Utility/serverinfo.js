const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
     .setName('serverinfo')
     .setDescription('View server info'),

  async execute (interaction) {
    
     const gowner = await interaction.guild.fetchOwner();
     

    
     const guildInfoEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Guild Information')
        .addFields(
            { name: 'Name', value: `${interaction.guild.name}`, inline: true },
            { name: 'ID', value: `${interaction.guild.id}`, inline: true },
            { name: 'Members', value: `${interaction.guild.memberCount}`, inline: true },
            { name: 'Language', value: `${interaction.guild.preferredLocale}`, inline: true},
            { name: 'Owner', value: `${gowner.username}`, inline: true },
            { name: 'Created At', value: `${interaction.guild.createdAt}`, inline: true },
        )
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter({text: 'Created by KAP6214 💖'})
        .setTimestamp();

     await interaction.reply ( { embeds: [guildInfoEmbed] });
  }
}
