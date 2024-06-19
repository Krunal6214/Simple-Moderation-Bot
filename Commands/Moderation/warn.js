const {SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder} = require("discord.js");
const config = require("../../config");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user")
    .addUserOption(option => option.setName("user").setDescription("Select a user").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Enter a reason").setRequired(true)),
  async execute(interaction) {
    const logchannel = interaction.guilds.channels.cache.get(config.modlogchannel);
    const user = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");
    const embed = new EmbedBuilder()
      .setTitle("Warn")
      .addFields(
          { name: 'Guild', value: `${interaction.guild.name}` },
          { name: 'By', value: `${interaction.user.username} \`${interaction.user.id}\`` },
          { name: 'Reason', value: `${reasonField}` }
      )
    .setColor('Random')
    .setFooter({text: 'Created by KAP6214 💖'})
    .setTimestamp()
    await interaction.reply({ content: `Warned ${user.user.username}`, ephemeral: true });
    await logchannel.send({ embeds: [embed] });
  }
}  
