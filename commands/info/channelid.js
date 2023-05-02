const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "channelid",
    description: "Get the ID of a channel.",
    category: "info",
    aliases: [],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const channel = message.mentions.channels.first();

            if(!channel) {
                const channelID = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.information} This channel's ID is: \`${message.channel.id}\``)

                message.reply({ embeds: [channelID] });
                return;
            }

            const channelID = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.information} ${channel}'s ID is: \`${channel.id}\``)

            message.reply({ embeds: [channelID] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}