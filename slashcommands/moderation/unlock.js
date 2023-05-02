const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "unlock",
    description: "Unlock a channel.",
    category: "moderation",
    options: [
        {
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
            name: "channel",
            description: "Channel to unlock."
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
                    interaction.channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": null });
                    const channelUnlocked = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setTitle("Channel Unlocked")
                        .setDescription(`${emoji.unlock} Channel has been unlocked!`)
                        .setTimestamp()
                        .setFooter(`Channel Unlocked by: ${interaction.user.tag}`)

                    await interaction.editReply({ embeds: [channelUnlocked] });
                    return;
                }

                channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": null });
                const channelUnlock = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle("Channel Unlocked")
                    .setDescription(`${emoji.unlock} ${channel} has been unlocked!`)
                    .setTimestamp()
                    .setFooter(`Channel Unlocked by: ${interaction.user.tag}`)

                await interaction.editReply({ embeds: [channelUnlock] });

                const channelUnlocked = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle("Channel Unlocked")
                    .setDescription(`${emoji.unlock} Channel has been unlocked!`)
                    .setTimestamp()
                    .setFooter(`Channel Unlocked by: ${interaction.user.tag}`)

                channel.send({ embeds: [channelUnlocked] });
                return;
            }

            interaction.channel.permissionOverwrites.edit(role, { "SEND_MESSAGES": null });
            const channelUnlocked = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setTitle("Channel Unlocked")
                .setDescription(`${emoji.unlock} Channel has been unlocked!`)
                .setTimestamp()
                .setFooter(`Channel Unlocked by: ${interaction.user.tag}`)

            await interaction.editReply({ embeds: [channelUnlocked] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}