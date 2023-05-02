const dig = require("discord-image-generation");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "triggered",
    description: "Makes someone triggered.",
    category: "image",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Person to be triggered."
        }
    ],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member") || interaction.member;
            const avatar = member.displayAvatarURL({ format: "png", size: 1024 });

            const image = await new dig.Triggered().getImage(avatar);
            const attachment = new Discord.MessageAttachment(image, "triggered.gif");

            await interaction.editReply({ files: [attachment] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}