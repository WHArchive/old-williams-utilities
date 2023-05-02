const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "coinflip",
    description: "Flip a coin.",
    category: "fun",
    aliases: ["coin"],
    userPermissions: [],
    botPermissions: [],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const results = ["Heads", "Tails"];
            const result = results[Math.floor(Math.random() * results.length)];

            const flip = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`:coin: The coin landed on: ${result}`)

            message.reply({ embeds: [flip] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}
