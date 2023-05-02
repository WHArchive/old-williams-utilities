const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "guildcount",
	description: "Bot Guild Count",
    category: "info",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const guildCount = client.guilds.cache.size
            const memberCount = interaction.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c);

            if(guildCount > 1 || guildCount < 1) {
                const guilds = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`Guilds: \`${guildCount}\`\nMembers: \`${memberCount}\``)

                await interaction.editReply({ embeds: [guilds] });
                return;
            }

            if(guildCount = 1) {
                const guild = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`Guilds: \`${guildCount}\`\nMembers: \`${memberCount}\``)

                await interaction.editReply({ embeds: [guild] });
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}