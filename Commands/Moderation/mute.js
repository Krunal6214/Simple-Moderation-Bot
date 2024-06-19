const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout the selected user with or without a reason')
        .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
        .addIntegerOption(option => option.setName('duration').setDescription('Select a duration').addChoices({ name: '60 seconds', value: 60000 }, { name: '5 minutes', value: 300000 }, { name: '10 minutes', value: 600000 }, { name: '1 hour', value: 3.6e+6 }, { name: '1 day', value: 8.64e+7 }, { name: '1 week', value: 6.048e+8 }).setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Enter a reason')),
    
    async execute (interaction) {
      const logchannel = interaction.guild.channels.cache.get(config.modlogchannel);
      const userField = interaction.options.getMember('user');
      const durationField = interaction.options.getInteger('duration');
          if (userField.user.bot === true) return interaction.reply({ content: 'Error: You cannot timeout a bot.' });
          if (userField === interaction.member) return interaction.reply({ content: 'Error: You cannot timeout yourself.' });
          if (userField.isCommunicationDisabled() === true) return interaction.reply({ content: 'Error: This user is already being timeout.' });
      const reasonField = interaction.options.getString('reason')?? 'No reason provided';
      let resultDuration;
          if (durationField === 60000) resultDuration = '60 seconds';
          if (durationField === 300000) resultDuration = '5 minutes';
          if (durationField === 600000) resultDuration = '10 minutes';
          if (durationField === 3.6e+6) resultDuration = '1 hour';
          if (durationField === 8.64e+7) resultDuration = '1 day';
          if (durationField === 6.048e+8) resultDuration = '1 week';

      const embed = new EmbedBuilder()
          .setTitle('Timeout')
          .addFields(
            { name: 'User', value: `${userField.username} \`${userField.id}\`` },
            { name: 'By', value: `${interaction.username} \`${interaction.id}\`` },
            { name: 'Duration', value: `${resultDuration}` },
            { name: 'Reason', value: `${reasonField}` }
          )
          .setTimestamp()
          .setFooter({text: 'Created by KAP6214 💖'})
          .setColor('Random');
      await interaction.reply({ content:"Timeouted", ephemeral: true }).then(userField.timeout(durationField, reasonField));
      await logchannel.send({ embeds: [embed] });
    }
};
