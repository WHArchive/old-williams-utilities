const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "warnings",
    description: "See warnings for a user.",
    category: "moderation",
    options: [
        {
            type: "USER",
            name: "member",
            description: "See a member's warnings."
        }
    ],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member");

            if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS) || !member) {
                schema.findOne({
                    _id: interaction.guild.id,
                    member: interaction.user.id
                }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }
    
                    if(!data) {
                        const noWarnings = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} You have no warnings!`)
    
                        await interaction.editReply({ embeds: [noWarnings] });
                        return;
                    }
    
                    const warnings = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${interaction.user.id}`)
                        .setTitle("Warnings")
                        .setDescription(`${data.warnings.map(
                            (w, i) => 
                            `**Warning**: \`${i + 1}\`\nModerator: ${interaction.guild.members.cache.get(w.moderator)}\nReason: \`${w.reason}\``
                        ).join("\n\n")}`)
    
                    await interaction.editReply({ embeds: [warnings] });
                })
                return;
            }

            schema.findOne({
                _id: interaction.guild.id,
                member: member.id
            }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(!data) {
                    const noWarnings = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} ${member} has no warnings!`)

                    await interaction.editReply({ embeds: [noWarnings] });
                    return;
                }

                const warnings = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(member.tag, member.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${member.id}`)
                    .setTitle("Warnings")
                    .setDescription(`${data.warnings.map(
                        (w, i) => 
                        `**Warning**: \`${i + 1}\`\nModerator: ${interaction.guild.members.cache.get(w.moderator)}\nReason: \`${w.reason}\``
                    ).join("\n\n")}`)

                await interaction.editReply({ embeds: [warnings] });
            })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}