module.exports = {
	name: "messageUpdate",
	execute(client, Discord, oldMessage, newMessage) {
        try {
            if(oldMessage.partial || newMessage.partial || (oldMessage.embeds.length && !oldMessage.content) || (newMessage.embeds.length && !newMessage.content)) return;

            client.snipes.set(oldMessage.channel.id, {
                type: "Message Edited",
                url: oldMessage.url,
                id: oldMessage.id,
                author: oldMessage.author,
                oldContent: oldMessage.content,
                newContent: newMessage.content,
                image: oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null,
                createdAt: newMessage.editedTimestamp
            })

            client.editSnipes.set(oldMessage.channel.id, {
                type: "Message Edited",
                url: oldMessage.url,
                id: oldMessage.id,
                author: oldMessage.author,
                oldContent: oldMessage.content,
                newContent: newMessage.content,
                image: oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null,
                createdAt: newMessage.editedTimestamp
            })
        } catch(err) {
            console.error(err);
        }
    }
}