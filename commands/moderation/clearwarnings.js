const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "clearwarnings",
    description: "Clear all of a member's warns.",
    category: "moderation",
    aliases: ["clearwarns", "deletewarnings", "deletewarns", "delwarns"],
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "10",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.members.first();

            if(!member) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a member!`)

                message.reply({ embeds: [error1] });
                return;
            }

            schema.findOne({
                _id: message.guild.id,
                member: member.id
            }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(data) {
                    await schema.findOneAndDelete({
                        _id: message.guild.id,
                        member: member.id
                    })

                    const cleared = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} Successfully cleared all warnings from ${member}!`)

                    message.reply({ embeds: [cleared] });
                } else {
                    const noWarnings = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} ${member} has no warnings!`)

                    message.reply({ embeds: [noWarnings] });
                }
            })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}