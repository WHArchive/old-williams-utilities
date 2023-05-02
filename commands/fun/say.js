const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "say",
    description: "Say something as the bot.",
    category: "fun",
    aliases: ["message", "msg"],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "10",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const msg = args.join(" ");

            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You must specify a message!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(msg.length > 2000) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} The message can not be longer than \`2000\` characters!`)

                message.reply({ embeds: [error2] });
                return;
            }

            message.delete();

            message.channel.send(msg);
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}