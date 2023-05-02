const emoji = require("../../configs/emojis.json");
const loadCommands = require("../../helpers/loadCommands");
const loadSlashCommands = require("../../helpers/loadSlashCommands");
const loadEvents = require("../../helpers/loadEvents");

module.exports = {
    name: "reload",
    description: "Reloads the bot.",
    aliases: ["rl", "rlbot", "reloadbot"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const reloading = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.pingpong} Reloading...`)

            message.reply({ embeds: [reloading] })
                .then(async msg => {
                    await loadCommands(client);
                    await loadSlashCommands(client);
                    await loadEvents(client, Discord);

                    const reloaded = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} Reloaded!`)

                    msg.edit({ embeds: [reloaded] });
                })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)
                
            message.reply({ embeds: [error] });
        }
    }
}