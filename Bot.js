const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({ authStrategy: new LocalAuth() });
client.on('qr', qr => qrcode.generate(qr, {small: true}));
client.on('ready', () => console.log('Bot Ready!'));
client.on('message', async msg => {
  if(msg.body === '!rules'){
    msg.reply('📌 Group Rules:\n1. Link දාන්න එපා\n2. Spam එපා\n3. Respect එකෙන් ඉන්න');
  }
  if(msg.body === '!everyone'){
    let chat = await msg.getChat();
    if(chat.isGroup){
      let text=''; let mentions=[];
      for(let p of chat.participants){ mentions.push(p.id._serialized); text+=`@${p.id.user} `; }
      await chat.sendMessage(text, {mentions});
    }
  }
});
client.initialize();
