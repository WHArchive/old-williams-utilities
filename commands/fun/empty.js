const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "empty",
    description: "Uses a bug where a bot can send an empty message.",
    category: "fun",
    aliases: ["emptymessage"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "10",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const emptyEmbed = new Discord.MessageEmbed()
                .setDescription("Empty Message")

            message.channel.send({ embeds: [emptyEmbed] })
                .then(msg => msg.suppressEmbeds(true) );
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}