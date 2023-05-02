const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "removewarn",
    description: "Remove a warn.",
    aliases: ["rmvwarn", "deletewarn", "delwarn"],
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
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

            if(isNaN(args[1]) || args[1] < 1) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a number above \`0\`!`)

                message.reply({ embeds: [error2] });
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
                    if(data.warnings.length) {
                        const number = args[1] - 1;

                        await data.warnings.splice(number, 1);

                        await data.save();

                        if(data.warnings.length < 1) {
                            await schema.findOneAndDelete({
                                _id: message.guild.id,
                                member: member.id
                            })
                        }

                        const removed = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setDescription(`${emoji.successful} Successfully removed warning \`${number + 1}\` from ${member}!`)

                        message.reply({ embeds: [removed] });
                    }
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