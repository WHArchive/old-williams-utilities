const presence = require("../../configs/presence.json");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "activity",
    description: "Set the bot's activity.",
    aliases: ["botactivity"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const activity = args.join(" ");

            if(!activity || args[0] === "reset") {
                client.user.setPresence({ activity: { name: presence.activity, type: presence.activityType } });
                
                console.log(`${message.author.tag}, reset my activity!`);
                const activityReset = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} I have reset my activity!`)

                message.reply({ embeds: [activityReset] });
                return;
            }
                
            client.user.setActivity(activity);

            console.log(`${message.author.tag}, set my activity to: ${activity}`);
            const activitySet = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} I have set my activity to: \`${activity}\``)

            message.reply({ embeds: [activitySet] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}