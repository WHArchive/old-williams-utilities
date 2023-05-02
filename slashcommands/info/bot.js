const bot = require("../../package.json");

module.exports = {
	name: "bot",
	description: "Bot Information",
    category: "info",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            const uptime =  `${days}:${hours}:${minutes}:${seconds}`;

            const botInfo = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("Bot Information")
                .addFields (
                    {name: "Bot", value: client.user.username},
                    {name: "Bot Tag", value: client.user.tag},
                    {name: "Version", value: `\`${bot.version}\``},
                    {name: "Developer", value: bot.author},
                    {name: "Bot ID", value: `\`${client.user.id}\``},
                    {name: "Uptime", value: `\`${uptime}\``}
                )

            await interaction.editReply({ embeds: [botInfo] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}