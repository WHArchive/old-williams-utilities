const fs = require("fs");

module.exports = async (client, Discord) => {
    const loadDir = (dirs) => {
        const eventFiles = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(".js"));

        for(const file of eventFiles) {
            const event = require(`../events/${dirs}/${file}`);

            client.events.set(event.name, event);

            console.log(`Loaded Event: ${event.name}`);

            if(event.once) {
                client.once(event.name, (message, interaction, member) => event.execute(client, Discord, message, interaction, member));
            } else {
                client.on(event.name, (message, interaction, member) => event.execute(client, Discord, message, interaction, member));
            }
        }
    }

    ["client", "guild"].forEach(e => loadDir(e));
}