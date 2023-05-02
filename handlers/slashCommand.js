module.exports = (client, Discord) => {
    const loadSlashCommands = require("../helpers/loadSlashCommands");

    loadSlashCommands(client);

    const emoji = require("../configs/emojis.json");

    const prefixSchema = require("../models/prefixSchema");

    client.prefix = async function(interaction) {
        let prefix;

        const data = await prefixSchema.findOne({ _id: interaction.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(data) {
            if(data.prefix) {
                prefix = data.prefix;
            }
        } else {
            prefix = client.config.defaultPrefix;
        }

        return prefix;
    }

    const joinSchema = require("../models/joinSchema");

    client.join = async function(interaction) {
        const data = await joinSchema.findOne({ _id: interaction.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `Channel: <#${data.channel}>\nMessage: \`${data.message}\``;
    }

    const leaveSchema = require("../models/leaveSchema");

    client.leave = async function(interaction) {
        const data = await leaveSchema.findOne({ _id: interaction.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `Channel: <#${data.channel}>\nMessage: \`${data.message}\``;
    }

    require("dotenv").config();
}