const math = require("mathjs");
const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "calculator",
	description: "Calculate a Math Problem",
    category: "utility",
    options: [
        {
            type: "STRING",
            required: true,
            name: "question",
            description: "Math Question"
        }
    ],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const question = interaction.options.getString("question");
            const solution = math.evaluate(question);

            const mathSolution = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .addFields (
                    {name: "Question", value: `\`${question}\``},
                    {name: "Solution", value: `\`${solution}\``}
                )

            await interaction.editReply({ embeds: [mathSolution] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} Invalid Question!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}