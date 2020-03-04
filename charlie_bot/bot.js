global.channel;
process.setMaxListeners(0);
const Discord = require('discord.js');
const client = new Discord.Client();

const audioReplies = require('./audioReplies')(client)
const handleMessages = require('./handleMessages')(client, audioReplies)

const logger = require('winston');
const auth = require('./auth.json');
const spawn = require('child_process').spawn;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

client.on('ready', async function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    // logger.info(bot.username + ' - (' + bot.id + ')');
    
    await audioReplies.connectToShoops()
    client.on('message', handleMessages);

});

client.login(auth.token);

process.on('SIGINT', function () {
    console.log('leave')
    audioReplies.voiceless()
    client.destroy()
    process.exit()
});