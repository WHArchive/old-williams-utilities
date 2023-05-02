const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "ping",
	description: "Bot Latency",
    category: "utility",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const pinging = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.pingpong} Pinging...`)

            const i = await interaction.editReply({ embeds: [pinging], fetchReply: true });

            const latency = i.createdTimestamp - interaction.createdTimestamp;
            const apiLatency = Math.round(client.ws.ping);

            const ping = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .addFields (
                    {name: "Latency", value: `Ping: \`${latency}\`ms`},
                    {name: "API Latency", value: `Ping: \`${apiLatency}\`ms`}
                )

            interaction.editReply({ embeds: [ping] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}