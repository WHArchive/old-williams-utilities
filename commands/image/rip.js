const dig = require("discord-image-generation");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "rip",
    description: "\*dies\*",
    category: "image",
    aliases: ["restinpeace"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.members.first() || message.author;
            const avatar = member.displayAvatarURL({ format: "png" });

            const image = await new dig.Rip().getImage(avatar);
            const attachment = new Discord.MessageAttachment(image, "rip.png");

            message.reply({ files: [attachment] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}