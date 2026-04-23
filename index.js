const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

// قائمة البوتات (حط ايدي السيرفر والروات هنا)
const botsData = [
    { token: process.env.TOKEN1, channelId: '1495450046554964159', guildId: '1249305633849741392' },
    { token: process.env.TOKEN2, channelId: '1445355533698596955', guildId: '1249305633849741392' },
    { token: process.env.TOKEN3, channelId: '1445355502895759400', guildId: '1249305633849741392' },
    { token: process.env.TOKEN4, channelId: '1495236948674215998', guildId: '1249305633849741392' }
];

botsData.forEach((config, index) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

    client.on('ready', () => {
        console.log(`Bot ${index + 1} (${client.user.tag}) is Online!`);
        
        // وظيفة الدخول للروم كل 30 ثانية
        setInterval(() => {
            const channel = client.channels.cache.get(config.channelId);
            if (channel) {
                joinVoiceChannel({
                    channelId: config.channelId,
                    guildId: config.guildId,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                    selfDeaf: true // عشان ما يسمع أحد ويوفر نت
                });
            }
        }, 30000);
    });

    client.login(config.token).catch(err => console.error(`Error Login Bot ${index + 1}:`, err));
});

// سيرفر وهمي عشان Render يبقى شغال
const http = require('http');
http.createServer((req, res) => {
    res.write('Army of Bots is Running!');
    res.end();
}).listen(8080);
