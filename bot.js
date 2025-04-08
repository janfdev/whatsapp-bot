import {
  jidNormalizedUser,
  makeWASocket,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import pino from "pino";
import readline from "readline";
import fs from "fs";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function getGeminiResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini error: ", error);
    return "Maaf, terjadi kesalahan🦍";
  }
}

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

    if (text.toLowerCase() === "/menu") {
      const menuText = `
👋 Halo! Berikut adalah daftar perintah yang tersedia:

/menu - Menampilkan daftar perintah ini
/ask <pertanyaan> - Bertanya kepada Gemini
/translate <teks> <bahasa_tujuan> -  Menerjemahkan teks ke bahasa tertentu (contoh: /translate halo id)
/summarize <teks> - Meringkas teks yang panjang
    `;

      await bot.sendMessage(sender, {
        text: menuText,
      });
      return;
    }

    // /ask
    if (text.toLowerCase().startsWith("/ask ")) {
      const prompt = text.substring("/ask ", length);
      const response = await getGeminiResponse(prompt);
      await bot.sendMessage(sender, { text: response }, { quoted: msg });
      return;
    }

    // /translate
    if (text.toLowerCase().startsWith("/translate ")) {
      const parts = text.substring("/translate".length).split(" ");
      if (parts.length >= 2) {
        const textToTranslate = parts.slice(0, -1).join(" ");
        const targetLanguange = parts.slice(-1)[0];
        const prompt = `Terjemahkan teks berikut ke dalam bahasa ${targetLanguange}`;
        const response = await getGeminiResponse(prompt);
        await bot.sendMessage(sender, { text: response }, { quoted: msg });
      } else {
        await bot.sendMessage(
          sender,
          {
            text: "Format pertanyaan salah, silahkan ulangi. Contoh: '/translate halo eng",
          },
          { quoted: msg }
        );
      }
    }

    // /summarize
    if (text.toLowerCase().startsWith("/summarize ")) {
      const textToSummarize = text.substring("/summarize".length);
      const prompt = `Ringkas teks berikut menjadi poin-poin penting:\n\n${textToSummarize}`;
      const response = await getGeminiResponse(prompt);
      await bot.sendMessage(sender, { text: response }, { quoted: msg });
      return;
    }

    if (text.toLowerCase() !== "test") {
      const text = `👋 Halo! Berikut adalah daftar perintah yang tersedia:

/menu - Menampilkan daftar perintah ini
/ask <pertanyaan> - Bertanya kepada Gemini
/translate <teks> <bahasa_tujuan> -  Menerjemahkan teks ke bahasa tertentu (contoh: /translate halo id)
/summarize <teks> - Meringkas teks yang panjang`;

      const response = await getGeminiResponse(text);
      await bot.sendMessage(sender, { text: response });
    }
  });
})();
