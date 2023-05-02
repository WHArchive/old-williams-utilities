const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "technoblade",
    description: "Get a random Technoblade saying.",
    category: "fun",
    options: [],
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const quotes = [
                "Technoblade never dies.",
                "Technoblade… sometimes dies…",
                "Sex is the answer.",
                "I'm the second worst thing to ever happen to those orphans.",
                "Quackity… they weren't always orphans.",
                "I dropkicked that child only in self defence... please Officer you gotta believe me!",
                "Do not put your plans and techniques in a youtube video, you fool, you moron",
                "Bruhhhhhh.",
                "I just praised Jesus and I'm not even Christian!",
                "If Hypixel has taught me something, it's that if you have a problem, the answer is slavery.",
                "Kill Lukas, he must die.",
                "Nope, only death.",
                "Say it with me. NOT. EVEN. CLOSE.",
                "I can tryhard any game!",
                "BLOOD FOR THE BLOOD GOD!",
                "I don't believe in friendship, Tommy… we tell ourselves it's real so the cogs of society can turn… the only thing that's real, Tommy… is CASH!",
                "You can't run away from all your problems… not when they have ender pearls.",
                "Let's cyberbully some nerds.",
                "WHAT A NERRRD!",
                "Thank you, Hypixel.",
                "Withers are homophobic.",
                "This is my main game.",
                "If you wish to defeat me, train for another [insert multiple of 100 here] years.",
                "I'm so good at video games.",
                "All my subscribers are going to unsub immediately if I lose this.",
                "[Kills someone and gets their coins] \"Thank you very much, sir.\"",
                "Let's stab this guy to death.",
                "This guy is insistent on being a clown.",
                "It's all part of my Master Plan.",
                "\"When I first made this grinder, I thought that I was trapping the skeletons, but now, I've realized... I was only trapping myself...\" \"...OH HEY LEVEL 50!\"",
                "SUBSCRIBE TO TECHNOBLADE!",
                "Uninstallin'",
                "\"PIG+++…\" (any abnormal amount of pluses)",
                "Dude, these orphans are getting destroyed.",
                "I'M OUT, BYE, I'M LEAVING.",
                "I need an ego boost.",
                "One of us. One of us.",
                "Sometimes it's tough being the best.",
                "HEEEEEEH?!?!?",
                "Let’s play a relevant game, like Grinch Simulator.",
                "Buy my Youtooz.",
                "Like my grandma, my blade is sharper than society. When President?",
                "This really says a lot about our society.",
                "NOOOOOOOOOOOOOOOOOOOOO!!!!",
                "PEER PRESSURE, PEER PRESSURE.",
                "It's like drop kicking a toddler.",
                "Dibs on earth.",
                "[insert Minecraft name], that name strikes fear into their enemies.",
                "To simp or not to simp.",
                "We win these!",
                "Phil wasn't here last time because he was getting married! What a simp! What a simp!",
                "Respect women!",
                "Chat, if my mic is muted then spam [relevant channel meme]",
                "This man’s been playing checkers, while I've been farming potatoes, HE'S THROUGH!!!",
                "Party Games is my major, English is the minor.",
                "I'm so good at hitting small animals.",
                "There ain't enough room for the two of us on this server, boy.",
                "This is the second-worst thing that has happened to these orphans in their lives.",
                "Take that, orphans.",
                "I know you're in- I know you're in the UK or somewhere in Europe- in one of those countries that doesn't matter and I know your time is disadvantageous. Did you know what, it should be about 11:00 PM where you are, your bedtime is coming up, whereas for me, it's like 3:39 PM, I can be here all day, so you want to get this battle done.",
                "I'm just a hardworking honest man, stabbing people for coins.",
                "Think of how far I could dropkick a dog that small.",
                "NERRRRRDSS *laughing*",
                "What kind of question is that?!",
                "AY CARAMBA DONDE ESTA LA BIBLIOTECAAAAAAAAAAAAAAAAAAA",
                "Discord scales your voice to your subscriber counts",
                "You're the kind of guy to play against Magnus Carlsen in chess and take out his pawn and go 'OhMyGoD I ToOk YoUr PaWn' but he's like 'Oh but I took your queen-' 'I tOoK yOuR pAwN'",
                "He's the type to brag about non-final kills.",
                "Now the first thing you do when you get married is you go to her- you go to your wife, and you take off all of her clothes. And then you put it on yourself for the stat bonus.",
                "We're dancing, we're dancing, we're dancing on him, we're dancing, GET DAAAANCED ON! TWO WEEKS OF MY LIFE, SQUID! TWO WEEKS! WATCH ME DANCE, SQUID KID! YOU LOSE! YOU LOSE THE WAR! He can see this, he has the mod pack! He can see these moves. Get out of here, SQUID KID! TWO WEEKS OF MY- NINE MONTHS I farmed potatoes. GET HIM OUT-",
                "Look, I'm an atheist, but when God sends me to hell, I want him to hesitate.",
                "Rank number 1 isn't an achievement, it's a prison which forces you to dedicate your life to defend a temporary title. But now, with the war finally over… I'm free.",
                "It is only with a worthy rival that one can reach their fullest potential.",
                "He's playing Skyblock while I'm playing DEATH NOTE!",
                "DANCE POTATO BOY, DANCE!",
                "They say that history is written by the winners, but I can't help notice him writing over there.",
                "Imagine dating a woman, total simp move, bro…",
                "I'm used to playing tournaments a man down; we still got this.",
                "I'm speedrunning 3 million subscribers",
                "Can you change your name? You're ruining a lot of my catchphrases, I have to say.",
                "I'm about to speedrun this man's funeral.",
                "That's at least 12 pizzas!",
                "If you see twins just kill one of them. Gets rid of a lot of confusion.",
                "I think Skyblock, at its core, is the ultimate challenge in resource management. You spawn on a tiny island in an empty universe. All you have is a tree, some supplies, and some dirt to stand on. You have to treasure every dirt block because if one falls into the void, there’s no way to replace it. As you carefully navigate your absurd circumstance, you gain a new appreciation for the few things you have, as you meticulously use them to their fullest effect. With nothing but some ice, lava, and saplings, you slowly transform this empty expanse into a world of your very own. Skyblock teaches us that no matter how ridiculous the odds may seem, within us resides the power to overcome these obstacles and achieve something beautiful. And one day, we’ll look back at where we started, and be amazed at how far we’ve come.",
                "I had to take a break from drowning to get a glass of water.",
                "EVERYONE ABOARD THE TECHNOPLANE!!",
                "It's like Sun Tzu said \"[Insert Sun Tzu Art of War quote here]\"",
                "WEAKSAUCE!",
                "Tommy, the thing is, you're using words, but the thing about this world, Tommy, is that the only universal language is violence. And we've had that conversation, we've spoken that language in the pit! Onto a new day, a new plot - to destroy Manberg.",
                "Let me tell you a story, Tommy, about a man called Theseus. His country (well his city state technically) was in danger, and he sent him forth into enemy lines, he slayed the Minotaur, and saved his city, do you know what they did to him, Tommy? They exiled him. He died in disgrace, despised by his people. That's what happens to heroes, Tommy. The Greeks knew the score, but if you want to be a hero, Tommy, that's fine.",
                "Do you want to be hero, Tommy? You want to be a hero, Tommy!? THEN DIE LIKE ONE!!",
                "Good things don't happen to heroes.",
                "Of course I don’t suffer from hubris because hubris is a flaw, and I am perfect. Therefore, I don't have hubris.",
                "No... no, this can’t be... this man... made eight potato eleven minions... AND THEN HE PAINTED THE MONA LISA!",
                "There's voices... sometimes the voices say... E.",
                "My doctor has me taking some new medication, so if in the future I am a completely unbearable douchebag, please let me know, because that means the medicine isn't having any effect.",
                "Just ditched a woman, feeling good!",
                "If I want to die to a fire, all I have to do is go outside.",
                "I'm seeing a lot of death, but at least we have more trees.",
                "I have a pickaxe, AND I WILL PUT IT THROUGH YOUR TEETH, QUACKITY!",
                "It’s a Black Friday sale on the Earth and it’s 100% off. Add to cart.",
                "All I know is anarchy, violence, and get subscriber.",
                "FEAR IS THE GREATEST MOTIVATOR.",
                "Problem: 'My baby needs to learn to understand theoretical physics' - screw all of you who gave me this prompt. The solution: A GUN.",
                "Are there any millionaires in the chat?",
                "You see, uh, back in high school, before I had a huge ego, a lesbian referred to me as ‘actually pretty funny’ and my ego has been coasting ever since! So, they’re all right with me. Alright?",
                "We’re gonna need another forest...",
                "I clearly remember there being an infant in this boat... ***DID YOU EAT THAT BABY?***",
                "After 3 minutes have elapsed, you’re gonna want to give up on your dreams, like so.",
                "Heh?!",
                "I immediately headed to the safest place I knew, Afghanistan",
                "I don’t actually have any bread, so we’re just gonna pour a s**t-ton of whatever the hell this is.",
                "Things were getting canceled so fast, people thought it was Twitter!",
                "For reference, it took me three attempts to put on my shirt.",
                "Startin’ the stream."
            ]

            const quote = quotes[Math.floor(Math.random() * quotes.length)];

            const technobladeQuote = new Discord.MessageEmbed()
                .setColor("#1F51FF")
                .setDescription(quote)

            await interaction.editReply({ embeds: [technobladeQuote] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`${emoji.error} An error occurred!`)

            await interaction.editReply({ embeds: [error] });
        }
    }
}