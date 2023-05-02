const presence = require("../../configs/presence.json");

module.exports = {
	name: "ready",
	once: true,
	async execute(client, Discord) {
        try {
			console.log("Bot is Online!");
			console.log(`Logged in as: ${client.user.tag}`);

			client.user.setPresence({ status: presence.status, activity: { name: presence.activity, type: presence.activityType } });
		} catch(err) {
			console.error(err);
		}
	}
}