const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "shard",
    description: "Get information on the current shard.",
    category: "info",
    aliases: ["shardinfo", "shard-info"],
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "30",
    enabled: false,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const shard = client.ws.shards.get(message.guild.shard.id);

            const shardInfo = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.information} This server's shard is: \`${shard.id + 1}\``)

            message.reply({ embeds: [shardInfo] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}