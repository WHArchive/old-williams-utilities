const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "clearwarnings",
    description: "Clear all of a member's warns.",
    category: "moderation",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Member who's warns to clear.",
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

            schema.findOne({
                _id: interaction.guild.id,
                member: member.id
            }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(data) {
                    await schema.findOneAndDelete({
                        _id: interaction.guild.id,
                        member: member.id
                    })

                    const cleared = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} Successfully cleared all warnings from ${member}!`)

                    await interaction.editReply({ embeds: [cleared] });
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