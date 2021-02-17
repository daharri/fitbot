const { START, INTERVAL, COMMANDS } = require("../constants");
const { interval } = require("./timer");
const { createWelcomeMessage, createCommandsMessage } = require('../clients/createMessage');
const { convertToMiliseconds } = require("../helpers");

function readMessage(msg, client) {
  const messageText = msg.content
  const messageCommand = messageText.split(' ')[0];
  const broadcast = client.voice.createBroadcast();
  var channelId = msg.member.voice.channelID;
  var channel = client.channels.cache.get(channelId);

  if (messageCommand.startsWith('.')) {
    switch(messageCommand) {
      case START : 
        const welcomeMessage = createWelcomeMessage();
        msg.reply(welcomeMessage)
        break;
    case INTERVAL : 
        const parameters = messageText.split(' ');
        const onTime = convertToMiliseconds(parameters[1]);
        const offTime = convertToMiliseconds(parameters[2]);
        const rounds = parameters[3];
        if (channel) {
          channel.join().then(connection => {
            interval(onTime, offTime, rounds, { broadcast, connection });
          })
        } else {
          msg.reply('Please join a voice channel first')
        }
        break;
    case COMMANDS : 
        const commandMessage = createCommandsMessage();
        msg.reply(commandMessage);
        break;
    default :
      const badCommand = messageText.split(' ')[0];
      msg.reply(`${badCommand} is not a valid command. Try typing .help for more info`)
  }
  }
}

module.exports = {
  readMessage
}