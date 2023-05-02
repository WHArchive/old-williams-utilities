const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "dm",
    description: "DM a user.",
    category: "utility",
    aliases: ["directmessage", "directmsg"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const user = message.mentions.users.first();
            const channel = await user.createDM();
            const msg = args.slice(1).join(" ");

            if(!user) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a member to DM!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(!args[1]) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a message!`)

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

            const dm = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${message.author.id}`)
                .setDescription(msg)
                .setTimestamp()

            try {
                await channel.send({ embeds: [dm] });
            } catch(err) {
                const couldNotDM = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} I do not have permission to DM ${user}!`)

                message.reply({ embeds: [couldNotDM] });
                return;
            }

            const dmedUser = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} Successfully sent message!`)

            message.reply({ embeds: [dmedUser] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}