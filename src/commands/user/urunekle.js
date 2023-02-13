const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType,ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder,PermissionFlagsBits } = require("discord.js");
const userdata = require(`../../data/userdata`)
const marketdata = require(`../../data/marketdata`);
const { find } = require("../../data/userdata");

module.exports =  {
	data: {
		name: "urunekle",
        aliases: [],
        usage: "urunekle",
		cooldown: 0,
        description: "urunekle.",
        slash: new SlashCommandBuilder().setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		},

    async executeSlash(interaction) {
        const modal = new ModalBuilder()
        .setCustomId('urunmodal')
        .setTitle('Ürün Ekle')
        .setComponents(
            new ActionRowBuilder().setComponents(
            new TextInputBuilder() 
                .setRequired(true)
                .setCustomId('urunAd')
                .setLabel("Ürün Ismi")
                .setMinLength(1)
                .setMaxLength(32)
                .setStyle(TextInputStyle.Short)
            ),
            new ActionRowBuilder().setComponents(  
            new TextInputBuilder() 
            .setCustomId('urunpara')
            .setMinLength(1)
            .setMaxLength(32)
            .setPlaceholder('Urun Parası Giriniz')
			.setLabel("Urun Parası")
			.setStyle(TextInputStyle.Short)
            )
         );
		await interaction.showModal(modal);
        const modalSubmitInteraction = await interaction.awaitModalSubmit({
            filter: (i) => {
           
              
              return true;
            },
            time: 120000, 
          });
          let ad =  modalSubmitInteraction.fields.getTextInputValue('urunAd')
              let para = modalSubmitInteraction.fields.getTextInputValue('urunpara')
              let lastUsedId = 0;
              
              const urunler = await marketdata.find();
              const urunID = urunler.length + 1;
              let urun = new marketdata({ 
               urunAd: ad,
               urunPara: para,
               urunID: urunID
              }).save()
              
          modalSubmitInteraction.reply({
            content: `Urun Eklendi. `,
            ephemeral: true,
          });
    }}
