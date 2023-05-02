const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "roll",
    description: "Roll a 6-sided dice.",
    category: "fun",
    aliases: ["rolldice", "rolldie"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const rolledNumber = Math.floor(Math.random() * 6) + 1;

            const roll = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`:game_die: You rolled a \`${rolledNumber}\`!`)

            message.reply({ embeds: [roll] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}