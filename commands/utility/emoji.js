const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "emoji",
    description: "Steal a emoji from another guild.",
    category: "utility",
    aliases: ["steal", "stealemoji"],
    userPermissions: ["MANAGE_EMOJIS_AND_STICKERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_EMOJIS_AND_STICKERS"],
    cooldown: "5",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args.length) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} You must specify at least one emoji!`)

                message.reply({ embeds: [error1] });
                return;
            }

            for(const rawemoji of args) {
                const parsedemoji = Discord.Util.parseemoji(rawemoji);

                if(parsedemoji.id) {
                    const extension = parsedemoji.animated ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/emojis/${parsedemoji.id + extension}`;

                    message.guild.emojis.create(url, parsedemoji.name)
                        .then(emoji => {
                            if(emoji.animated === true) {
                                const addedAnimatedemoji = new Discord.MessageEmbed()
                                    .setColor("#1F51FF")
                                    .setDescription(`Added emoji: ${emoji} \`<a:${emoji.name}:${emoji.id}>\``)

                                message.reply({ embeds: [addedAnimatedemoji] });
                                return;
                            }

                            const addedemoji = new Discord.MessageEmbed()
                                .setColor("#1F51FF")
                                .setDescription(`Added emoji: ${emoji} \`<${emoji.name}:${emoji.id}>\``)

                            message.reply({ embeds: [addedemoji] });
                        })
                }
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}