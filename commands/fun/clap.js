const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "clap",
    description: "Clapify your message.",
    category: "fun",
    aliases: ["clapify"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const msg = args.join(" :clap: ");

            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You must specify a message!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(!args[1]) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You must specify at least \`2\` arguments!`)

                message.reply({ embeds: [error2] });
                return;
            }

            if(msg.length > 2000) {
                const error3 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} The message can not be longer than \`2000\` characters!`)

                message.reply({ embeds: [error3] });
                return;
            }

            message.reply(msg);
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}