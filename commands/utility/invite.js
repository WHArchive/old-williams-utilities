const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "invite",
    description: "Generate a new invite link.",
    category: "utility",
    aliases: ["newinvite"],
    userPermissions: ["CREATE_INSTANT_INVITE"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "CREATE_INSTANT_INVITE"],
    cooldown: "10",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            message.channel.createInvite({ maxUses: 0, maxAge: 0 })
                .then(invite => {
                    const newInvite = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} Created new invite: [${invite.code}](https://discord.gg/${invite.code})`)

                    const inviteButton = new Discord.MessageActionRow()
                        .addComponents (
                            new Discord.MessageButton()
                                .setStyle("LINK")
                                .setLabel("Invite")
                                .setURL(`https://discord.gg/${invite.code}`)
                        )

                    message.reply({ embeds: [newInvite], components: [inviteButton] });
                })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}