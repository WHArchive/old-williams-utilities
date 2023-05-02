const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "guildcount",
    description: "Get the bot guild count.",
    category: "info",
    aliases: ["servercount", "guilds", "servers"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const guildCount = client.guilds.cache.size;
            const memberCount = message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c);

            if(guildCount > 1 || guildCount < 1) {
                const guilds = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`Guilds: \`${guildCount}\`\nMembers: \`${memberCount}\``)

                message.reply({ embeds: [guilds] });
                return;
            }

            if(guildCount = 1) {
                const guild = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`Guilds: \`${guildCount}\`\nMembers: \`${memberCount}\``)

                message.reply({ embeds: [guild] });
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}