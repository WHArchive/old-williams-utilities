const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "slowmode",
    description: "Set the slowmode for a channel.",
    category: "moderation",
    options: [
        {
            type: "NUMBER",
            name: "seconds",
            description: "How many seconds to set the slowmode."
        }
    ],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            var number = interaction.options.getNumber("seconds");

            if(number || number === 0) {
                if(number > 21600 || number < 0) {
                    const error1 = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} You can only set the slowmode between \`0\` and \`21600\` seconds!`)
    
                    await interaction.editReply({ embeds: [error1] });
                    return;
                }
    
                if(number > 1 || number < 1) {
                    interaction.channel.setRateLimitPerUser(number);
                    const seconds = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} Slowmode has been set to \`${number}\` seconds!`)
    
                    await interaction.editReply({ embeds: [seconds] });
                    return;
                }
    
                if(number = 1) {
                    interaction.channel.setRateLimitPerUser(number);
                    const second = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} Slowmode has been set to \`${number}\` second!`)
    
                    await interaction.editReply({ embeds: [second] });
                }
                return;
            }

            if(interaction.channel.rateLimitPerUser > 1 || interaction.channel.rateLimitPerUser < 1) {
                const currentSlowmodeSeconds = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.information} Slowmode is currently \`${interaction.channel.rateLimitPerUser}\` seconds!`)

                await interaction.editReply({ embeds: [currentSlowmodeSeconds] });
                return;
            }

            if(interaction.channel.rateLimitPerUser = 1) {
                const currentSlowmodeSecond = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.information} Slowmode is currently \`${interaction.channel.rateLimitPerUser}\` second!`)

                await interaction.editReply({ embeds: [currentSlowmodeSecond] });
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}