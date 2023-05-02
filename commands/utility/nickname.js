const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "nickname",
    description: "Change a member's nickname.",
    category: "utility",
    aliases: ["nick"],
    userPermissions: ["CHANGE_NICKNAME"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_NICKNAMES"],
    cooldown: "10",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_NICKNAMES)) {
                const member = message.mentions.members.first();
                const memberNickname = args.slice(1).join(" ");

                if(!member) {
                    const nickname = args.slice(0).join(" ");

                    if(message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
                        const error1 = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} Please specify a member!`)

                        message.reply({ embeds: [error1] });
                        return;
                    }

                    if(!nickname) {
                        if(!message.member.nickname) {
                            const memberNickname = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} You do not have a nickname!`)

                            message.reply({ embeds: [memberNickname] });
                            return;
                        }

                        const memberNickname = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setDescription(`Your nickname is: \`${message.member.nickname}\``)

                        message.reply({ embeds: [memberNickname] });
                        return;
                    }

                    if(args[0] === "reset") {
                        if(!message.member.nickname) {
                            const error1 = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} You do not have a nickname!`)

                            message.reply({ embeds: [error1] });
                            return;
                        }

                        message.member.setNickname("");
                        const nickReset = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setDescription(`${emoji.successful} I reset your nickname.`)

                        message.reply({ embeds: [nickReset] });
                        return;
                    }

                    if(nickname.length > 32) {
                        const error2 = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} Nickname must be between \`1\` and \`32\` characters!`)

                        message.reply({ embeds: [error2] });
                        return;
                    }

                    message.member.setNickname(nickname);
                    const nickChanged = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} I set your nickname to: \`${nickname}\``)

                    message.reply({ embeds: [nickChanged] });
                    return;
                }

                if(member.id === client.user.id) {
                    if(!memberNickname) {
                        if(!member.nickname) {
                            const memberNickname = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} I do not have a nickname!`)

                            message.reply({ embeds: [memberNickname] });
                            return;
                        }

                        const memberNickname = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setDescription(`My nickname is: \`${member.nickname}\``)

                        message.reply({ embeds: [memberNickname] });
                        return;
                    }

                    if(args[1] === "reset") {
                        if(!member.nickname) {
                            const error1 = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} I do not have a nickname!`)

                            message.reply({ embeds: [error1] });
                            return;
                        }

                        member.setNickname("");
                        const nickReset = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setDescription(`${emoji.successful} I reset my nickname.`)

                        message.reply({ embeds: [nickReset] });
                        return;
                    }

                    if(memberNickname.length > 32) {
                        const error2 = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} Nickname must be between \`1\` and \`32\` characters!`)

                        message.reply({ embeds: [error2] });
                        return;
                    }

                    member.setNickname(memberNickname);
                    const nickChanged = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} I set my nickname to: \`${memberNickname}\``)

                    message.reply({ embeds: [nickChanged] });
                    return;
                }

                if(!memberNickname) {
                    if(!member.nickname) {
                        const memberNickname = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} ${member} does not have a nickname!`)

                        message.reply({ embeds: [memberNickname] });
                        return;
                    }

                    const memberNickname = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${member}'s nickname is: \`${member.nickname}\``)

                    message.reply({ embeds: [memberNickname] });
                    return;
                }

                if(member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} I do not have permission to change ${member}'s nickname!`)

                    message.reply({ embeds: [error2] });
                    return;
                }

                if(args[1] === "reset") {
                    if(!member.nickname) {
                        const error3 = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} ${member} does not have a nickname!`)

                        message.reply({ embeds: [error3] });
                        return;
                    }

                    member.setNickname("");
                    const nickReset = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} I reset ${member}'s nickname.`)

                    message.reply({ embeds: [nickReset] });
                    return;
                }

                if(memberNickname.length > 32) {
                    const error4 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Nickname must be between \`1\` and \`32\` characters!`)

                    message.reply({ embeds: [error4] });
                    return;
                }

                member.setNickname(memberNickname);
                const nickChanged = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} I set ${member}'s nickname to: \`${memberNickname}\``)

                message.reply({ embeds: [nickChanged] });
                return;
            }

            const nickname = args.slice(0).join(" ");
    
            if(!nickname) {
                if(!message.member.nickname) {
                    const memberNickname = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} You do not have a nickname!`)

                    message.reply({ embeds: [memberNickname] });
                    return;
                }

                const memberNickname = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`Your nickname is: \`${message.member.nickname}\``)

                message.reply({ embeds: [memberNickname] });
                return;
            }

            if(args[0] === "reset") {
                if(!message.member.nickname) {
                    const error1 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} You do not have a nickname!`)

                    message.reply({ embeds: [error1] });
                    return;
                }

                message.member.setNickname("");
                const nickReset = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} I reset your nickname.`)

                message.reply({ embeds: [nickReset] });
                return;
            }

            if(nickname.length > 32) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Nickname must be between \`1\` and \`32\` characters!`)

                message.reply({ embeds: [error2] });
                return;
            }

            message.member.setNickname(nickname);
            const nickChanged = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} I set your nickname to: \`${nickname}\``)

            message.reply({ embeds: [nickChanged] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}