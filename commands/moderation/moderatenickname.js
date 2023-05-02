const emoji = require("../../configs/emojis.json");
const nanoID = require("nanoid");

module.exports = {
    name: "moderatenickname",
    description: "Moderate a user's username.",
    category: "moderation",
    aliases: ["modnick", "moderate", "mod"],
    userPermissions: ["MANAGE_NICKNAMES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_NICKNAMES"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const user = message.mentions.members.first();

            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a member!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(user.permissions.has(Discord.Permissions.FLAGS.MANAGE_NICKNAMES)) {
                const error2 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} I do not have permission to moderate ${user}'s username!`)

                message.reply({ embeds: [error2] });
                return;
            }

            const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            const nanoid = nanoID.customAlphabet(alphabet, 8);

            const moderatedNickname = `Moderated Nickname ${nanoid()}`;

            user.setNickname(moderatedNickname);
            const nickModerated = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`${emoji.successful} I moderated ${user}'s name to: \`${moderatedNickname}\``)

            message.reply({ embeds: [nickModerated] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}