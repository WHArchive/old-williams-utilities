const Meme = require("memer-api");
const memer = new Meme(process.env.memerAPIToken);
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "delete",
    description: "Sends an image of a user being \"deleted\"",
    category: "image",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Member to be \"deleted\"."
        }
    ],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member") || interaction.member;
            const avatar = member.displayAvatarURL({ format: "png" });

            memer.delete(avatar).then(async image => {
                const attachment = new Discord.MessageAttachment(image, "delete.png");

                await interaction.editReply({ files: [attachment] });
            })
        } catch(err) {
            console.error(err);
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}