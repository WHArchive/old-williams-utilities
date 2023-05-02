const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "guild",
    description: "Get information about the guild.",
    category: "info",
    aliases: ["guildinfo", "guild-info", "server", "serverinfo", "server-info"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const guild = message.guild;

            var dd = message.guild.createdAt.getDate();
            var mm = message.guild.createdAt.getMonth() + 1; 
            var yyyy = message.guild.createdAt.getFullYear();

            if(dd < 10) dd = "0" + dd;
            if(mm < 10) mm = "0" + mm;

            const createdAt = `${dd}/${mm}/${yyyy}`;

            const verificationLevels = {
                NONE: "None",
                LOW: "Low",
                MEDIUM: "Medium",
                HIGH: "High",
                VERY_HIGH: "Very High"
            }

            const filterLevels = {
                DISABLED: "Off",
                MEMBERS_WITHOUT_ROLES: "No Roles",
                ALL_MEMBERS: "Everyone"
            }

            const boostTier = {
                NONE: "0"
            }

            const guildInfo = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setThumbnail(guild.iconURL({ format: "png", dynamic: true }))
                .setTitle("Guild Information")
                .addFields (
                    {name: "Guild Name", value: guild.name},
                    {name: "ID", value: `\`${guild.id}\``},
                    {name: "Owner", value: `<@${message.guild.ownerId}>`},
                    {name: "Creation Date", value: `\`${createdAt}\` Format: dd/mm/yyyy`},
                    {name: "Member Count", value: `\`${guild.memberCount}\``},
                    {name: "Verification Level", value: verificationLevels[guild.verificationLevel]},
                    {name: "Explicit Level", value: filterLevels[guild.explicitContentFilter]},
                    {name: "Boost Tier", value: `Tier \`${boostTier[guild.premiumTier ? guild.premiumTier : "0"]}\``},
                    {name: "Boosts", value: `\`${guild.premiumSubscriptionCount || "0"}\``},
                    {name: "Emojis", value: `\`${guild.emojis.cache.size}\``},
                    {name: "Roles", value: `\`${guild.roles.cache.size}\``}
                )
        
            message.reply({ embeds: [guildInfo] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}