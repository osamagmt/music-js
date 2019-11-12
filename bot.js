const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://tttt.glitch.me/`);
}, 280000);



const Discord = require('discord.js');
const Util = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const ytdl = require('ytdl-core');
const fs = require('fs');
 
 const prefix = "#";
 const VIP = ['',''];

client.on('ready',async () => {
  client.channels.find(ch => ch.id === "ID_ROOM" && ch.type === 'voice').join();
});
 
const client = new Discord.Client({disableEveryone: true});
 
/// البريفكس حق البوت
 
client.on('message', async msg =>{
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
   
    let args = msg.content.split(' ');
 
    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length)
 
    if(command ===   `ping`) {
    let embed = new Discord.RichEmbed()
    .setColor(3447003)
    .setTitle("Pong!!")
    .setDescription(`${client.ping} ms,`)
    .setFooter(`Requested by | ${msg.author.tag}`);
    msg.delete().catch(O_o=>{})
    msg.channel.send(embed);
    }
});
 
client.on('message', async msg =>{
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
   
    let args = msg.content.split(' ');
 
    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length)
 
    if(command === `avatar`){
    if(msg.channel.type === 'dm') return msg.channel.send("Nope Nope!! u can't use avatar command in DMs (:")
        let mentions = msg.mentions.members.first()
        if(!mentions) {
          let sicon = msg.author.avatarURL
          let embed = new Discord.RichEmbed()
          .setImage(msg.author.avatarURL)
          .setColor("#5074b3")
          msg.channel.send({embed})
        } else {
          let sicon = mentions.user.avatarURL
          let embed = new Discord.RichEmbed()
          .setColor("#5074b3")
          .setImage(sicon)
          msg.channel.send({embed})
        }
    };
});
 
 
 
client.on('message', async msg => {
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
   
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
   
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
 
    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length)
 
 
    if (command === `play`) {
 
   
        const voiceChannel = msg.member.voiceChannel;
       
        if (!voiceChannel) return msg.channel.send(":no_entry_sign: You must join a voice channel to use that!");
       
        const permissions = voiceChannel.permissionsFor(msg.client.user);
       
        if (!permissions.has('CONNECT')) {
 
            return msg.channel.send("You Don't Have to join is channel");
        }
       
        if (!permissions.has('SPEAK')) {
 
            return msg.channel.send("You can't speak in this room");
        }
 
        if (!permissions.has('EMBED_LINKS')) {
 
            return msg.channel.sendMessage( 'Ido not have permission  ``EMBED_LINKS`` ')
        }
            voiceChannel.join()
 
      if(!args[1]) return msg.channel.send(`:bulb: Play Commands:
 
\`\`${prefix}play <song title>\`\` - plays the first result from Youtube
\`\`${prefix}play <URL>\`\` - plays the provided song, playlist, or stream`)
 
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
 
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
           
 
            for (const video of Object.values(videos)) {
               
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
            return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);
        } else {
 
            try {
 
                var video = await youtube.getVideo(url);
               
            } catch (error) {
                try {
 
                    var videos = await youtube.searchVideos(searchString, 5);
                    let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle(":mag_right:  YouTube Search Results :")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
                   
                    .setColor("#f7abab")
           
                   
/////////////////                  
               
                   
                    var video = await youtube.getVideoByID(videos[0].id);
                   
                } catch (err) {
 
                    console.error(err);
                    return msg.channel.send("I didn't find any results!");
                }
            }
 
            return handleVideo(video, msg, voiceChannel);
           
        }
       
    } else if (command === `skip`) {
 
        if (!msg.member.voiceChannel) return msg.channel.send(":no_entry_sign: You must join a voice channel to use that!");
        if (!serverQueue) return ;
 
        serverQueue.connection.dispatcher.end( `:notes: Skipped asdasd - <@${msg.author.id}>`);
    msg.channel.send( `:notes: Skipped asdasd - <@${msg.author.id}>`);
   
                return undefined;
 
    } else if (command === `stop`) {
 
        if (!msg.member.voiceChannel) return msg.channel.send(":no_entry_sign: You must join a voice channel to use that!");
        if (!serverQueue) return msg.channel.send(":notes: The player has stopped and the queue has been cleared.");
 
       
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end(':notes: The player has stopped and the queue has been cleared.');
        return undefined;
       
    } else if (command === `vol`) {
 
     if (!msg.member.voiceChannel) return msg.channel.send(":no_entry_sign: You must join a voice channel to use that!");
        if (!serverQueue) return msg.channel.send(' The bot is not playing :interrobang:');
        if (!args[1]) return msg.channel.send(`:speaker: Current volume is **${serverQueue.volume}**`);
    if(args[1] > 100 || args[1] <10) return msg.channel.send(':no_entry_sign: Volume must be a valid integer between ``10`` and ``100``' )
       
        serverQueue.volume = args[1];
   
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
       
        return msg.channel.send(`:loud_sound: Volume changed on \`\`${args[1]}\`\``);
 
    } else if (command === `np`) {
 
        if (!serverQueue) return msg.channel.send('There is no Queue!');
 
        return msg.channel.send(`:arrow_forward: **${serverQueue.songs[0].title}**`)
       
    } else if (command === `queue`) {
       
        if (!serverQueue) return msg.channel.send('There is no Queue!!');
//  //  //
        const embedqu = new Discord.RichEmbed()
        .setTitle(`:notes: Current Queue | ${serverQueue.songs.length -1} entries`)
        .setDescription(`
        ${serverQueue.songs.map((song,index) => index ==0 ?null : `**[${index}]** ${song.title} - `).join('\n')}`)
        .setColor("#4f545c")
        return msg.channel.send(`:arrow_forward: **${serverQueue.songs[0].title}**`).then((a)=>{
      msg.channel.sendEmbed(embedqu);
    })  
   
    } else if (command === `pause`) {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send(` :notes: Paused **${serverQueue.songs[0].title}** `);
        }
        return msg.channel.send(' The player is already paused! Use '+prefix+'``resume`` to unpause!');
    } else if (command === "resume") {
//  سنايس
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send(`:notes: Resumed **${serverQueue.songs[0].title}** `);
           
        }
        return msg.channel.send('Queue is empty!');
    }
 
    return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
   
 
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
    user: msg.author
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 7.5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}!`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`Can't join this channel: ${error}!`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(` :notes: **${song.title}** Added to **Queue** !`);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
    if (!song) {
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 8);
 
    serverQueue.textChannel.send(` :notes: **${song.title}** Added to **Queue** !`);
}
 
 
 
client.on("message", async message => {
 let sm ={}
 const argsa = message.content.slice(prefix.length).trim().split(/ +/g);
   const command = argsa.shift().toLowerCase();
   if(message.author.bot) return;
   if(message.content.indexOf(prefix) !== 0) return;
 
   if (command == "help") {
     
          message.react('🎶');
 
let botembed = new Discord.RichEmbed()
   
     .setTitle('**Music Commande...**')
       .setDescription(`Bot prefix < **${prefix}** >`)
       .addField('play', 'start music ')
       .addField('skip', 'Skip the song')
       .addField('pause', 'Pause the song')
       .addField('resume', 'unpause')
       .addField('queue', 'shows the current queue')
       .addField('np', 'Show the song you are currently playing')
 
     .setFooter(`${message.author.username}`, message.author.displayAvatarURL);
     
     
     return message.author.send(botembed);
 
 
         }
 
 });
 
 client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
if (!VIP.includes(message.author.id)) return;
if (message.content.startsWith(prefix + 'setname')) {
  client.user.setUsername(argresult).then
	  message.channel.sendMessage(`Username Changed To **${argresult}**`)
  return message.reply("You Can change the username 2 times per hour");
} else
if (message.content.startsWith(prefix + 'setavatar')) {
  client.user.setAvatar(argresult);
   message.channel.sendMessage(`Avatar Changed Successfully To **${argresult}**`);
} else
  if (message.content.startsWith(prefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/osama_gmt");
      message.channel.send(`Streming Changed To **${argresult}**`)
  }
});
 
client.login('');
