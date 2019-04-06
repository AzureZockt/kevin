const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const ytdl = require('ytdl-core');
function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var prefix = ".";
var token = "NTYyNjg2NDQ3MTc0NDE4NDQy.XKhtvQ.QKzkNgIEK1GUipj-gLMix2GBG_w";



client.on("ready", () => {
  console.log(" Logged in! Server count: ${client.guilds.size}");
  client.user.setActivity(' On .help', { type: 'WATCHING' });
});
client.on("message", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + `nuke`)) {
        async function clear() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: 99});
            msg.channel.bulkDelete(fetched);
        }
        clear();
    }
});

client.on('ready', () => {
  console.log('I am ready!');
});
// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}\nMake sure to read #info`);
});
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

 
if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`Kevins's Commands`)
    .setColor(0xCF40FA)
    .setDescription(`Hello! I'm a bot developed by nopeAZU to assist you.\nHere are my commands:`)
    .addField(`Tickets`, `[${prefix}tickets]() > Opens up a menu with the commands for tickets`)
    .addField(`Redeem`, `[${prefix}redeem]() >Opens up a help menu for redeeming`)
	.addField(`Spielen`, `[${prefix}spielen]() >Darf der Kevin zu mir spielen kommen?`)
    .addField(`Other`, `[${prefix}other]() >Opens up a menu with the remaining talents of the bot`)
    message.channel.send({ embed: embed });
}

if (message.content.toLowerCase().startsWith(prefix + `tickets`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: Tickets Help`)
    .setColor(0xCF40FA)
    .setDescription(`Hello! I'm Tickets, the Discord bot for super cool support ticket stuff and more! Here are my commands:`)
    .addField(`Tickets`, `[${prefix}new]() > Opens up a new ticket and tags the Support Team\n[${prefix}close]() > Closes a ticket that has been resolved or been opened by accident`)
    .addField(`Other`, `[${prefix}help]() > Shows you this help menu your reading\n[${prefix}about]() > Tells you all about Tickets`)
    message.channel.send({ embed: embed });
}

 if (message.content.toLowerCase().startsWith(prefix + `about`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`About Tacos`)
    .setColor(0xCF40FA)
    .setDescription(`Hello! I'm Tacos, a  bot developed by  AzureServices.\nJoin Our Server: https://discord.gg/EedZqqP`)
    message.channel.send({ embed: embed });
  }
  
if (message.content.toLowerCase().startsWith(prefix + `other`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`Other`)
    .setColor(0xCF40FA)
    .setDescription(`These are the remaining commands:`)
    .addField(`Other`, `[${prefix}help]() > Shows you help menu\n[${prefix}ping]() > Pings the bot to see how long it takes to react\n[${prefix}about]() > Tells you all about Tacos`)
    message.channel.send({ embed: embed });
}
  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`Hoold on!`).then(m => {
    m.edit(`:ping_pong: Wew, made it over the ~waves~ ! **Pong!**\nMessage edit time is ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API heartbeat is ` + Math.round(client.ping) + `ms.`);
    });
}

if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`Support-Ticket`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Team** will be here soon to help.`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`-confirm\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

if (message.content.toLowerCase().startsWith(prefix + `spielen`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:rage:  NEIN, der Kevin darf nicht spielen kommen! `)
	.addField({files: ["https://i.imgur.com/tfgO7Gn.jpg"]})
    message.channel.send({ embed: embed });
}

if (message.content.toLowerCase().startsWith(prefix + `doch`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:innocent:  OK, du kannst ihn ja bezahlen.`)
	.addField(`1JFQrb3NPpS5FVT1BhFXzyBCC1PdZvrktk`)
    message.channel.send({ embed: embed });
}

if (message.content.toLowerCase().startsWith(prefix + `redeem`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:money_with_wings: Redeem Help `)
	.setColor(0xCF40FA)
    .setDescription(`Enter the following commands to redeem the Key:`)
	.addField(`!redeem <Country> <Key> <Email>`)
    message.channel.send({ embed: embed });
}

});
client.on('message', message => {
	if (message.content === 'Who is the King?') 	
     message.react('563036277801484298');
	 message.channel.send(`@nope.azu is the King, sir.`);

});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["nopeAZU"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["nopeAZU"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login('NTYyNjg2NDQ3MTc0NDE4NDQy.XKhtvQ.QKzkNgIEK1GUipj-gLMix2GBG_w');
client.login(token);
