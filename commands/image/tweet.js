const Meme = require("memer-api");
const memer = new Meme(process.env.memerAPIToken);
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "tweet",
    description: "Sends an image of someone tweeting something.",
    category: "image",
    aliases: ["tweeter"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.members.first() || message.author;
            const username = member.username;
            const avatar = member.displayAvatarURL({ format: "png" });

            const msg = args.join(" ");

            if(!msg) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please specify a message!`)

                message.reply({ embeds: [error1] });
                return;
            }

            memer.tweet(avatar, username, msg).then(image => {
                const attachment = new Discord.MessageAttachment(image, "tweet.png");

                message.reply({ files: [attachment] });
            })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}