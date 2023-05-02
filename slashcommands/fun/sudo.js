const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "sudo",
    description: "Say something as a user.",
    category: "fun",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Member to be sudoed.",
            required: true
        },

        {
            type: "STRING",
            name: "message",
            description: "Message to be said as the user.",
            required: true
        }
    ],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS", "MANAGE_WEBHOOKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member");
            const message = interaction.options.getString("message");

            if(message.length > 2000) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} The message can not be longer than \`2000\` characters!`)

                await interaction.editReply({ embeds: [error1] });
                return;
            }

            const webhook = await interaction.channel.createWebhook(member.username, {
                avatar: member.displayAvatarURL({ format: "png" }),
                channel: interaction.channel.id
            })

            await webhook.send(message)
                .then(() => webhook.delete());

            const sudoed = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} Successfully sudoed ${member}!`)

            await interaction.editReply({ embeds: [sudoed] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}