const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "simulateleave",
    description: "Simulate a leave.",
    aliases: ["simleave"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            await client.emit("guildMemberRemove", message.member);

            const emitted = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} Successfully simulated leave!`)

            message.reply({ embeds: [emitted] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}