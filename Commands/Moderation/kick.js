const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');


module.exports = {
   data: new SlashCommandBuilder()
     .setName('kick')
     .setDescription('Kick the selected user with or without a reason') 
     .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
     .addStringOption(option => option.setName('reason').setDescription('Enter a reason'))
     .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

   async execute (interaction) {
      const logchannel = interaction.guild.channels.cache.get(config.modlogchannel);
      const userField = interaction.options.getMember('user');
        if (userField.user.bot === true) return interaction.reply({ content: 'Error: You cannot ban a bot.' });
        if (userField === interaction.member) return interaction.reply({ content: 'Error: You cannot ban yourself.' });
        if (userField.user.id === interaction.guild.ownerId) return interaction.reply({ content: 'Error: You cannot ban a Guild Owner.' });
        if (userField.permissions.has('Administrator')) return interaction.reply({ content: 'Error: You cannot ban a user with Administrator permission.' });
      const reasonField = interaction.options.getString('reason')?? 'No reason provided';       
      const log = new EmbedBuilder()
         .setTitle('Kick')
         .addFields(
            { name: 'User', value: `${userField.user.username} \`${userField.user.id}\`` },
            { name: 'By', value: `${interaction.user.username} \`${interaction.user.id}\`` },
            { name: 'Reason', value: `${reasonField}` }
         )
         .setFooter({text: 'Created by KAP6214 💖'})
         .setTimestamp()
         .setColor('Red');
      await userField.kick(userField);
      await interaction.reply({ content : `Kicked ${userField.user.username} `, ephemeral: true});
      await logchannel.send({embeds:[log]});
   }
}   
