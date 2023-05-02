module.exports = (client, Discord) => {
    const loadEvents = require("../helpers/loadEvents");

    loadEvents(client, Discord);

    const emoji = require("../configs/emojis.json");

    const prefixSchema = require("../models/prefixSchema");

    client.prefix = async function(message) {
        let prefix;

        const data = await prefixSchema.findOne({ _id: message.guild.id })
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

    client.join = async function(message) {
        const data = await joinSchema.findOne({ _id: message.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `Channel: <#${data.channel}>\nMessage: \`${data.message}\``;
    }

    const leaveSchema = require("../models/leaveSchema");

    client.leave = async function(message) {
        const data = await leaveSchema.findOne({ _id: message.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `Channel: <#${data.channel}>\nMessage: \`${data.message}\``;
    }
}