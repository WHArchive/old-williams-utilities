const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "id",
	description: "Get an ID",
    category: "info",
    options: [
        {
            type: "USER",
            name: "user",
            description: "Select a User"
        }
    ],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.get("user");

            if(member) {
                const userID = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.information} ${member.user}'s ID is: \`${member.user.id}\``)

                await interaction.editReply({ embeds: [userID] });
                return;
            }

            const authorID = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.information} Your ID is: \`${interaction.member.id}\``)

            await interaction.editReply({ embeds: [authorID] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}