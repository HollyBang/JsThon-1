const Telegraf = require('telegraf')
const { reply } = Telegraf


//spam store
let spamModule = (function(){
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
   let allSpam = spamModule.getSpamStore().join('; ')
 return ctx.reply(`Список спама:  ${allSpam}`)
})
//add spam 
//(\/spam|\/спам) (.*?)+ one paragraph
//(\/spam|\/спам) [a-zа-яё]+ one word
bot.hears(/(\/spam|\/спам) (.*?)+/i, (ctx) => {
  let receivedMessage = ctx.message.text;
  let spam = receivedMessage.split(' ').slice(1).join(' ');
  spamModule.pushSpamWord(spam);
  return ctx.reply(`Добавил в спам ${spam}`)
})
bot.hears('hi', (ctx) => ctx.reply('Hey there!'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.startPolling()