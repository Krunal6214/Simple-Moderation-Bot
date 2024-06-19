const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lock this channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const logchannel = interaction.guild.channels.cache.get(config.modlogchannel);
    const channel = interaction.channel;
    const everyoneRole = interaction.guild.roles.everyone;

    try {
      await channel.permissionOverwrites.edit(everyoneRole, {
        SendMessages: false,
      });

      const embed = new EmbedBuilder()
        .setTitle('Channel Locked')
        .setDescription(`This channel has been locked by ${interaction.user.username}.`)
        .setFooter({text: 'Created by KAP6214 💖'})
        .setColor('#FF0000');

      await interaction.reply({ embeds: [embed] , ephemeral: true });
      await logchannel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error locking channel:', error);
      await interaction.reply('An error occurred while locking the channel.');
    }
  }
}
