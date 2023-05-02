const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "id",
    description: "Get a user's ID.",
    category: "info",
    aliases: ["userid"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const user = message.mentions.users.first();

            if(user) {
                const userID = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.information} ${user}'s ID is: \`${user.id}\``)

                message.reply({ embeds: [userID] });
                return;
            }

            const authorID = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.information} Your ID is: \`${message.author.id}\``)

            message.reply({ embeds: [authorID] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}