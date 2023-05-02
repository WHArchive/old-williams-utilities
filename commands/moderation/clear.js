const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "clear",
    description: "Clear messages in a channel.",
    category: "moderation",
    aliases: ["purge"],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS",  "MANAGE_MESSAGES"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify the amount of messages to clear!`)

                message.reply({ embeds: [error1] });
                return;
            }
    
            if(isNaN(args[0])) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a number!`)

                message.reply({ embeds: [error2] });
                return;
            }
    
            if(args[0] > 100 || args[0] < 1) {
                const error3 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You can only clear between \`1\` and \`100\` messages!`)

                message.reply({ embeds: [error3] });
                return;
            }

            await message.delete();

            await message.channel.messages.fetch({ limit: args[0] })
                .then(async messages => {
                    if(messages.size > 1 || messages.size < 1) {
                        await message.channel.bulkDelete(messages, true)
                            .then(async msgs => {
                                const msgsDeleted = new Discord.MessageEmbed()
                                    .setColor("#1F51FF")
                                    .setDescription(`${emoji.successful} I deleted \`${msgs.size}\` messages.`)

                                message.channel.send({ embeds: [msgsDeleted] })
                                    .then(msg => setTimeout(() => msg.delete(), 2500) );
                            })
                        return;
                    }

                    if(messages.size = 1) {
                        await message.channel.bulkDelete(messages, true)
                            .then(async msgs => {
                                const msgDeleted = new Discord.MessageEmbed()
                                    .setColor("#1F51FF")
                                    .setDescription(`${emoji.successful} I deleted \`${msgs.size}\` message.`)

                                message.channel.send({ embeds: [msgDeleted] })
                                    .then(msg => setTimeout(() => msg.delete(), 2500) );
                            })
                    }
                })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}