const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "warnings",
    description: "See warnings for a user.",
    category: "moderation",
    aliases: ["warns"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.users.first();

            if(!message.member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS) || !member) {
                schema.findOne({
                    _id: message.guild.id,
                    member: message.author.id
                }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }
    
                    if(!data) {
                        const noWarnings = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} You have no warnings!`)
    
                        message.reply({ embeds: [noWarnings] });
                        return;
                    }
    
                    const warnings = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${message.author.id}`)
                        .setTitle("Warnings")
                        .setDescription(`${data.warnings.map(
                            (w, i) => 
                            `**Warning**: \`${i + 1}\`\nModerator: ${message.guild.members.cache.get(w.moderator)}\nReason: \`${w.reason}\``
                        ).join("\n\n")}`)
    
                    message.reply({ embeds: [warnings] });
                })
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
                    const noWarnings = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} ${member} has no warnings!`)

                    message.reply({ embeds: [noWarnings] });
                    return;
                }

                const warnings = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(member.tag, member.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${member.id}`)
                    .setTitle("Warnings")
                    .setDescription(`${data.warnings.map(
                        (w, i) => 
                        `**Warning**: \`${i + 1}\`\nModerator: ${message.guild.members.cache.get(w.moderator)}\nReason: \`${w.reason}\``
                    ).join("\n\n")}`)

                message.reply({ embeds: [warnings] });
            })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}