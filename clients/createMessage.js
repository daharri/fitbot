const { INTERVAL, START, COMMANDS, HELP } = require('../constants');
const { embedMessage } = require('../helpers')

function createWelcomeMessage () {
  const helpInfo = [
    {
      name: 'Info',
      value: 'To find a list of commands, type `.commands`'
    },
    {
      name: 'Creators',
      value: 'Darius Harrison'
    },
    {
      name: 'Contribute',
      value: 'Code Repository: https://github.com/daharri/fit-bot'
    },
    {
      name: 'Feedback',
      value: 'Issues: https://github.com/daharri/fit-bot/issues/new'
    }
  ];

  return embedMessage({
    title: 'How To Use',
    description: 'Below you will find useful information for interacting with fit bot',
    fields: [...helpInfo]
  });
}

function createCommandsMessage () {
  const commands = [
    {
      name: START,
      value: 'This command will show details of the current book',
      inline: true
    },
    {
      name: INTERVAL,
      value: 'Set a counter with specified on timer, off timer, and the number of rounds  \n`.interval {time on} {time off} {rounds}`',
      inline: true
    },
    {
      name: COMMANDS,
      value: 'This command will list all available commands'
    },
    {
      name: HELP,
      value: 'This command provides you with useful information for interacting with Fit Bot'
    },
  ];
  return embedMessage({
    title: 'Commands',
    description: 'Below you will find a list of useful commands',
    fields: [...commands]
  });
}

module.exports = {
  createWelcomeMessage,
  createCommandsMessage
}