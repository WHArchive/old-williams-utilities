const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "slowmode",
    description: "Set the slowmode for a channel.",
    category: "moderation",
    aliases: ["slow", "sm"],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args[0]) {
                if(message.channel.rateLimitPerUser > 1 || message.channel.rateLimitPerUser < 1) {
                    const currentSlowmodeSeconds = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.information} Slowmode is currently \`${message.channel.rateLimitPerUser}\` seconds!`)

                    message.reply({ embeds: [currentSlowmodeSeconds] });
                    return;
                }
    
                if(message.channel.rateLimitPerUser = 1) {
                    const currentSlowmodeSecond = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.information} Slowmode is currently \`${message.channel.rateLimitPerUser}\` second!`)

                    message.reply({ embeds: [currentSlowmodeSecond] });
                    return;
                }
            }

            if(args[0] === "off") {
                message.channel.setRateLimitPerUser(0);

                const off = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} Slowmode has been turned off!`)

                message.reply({ embeds: [off] });
                return;
            }

            if(isNaN(args[0])) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a number!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(args[0] > 21600 || args[0] < 0) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You can only set the slowmode between \`0\` and \`21600\` seconds!`)

                message.reply({ embeds: [error2] });
                return;
            }

            if(args[0] > 1 || args[0] < 1) {
                message.channel.setRateLimitPerUser(args[0]);
                const seconds = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} Slowmode has been set to \`${args[0]}\` seconds!`)

                message.reply({ embeds: [seconds] });
                return;
            }

            if(args[0] = 1) {
                message.channel.setRateLimitPerUser(args[0]);
                const second = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} Slowmode has been set to \`${args[0]}\` second!`)

                message.reply({ embeds: [second] });
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}