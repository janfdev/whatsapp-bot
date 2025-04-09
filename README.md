# 🤖 WhatsApp Bot dengan Integrasi Gemini AI ✨

Selamat datang di proyek **WhatsApp Bot x Gemini AI**! 🎉  
Dengan bot ini, kamu bisa ngobrol langsung dengan **Google Gemini AI** lewat chat WhatsApp. Tanyakan apa pun, terjemahkan teks, atau minta ringkasan artikel panjang — semua langsung dari WhatsApp kamu! 📱🧠

---

## 🚀 Fitur Utama

🔹 **`/menu`** – Tampilkan semua perintah yang bisa kamu gunakan  
💬 **`/ask <pertanyaan>`** – Ajukan pertanyaan ke Gemini AI (contoh: `/ask Siapa penemu listrik?`)  
🌍 **`/translate <teks> <bahasa_tujuan>`** – Terjemahkan teks ke bahasa lain (contoh: `/translate halo en`)  
📝 **`/summarize <teks>`** – Ringkas artikel panjang ke poin-poin penting  
⚙️ **Auto Response** – Bot akan otomatis merespons pesan yang masuk (selain dari dirinya sendiri)  
📡 **Koneksi ke WhatsApp** – Menggunakan `@whiskeysockets/baileys` untuk terhubung dan membaca chat

---

## 🧰 Prasyarat

Sebelum memulai, pastikan kamu sudah punya:

- 🔧 **Node.js** (rekomendasi versi LTS)
- 🔐 **API Key Gemini** dari Google AI Studio

---

## ⚙️ Instalasi

1. **Clone repositori** ini ke komputermu:
   ```bash
   git clone <whatsapp-bot>
   cd <whatsapp-bot>
   ```

2. **Buat file konfigurasi `.env`:**
   ```dotenv
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   ```
   Gantilah `YOUR_GEMINI_API_KEY` dengan API key milikmu.

---

## ▶️ Cara Menjalankan Bot

1. **Jalankan dengan perintah:**
   ```bash
   npm run dev
   ```

2. **Pairing ke WhatsApp:**
   - Saat pertama kali dijalankan, kamu akan diminta melakukan pairing.
   - 📱 Pilih `Y` untuk pairing menggunakan nomor HP (kode pairing akan muncul).
   - 📷 Pilih `n` untuk menampilkan QR code di terminal (scan dari WhatsApp → Linked Devices → Link a Device).
   - Setelah pairing, bot akan aktif dan siap menerima perintah!

---

## 💡 Contoh Penggunaan Perintah

Berikut contoh penggunaan langsung via chat WhatsApp:

| Perintah | Deskripsi |
|----------|-----------|
| `/menu` | Tampilkan semua perintah yang tersedia |
| `/ask Apa ibukota Jepang?` | Jawaban: Tokyo 🗼 |
| `/translate I love you id` | Hasil: Aku mencintaimu ❤️ |
| `/summarize Artikel ini menjelaskan tentang ...` | Ringkasan singkat dari teks panjang |

---

## 🤝 Kontribusi

Ingin bantu kembangkan bot ini?  
Silakan `fork` repo, buat perubahan, dan ajukan **pull request**! Kontribusi kamu sangat dihargai! 🙌

---

## 📦 Package yang Digunakan

| Package | Fungsi |
|--------|--------|
| `@google/generative-ai` | Integrasi dengan Gemini AI |
| `@whiskeysockets/baileys` | Koneksi dan interaksi dengan WhatsApp |
| `dotenv` | Load variabel dari file `.env` |
| `nodemon` | Auto-reload saat develop |
| `qrcode-terminal` | Menampilkan QR code di terminal |
| `pino` | Logging (digunakan oleh Baileys) |

---

✨ **Happy coding & chatting!** Kalau ada pertanyaan, langsung kirim aja ke bot-nya! 💬🚀

---
