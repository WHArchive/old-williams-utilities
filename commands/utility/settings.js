const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "settings",
    description: "Change the guild settings.",
    category: "utility",
    aliases: ["setting", "prefix", "join", "welcome", "leave", "goodbye"],
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "60",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const setting = args[0];

            if(!setting) {
                const prefix = await client.prefix(message);
                const join = await client.join(message);
                const leave = await client.leave(message);

                const settings = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(message.guild.name, message.guild.iconURL({ format: "png", dynamic: true }))
                    .setTitle("Guild Settings")
                    .addFields (
                        {name: "Prefix", value: `\`${prefix}\``},
                        {name: "Join Message", value: join},
                        {name: "Leave Message", value: leave}
                    )

                message.reply({ embeds: [settings] });
                return;
            }

            const prefixSchema = require("../../models/prefixSchema");
            const joinSchema = require("../../models/joinSchema");
            const leaveSchema = require("../../models/leaveSchema");

            if(setting === "prefix") {
                const prefix = await client.prefix(message);
                const newPrefix = args[1];

                if(!newPrefix) {
                    const currentPrefix = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.information} My prefix here is: \`${prefix}\``)

                    message.reply({ embeds: [currentPrefix] });
                    return;
                }

                if(newPrefix === "reset" || newPrefix === client.config.defaultPrefix) {
                    prefixSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }

                        if(data) {
                            await prefixSchema.findOneAndDelete({ _id: message.guild.id });

                            const prefixReset = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setDescription(`${emoji.successful} The guild prefix has been reset to the default prefix: \`${client.config.defaultPrefix}\``)

                            message.reply({ embeds: [prefixReset] });
                        }

                        if(!data) {
                            const noCustomPrefix = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} This guild does not have a custom prefix!`)

                            message.reply({ embeds: [noCustomPrefix] });
                        }
                    })
                    return;
                }

                if(newPrefix.length > 5) {
                    const error1 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} The new prefix can not be longer than \`5\` characters!`)

                    message.reply({ embeds: [error1] });
                    return;
                }

                if(newPrefix === "/") {
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} The new prefix can not set to \`/\`!`)

                    message.reply({ embeds: [error2] });
                    return;
                }

                prefixSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        await prefixSchema.findOneAndUpdate({ _id: message.guild.id }, { prefix: newPrefix });

                        await data.save();
                    }

                    if(!data) {
                        data = new prefixSchema({
                            _id: message.guild.id,
                            prefix: newPrefix
                        })

                        await data.save();
                    }
                })

                const prefixSet = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} The guild prefix has been set to: \`${newPrefix}\``)

                message.reply({ embeds: [prefixSet] });
                return;
            }

            if(cmd === "prefix") {
                const prefix = await client.prefix(message);
                const newPrefix = args[0];

                if(newPrefix === "reset" || newPrefix === client.config.defaultPrefix) {
                    prefixSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }

                        if(data) {
                            await prefixSchema.findOneAndDelete({ _id: message.guild.id });

                            const prefixReset = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setDescription(`${emoji.successful} The guild prefix has been reset to the default prefix: \`${client.config.defaultPrefix}\``)

                            message.reply({ embeds: [prefixReset] });
                        }

                        if(!data) {
                            const noCustomPrefix = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} This guild does not have a custom prefix!`)

                            message.reply({ embeds: [noCustomPrefix] });
                        }
                    })
                    return;
                }

                if(newPrefix.length > 5) {
                    const error1 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} The new prefix can not be longer than \`5\` characters!`)

                    message.reply({ embeds: [error1] });
                    return;
                }

                if(newPrefix === "/") {
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} The new prefix can not set to \`/\`!`)

                    message.reply({ embeds: [error2] });
                    return;
                }

                prefixSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        await prefixSchema.findOneAndUpdate({ _id: message.guild.id }, { prefix: newPrefix });

                        await data.save();

                    }

                    if(!data) {
                        data = new prefixSchema({
                            _id: message.guild.id,
                            prefix: newPrefix
                        })

                        await data.save();
                    }
                })

                const prefixSet = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} The guild prefix has been set to: \`${newPrefix}\``)

                message.reply({ embeds: [prefixSet] });
                return;
            }

            if(setting === "join" || setting === "welcome") {
                const channel = message.mentions.channels.first();
                const msg = args.slice(2).join(" ");

                if(!args[1]) {
                    joinSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }

                        if(data) {
                            const joinMessage = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setTitle("Join Message")
                                .setDescription(`${await client.join(message)}`)

                            message.reply({ embeds: [joinMessage] });
                        }

                        if(!data) {
                            const noJoinMessage = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} This guild does not have a join message!`)

                            message.reply({ embeds: [noJoinMessage] });
                        }
                    })
                    return;
                }

                if(args[1] === "reset") {
                    joinSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }

                        if(data) {
                            await joinSchema.findOneAndDelete({ _id: message.guild.id });

                            const resetJoinMessage = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setDescription(`${emoji.successful} Successfully reset the join message!`)

                            message.reply({ embeds: [resetJoinMessage] });
                        }

                        if(!data) {
                            const noJoinMessage = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} This guild does not have a join message!`)

                            message.reply({ embeds: [noJoinMessage] });
                        }
                    })
                    return;
                }

                if(!channel) {
                    const error1 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Please specify a join channel!`)

                    message.reply({ embeds: [error1] });
                    return;
                }

                if(!msg) {
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Please specify a join message!`)

                    message.reply({ embeds: [error2] });
                    return;
                }

                if(msg.length > 2000) {
                    const error3 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} The join message can not be longer than \`2000\` characters!`)

                    message.reply({ embeds: [error3] });
                    return;
                }

                joinSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        await joinSchema.findOneAndUpdate({ _id: message.guild.id }, {
                            channel: channel.id,
                            message: msg
                        })
    
                        await data.save();
                    }

                    if(!data) {
                        data = new joinSchema({
                            _id: message.guild.id,
                            channel: channel.id,
                            message: msg
                        })

                        await data.save();
                    }
                })

                const setJoinMessage = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} Successfully set the join message!`)

                message.reply({ embeds: [setJoinMessage] });
                return;
            }

            if(cmd === "join" || cmd === "welcome") {
                const channel = message.mentions.channels.first();
                const msg = args.slice(1).join(" ");

                if(args[0] === "reset") {
                    joinSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }

                        if(data) {
                            await joinSchema.findOneAndDelete({ _id: message.guild.id });

                            const resetJoinMessage = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setDescription(`${emoji.successful} Successfully reset the join message!`)

                            message.reply({ embeds: [resetJoinMessage] });
                        }

                        if(!data) {
                            const noJoinMessage = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} This guild does not have a join message!`)

                            message.reply({ embeds: [noJoinMessage] });
                        }
                    })
                    return;
                }

                if(!channel) {
                    const error1 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Please specify a join channel!`)

                    message.reply({ embeds: [error1] });
                    return;
                }

                if(!msg) {
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Please specify a join message!`)

                    message.reply({ embeds: [error2] });
                    return;
                }

                if(msg.length > 2000) {
                    const error3 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} The join message can not be longer than \`2000\` characters!`)

                    message.reply({ embeds: [error3] });
                    return;
                }

                joinSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        await joinSchema.findOneAndUpdate({ _id: message.guild.id }, {
                            channel: channel.id,
                            message: msg
                        })

                        await data.save();
                    }

                    if(!data) {
                        data = new joinSchema({
                            _id: message.guild.id,
                            channel: channel.id,
                            message: msg
                        })

                        await data.save();
                    }
                })

                const setJoinMessage = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} Successfully set the join message!`)

                message.reply({ embeds: [setJoinMessage] });
                return;
            }

            if(setting === "leave" || setting === "goodbye") {
                const channel = message.mentions.channels.first();
                const msg = args.slice(2).join(" ");

                if(!args[1]) {
                    leaveSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }
    
                        if(data) {
                            const leaveMessage = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setTitle("Leave Message")
                                .setDescription(`${await client.leave(message)}`)

                            message.reply({ embeds: [leaveMessage] });
                        }
    
                        if(!data) {
                            const noLeaveMessage = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} This guild does not have a join message!`)

                            message.reply({ embeds: [noLeaveMessage] });
                        }
                    })
                    return;
                }

                if(args[1] === "reset") {
                    leaveSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }
    
                        if(data) {
                            await leaveSchema.findOneAndDelete({ _id: message.guild.id });

                            const resetLeaveMessage = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setDescription(`${emoji.successful} Successfully reset the leave message!`)

                            message.reply({ embeds: [resetLeaveMessage] });
                        }
    
                        if(!data) {
                            const noLeaveMessage = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} This guild does not have a leave message!`)

                            message.reply({ embeds: [noLeaveMessage] });
                        }
                    })
                    return;
                }

                if(!channel) {
                    const error1 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Please specify a join channel!`)

                    message.reply({ embeds: [error1] });
                    return;
                }

                if(!msg) {
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Please specify a join message!`)

                    message.reply({ embeds: [error2] });
                    return;
                }

                if(msg.length > 2000) {
                    const error3 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} The join message can not be longer than \`2000\` characters!`)

                    message.reply({ embeds: [error3] });
                    return;
                }

                leaveSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        await leaveSchema.findOneAndUpdate({ _id: message.guild.id }, {
                            channel: channel.id,
                            message: msg
                        })

                        await data.save();
                    }

                    if(!data) {
                        data = new leaveSchema({
                            _id: message.guild.id,
                            channel: channel.id,
                            message: msg
                        })

                        await data.save();
                    }
                })

                const setLeaveMessage = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} Successfully set the leave message!`)

                message.reply({ embeds: [setLeaveMessage] });
                return;
            }

            if(cmd === "leave" || cmd === "goodbye") {
                const channel = message.mentions.channels.first();
                const msg = args.slice(1).join(" ");

                if(args[1] === "reset") {
                    joinSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }
    
                        if(data) {
                            await leaveSchema.findOneAndDelete({ _id: message.guild.id });

                            const resetLeaveMessage = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setDescription(`${emoji.successful} Successfully reset the leave message!`)

                            message.reply({ embeds: [resetLeaveMessage] });
                        }
    
                        if(!data) {
                            const noLeaveMessage = new Discord.MessageEmbed()
                                .setColor("#E74C3C")
                                .setDescription(`${emoji.error} This guild does not have a leave message!`)

                            message.reply({ embeds: [noLeaveMessage] });
                        }
                    })
                    return;
                }

                if(!channel) {
                    const error1 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Please specify a join channel!`)

                    message.reply({ embeds: [error1] });
                    return;
                }

                if(!msg) {
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} Please specify a join message!`)

                    message.reply({ embeds: [error2] });
                    return;
                }

                if(msg.length > 2000) {
                    const error3 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} The join message can not be longer than \`2000\` characters!`)

                    message.reply({ embeds: [error3] });
                    return;
                }

                leaveSchema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        await leaveSchema.findOneAndUpdate({ _id: message.guild.id }, {
                            channel: channel.id,
                            message: msg
                        })

                        await data.save();
                    }

                    if(!data) {
                        data = new leaveSchema({
                            _id: message.guild.id,
                            channel: channel.id,
                            message: msg
                        })

                        await data.save();
                    }
                })

                const setLeaveMessage = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} Successfully set the leave message!`)

                message.reply({ embeds: [setLeaveMessage] });
                return;
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}