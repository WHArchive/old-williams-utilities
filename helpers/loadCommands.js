const fs = require("fs");

module.exports = async (client) => {
    const loadDir = (dirs) => {
        const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith(".js"));

        for(const file of commandFiles) {
            const command = require(`../commands/${dirs}/${file}`);

            if(command.name) {
                client.commands.set(command.name, command);

                console.log(`Loaded Command: ${command.name}`);
            } else {
                continue;
            }
        }
    }

    ["admin", "fun", "image",  "info", "moderation", "music", "utility"].forEach(c => loadDir(c));
}