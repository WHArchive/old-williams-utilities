const afkSchema = require("../../models/afkSchema");
const emoji = require("../../configs/emojis.json");

const cooldowns = new Map();

module.exports = {
	name: "messageCreate",
	async execute(client, Discord, message) {
        try {
            if(message.author.bot) return;

            afkSchema.findOne({ _id: message.author.id }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(data) {
                    if(data.afk === true) {
                        await afkSchema.findOneAndUpdate({ _id: message.author.id }, {
                            $unset: {
                                afk: data.afk,
                                afk_reason: data.afk_reason
                            }
                        })

                        await data.save();

                        const removeAFK = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setDescription(`${emoji.wave} Welcome back, ${message.author}! I have removed your AFK.`)

                        message.reply({ embeds: [removeAFK] });
                    }
                }
            })

            if(message.mentions) {
                message.mentions.users.forEach(member => {
                    if(member.id === message.author.id) return;

                    afkSchema.findOne({ _id: member.id }, async (err, data) => {
                        if(err) {
                            console.error(err);
                        }
    
                        if(data) {
                            if(data.afk === true) {
                                const afk = new Discord.MessageEmbed()
                                    .setColor("#1F51FF")
                                    .setDescription(`${emoji.information} ${member}, is currently AFK. Reason: ${data.reason}`)

                                message.reply({ embeds: [afk] });
                            }
                        }
                    })
                })
            }

            const prefix = await client.prefix(message);

            if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
                const guildPrefix = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.information} My prefix here is: \`${prefix}\``)

                message.reply({ embeds: [guildPrefix] });
                return;
            }

            if(!message.content.startsWith(prefix)) return;

            const args = message.content.slice(prefix.length).split(/ +/);
            
            const cmd = args.shift().toLowerCase();
            const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

            if(!command) return;

            if(command.enabled === false) {
                const commandDisabled = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} This command has been disabled!`)

                message.reply({ embeds: [commandDisabled] });
                return;
            }

            const validpermissions = [
                "CREATE_INSTANT_INVITE",
                "KICK_MEMBERS",
                "BAN_MEMBERS",
                "ADMINISTRATOR",
                "MANAGE_CHANNELS",
                "MANAGE_GUILD",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG",
                "PRIORITY_SPEAKER",
                "STREAM",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "SEND_TTS_MESSAGES",
                "MANAGE_MESSAGES",
                "EMBED_LINKS",
                "ATTACH_FILES",
                "READ_MESSAGE_HISTORY",
                "MENTION_EVERYONE",
                "USE_EXTERNAL_EMOJIS",
                "VIEW_GUILD_INSIGHTS",
                "CONNECT",
                "SPEAK",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MOVE_MEMBERS",
                "USE_VAD",
                "CHANGE_NICKNAME",
                "MANAGE_NICKNAMES",
                "MANAGE_ROLES",
                "MANAGE_WEBHOOKS",
                "MANAGE_EMOJIS_AND_STICKERS",
                "USE_APPLICATION_COMMANDS",
                "REQUEST_TO_SPEAK",
                "MANAGE_THREADS",
                "CREATE_PUBLIC_THREADS",
                "CREATE_PRIVATE_THREADS",
                "USE_EXTERNAL_STICKERS",
                "SEND_MESSAGES_IN_THREADS",
                "START_EMBEDDED_ACTIVITIES"
            ]

            // if(command.botPermissions.length) {
            //     const invalidPerms = [];

            //     for(const perm of command.botPermissions) {
            //         if(!validpermissions.includes(perm)) {
            //             return;
            //         }

            //         if(!message.guild.me.botPermissions(perm)) {
            //             invalidPerms.push(perm);
            //         }
            //     }

            //     if(invalidPerms.length) {
            //         const permError = new Discord.MessageEmbed()
            //             .setColor("#E74C3C")
            //             .setDescription(`${emoji.error} Missing Permissions: \`${invalidPerms.join("\`, \`")}\``)

            //         message.reply({ embeds: [permError] });
            //         return;
            //     }
            // }

            if(message.author.id === client.config.ownerId) {
                try {
                    command.execute(message, args, cmd, client, Discord);
                    return;
                } catch(err) {
                    const commandError = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} There was an error while executing that command!`)
                
                    message.reply({ embeds: [commandError] });
                    return;
                }
            }

            if(command.ownerOnly === true) {
                const permError = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You do not have permission to perform this command!`)

                message.reply({ embeds: [permError] });
                return;
            }

            if(command.userPermissions.length) {
                const invalidPerms = [];

                for(const perm of command.userPermissions) {
                    if(!validpermissions.includes(perm)) {
                        return;
                    }

                    if(!message.member.userPermissions.has(perm)) {
                        invalidPerms.push(perm);
                    }
                }

                if(invalidPerms.length) {
                    const permError = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} You do not have permission to perform this command!`)

                    message.reply({ embeds: [permError] });
                    return;
                }
            }

            if(!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const currentTime = Date.now();
            const timeStamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown) * 1000;

            if(timeStamps.has(message.author.id)) {
                const experationTime = timeStamps.get(message.author.id) + cooldownAmount;

                if(currentTime < experationTime) {
                    const timeLeft = (experationTime - currentTime) / 1000;

                    if(timeLeft.toFixed(0) > 1 || timeLeft.toFixed(0) < 0) {
                        const cooldown = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} Please wait ${timeLeft.toFixed(0)} seconds before running the command again!`)

                        message.reply({ embeds: [cooldown] });
                        return;
                    }

                    if(timeLeft.toFixed(0) < 1) {
                        const cooldown = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`${emoji.error} Please wait ${timeLeft.toFixed(0)} second before running the command again!`)

                        message.reply({ embeds: [cooldown] });
                        return;
                    }
                }
            }
            
            try {
                command.execute(message, args, cmd, client, Discord);
            } catch(err) {
                const commandError = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} There was an error while executing that command!`)

                message.reply({ embeds: [commandError] });
            }
        } catch(err) {
            console.error(err);
        }
    }
}