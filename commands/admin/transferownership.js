const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "transferownership",
    description: "Transfers ownership of the current guild to the author. (If the bot is the guild owner)",
    aliases: ["transferowner"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(message.guild.ownerId === client.user.id) {
                await message.guild.setOwner(message.author.id);

                const transferred = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} Successfully transferred ownership of the guild to you!`)

                message.reply({ embeds: [transferred] });
                return;
            } else {
                const noOwnership = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} I do not own this guild!`)

                message.reply({ embeds: [noOwnership] });
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}