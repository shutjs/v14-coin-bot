const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const userdata = require(`../../data/userdata`)
const marketdata = require(`../../data/marketdata`);
const { find } = require("../../data/userdata");

module.exports =  {
        data: {
        name: "me",
        aliases: [],
        usage: "me",
		cooldown: 10,
        description: "me gösterir.",
        slash: new SlashCommandBuilder()
                },
        
async executePrefix(client, message, args) {
    console.log(message.author)
        let userdatas = await userdata.findOne({userID: message.author.id})
       let embed = new EmbedBuilder()
       .setThumbnail(message.guild.iconURL())
       .setColor("2F3136")

.setDescription(`**Adın:** ${message.author.username}#${message.author.discriminator}
**Coin:** ${userdatas.points}       
       
       `)
       message.channel.send({embeds: [embed]})
    }
}