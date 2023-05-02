const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "removewarn",
    description: "Remove a warn.",
    category: "moderation",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Member to remove a warn from.",
            required: true
        },

        {
            type: "INTEGER",
            name: "warning",
            description: "Warning to remove.",
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
            const warning = interaction.options.getInteger("warning");

            if(warning < 1) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a number above \`0\`!`)

                await interaction.editReply({ embeds: [error1] });
                return;
            }

            schema.findOne({
                _id: interaction.guild.id,
                member: member.id
            }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(data) {
                    if(data.warnings.length) {
                        const number = warning - 1;

                        await data.warnings.splice(number, 1);

                        await data.save();

                        if(data.warnings.length < 1) {
                            await schema.findOneAndDelete({
                                _id: interaction.guild.id,
                                member: member.id
                            })
                        }

                        const removed = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setDescription(`${emoji.successful} Successfully removed warning \`${number + 1}\` from ${member}!`)

                        await interaction.editReply({ embeds: [removed] });
                    }
                } else {
                    const noWarnings = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} ${member} has no warnings!`)

                    await interaction.editReply({ embeds: [noWarnings] });
                }
            })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}