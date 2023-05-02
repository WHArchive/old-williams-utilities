const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "unbanall",
    description: "Unbans all banned members in the server.",
    category: "moderation",
    aliases: [],
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "120",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            message.guild.fetchBans()
                .then(async bans => {
                    if(bans.size) {
                        const noBans = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} There are no bans!`)

                        message.reply({ embeds: [noBans] });
                        return;
                    }

                    await bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                    })

                    const unbannedAll = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} Unbanned all users!`)

                    message.reply({ embeds: [unbannedAll] });
                })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}