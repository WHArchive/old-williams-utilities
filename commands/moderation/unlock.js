const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "unlock",
    description: "Unlock a channel.",
    category: "moderation",
    aliases: ["unlockchannel"],
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
                    message.channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": null });
                    const channelUnlocked = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setTitle("Channel Unlocked")
                        .setDescription(`${emoji.unlock} Channel has been unlocked!`)
                        .setTimestamp()
                        .setFooter(`Channel Unlocked by: ${message.author.tag}`)

                    message.reply({ embeds: [channelUnlocked] });
                    return;
                }

                channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": null });
                const channelUnlock = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle("Channel Unlocked")
                    .setDescription(`${emoji.unlock} ${channel} has been unlocked!`)
                    .setTimestamp()
                    .setFooter(`Channel Unlocked by: ${message.author.tag}`)

                message.reply({ embeds: [channelUnlock] });

                const channelUnlocked = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle("Channel Unlocked")
                    .setDescription(`${emoji.unlock} Channel has been unlocked!`)
                    .setTimestamp()
                    .setFooter(`Channel Unlocked by: ${message.author.tag}`)

                channel.send({ embeds: [channelUnlocked] });
                return;
            }

            message.channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": null });
            const channelUnlocked = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setTitle("Channel Unlocked")
                .setDescription(`${emoji.unlock} Channel has been unlocked!`)
                .setTimestamp()
                .setFooter(`Channel Unlocked by: ${message.author.tag}`)

            message.reply({ embeds: [channelUnlocked] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}