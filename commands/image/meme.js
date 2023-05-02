const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "meme",
    description: "Get a random meme.",
    category: "image",
    aliases: ["memes"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "3",
    enabled: false,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            
        } catch(err) {
            console.error(err)
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}