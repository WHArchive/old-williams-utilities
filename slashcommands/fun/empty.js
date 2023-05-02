const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "empty",
    description: "Empty Message",
    category: "fun",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const emptyEmbed = new Discord.MessageEmbed()
                .setDescription("Empty Message")

            await interaction.editReply({ embeds: [emptyEmbed], fetchReply: true })
                .then(i => i.suppressEmbeds(true) );
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}