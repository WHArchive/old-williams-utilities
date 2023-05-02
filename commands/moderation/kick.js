const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "kick",
    description: "Kick a member.",
    category: "moderation",
    aliases: [],
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.members.first();
            const reason = args.slice(1).join(" ");

            if(!member) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a member!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(!reason) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a reason!`)

                message.reply({ embeds: [error2] });
                return;
            }

            if(!member.kickable || member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)) {
                const error3 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} I do not have permission to kick this member!`)

                message.reply({ embeds: [error3] });
                return;
            }

            await member.kick({ reason: reason });

            const kicked = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} ${member}, has been kicked! **|** ${member.id}`)

            message.reply({ embeds: [kicked] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}