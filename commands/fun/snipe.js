const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "snipe",
    description: "Snipe a deleted or edited message.",
    category: "fun",
    aliases: ["deletesnipe", "editsnipe"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "3",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(cmd === "deletesnipe" || args[0] === "delete") {
                const snipe = client.deleteSnipes.get(message.channel.id);

                if(!snipe) {
                    const noSnipe = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} There is nothing to snipe!`)

                    message.reply({ embeds: [noSnipe] });
                    return;
                }

                const snipedMessage = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(snipe.author.tag, snipe.author.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${snipe.author.id}`)
                    .setTitle(snipe.type)
                    .setDescription(snipe.content)
                    .setImage(snipe.image)
                    .setTimestamp(snipe.createdAt)

                message.reply({ embeds: [snipedMessage] });
                return;
            }

            if(cmd === "editsnipe" || args[0] === "edit") {
                const snipe = client.editSnipes.get(message.channel.id);

                if(!snipe) {
                    const noSnipe = new Discord.MessageEmbed()
                        .setColor("#E74C3C")
                        .setDescription(`${emoji.error} There is nothing to snipe!`)

                    message.reply({ embeds: [noSnipe] });
                    return;
                }

                const snipedMessage = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(snipe.author.tag, snipe.author.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${snipe.author.id}`)
                    .setTitle(snipe.type)
                    .setURL(snipe.url)
                    .addFields (
                        {name: "Before", value: snipe.oldContent},
                        {name: "After", value: snipe.newContent}
                    )
                    .setImage(snipe.image)
                    .setTimestamp(snipe.createdAt)

                message.reply({ embeds: [snipedMessage] });
                return;
            }

            const snipe = client.snipes.get(message.channel.id);

            if(!snipe) {
                const noSnipe = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} There is nothing to snipe!`)

                message.reply({ embeds: [noSnipe] });
                return;
            }

            if(snipe.type === "Message Edited") {
                const snipedMessage = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(snipe.author.tag, snipe.author.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${snipe.author.id}`)
                    .setTitle(snipe.type)
                    .setURL(snipe.url)
                    .addFields (
                        {name: "Before", value: snipe.oldContent},
                        {name: "After", value: snipe.newContent}
                    )
                    .setImage(snipe.image)
                    .setTimestamp(snipe.createdAt)

                message.reply({ embeds: [snipedMessage] });
                return;
            }

            const snipedMessage = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setAuthor(snipe.author.tag, snipe.author.displayAvatarURL({ format: "png", dynamic: true }), `https://discord.com/users/${snipe.author.id}`)
                .setTitle(snipe.type)
                .setDescription(snipe.content)
                .setImage(snipe.image)
                .setTimestamp(snipe.createdAt)

            message.reply({ embeds: [snipedMessage] });
        } catch(err) {
            console.error(err);
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}