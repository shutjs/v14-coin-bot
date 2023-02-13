const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const userdata = require(`../../data/userdata`)
const marketdata = require(`../../data/marketdata`);
const { find } = require("../../data/userdata");

module.exports =  {
	data: {
		name: "market",
        aliases: [],
        usage: "market",
		cooldown: 0,
        description: "Marketi gösterir.",
       
		},

    async executePrefix(client, message, args) {
        if (args.length === 0) {
            const products = await marketdata.find({});
            const embed2 = new EmbedBuilder()
            .setTitle("Ürün Listesi")
            .setThumbnail(message.guild.iconURL())
            .setColor("2F3136")
            products.forEach(product => {
            embed2.addFields(
                {name: `${product.urunAd}`, value: `**ID: ${product.urunID} - Fiyat: ${product.urunPara}**`}
            )

            });
            message.channel.send({embeds: [embed2] });
            return;
        }
     
        const marketID = args[0]
       
        const product = await marketdata.findOne({ urunID: marketID });

        if (!product) {
          message.reply("Bu ürün bulunamadı.");
          return;
        }
    let userdatas = await userdata.findOne({userID: message.author.id})
   if(!userdatas) return message.channel.send("sese giriniz")
    if(userdatas.points < product.urunPara) return message.reply(`Yeterli Paran Yok Mevcut Paran: ${userdatas.points}`)
    let coinsil = product.urunPara - userdatas.points;

  let sil = await  userdata.updateOne({ userID: message.author.id }, { $set: { points: -coinsil } })
       
    const embed = new EmbedBuilder()
      .setTitle("Ürün Satın Alındı")
      .setThumbnail(message.guild.iconURL())
            .setColor("2F3136")
      .setDescription(`**Ürün İsmi** ${product.urunAd}
**Ürün ID** ${product.urunID}
**Ürün Fiyatı** ${product.urunPara}
**Satın Alan Kullanıcı** ${message.author.username}#${message.author.discriminator}
**Kullanıcı ID** ${message.author.id}
`)

    const logChannel = client.channels.cache.get("1054752648886222933");
    logChannel.send({embeds: [embed]});
   
    }
}
