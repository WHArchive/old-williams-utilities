const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "help",
	description: "Bot Commands",
    category: "info",
    options: [
        {
            type: "STRING",
            name: "category",
            description: "Select a category of commands."
        },

        {
            type: "STRING",
            name: "command",
            description: "Get information on a specific command."
        }
    ],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const categoryOption = interaction.options.getString("category");
            const commandOption = interaction.options.getString("command");

            const fs = require("fs");

            const funCommands = [];
            const imageCommands = [];
            const infoCommands = [];
            const moderationCommands = [];
            const musicCommands = [];
            const utilityCommands = [];

            const loadDir = (dirs) => {
                const slashCommandFiles = fs.readdirSync(`./slashcommands/${dirs}`).filter(file => file.endsWith(".js"));

                for(const file of slashCommandFiles) {
                    const slashCommand = require(`../../slashcommands/${dirs}/${file}`);

                    if(slashCommand.name) {
                        if(slashCommand.enabled === false) {
                            continue;
                        }

                        if(slashCommand.category) {
                            if(slashCommand.category === "fun") {
                                funCommands.push(slashCommand.name);
                            }
    
                            if(slashCommand.category === "image") {
                                imageCommands.push(slashCommand.name);
                            }
    
                            if(slashCommand.category === "info") {
                                infoCommands.push(slashCommand.name);
                            }
    
                            if(slashCommand.category === "moderation") {
                                moderationCommands.push(slashCommand.name);
                            }
    
                            if(slashCommand.category === "music") {
                                musicCommands.push(slashCommand.name);
                            }
    
                            if(slashCommand.category === "utility") {
                                utilityCommands.push(slashCommand.name);
                            }
                        }
                    } else {
                        continue;
                    }
                }
            }
        
            ["fun", "image", "info", "moderation", "music", "utility"].forEach(sc => loadDir(sc));

            const fun = `\`${funCommands.join("\`, \`")}\``;
            const image = `\`${imageCommands.join("\`, \`")}\``;
            const info = `\`${infoCommands.join("\`, \`")}\``;
            const moderation = `\`${moderationCommands.join("\`, \`")}\``;
            // const music = `\`${musicCommands.join("\`, \`")}\``;
            const music = "N/A";
            const utility = `\`${utilityCommands.join("\`, \`")}\``;

            if(categoryOption === "fun") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Fun Commands")
                    .setDescription(fun)

                await interaction.editReply({ embeds: [help] });
                return;
            }

            if(categoryOption === "image") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Image Commands")
                    .setDescription(image)

                await interaction.editReply({ embeds: [help] });
                return;
            }

            if(categoryOption === "info") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Info Commands")
                    .setDescription(info)

                await interaction.editReply({ embeds: [help] });
                return;
            }

            if(categoryOption === "moderation") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Moderation Commands")
                    .setDescription(moderation)

                await interaction.editReply({ embeds: [help] });
                return;
            }

            if(categoryOption === "music") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Music Commands")
                    .setDescription(music)

                await interaction.editReply({ embeds: [help] });
                return;
            }

            if(categoryOption === "utility") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Utility Commands")
                    .setDescription(utility)

                await interaction.editReply({ embeds: [help] });
                return;
            }

            if(commandOption) {
                const command = client.slashCommands.get(commandOption);

                if(command) {
                    if(command.enabled === false || command.ownerOnly === true) {
                        const help = new Discord.MessageEmbed()
                            .setColor("#1F51FF")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                            .setTitle("Help")
                            .addFields (
                                {name: "Fun", value: fun},
                                {name: "Image", value: image},
                                {name: "Info", value: info},
                                {name: "Moderation", value: moderation},
                                {name: "Music", value: music},
                                {name: "Utility", value: utility}
                            )

                        await interaction.editReply({ embeds: [help] });
                        return;
                    }

                    let description = command.description;

                    if(!description) {
                        description = "N/A";
                    }

                    let userPermissions = command.userPermissions;

                    if(userPermissions !== []) {
                        userPermissions = `\`${userPermissions.join("\`, \`")}\``;
                    } else {
                        userPermissions = "N/A";
                    }

                    if(userPermissions === "``") {
                        userPermissions = "N/A"
                    }

                    const commandHelp = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTitle(`Command: ${command.name}`)
                        .addFields (
                            {name: "Command", value: command.name},
                            {name: "Description", value: description},
                            {name: "User Permissions", value: userPermissions}
                        )

                    await interaction.editReply({ embeds: [commandHelp] });
                    return;
                }
            }

            const help = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("Help")
                .addFields (
                    {name: "Fun", value: fun},
                    {name: "Image", value: image},
                    {name: "Info", value: info},
                    {name: "Moderation", value: moderation},
                    {name: "Music", value: music},
                    {name: "Utility", value: utility}
                )

            await interaction.editReply({ embeds: [help] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}