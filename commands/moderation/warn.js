const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "warn",
    description: "Warn a user.",
    category: "moderation",
    aliases: [],
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.users.first();
            const reason = args.slice(1).join(" ");

            if(!member) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a member!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(!reason) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a reason!`)

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

                if(!data) {
                    data = new schema({
                        _id: message.guild.id,
                        member: member.id,
                        warnings: [
                            {
                                moderator: message.author.id,
                                reason: reason
                            }
                        ]
                    })
                } else {
                    const object = {
                        moderator: message.author.id,
                        reason: reason
                    }

                    data.warnings.push(object);
                }

                data.save();
            })

            const warn = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setAuthor(message.guild.name, message.guild.iconURL({ format: "png", dynamic: true }))
                .setTitle("Warning")
                .setDescription(`You have been warned in **${message.guild.name}**!`)
                .addFields (
                    {name: "Moderator", value: `${message.author.tag} | \`${message.author.id}\``},
                    {name: "Reason", value: reason}
                )

            try {
                await member.send({ embeds: [warn] });
            } catch(err) {
                const warned = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} ${member} has been warned!`)

                message.reply({ embeds: [warned] });
                return;
            }

            const warned = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} ${member} has been warned!`)

            message.reply({ embeds: [warned] });
        } catch(err) {
            console.error(err)
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}