const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "leave",
    description: "Make the bot leave a guild.",
    aliases: ["leaveguild", "leaveserver"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const guildID = args[0];

            if(!guildID) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a guild ID!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(isNaN(guildID)) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a valid guild ID!`)

                message.reply({ embeds: [error2] });
                return;
            }

            const guild = client.guilds.cache.get(guildID);

            if(!guild) {
                const error3 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} I am not in that guild!`)

                message.reply({ embeds: [error3] });
                return;
            }

            if(guild.id === message.guild.id) {
                const error4 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You can not make me leave the guild you are currently in!`)

                message.reply({ embeds: [error4] });
                return;
            }

            guild.leave();

            const guildLeave = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} I have left guild: \`${guild.name}\` | \`${guild.id}\``)

            message.reply({ embeds: [guildLeave] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)
                
            message.reply({ embeds: [error] });
        }
    }
}