const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "sudo",
    description: "Say something as a user.",
    category: "fun",
    aliases: ["sayas"],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_WEBHOOKS"],
    cooldown: "10",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.members.first();

            if(!member) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a member!`)

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

            if(args.length > 2000) {
                const error3 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} The message can not be longer than \`2000\` characters!`)

                message.reply({ embeds: [error3] });
                return;
            }

            await message.delete();

            const webhook = await message.channel.createWebhook(member.displayName, {
                avatar: member.user.displayAvatarURL({ format: "png" }),
                channel: message.channel.id
            })

            await webhook.send(args.slice(1).join(" "))
                .then(() => webhook.delete());
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}