const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

http.createServer((req, res) => res.end('Bot is running')).listen(8080);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is Online!`);
    setInterval(() => {
        const guild = client.guilds.cache.first();
        if (guild) {
            joinVoiceChannel({
                channelId: '1495236948674215998',
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfMute: true,
                selfDeaf: true
            });
        }
    }, 30000); 
});

client.login(process.env.TOKEN);
