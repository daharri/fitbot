const discordTTS = require("discord-tts")

async function setSpeechToText (text, channelInfo) {
  return new Promise(resolve => {
    const { broadcast, connection } = channelInfo
    broadcast.play(discordTTS.getVoiceStream(`${text}`));
    connection.play(broadcast);
    resolve('done')
  })
}

function timer (length, text, channelInfo) {
  console.log('Starting counter', length)
  return new Promise(resolve => {
    if (text) {
      setTimeout(resolve(setSpeechToText(text, channelInfo)), length)
    } else {
      setTimeout(resolve, length)
    }
  })
}

async function interval (on, off, rounds, channelInfo, shouldCount = true) {
  let onCount = on;
  let offCount = off;
  if (shouldCount) {
    onCount = on - 3000
    offCount = off - 3000
  }
  for (let i = 0; i < rounds; i++) {
    await setSpeechToText('Start', channelInfo)

    await timer(onCount)
    shouldCount && await countdown(3000, channelInfo)

    await timer(offCount, 'Rest', channelInfo)
    shouldCount && await countdown(3000, channelInfo)

  }
  await setSpeechToText('Done', channelInfo)
}

async function countdown (length, channelInfo) {
  for(let i = length / 1000; i > 0; i--) {
    await timer(1000).then(async () => {
      await setSpeechToText(i, channelInfo)
    })
  }
}

module.exports = {
  interval
}