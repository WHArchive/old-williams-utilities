const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "hello",
    description: "Says hello to a user.",
    category: "fun",
    aliases: ["hi"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(cmd === "hi") {
                const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

                if(user) {
                    if(user === message.author) {
                        message.reply(`${emoji.wave} Hi, ${message.author}!`);
                        return;
                    }

                    message.reply(`${emoji.wave} ${message.author} says Hi, ${user}!`);
                    return;
                }

                message.reply(`${emoji.wave} Hi, ${message.author}!`);
                return;
            }

            const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

            if(user) {
                if(user === message.author) {
                    message.reply(`${emoji.wave} Hello, ${message.author}!`);
                    return;
                }

                message.reply(`${emoji.wave} ${message.author} says Hello, ${user}!`);
                return;
            }

            message.reply(`${emoji.wave} Hello, ${message.author}!`);
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}