const fs = require("fs");

module.exports = async (client, guild) => {
    const commandsArray = [];

    const loadDir = (dirs) => {
        const slashCommandFiles = fs.readdirSync(`./slashcommands/${dirs}`).filter(file => file.endsWith(".js"));

        for(const file of slashCommandFiles) {
            const slashCommand = require(`../slashcommands/${dirs}/${file}`);

            commandsArray.push(slashCommand);
        }
    }

    ["admin", "fun", "image", "info", "moderation", "music", "utility"].forEach(sc => loadDir(sc));

    console.log(`Registering Slash Commands for Guild: ${guild.id}`);

    await client.guilds.cache.get(guild.id).commands.set(commandsArray);

    console.log(`Registered Slash Commands for Guild: ${guild.id}`);
}