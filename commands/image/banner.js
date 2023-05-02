const axios = require("axios");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "banner",
    description: "Get a user's banner.",
    category: "image",
    aliases: [],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.users.first() || message.author;

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

                message.reply({ embeds: [authorBanner], components: [bannerButton] });
                return;
            } else {
                const noBanner = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} ${member} does not have a banner!`)

                message.reply({ embeds: [noBanner] });
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}