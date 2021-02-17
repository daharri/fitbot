const Discord = require('discord.js')
const client = new Discord.Client()
const { readMessage } = require('./clients/readMessage')
const { authorizedChannels, authorizedDevChannels } = require('./settings.json')

require('dotenv').config()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", async msg => {
  const environment = process.env.NODE_ENV
  if ((environment === 'production' && authorizedChannels.includes(msg.channel.id)) || (environment === 'development' && authorizedDevChannels.includes(msg.channel.id))) {
    await readMessage(msg, client)
  }
})

client.login(process.env.DISCORD_TOKEN)