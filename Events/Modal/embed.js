const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
     const {guild,user, member, customId, channel} = interaction;
     if(!interaction.isModalSubmit()) return;
     if(interaction.customId === 'embedmodal'){
       const username = interaction.user.username;
       const avatar = interaction.user.displayAvatarURL();
       const title = interaction.fields.getTextInputValue('titleinput');
       const description = interaction.fields.getTextInputValue('descriptioninput');
       const footer = interaction.fields.getTextInputValue('footerinput');
       const embed = new EmbedBuilder()
         .setAuthor({ name: username , iconURL: avatar })
         .setTitle('⭐' + title + '⭐')
         .setDescription(description)
         .setFooter({text: footer})
         .setTimestamp()
         .setColor('Random');
       await interaction.reply({embeds: [embed]});
       await interaction.followUp ( { content: 'Your embed has been sent!', ephemeral: true });
     }
  }
}
