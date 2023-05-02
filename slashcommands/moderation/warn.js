const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "warn",
    description: "Warn a user.",
    category: "moderation",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Member to warn.",
            required: true
        },

        {
            type: "STRING",
            name: "reason",
            description: "Reason for warning the member.",
            required: true
        }
    ],
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member");
            const reason = interaction.options.getString("reason");

            schema.findOne({
                _id: interaction.guild.id,
                member: member.id
            }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(!data) {
                    data = new schema({
                        _id: interaction.guild.id,
                        member: member.id,
                        warnings: [
                            {
                                moderator: interaction.user.id,
                                reason: reason
                            }
                        ]
                    })
                } else {
                    const object = {
                        moderator: interaction.user.id,
                        reason: reason
                    }

                    data.warnings.push(object);
                }

                data.save();
            })

            const warn = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({ format: "png", dynamic: true }))
                .setTitle("Warning")
                .setDescription(`You have been warned in **${interaction.guild.name}**!`)
                .addFields (
                    {name: "Moderator", value: `${interaction.user.tag} | \`${interaction.user.id}\``},
                    {name: "Reason", value: reason}
                )

            try {
                await member.send({ embeds: [warn] });
            } catch(err) {
                const warned = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} ${member} has been warned!`)

                await interaction.editReply({ embeds: [warned] });
                return;
            }

            const warned = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} ${member} has been warned!`)

            await interaction.editReply({ embeds: [warned] });
        } catch(err) {
            console.error(err)
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}