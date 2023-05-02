const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "help",
    description: "Displays a list of all of the commands.",
    category: "info",
    aliases: ["commands", "command", "cmds", "cmd"],
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: "60",
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const fs = require("fs");

            const prefix = await client.prefix(message);

            const funCommands = [];
            const imageCommands = [];
            const infoCommands = [];
            const moderationCommands = [];
            const musicCommands = [];
            const utilityCommands = [];

            const loadDir = (dirs) => {
                const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith(".js"));

                for(const file of commandFiles) {
                    const command = require(`../../commands/${dirs}/${file}`);

                    if(command.name) {
                        if(command.enabled === false) {
                            continue;
                        }

                        if(command.category) {
                            if(command.category === "fun") {
                                funCommands.push(command.name);
                            }
    
                            if(command.category === "image") {
                                imageCommands.push(command.name);
                            }
    
                            if(command.category === "info") {
                                infoCommands.push(command.name);
                            }
    
                            if(command.category === "moderation") {
                                moderationCommands.push(command.name);
                            }
    
                            if(command.category === "music") {
                                musicCommands.push(command.name);
                            }
    
                            if(command.category === "utility") {
                                utilityCommands.push(command.name);
                            }
                        }
                    } else {
                        continue;
                    }
                }
            }
        
            ["fun", "image", "info", "moderation", "music", "utility"].forEach(c => loadDir(c));

            const fun = `\`${funCommands.join("\`, \`")}\``;
            const image = `\`${imageCommands.join("\`, \`")}\``;
            const info = `\`${infoCommands.join("\`, \`")}\``;
            const moderation = `\`${moderationCommands.join("\`, \`")}\``;
            // const music = `\`${musicCommands.join("\`, \`")}\``;
            const music = "N/A";
            const utility = `\`${utilityCommands.join("\`, \`")}\``;

            if(args[0] === "fun") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Fun Commands")
                    .setDescription(fun)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "image") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Image Commands")
                    .setDescription(image)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "info") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Info Commands")
                    .setDescription(info)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "moderation") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Moderation Commands")
                    .setDescription(moderation)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "music") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Music Commands")
                    .setDescription(music)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "utility") {
                const help = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Utility Commands")
                    .setDescription(utility)

                message.reply({ embeds: [help] });
                return;
            }

            const command = client.commands.get(args[0]) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

            if(command) {
                if(command.enabled === false || command.ownerOnly === true) {
                    const help = new Discord.MessageEmbed()
                        .setColor("#1F51FF")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTitle("Help")
                        .setDescription(`${emoji.information} My prefix here is: \`${prefix}\``)
                        .addFields (
                            {name: "Fun", value: fun},
                            {name: "Image", value: image},
                            {name: "Info", value: info},
                            {name: "Moderation", value: moderation},
                            {name: "Music", value: music},
                            {name: "Utility", value: utility}
                        )

                    message.reply({ embeds: [help] });
                    return;
                }

                let description = command.description;

                if(!description) {
                    description = "N/A";
                }

                let aliases = command.aliases;

                if(aliases !== []) {
                    aliases = `\`${aliases.join("\`, \`")}\``;
                } else {
                    aliases = "N/A";
                }

                if(aliases === "``" || !aliases) {
                    aliases = "N/A";
                }

                let userPermissions = command.userPermissions;

                if(userPermissions !== []) {
                    userPermissions = `\`${userPermissions.join("\`, \`")}\``;
                } else {
                    userPermissions = "N/A";
                }

                if(userPermissions === "``") {
                    userPermissions = "N/A";
                }

                let botPermissions = command.botPermissions;

                if(botPermissions !== []) {
                    botPermissions = `\`${botPermissions.join("\`, \`")}\``;
                } else {
                    botPermissions = "N/A";
                }

                if(botPermissions === "``") {
                    botPermissions = "N/A";
                }

                let cooldown = command.cooldown;

                if(cooldown !== "") {
                    cooldown = `\`${command.cooldown}\` seconds`;
                }

                if(cooldown === "" || !cooldown) {
                    cooldown = "\`0\` seconds";
                }

                if(cooldown === "1") {
                    cooldown = "\`1\` second"
                }

                const commandHelp = new Discord.MessageEmbed()
                    .setColor("#1F51FF")
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle(`Command: ${command.name}`)
                    .addFields (
                        {name: "Command", value: command.name},
                        {name: "Description", value: description},
                        {name: "Aliases", value: aliases},
                        {name: "User Permissions", value: userPermissions},
                        {name: "Bot Permissions", value: botPermissions},
                        {name: "Cooldown", value: cooldown}
                    )

                message.reply({ embeds: [commandHelp] });
                return;
            }

            const help = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("Help")
                .setDescription(`${emoji.information} My prefix here is: \`${prefix}\``)
                .addFields (
                    {name: "Fun", value: fun},
                    {name: "Image", value: image},
                    {name: "Info", value: info},
                    {name: "Moderation", value: moderation},
                    {name: "Music", value: music},
                    {name: "Utility", value: utility}
                )

            message.reply({ embeds: [help] });
        } catch(err) {
            console.log(err)
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            message.reply({ embeds: [error] });
        }
    }
}