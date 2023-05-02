const axios = require("axios");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "banner",
    description: "Get a User's Banner",
    category: "image",
    options: [
        {
            type: "USER",
            name: "member",
            description: "Get a User's Banner"
        }
    ],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member") || interaction.member;

            const data = await axios.get(`https://discord.com/api/users/${member.id}`, {
                headers: {
                    Authorization: `Bot ${client.token}`
                }
            }).then(d => d.data);

            if(data.banner) {
                let url = data.banner.startsWith("a_") ? ".gif?size=4096": ".png?size=4096";
                url = `https://cdn.discordapp.com/banners/${member.id}/${data.banner}${url}`;

                const authorBanner = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setTitle(`${member.tag}'s Banner`)
                    .setImage(url)

                const bannerButton = new Discord.MessageActionRow()
                    .addComponents (
                        new Discord.MessageButton()
                            .setStyle("LINK")
                            .setLabel("Link")
                            .setURL(url)
                    )

                await interaction.editReply({ embeds: [authorBanner], components: [bannerButton] });
            } else {
                const noBanner = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} ${member} does not have a banner!`)

                await interaction.editReply({ embeds: [noBanner] });
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}