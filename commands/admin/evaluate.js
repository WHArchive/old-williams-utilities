const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "evaluate",
    description: "Executes a piece of code.",
    aliases: ["eval", "execute", "run"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "",
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setDescription(`${emoji.error} Please enter something to evaluate!`)
    
                message.reply({ embeds: [error1] });
                return;
            }
            
            const input = message.content.split(" ").slice(1).join(" ");
            const output = eval(input);

            console.log(`${message.author.tag}, successfully evaluated: ${input}`);
            const evaluation = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setTitle("Evaluation")
                .setDescription(`${emoji.successful} Successfully evaluated: ${input}`)
                .addFields (
                    {name: "Input", value: `\`\`\`${input}\`\`\``},
                    {name: "Output", value: `\`\`\`${output}\`\`\``}
                )
                    
            message.reply({ embeds: [evaluation] });
            } catch(output) {
            const input = message.content.split(" ").slice(1).join(" ");

            console.log(`${message.author.tag}, tried to evaluate "${input}", but an error occured!`);
            const evalError = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setTitle("Evaluation")
                .setDescription(`${emoji.error} An error occurred!`)
                .addFields (
                    {name: "Input", value: `\`\`\`${input}\`\`\``},
                    {name: "Output", value: `\`\`\`${output}\`\`\``}
            )

            message.reply({ embeds: [evalError] });
        }
    }
}