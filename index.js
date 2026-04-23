const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const guildId = '1249305633849741392';
const bots = [
    { t: process.env.TOKEN1, c: '1495450046554964159' },
    { t: process.env.TOKEN2, c: '1445355533698596955' },
    { t: process.env.TOKEN3, c: '1445355502895759400' },
    { t: process.env.TOKEN4, c: '1495240194306343005' }
];

bots.forEach((bot, i) => {
    if (!bot.t) return; // لو التوكن مو موجود يسحب عليه
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

    client.on('ready', () => {
        console.log(`Bot ${i + 1} (${client.user.tag}) Locked to Room: ${bot.c}`);
        
        setInterval(() => {
            const channel = client.channels.cache.get(bot.c);
            if (channel) {
                joinVoiceChannel({
                    channelId: bot.c,
                    guildId: guildId,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                    selfDeaf: true
                });
            }
        }, 20000); // كل 20 ثانية يثبت مكانه
    });

    client.login(bot.t);
});

require('http').createServer((req, res) => { res.write('Fixed!'); res.end(); }).listen(8080);
