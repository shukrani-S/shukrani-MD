const axios = require("axios");
const { ezra } = require(__dirname + "/../fredi/ezra");
const os = require('os');
const conf = require(__dirname + "/../set");

const fetchGitHubStats = async () => {
    try {
        const response = await axios.get("https://api.github.com/repos/mr-X-force/LUCKY-MD-XFORCE");
        return {
            stars: response.data.stargazers_count * 11,
            forks: response.data.forks_count * 11,
            release: new Date(response.data.created_at).toLocaleDateString('en-GB'),
            url: response.data.html_url
        };
    } catch (err) {
        console.error("GitHub Error:", err);
        return {
            stars: 0,
            forks: 0,
            release: "Unknown",
            url: "https://github.com/mr-X-force/LUCKY-MD-XFORCE"
        };
    }
};

ezra({
    nomCom: "repo",
    aliases: ["script", "cs"],
    reaction: '📦',
    nomFichier: __filename
}, async (command, zk, context) => {
    const { nomAuteurMessage, msg } = context;
    const stats = await fetchGitHubStats();

    const text = `*📦 Hello ${nomAuteurMessage}!*

*🤖 This is ${conf.BOT}* — the smartest WhatsApp bot coded by *${conf.OWNER_NAME}*.

Fork and 🌟 my GitHub repo!

╭─────────────
┣⁠✦ *Stars:* ${stats.stars}
┣⁠✦ *Forks:* ${stats.forks}
┣⁠✦ *Release:* ${stats.release}
┣⁠✦ *Repo:* ${stats.url}
╰─────────────`;

    try {
        await zk.sendMessage(msg.key.remoteJid, {
            text,
            buttons: [
                { buttonId: ".menu", buttonText: { displayText: "📟 Menu" }, type: 1 },
                { buttonId: ".ping", buttonText: { displayText: "📶 Ping" }, type: 1 },
                { buttonId: "https://instagram.com/frediezra", buttonText: { displayText: "📷 Instagram" }, type: 1 },
                { buttonId: "https://facebook.com/FrediEzra", buttonText: { displayText: "📘 Facebook" }, type: 1 },
                { buttonId: "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f", buttonText: { displayText: "📢 Wa Channel" }, type: 1 },
                { buttonId: "https://youtube.com/@freeonlinetzT1", buttonText: { displayText: "▶️ YouTube" }, type: 1 }
            ],
            footer: "🔗 Visit the repo & support",
            headerType: 1
        });
    } catch (err) {
        console.error("SendMessage Error:", err);
    }
});
