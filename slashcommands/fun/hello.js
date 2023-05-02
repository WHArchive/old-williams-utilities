const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "hello",
    description: "Says Hello",
    category: "fun",
    options: [
        {
            type: "USER",
            name: "user",
            description: "Say Hello to Someone"
        }
    ],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("user");

            if(member) {
                await interaction.editReply(`${emoji.wave} ${interaction.member} says Hello, ${member}!`)
                return;
            }

            await interaction.editReply(`${emoji.wave} Hello, ${interaction.member}!`);
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}