module.exports = {
    name: "guildMemberRemove",
    async execute(client, Discord, member) {
        try {
            const leaveSchema = require("../../models/leaveSchema");

            leaveSchema.findOne({ guild: member.guild.id }, async (err, data) => {
                if(err) {
                    console.log(err);
                }

                if(data) {
                    const channel = member.guild.channels.cache.get(data.channel);
                    const message = data.message.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`);

                    const leaveMessage = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setDescription(message)

                    channel.send({ embeds: [leaveMessage] });
                }
            })
        } catch(err) {
            console.error(err);
        }
    }
}