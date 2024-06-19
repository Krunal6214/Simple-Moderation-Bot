// an emebed command using modal

const { SlashCommandBuilder, ModalBuilder,PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('A command to create an embed message.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction, Client) {
    const modal = new ModalBuilder()
      .setCustomId('embedmodal')
      .setTitle('Create an embed message');

    const titleInput = new TextInputBuilder()
      .setCustomId('titleinput')
      .setLabel('Title')
      .setStyle(TextInputStyle.Short);

    const descriptionInput = new TextInputBuilder()
      .setCustomId('descriptioninput')
      .setLabel('Description')
      .setStyle(TextInputStyle.Paragraph);

    const colorInput = new TextInputBuilder()
      .setCustomId('footerinput')
      .setLabel('Footer text? [Use "Thank You 🙂" by default]')
      .setStyle(TextInputStyle.Short);

    const titleRow = new ActionRowBuilder().addComponents(titleInput);
    const descriptionRow = new ActionRowBuilder().addComponents(descriptionInput);
    const footerRow = new ActionRowBuilder().addComponents(colorInput);

    modal.addComponents(titleRow, descriptionRow, footerRow);

    await interaction.showModal(modal);

  }
}
