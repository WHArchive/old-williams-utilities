const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "membercount",
	description: "Guild Member Count",
    category: "info",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const totalMembers = interaction.guild.memberCount;

            const members = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`Members: \`${totalMembers}\``)

            await interaction.editReply({ embeds: [members] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}