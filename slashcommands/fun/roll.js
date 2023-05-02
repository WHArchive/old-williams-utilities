const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "roll",
	description: "Roll a Dice",
    category: "fun",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const rolledNumber = Math.floor(Math.random() * 6) + 1;

            const roll = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(`:game_die: You rolled a \`${rolledNumber}\`!`)

            await interaction.editReply({ embeds: [roll] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}