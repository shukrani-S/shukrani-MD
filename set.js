const fs = require('fs-extra');
const path = require('path');
const { Sequelize } = require('sequelize');

// Load environment variables from set.env
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: path.join(__dirname, 'set.env') });
}

// PostgreSQL DATABASE_URL from env
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    ssl: true,
    protocol: 'postgres',
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false },
    },
    logging: false,
});

module.exports = {
    session: process.env.SESSION_ID || 'shukrani',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB || 'https://github.com/shukrani-S/shukrani-MD.git',
    OWNER_NAME : process.env.OWNER_NAME || "Shukrani",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255773350309",
    DEV : process.env.DEV || "Shukrani Tz",

    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/bvy2u1.jpg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/bvy2u1.jpg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By SHUKRANI-MD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbB16dt9hXEyw3bO1k0p",
    WEBSITE : process.env.GURL || "https://whatsapp.com/channel/0029VbB16dt9hXEyw3bO1k0p",
    CAPTION : process.env.CAPTION || "SHUKRANI-MD",
    BOT : process.env.BOT_NAME || 'SHUKRANI-MD',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5',
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    SHUKRANI_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    CHAT_BOT : process.env.CHATBOT_INBOX || "no",
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",

    DATABASE_URL,
    sequelize, // <- hii sasa unaweza kuitumia katika files zingine
};

// Auto-reload kama kuna mabadiliko kwenye file hili
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
