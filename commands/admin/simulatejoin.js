const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "simulatejoin",
    description: "Simulate a join.",
    aliases: ["simjoin"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            await client.emit("guildMemberAdd", message.member);

            const emitted = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} Successfully simulated join!`)

            message.reply({ embeds: [emitted] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}