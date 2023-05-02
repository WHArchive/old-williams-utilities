const emoji = require("../../configs/emojis.json");
const zalgo = require("to-zalgo");

module.exports = {
    name: "zalgo",
    description: "Converts text to Zalgo.",
    category: "fun",
    aliases: ["zalgotext", "tozalgo"],
    userPermissions: [],
    botPermissions: [],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args.length) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a message!`)

                message.reply({ embeds: [error1] });
                return;
            }

            message.reply(zalgo(args.join(" ")));
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}