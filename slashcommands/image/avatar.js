const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "avatar",
    description: "Get a User's Avatar",
    category: "image",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Get a Member's Avatar"
        }
    ],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member") || interaction.member;

            const url = member.displayAvatarURL({ format: "png", dynamic: true });

            const userAvatar = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setTitle(`${member.tag}'s Avatar`)
                .setImage(url)

            const avatarButton = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Link")
                        .setURL(url)
                )

            await interaction.editReply({ embeds: [userAvatar], components: [avatarButton] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}