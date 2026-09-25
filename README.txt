PORTAL ALUMNI IKRAABI 2025/2027
IKATAN ALUMNI SMATQ ABI-UMMI (HTML, CSS, JavaScript & Bootstrap 5)
===========================================================

Portal ini adalah frontend statis. Data alumni dan blog dapat diambil dari dua
Google Sheets dan dua Google Apps Script Web App terpisah; tidak membutuhkan
server aplikasi PHP.

Cara menjalankan:
1. Buka index.html langsung di browser, atau jalankan folder ini dengan
   ekstensi Live Server/Five Server di VS Code.
2. Navigasi antarhalaman tersedia melalui menu utama.
3. Filter alumni dan countdown event berjalan di browser. Konfigurasi sumber
   data alumni ada di alumni-api.js, data blog ada di blog-api.js. Panduan
   lengkap ada di PANDUAN_GOOGLE_SHEET_ALUMNI.txt dan
   PANDUAN_GOOGLE_SHEET_BLOG.txt.

Halaman utama:
- index.html      Beranda
- layanan.html    Layanan & pendataan
- alumni.html     Direktori alumni
- admin.html      Dashboard admin data alumni
- event.html      Event dan countdown
- kalender.html   Kalender kegiatan
- blog.html       Kabar & blog dari Google Sheets
- about.html      Profil organisasi
- login.html      Tampilan login demo frontend

Dashboard admin dibuka melalui admin.html dan membutuhkan API key dari Google
Apps Script. Endpoint CRUD dan langkah deployment ada di
PANDUAN_GOOGLE_SHEET_ALUMNI.txt.
===========================================================
Terhubung dalam Silaturahmi, Bertumbuh dalam Kontribusi.