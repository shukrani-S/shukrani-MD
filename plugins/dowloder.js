const { ezra } = require(__dirname + "/../fredi/ezra");
const { fetchVideoData } = require(__dirname + "/../fredi/songApi");

ezra({
    nomCom: "play",
    aliases: ["playvid", "giftplay"],
    reaction: '🎬',
    nomFichier: __filename
}, async (command, zk, context) => {
    const { msg, repondre, arg } = context;

    const query = arg.join(" ");
    if (!query) return repondre("🎯 Please provide a video link.\nExample: `.playvideo <link>`");

    const data = await fetchVideoData(query);
    if (!data) return repondre("❌ Failed to fetch video. Please try again or check the URL.");

    const text = `🎞️ *Title:* ${data.title}
📺 *Quality:* ${data.quality}
⏱️ *Duration:* ${data.duration}
📥 *Size:* ${data.size}
`;

    const buttons = [
        { buttonId: data.url_video, buttonText: { displayText: "🎥 Download Video" }, type: 1 },
        { buttonId: data.url_audio, buttonText: { displayText: "🎧 Download Audio" }, type: 1 },
        { buttonId: "https://youtube.com/@freeonlinetzT1", buttonText: { displayText: "▶️ YouTube Channel" }, type: 1 }
    ];

    await zk.sendMessage(msg.key.remoteJid, {
        image: { url: data.thumb },
        caption: text,
        footer: "🔗 Powered by FredieTech API",
        buttons,
        headerType: 4
    });
});
