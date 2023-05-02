const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "newguild",
    description: "Creates a new guild.",
    aliases: ["newserver", "createguild", "createserver"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const name = args.join(" ");

            if(!args.length) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a name for the guild!`)

                message.reply({ embeds: [error1] });
                return;
            }

            client.guilds.create(name)
                .then(async guild => {
                    const channel = guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").first();

                    await channel.createInvite({ maxAge: 0, maxUses: 1 })
                        .then(invite => {
                            const newGuild = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setDescription(`${emoji.successful} Successfully created new guild!`)

                            const inviteButton = new Discord.MessageActionRow()
                                .addComponents (
                                    new Discord.MessageButton()
                                        .setStyle("LINK")
                                        .setLabel("Invite")
                                        .setURL(`https://discord.gg/${invite.code}`)
                                )

                            message.reply({ embeds: [newGuild], components: [inviteButton] });
                        })
                })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}
