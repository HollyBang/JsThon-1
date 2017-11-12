const Promise = require('bluebird');
Promise.config({
  cancellation: false
});

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '496344958:AAFsQLwrqNcw8iBNrtTfmXNrgYFn2KSJmh4';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
    
let Hi = "hi";
if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
bot.sendMessage(msg.chat.id,"Sam, che kak");
} 
    
});