const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

// إعدادات السيرفر والرومات اللي عطيتني إياها
const guildId = '1249305633849741392';
const botsData = [
    { token: process.env.TOKEN1, channelId: '1495450046554964159' },
    { token: process.env.TOKEN2, channelId: '1445355533698596955' },
    { token: process.env.TOKEN3, channelId: '1445355502895759400' },
    { token: process.env.TOKEN4, channelId: '1495240194306343005' }
];

botsData.forEach((config, index) => {
    const client = new Client({ 
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] 
    });

    client.on('ready', () => {
        console.log(`Bot ${index + 1} (${client.user.tag}) is Online!`);
        
        // محاولة الدخول للروم المخصص له
        setInterval(() => {
            try {
                const channel = client.channels.cache.get(config.channelId);
                if (channel) {
                    joinVoiceChannel({
                        channelId: config.channelId,
                        guildId: guildId,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                        selfDeaf: true
                    });
                }
            } catch (error) {
                console.error(`Error for Bot ${index + 1}:`, error);
            }
        }, 30000); // يفحص كل 30 ثانية عشان يضمن البقاء
    });

    client.login(config.token).catch(err => console.error(`Login failed for Bot ${index + 1}:`, err));
});

// سيرفر وهمي عشان Render ما يطفي الخدمة
const http = require('http');
http.createServer((req, res) => {
    res.write('Army of Bots is Live!');
    res.end();
}).listen(8080);
