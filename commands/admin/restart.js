const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "restart",
    description: "Restart the bot.",
    aliases: [],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            console.log("Restarting...");
            const restarting = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.idle} Restarting...`)

            message.reply({ embeds: [restarting] });

            await client.destroy();
            await client.login(process.env.token);

            console.log("Restarted!");
            const restarted = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.online} Restarted!`)

            message.reply({ embeds: [restarted] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}