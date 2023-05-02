const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "ping",
    description: "Get the bot's latency.",
    category: "utility",
    aliases: ["latency", "test"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "10",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const pinging = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.pingpong} Pinging...`)

            message.reply({ embeds: [pinging] })
                .then(msg => {
                    const latency = msg.createdTimestamp - message.createdTimestamp;
                    const apiLatency = Math.round(client.ws.ping);

                    const ping = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .addFields (
                            {name: "Latency", value: `Ping: \`${latency}\`ms`},
                            {name: "API Latency", value: `Ping: \`${apiLatency}\`ms`}
                        )

                    msg.edit({ embeds: [ping] });
                })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}