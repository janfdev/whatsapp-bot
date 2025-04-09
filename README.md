# WhatsApp Bot dengan Integrasi Gemini AI

Bot WhatsApp ini memungkinkan Anda berinteraksi dengan Google Gemini AI langsung melalui chat WhatsApp. Anda dapat mengajukan pertanyaan, meminta terjemahan, meringkas teks, dan menggunakan perintah-perintah lain yang didukung.

## Fitur Utama

* **`/menu`**: Menampilkan daftar perintah yang tersedia.
* **`/ask <pertanyaan>`**: Mengajukan pertanyaan kepada Gemini AI.
* **`/translate <teks> <bahasa_tujuan>`**: Menerjemahkan teks ke bahasa tertentu (contoh: `/translate halo en`).
* **`/summarize <teks>`**: Meringkas teks yang panjang menjadi poin-poin penting.
* **Respons Otomatis:** Merespons pesan dengan bantuan Gemini AI (kecuali pesan dari diri sendiri).
* **Koneksi WhatsApp:** Terhubung ke WhatsApp menggunakan library `@whiskeysockets/baileys`.

## Prasyarat

* **Node.js** (versi LTS disarankan)
* **API Key Gemini**

## Instalasi

1.  **Clone repositori ini (jika Anda memiliki kode dalam repositori):**
    ```bash
    git clone <URL_repositori_anda>
    cd <nama_folder_proyek>
    ```

2.  **Konfigurasi Environment:**
    * Buat file `.env` di root direktori proyek Anda.
    * Tambahkan kunci API Gemini Anda ke dalam file `.env`:
        ```dotenv
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```
        **Pastikan untuk mengganti `YOUR_GEMINI_API_KEY` dengan kunci API Gemini Anda yang sebenarnya.**

## Cara Menjalankan Bot

1.  **Jalankan bot menggunakan Node.js:**
    ```bash
    npm run dev
    ```
    Perintah `npm run dev` sudah dikonfigurasi di `package.json` untuk menjalankan `node index.js`.

2.  **Proses Pairing WhatsApp:**
    * Saat bot pertama kali dijalankan, Anda akan diminta untuk melakukan pairing dengan WhatsApp.
    * Anda akan melihat pesan di terminal yang menanyakan apakah Anda ingin terhubung menggunakan pairing code.
    * Jika Anda memilih `Y`, Anda akan diminta memasukkan nomor WhatsApp Anda.
    * Setelah itu, kode pairing akan ditampilkan di terminal.
    * Buka **WhatsApp** di ponsel Anda, pergi ke **Linked Devices**, pilih **Link a Device**, dan masukkan kode pairing yang ditampilkan.
    * Jika Anda memilih `n`, QR code akan ditampilkan di terminal yang bisa Anda scan menggunakan WhatsApp (kemungkinan menggunakan library `qrcode-terminal`).

## Penggunaan Perintah

Setelah bot berhasil terhubung ke WhatsApp, Anda dapat menggunakan perintah-perintah berikut melalui chat:

* **`/menu`**: Kirim pesan `/menu` untuk melihat daftar semua perintah yang tersedia.
* **`/ask <pertanyaan>`**: Contoh: `/ask Apa saja planet di tata surya kita?`
* **`/translate <teks> <bahasa_tujuan>`**: Contoh: `/translate how are you? id`
* **`/summarize <teks>`**: Kirim teks panjang setelah perintah `/summarize` untuk mendapatkan ringkasannya. Contoh: `/summarize [isi artikel panjang]`


## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, Anda dipersilakan untuk melakukan fork repositori dan mengirimkan pull request dengan perubahan yang Anda usulkan.

## Package yang digunakan

* `@google/generative-ai`: Untuk integrasi dengan model Gemini AI.
* `@whiskeysockets/baileys`: Library utama untuk koneksi dan interaksi dengan WhatsApp.
* `dotenv`: Untuk memuat variabel lingkungan dari file `.env`.
* `nodemon` (sebagai `devDependency`): Untuk kemudahan pengembangan dengan auto-reload.
* `qrcode-terminal`: Untuk menampilkan QR code di terminal saat pairing WhatsApp.
* `pino`: Untuk logging (kemungkinan digunakan oleh `@whiskeysockets/baileys`).

---

