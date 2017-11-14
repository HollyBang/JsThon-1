const Telegraf = require('telegraf')
const { reply } = Telegraf


//spam store
var spamModule = (function(){
  let spamStore = [];
  return {
      getSpamStore: function(){
           return spamStore;   
      },
      pushSpamWord: function(spam){
           spamStore.push(spam) 
      }
  };
})();

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})
bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))
//get all spam in store
bot.command('getspam', (ctx) => { 
   let allSpam = spamModule.getSpamStore().join(', ')
 return ctx.reply(`Список слов в спаме: ${allSpam}`)
})
//add spam word
bot.hears(/(\/spam|\/спам) [a-zа-яё]+/i, (ctx) => {
  let receivedMessage = ctx.message.text;
  let spamWord = receivedMessage.split(' ')[1];
  spamModule.pushSpamWord(spamWord);
  return ctx.reply(`Добавил в спам ${spamWord}`)
})
bot.hears('hi', (ctx) => ctx.reply('Hey there!'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.startPolling()