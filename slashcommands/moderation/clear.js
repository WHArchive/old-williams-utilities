const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "clear",
    description: "Clear messages in a channel.",
    category: "moderation",
    options: [
        {
            type: "NUMBER",
            name: "amount",
            description: "Amount of messages to clear.",
            required: true
        }
    ],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const amount = interaction.options.getNumber("amount");

            if(amount > 100 || amount < 1) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You can only clear between \`1\` and \`100\` messages!`)

                await interaction.editReply({ embeds: [error1] });
                return;
            }

            await interaction.channel.messages.fetch({ limit: amount })
                .then(async messages => {
                    if(messages.size > 1 || messages.size < 1) {
                        await interaction.channel.bulkDelete(messages, true)
                            .then(async msgs => {
                                const msgsDeleted = new Discord.MessageEmbed()
                                    .setColor("#1F51FF")
                                    .setDescription(`${emoji.successful} I deleted \`${msgs.size}\` messages.`)

                                await interaction.channel.send({ embeds: [msgsDeleted] })
                                    .then(msg => setTimeout(() => msg.delete(), 2500) );
                            })
                        return;
                    }
        
                    if(messages.size = 1) {
                        await interaction.channel.bulkDelete(messages, true)
                            .then(async msgs => {
                                const msgDeleted = new Discord.MessageEmbed()
                                    .setColor("#1F51FF")
                                    .setDescription(`${emoji.successful} I deleted \`${msgs.size}\` message.`)

                                await interaction.channel.send({ embeds: [msgDeleted] })
                                    .then(msg => setTimeout(() => msg.delete(), 2500) );
                            })
                    }
                });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}