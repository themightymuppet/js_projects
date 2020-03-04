const meows = [
    'https://tenor.com/view/heavy-breathing-cat-excited-amazed-stare-gif-5096315'
]

function getMessageContent(message) {
    return message.content.toLowerCase().trim()
}

const basicReplies = {
    'charlie is the best':  'aww, meowww',
    'i love charlie':  'I love you too!'
}

function createHandleMessage(client, audioReplies) {
    async function handleAudioReplies(message) {
        if (getMessageContent(message) === 'meow') {
            try {
                await audioReplies.meowing(message)
            } catch (err) {
                console.log('nope', err)
            }
        }
    }

 
    return async function handleMessage(message) {
        await handleAudioReplies(message)

        if (basicReplies[getMessageContent(message)]) {
            message.reply(basicReplies[getMessageContent(message)])
        }
        if (getMessageContent(message).includes('charlie') && getMessageContent(message) != 'i love charlie' ) {
            const emoji = client.emojis.find(emoji => emoji.name === "meow_wow");
            await message.reply(`i love you ❤️${emoji}`)
        }
        
        if (getMessageContent(message).includes('food')) {
            await message.channel.send('https://tenor.com/view/heavy-breathing-cat-excited-amazed-stare-gif-5096315')
        }
        
        if (getMessageContent(message).includes('cat')) {
            await message.channel.send('mreow!!')
        }

        if (getMessageContent(message).includes('good boye')) {
            const emoji = client.emojis.find(emoji => emoji.name === "yey");
            await message.channel.send(`I yam ${emoji}`)
        }
        
        if (getMessageContent(message).includes('hungry')) {
            await message.channel.send('https://tenor.com/view/heavy-breathing-cat-excited-amazed-stare-gif-5096315')
        }
        
        if (
            getMessageContent(message).includes('meow') &&
            !message.author.bot
        ) {
            const emoji = client.emojis.find(emoji => emoji.name === "meow_party");
            await message.channel.send(`mreow! ${emoji}`)
        }
        
        if (getMessageContent(message).includes('yoshi')) {
            await message.channel.send('grrr')
        } else if (getMessageContent(message).includes('trip')) {
            await message.channel.send('grr')
        }
    }

}




module.exports= createHandleMessage;