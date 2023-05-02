const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "interactionCreate",
	async execute(client, Discord, interaction) {
        try {
            if(!interaction.isCommand()) return;

            const command = client.slashCommands.get(interaction.commandName);

            if(!command) return;

            await interaction.deferReply();

            if(command.enabled === false) {
                const commandDisabled = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} This command has been disabled!`)

                await interaction.editReply({ embeds: [commandDisabled] });
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

            //         if(!message.guild.me.botPermissions.has(perm)) {
            //             invalidPerms.push(perm);
            //         }
            //     }

            //     if(invalidPerms.length) {
            //         const permError = new Discord.MessageEmbed()
            //             .setColor("#E74C3C")
            //             .setDescription(`${emoji.error} I am missing these permissions: \`${invalidPerms.join("\`, \`")}\``)

            //         await interaction.editReply({ embeds: [permError] });
            //         return;
            //     }
            // }

            if(interaction.member.id === client.config.ownerId) {
                try {
                    await command.execute(interaction, client, Discord);
                    return;
                } catch(err) {
                    const commandError = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} There was an error while executing that command!`)

                    await interaction.editReply({ embeds: [commandError] });
                    return;
                }
            }

            if(command.ownerOnly === true) {
                const permError = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You do not have permission to peform this command!`)
    
                await interaction.editReply({ embeds: [permError] });
                return;
            }

            if(command.userPermissions.length) {
                const invalidPerms = [];

                for(const perm of command.userPermissions) {
                    if(!validpermissions.includes(perm)) {
                        return;
                    }

                    if(!interaction.member.userPermissions.has(perm)) {
                        invalidPerms.push(perm);
                    }
                }

                if(invalidPerms.length) {
                    const permError = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} You do not have permission to perform this command!`)

                    await interaction.editReply({ embeds: [permError] });
                    return;
                }
            }

            try {
                await command.execute(interaction, client, Discord);
            } catch(err) {
                const commandError = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} There was an error while executing that command!`)

                await interaction.editReply({ embeds: [commandError] });
            }
        } catch(err) {
            console.error(err);
        }
    }
}