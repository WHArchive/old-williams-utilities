const dig = require("discord-image-generation");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "rip",
    description: "\*dies\*",
    category: "image",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Member that dies."
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

            const image = await new dig.Rip().getImage(avatar);
            const attachment = new Discord.MessageAttachment(image, "rip.png");

            await interaction.editReply({ files: [attachment] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}