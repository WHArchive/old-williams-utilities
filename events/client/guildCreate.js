const schema = require("../../models/schemas/guildSchema");

module.exports = {
    name: "guildCreate",
    async execute(client, Discord, guild) {
        try {
            schema.create({ _id: guild.id });
        } catch(err) {
            console.error(err);
        }
    }
}