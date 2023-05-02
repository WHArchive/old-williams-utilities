const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

client.config = require("./config.json");

const mongodb = require("./helpers/mongodb");
require("dotenv").config();

mongodb();

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();

["command", "slashCommand", "event"].forEach(handler => {
    require(`./handlers/${handler}`) (client, Discord);
})

client.snipes = new Discord.Collection();
client.deleteSnipes = new Discord.Collection();
client.editSnipes = new Discord.Collection();

client.login(process.env.token);