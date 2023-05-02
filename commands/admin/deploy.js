const emoji = require("../../configs/emojis.json");
const registerSlashCommands = require("../../helpers/registerSlashCommands");

module.exports = {
    name: "deploy",
    description: "Deploy Slash Commands.",
    aliases: ["deploycommands", "deploycmds"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const deploying = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.pingpong} Deploying...`)

            message.reply({ embeds: [deploying] })
                .then(async msg => {
                    const guild = message.guild;

                    await registerSlashCommands(client, guild);

                    const deployed = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${emoji.successful} Successfully registered application commands!`)

                    msg.edit({ embeds: [deployed] })
                })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}