const Meme = require("memer-api");
const memer = new Meme(process.env.memerAPIToken);
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "delete",
    description: "Sends an image of a user being \"deleted\"",
    category: "image",
    aliases: [],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.members.first() || message.author;
            const avatar = member.displayAvatarURL({ format: "png" });

            memer.delete(avatar).then(image => {
                const attachment = new Discord.MessageAttachment(image, "delete.png");

                message.reply({ files: [attachment] });
            })
        } catch(err) {
            console.error(err);
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}