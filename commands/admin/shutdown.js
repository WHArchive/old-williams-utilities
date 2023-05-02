const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "shutdown",
    description: "Shutdown the bot.",
    aliases: ["kill"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            console.log("Shutting Down...");
            const shuttingdown = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.dnd} Shutting Down...`)

            message.reply({ embeds: [shuttingdown] })
                .then(() => process.exit());
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}