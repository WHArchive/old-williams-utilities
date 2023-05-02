const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "guildid",
	description: "Guild ID",
    category: "info",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const guildID = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.information} This guild's ID is: \`${interaction.guild.id}\``)

            await interaction.editReply({ embeds: [guildID] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}