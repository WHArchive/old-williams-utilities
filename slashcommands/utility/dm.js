const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "dm",
    description: "DM a user.",
    category: "utility",
    options: [
        {
            type: "USER",
            name: "user",
            description: "User to DM.",
            required: true
        },

        {
            type: "STRING",
            name: "message",
            description: "Message to the user.",
            required: true
        }
    ],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const user = interaction.options.getUser("user");
            const channel = await user.createDM();
            const i = interaction.options.getString("message");

            const dm = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${interaction.member.id}`)
                .setDescription(i)
                .setTimestamp()

            try {
                await channel.send({ embeds: [dm] });
            } catch (err) {
                const couldNotDM = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} I do not have permission to DM ${user}!`)

                await interaction.editReply({ embeds: [couldNotDM] });
                return;
            }

            const dmedUser = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} Successfully sent message!`)

            await interaction.editReply({ embeds: [dmedUser] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}