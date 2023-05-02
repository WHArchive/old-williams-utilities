const moment = require("moment");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "user",
    description: "Get information about a user.",
    category: "info",
    aliases: ["userinfo", "user-info"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const user = message.mentions.users.first();

            if(user) {
                const userInfo = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(user.username, user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("User Information")
                    .addFields (
                        {name: "Username", value: user.username},
                        {name: "Tag", value: user.tag},
                        {name: "ID", value: user.id},
                        {name: "Creation Date", value: `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} UTC`}
                    )

                message.reply({ embeds: [userInfo] });
                return;
            }

            const authorInfo = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("User Information")
                .addFields (
                    {name: "Username", value: message.author.username},
                    {name: "Tag", value: message.author.tag},
                    {name: "ID", value: message.author.id},
                    {name: "Creation Date", value: `${moment.utc(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} UTC`}
                )

            message.reply({ embeds: [authorInfo] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}