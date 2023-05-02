const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "lock",
    description: "Lock a channel.",
    category: "moderation",
    aliases: ["lockchannel"],
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const channel = message.mentions.channels.first();
            const role = message.guild.roles.cache.find(role => role.name === "@everyone");

            if(channel) {
                if(message.channel.id === channel.id) {
                    message.channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": false });

                    const channelLocked = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setTitle("Channel Locked")
                        .setDescription(`${emoji.lock} Channel has been locked!`)
                        .setTimestamp()
                        .setFooter(`Channel Locked by: ${message.author.tag}`)

                    message.reply({ embeds: [channelLocked] });
                    return;
                }

                channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": false });

                const channelLock = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle("Channel Locked")
                    .setDescription(`${emoji.lock} ${channel} has been locked!`)
                    .setTimestamp()
                    .setFooter(`Channel Locked by: ${message.author.tag}`)

                message.reply({ embeds: [channelLock] });

                const channelLocked = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle("Channel Locked")
                    .setDescription(`${emoji.lock} Channel has been locked!`)
                    .setTimestamp()
                    .setFooter(`Channel Locked by: ${message.author.tag}`)

                channel.send({ embeds: [channelLocked] });
                return;
            }

            message.channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": false });

            const channelLocked = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setTitle("Channel Locked")
                .setDescription(`${emoji.lock} Channel has been locked!`)
                .setTimestamp()
                .setFooter(`Channel Locked by: ${message.author.tag}`)

            message.reply({ embeds: [channelLocked] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}