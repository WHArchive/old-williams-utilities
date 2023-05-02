module.exports = {
    name: "guildMemberAdd",
    async execute(client, Discord, member) {
        try {
            const joinSchema = require("../../models/joinSchema");

            joinSchema.findOne({ guild: member.guild.id }, async (err, data) => {
                if(err) {
                    console.log(err);
                }

                if(data) {
                    const channel = member.guild.channels.cache.get(data.channel);
                    const message = data.message.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`);

                    const joinMessage = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(`${message}`)

                    channel.send({ embeds: [joinMessage] });
                }
            })
        } catch(err) {
            console.error(err);
        }
    }
}