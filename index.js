const express = require("express");
const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const sessionPath = path.join(__dirname, "session.json");

// Hifadhi QR/pairing info ya mwisho
let latestQR = null;
let latestPairingCode = null;

app.get("/", (req, res) => {
  res.send("🟢 SHUKRANI Pairing Site is running...");
});

app.get("/pair", async (req, res) => {
  if (fs.existsSync(sessionPath)) {
    return res.status(200).send("✅ Already paired. Delete session.json to pair again.");
  }

  const { state, saveState } = useSingleFileAuthState(sessionPath);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
    syncFullHistory: false,
    generateHighQualityLinkPreview: false,
    logger: { info: () => {}, error: () => {}, warn: () => {} },
    getMessage: async () => ({ conversation: "hello" }),
  });

  sock.ev.on("connection.update", async (update) => {
    const { qr, connection, lastDisconnect, pairingCode } = update;

    if (qr) {
      latestQR = qr;
    }

    if (pairingCode) {
      latestPairingCode = pairingCode;
    }

    if (connection === "open") {
      console.log("✅ Paired successfully!");
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      console.log("Connection closed:", reason);
    }
  });

  // Subiri sekunde 5 kabla ya kurudisha QR
  setTimeout(async () => {
    if (latestPairingCode) {
      return res.status(200).send(`🔑 Pairing Code: <code>${latestPairingCode}</code>`);
    } else if (latestQR) {
      const qrImage = await qrcode.toDataURL(latestQR);
      return res.send(`
        <h2>📱 Scan this QR Code</h2>
        <img src="${qrImage}" />
        <p>QR expires every 30s. Refresh to regenerate.</p>
      `);
    } else {
      return res.status(503).send("⚠️ QR or pairing code not available. Try again shortly.");
    }
  }, 5000);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Pairing Site live on PORT ${PORT}`);
});
