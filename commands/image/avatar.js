const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "avatar",
    description: "Get a user's avatar.",
    category: "image",
    aliases: ["av", "pfp"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.users.first() || message.author;

            const url = member.displayAvatarURL({ format: "png", dynamic: true });

            const userAvatar = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setTitle(`${member.tag}'s Avatar`)
                .setImage(url)

            const avatarButton = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Link")
                        .setURL(url)
                )

            message.reply({ embeds: [userAvatar], components: [avatarButton] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}