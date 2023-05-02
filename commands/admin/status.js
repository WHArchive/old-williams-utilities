const presence = require("../../configs/presence.json");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "status",
    description: "Set the bot's status.",
    aliases: ["botstatus"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const status = args.join(" ");

            if(!status || status === "reset") {
                client.user.setStatus(presence.status);

                console.log(`${message.author.tag}, reset my status!`)
                const statusReset = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} I have reset my status!`)

                message.reply({ embeds: [statusReset] });
                return;
            }

            if(status === "online") {
                client.user.setStatus(status);

                console.log(`${message.author.tag}, set my status to: Online`);
                const statusSet = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} I have set my status to: ${emoji.online} Online`)
                        

                message.reply({ embeds: [statusSet] });
                return;
            }

            if(status === "idle") {
                client.user.setStatus(status);

                console.log(`${message.author.tag}, set my status to: Idle`);
                const statusSet = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} I have set my status to: ${emoji.idle} Idle`)

                message.reply({ embeds: [statusSet] });
                return;
            }

            if(status === "dnd") {
                client.user.setStatus(status);

                console.log(`${message.author.tag}, set my status to: Do Not Disturb`);
                const statusSet = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} I have set my status to: ${emoji.dnd} Do Not Disturb`)

                message.reply({ embeds: [statusSet] });
                return;
            }

            if(status === "invisible") {
                client.user.setStatus(status);

                console.log(`${message.author.tag}, set my status to: Invisible`);
                const statusSet = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} I have set my status to: ${emoji.offline} Invisible`)
                        
                message.reply({ embeds: [statusSet] });
                return;
            }

            const error1 = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} Please enter a valid status!`)
                    
            message.reply({ embeds: [error1] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)
                
            message.reply({ embeds: [error] });
        }
    }
}