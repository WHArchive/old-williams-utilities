const Meme = require("memer-api");
const memer = new Meme(process.env.memerAPIToken);
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "youtubecomment",
    description: "Sends an image of someone commenting something on YouTube.",
    category: "image",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Member to comment.",
            required: true
        },

        {
            type: "STRING",
            name: "message",
            description: "Message to comment.",
            required: true
        }
    ],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member");
            const username = member.username;
            const avatar = member.displayAvatarURL({ format: "png" });

            const message = interaction.options.getString("message");

            memer.youtube(avatar, username, message).then(async image => {
                const attachment = new Discord.MessageAttachment(image, "youtube.png");

                await interaction.editReply({ files: [attachment] });
            })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}