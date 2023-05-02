const schema = require("../../models/afkSchema");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "afk",
    description: "Set your reason for being AFK.",
    category: "utility",
    aliases: [],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "60",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const reason = args.join(" ");

            if(!args[0]) {
                schema.findOne({ _id: message.author.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        await schema.findOneAndUpdate({ _id: message.author.id }, {
                            afk: true,
                            afk_reason: "AFK"
                        })

                        await data.save();
                    }

                    if(!data) {
                        data = new schema({
                            _id: message.author.id,
                            afk: true,
                            afk_reason: "AFK"
                        })

                        await data.save();
                    }
                })

                const setAFK = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} You are now AFK.`)

                message.reply({ embeds: [setAFK] });
                return;
            }

            schema.findOne({ _id: message.author.id }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(data) {
                    await schema.findOneAndUpdate({ _id: message.author.id }, {
                        afk: true,
                        afk_reason: reason
                    })

                    await data.save();
                }

                if(!data) {
                    data = new schema({
                        _id: message.author.id,
                        afk: true,
                        afk_reason: reason
                    })

                    await data.save();
                }

                const setAFK = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setDescription(`${emoji.successful} You are now AFK.`)

                message.reply({ embeds: [setAFK] });
            })
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}