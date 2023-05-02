const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "lock",
    description: "Lock a channel.",
    category: "moderation",
    options: [
        {
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
            name: "channel",
            description: "Channel to lock."
        }
    ],
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["EMBED_LINKS", "MANAGE_CHANNELS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const channel = interaction.options.getChannel("channel");
            const role = interaction.guild.roles.cache.find(role => role.name === "@everyone");

            if(channel) {
                if(channel.id === interaction.channel.id) {
                    interaction.channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": false });
                    const channelLocked = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setTitle("Channel Locked")
                        .setDescription(`${emoji.lock} Channel has been locked!`)
                        .setTimestamp()
                        .setFooter(`Channel Locked by: ${interaction.user.tag}`)

                    await interaction.editReply({ embeds: [channelLocked] });
                    return;
                }

                channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": false });
                const channelLock = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle("Channel Locked")
                    .setDescription(`${emoji.lock} ${channel} has been locked!`)
                    .setTimestamp()
                    .setFooter(`Channel Locked by: ${interaction.user.tag}`)

                await interaction.editReply({ embeds: [channelLock] });

                const channelLocked = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle("Channel Locked")
                    .setDescription(`${emoji.lock} Channel has been locked!`)
                    .setTimestamp()
                    .setFooter(`Channel Locked by: ${interaction.user.tag}`)

                channel.send({ embeds: [channelLocked] });
                return;
            }

            interaction.channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": false });
            const channelLocked = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setTitle("Channel Locked")
                .setDescription(`${emoji.lock} Channel has been locked!`)
                .setTimestamp()
                .setFooter(`Channel Locked by: ${interaction.user.tag}`)

            await interaction.editReply({ embeds: [channelLocked] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}