const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "lockdown",
    description: "Lockdown the guild.",
    category: "moderation",
    aliases: ["guildlockdown", "serverlockdown"],
    permissions: ["ADMINISTRATOR"],
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
    cooldown: "10",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(args[0] === "end") {
                const role = message.guild.roles.cache.find(role => role.name === "@everyone");

                message.guild.channels.cache.forEach(channel => {
                    if(channel.type === "GUILD_TEXT") {
                        channel.permissionOverwrites.edit(role, { SEND_MESSAGES: null })

                        const lockdownEnd = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setTitle("Server Lockdown End")
                            .setDescription(`${emoji.unlock} The server lockdown has ended!`)
                            .setTimestamp()
                            .setFooter(`Ended by: ${message.author.tag}`)
    
                        channel.send({ embeds: [lockdownEnd] });
                    }

                    if(channel.type === "GUILD_VOICE") {
                        channel.permissionOverwrites.edit(role, { CONNECT: null })
                    }
                })

                return;
            }

            const role = message.guild.roles.cache.find(role => role.name === "@everyone");

            message.guild.channels.cache.forEach(channel => {
                if(channel.type === "GUILD_TEXT") {
                    channel.updateOverwrite.edit(role, { SEND_MESSAGES: false })

                    const lockdown = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setTitle("Server Lockdown")
                        .setDescription(`${emoji.lock} The server has been locked down!`)
                        .setTimestamp()
                        .setFooter(`Started by: ${message.author.tag}`)
    
                    channel.send({ embeds: [lockdown] });
                }

                if(channel.type === "GUILD_VOICE") {
                    channel.permissionOverwrites.edit(role, { CONNECT: false })
                }
            })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}