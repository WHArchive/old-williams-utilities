const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "guildid",
    description: "Get the ID of the current guild.",
    category: "info",
    aliases: ["serverid"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const guildID = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.information} This guild's ID is: \`${message.guild.id}\``)

            message.reply({ embeds: [guildID] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}