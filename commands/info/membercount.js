const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "membercount",
    description: "Get the guild member count.",
    category: "info",
    aliases: ["members"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const totalMembers = message.guild.memberCount;

            const memberCount = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`Members: \`${totalMembers}\``)

            message.reply({ embeds: [memberCount] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}