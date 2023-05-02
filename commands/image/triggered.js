const dig = require("discord-image-generation");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "triggered",
    description: "Makes someone triggered.",
    category: "image",
    aliases: ["trigger"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.members.first() || message.author;
            const avatar = member.displayAvatarURL({ format: "png", size: 1024 });

            const image = await new dig.Triggered().getImage(avatar);
            const attachment = new Discord.MessageAttachment(image, "triggered.gif");

            message.reply({ files: [attachment] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}