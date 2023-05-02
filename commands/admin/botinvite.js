const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "botinvite",
    description: "Sends a bot invite link.",
    aliases: ["oauth2"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const invite = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription("Bot Invite")

            const inviteButton = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Invite")
                        .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=536870911999&scope=bot%20applications.commands`)
                )

            message.reply({ embeds: [invite], components: [inviteButton] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)
                
            message.reply({ embeds: [error] });
        }
    }
}