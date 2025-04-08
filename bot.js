import {
  jidNormalizedUser,
  makeWASocket,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import pino from "pino";
import readline from "readline";
import fs from "fs";
import "dotenv/config";
import OpenAI from "openai";

// const openAi = new OpenAI({
//   apiKey: process.env.OPEN_API_KEY,
// });

function question(text = "question") {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(`\x1b[32;1m?\x1b[0m\x20${text}`, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

(async function start(usePairingCode = true) {
  const session = await useMultiFileAuthState("session");
  const bot = makeWASocket({
    printQRInTerminal: !usePairingCode,
    auth: session.state,
    logger: pino({ level: "silent" }).child({ level: "silent" }),
  });

  if (usePairingCode && !bot.user && !bot.authState.creds.registered) {
    usePairingCode =
      (
        await question(
          "Ingin terhubung dengan menggunakan pairing code? [Y/n]: "
        )
      ).toLowerCase() !== "n";
    if (!usePairingCode) return start(false);

    const waNumber = await question("Masukkan nomor whatsapp anda : +");
    const code = await bot.requestPairingCode(waNumber.replace(/\D/g, ""));
    console.log(`\x1b[44;1m\x20PAIRING CODE\x20\x1b[0m\x20${code}`);
  }

  bot.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      console.log(lastDisconnect.error);
      const { statusCode, error } = lastDisconnect.error.output.payload;
      if (statusCode === 401 && error === "Unauthorized") {
        await fs.promises.rm("session", { recursive: true, force: true });
      }
      return start();
    }
    if (connection === "open") {
      console.log("Berhasil terhubung dengan : " + bot.user.id.split(":")[0]);
    }
    console.log(connection);
  });

  bot.ev.on("creds.update", session.saveCreds);

  bot.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    const msg = messages[0];

    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text =
      msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    console.log(`Pesan dari ${sender} : ${text}`);

    if (text.toLowerCase() === "test") {
      await bot.sendMessage(sender, {
        text: "Haloo👋, ada yang bisa saya bantu? ",
      });
      return;
    }
  });
})();
