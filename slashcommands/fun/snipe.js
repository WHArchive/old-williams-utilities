const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "snipe",
    description: "Snipe a Message",
    category: "fun",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const snipe = client.snipes.get(interaction.channel.id);

            if(!snipe) {
                const noSnipe = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${clien.emoji.error} There is nothing to snipe!`)

                await interaction.editReply({ embeds: [noSnipe] });
                return;
            }

            if(snipe.type === "Message Edited") {
                const snipedMessage = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setAuthor(snipe.author.tag, snipe.author.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${snipe.author.id}`)
                    .setTitle(snipe.type)
                    .setURL(snipe.url)
                    .addFields (
                        {name: "Before", value: snipe.oldContent},
                        {name: "After", value: snipe.newContent}
                    )
                    .setImage(snipe.image)
                    .setTimestamp(snipe.createdAt)

                await interaction.editReply({ embeds: [snipedMessage] });
                return;
            }

            const snipedMessage = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setAuthor(snipe.author.tag, snipe.author.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${snipe.author.id}`)
                .setTitle(snipe.type)
                .setDescription(snipe.content)
                .setImage(snipe.image)
                .setTimestamp(snipe.createdAt)

            await interaction.editReply({ embeds: [snipedMessage] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}