const fs = require('fs')

let channel;
const  mainVoiceServer = '600056861848240137';

function getFiles(path) {
  const ls = fs.readdirSync( `./assets/${path}`)
  return ls.map(fn => `./assets/${path}/${fn}`)

}

const theMeows = getFiles('meows')

function waitFor(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

module.exports = (client) => {
  async function connectToShoops() {

    if (channel && channel.id !== mainVoiceServer) {
      channel.leave()
    }
    
    channel = client.channels.get(mainVoiceServer)
    const connection = await channel.join()

    client.on('voiceStateUpdate', async (oldMember, newMember) => {
      let newUserChannel = newMember.voiceChannel

      if (newUserChannel !== undefined && newUserChannel.id === mainVoiceServer) {
        console.log('new user')

      } else if (newUserChannel === undefined) {

        // User leaves a voice channel

      }
    })
  }

  async function connectToUserChannelAndPlay(message, thingyToPlay, opts) {
    return new Promise(async resolve => {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voiceChannel) {
        if (channel && channel.id !== message.member.voiceChannel.id) {
          await channel.leave()
        }
        const connection = await message.member.voiceChannel.join();
        console.log('connected and will play [somthing]')
        let dispatcher;
        if (typeof thingyToPlay === 'string') {
          dispatcher = connection.playFile(thingyToPlay, opts);
        } else {
          dispatcher = connection.playStream(thingyToPlay, opts);
        }

        // (╯°□°)╯︵💻
        //          |🔥|
        dispatcher.on('start', () => {
          // This prevent the stream to block everything forever
          // even if it had been closed already. Cause nothing makes sense anymore
          connection.player.streamingData.pausedTime = 0;
        });
        dispatcher.on('end', async () => {
          console.log('Finished playing!');
          await connectToShoops()
          resolve()
        });

      } else {
        message.reply('mreow?');
      }
    })
  }

  async function meowing(message) {
    return connectToUserChannelAndPlay(message, theMeows[Math.floor(Math.random() * theMeows.length)])
  }

  function voiceless() {
    if (channel) {
      channel.leave()
    }
  }

  return {
    connectToShoops,

    connectToUserChannelAndPlay,

    meowing,


    voiceless
  }
}