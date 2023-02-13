
const { Client, Collection, EmbedBuilder, IntentsBitField } = require("discord.js");
const userdata = require(`./src/data/userdata`)
const marketdata = require('./src/data/marketdata');
const user = require("../../AppData/Locals/src/database/user");
const client = new Client({
    intents:  Object.keys(IntentsBitField.Flags) 
});

/* Configuration */
const settings = {
    token: "", 
    prefixCommands: ["."], 
    slashCommands: "global", 
    mongoDB: ""
}

client.on("voiceStateUpdate", async (oldState, newState) => {
    let user = newState.member;
    let oldChannel = oldState.channel;
    let newChannel = newState.channel;
  
    if (!oldChannel && newChannel) {
      let joinTime = new Date();
      setInterval(async() => {
        if (newState.channelId === newChannel.id) {
          let points = 10;
          let userda = userdata.findOne({userID: newState.member.id})
          userda.points += points;
          let kayıt = await userdata.findOneAndUpdate({userID: newState.member.id}, {$inc:  {points:points}}, {upsert: true})

        }
      },60000);

    }
   
       
  

    
})

/* Handlers */
import("./handler.js");
global.client = client;

/* Login */
client.login(settings.token)
    .then(() => console.log("[BOT] Bota giriş yapıldı!"))
    .catch(e => console.log("[BOT] Bota giriş yapılırken bir hata oluştu:\n" + e));

/* Export */
module.exports = settings;


