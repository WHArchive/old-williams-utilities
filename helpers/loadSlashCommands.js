const fs = require("fs");

module.exports = async (client) => {
    const loadDir = (dirs) => {
        const commandFiles = fs.readdirSync(`./slashcommands/${dirs}`).filter(file => file.endsWith(".js"));

        for(const file of commandFiles) {
            const command = require(`../slashcommands/${dirs}/${file}`);

            client.slashCommands.set(command.name, command);

            console.log(`Loaded Slash Command: ${command.name}`);
        }
    }

    ["admin", "fun", "image", "info", "moderation", "music", "utility"].forEach(sc => loadDir(sc));
}