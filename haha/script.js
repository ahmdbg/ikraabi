/* =========================================================
   IKRAABI — Ikatan Alumni SMATQ ABI-UMMI
   script.js (khusus halaman beranda / index.html)

   Fungsi bersama (navbar, tema, menu mobile, back-to-top,
   FORM_LINKS) ada di common.js.
   Data berita/artikel ada di articles.js.
   ========================================================= */

// ---------------------------------------------------------
// DATA PENGURUS IKRAABI
// ---------------------------------------------------------
const assetUrl = (path) => path.startsWith("assets/") ? `../${path}` : path;

const organization = {
  ketua: {
    nama: "Ayub Nabil Ahnaf",
    jabatan: "Ketua Umum",
    desc: "Memimpin arah kebijakan, program, dan koordinasi organisasi IKRAABI.",
    foto: "assets/images/ketua-placeholder.jpg"
  },
  wakil: {
    nama: "Mulia Uswah Azizah",
    jabatan: "Wakil Umum",
    desc: "Mendampingi Ketua Umum dalam pengambilan keputusan strategis organisasi.",
    foto: "assets/images/wakil-placeholder.jpg"
  },
  sekretaris: [
    {
      nama: "Nurul Azkiya Rajwanda",
      jabatan: "Sekretaris",
      desc: "Mengelola administrasi, dokumen, dan koordinasi internal organisasi.",
      foto: "assets/images/sekretaris-placeholder.jpg"
    },
    {
      nama: "Rayya Tanisha Az-Zahra",
      jabatan: "Sekretaris",
      desc: "Mendukung arsip, komunikasi, dan kelancaran agenda organisasi.",
      foto: "assets/images/sekretaris-placeholder.jpg"
    }
  ],
  bendahara: [
    {
      nama: "Arifah Nur Azizah",
      jabatan: "Bendahara",
      desc: "Mengelola keuangan, pembiayaan, dan kebutuhan operasional IKRAABI.",
      foto: "assets/images/sekretaris-placeholder.jpg"
    },
    {
      nama: "Mutia Khonsa Salsabila",
      jabatan: "Bendahara",
      desc: "Membantu pengelolaan anggaran dan pendukung administrasi keuangan.",
      foto: "assets/images/sekretaris-placeholder.jpg"
    }
  ],
  psda: {
    nama: "Ibaduddurahman Al-Ghozi",
    jabatan: "Koordinator PSDA",
    desc: "Mengembangkan potensi, kapasitas, dan hubungan antaralumni.",
    foto: "assets/images/psda-placeholder.jpg"
  },
  media: {
    nama: "Aisyah Hasna Zahidah",
    jabatan: "Koordinator Media",
    desc: "Mengelola informasi, publikasi, desain, dan media sosial organisasi.",
    foto: "assets/images/media-placeholder.jpg"
  },
  regional: {
    nama: "Husamuddin Alfawwaz",
    jabatan: "Koordinator Regional",
    desc: "Mengkoordinasikan alumni dan kegiatan di wilayah tertentu.",
    foto: "assets/images/regional-placeholder.jpg"
  },
  humas: {
    nama: "Umar Faqih Abdillah",
    jabatan: "Koordinator HUMAS",
    desc: "Mengelola komunikasi internal maupun eksternal untuk keberlanjutan IKRAABI.",
    foto: "assets/images/humas-placeholder.jpg"
  }
};

const organizationStructure = [
  {
    id: "pengurus-harian",
    title: "Pengurus Harian",
    description: "Unsur utama pengelola organisasi yang mengarahkan kebijakan, koordinasi program, dan tata kelola.",
    tupoksi: [
      "Memimpin organisasi",
      "Menentukan kebijakan",
      "Koordinasi antarunsur",
      "Mengawasi program",
      "Evaluasi organisasi",
      "Menjaga komunikasi",
      "Mengelola administrasi"
    ],
    programs: [
      "Rapat koordinasi",
      "Penyusunan dan evaluasi program",
      "Koordinasi antarbagian",
      "Evaluasi kepengurusan",
      "Administrasi organisasi"
    ],
    members: [
      { name: "Ayub Nabil Ahnaf", position: "Ketua Umum", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Mulia Uswah Azizah", position: "Wakil Umum", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Nurul Azkiya Rajwanda", position: "Sekretaris", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Rayya Tanisha Az-Zahra", position: "Sekretaris", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Ibaduddurahman Al-Ghozi", position: "Koordinator PSDA", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Arifah Nur Azizah", position: "Bendahara", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Mutia Khonsa Salsabila", position: "Bendahara", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Aisyah Hasna Zahidah", position: "Koordinator Media", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Husamuddin Alfawwaz", position: "Koordinator Regional", photo: "assets/images/hero-placeholder.jpg" },
      { name: "Umar Faqih Abdillah", position: "Koordinator HUMAS", photo: "assets/images/hero-placeholder.jpg" }
    ]
  },
  {
    id: "ketua-umum",
    title: "Ketua Umum",
    description: "Pimpinan utama yang mengarahkan organisasi sesuai visi dan misi.",
    tupoksi: [
      "Memimpin organisasi",
      "Menetapkan kebijakan",
      "Koordinasi pengurus",
      "Mengawasi program",
      "Mewakili organisasi"
    ],
    programs: [
      "Kebijakan strategis",
      "Koordinasi program",
      "Evaluasi organisasi",
      "Pengambilan keputusan utama"
    ],
    members: [
      { name: "Ayub Nabil Ahnaf", position: "Ketua Umum", photo: "assets/images/hero-placeholder.jpg" }
    ]
  },
  {
    id: "wakil-umum",
    title: "Wakil Umum",
    description: "Membantu Ketua Umum menjalankan kepemimpinan dan koordinasi.",
    tupoksi: [
      "Mendampingi ketua",
      "Membantu koordinasi",
      "Menggantikan tugas ketua",
      "Monitoring program"
    ],
    programs: [
      "Koordinasi internal",
      "Pendampingan program",
      "Monitoring kegiatan",
      "Penguatan komunikasi" 
    ],
    members: [
      { name: "Mulia Uswah Azizah", position: "Wakil Umum", photo: "assets/images/hero-placeholder.jpg" }
    ]
  },
  {
    id: "sekretaris",
    title: "Sekretaris",
    description: "Pengelola administrasi, dokumentasi, surat-menyurat, dan arsip.",
    tupoksi: [
      "Mengelola administrasi",
      "Surat-menyurat",
      "Dokumen organisasi",
      "Notulensi",
      "Arsip"
    ],
    programs: [
      "Administrasi organisasi",
      "Dokumentasi kegiatan",
      "Arsip dan perpustakaan digital",
      "Koordinasi internal" 
    ],
    members: [
      { name: "Nurul Azkiya Rajwanda", position: "Sekretaris", photo: "assets/images/hero-placeholder.jpg" }
    ]
  },
  {
    id: "bendahara",
    title: "Bendahara",
    description: "Pengelola keuangan secara tertib, transparan, dan bertanggung jawab.",
    tupoksi: [
      "Mengelola pemasukan dan pengeluaran",
      "Mencatat keuangan",
      "Menyusun anggaran",
      "Membuat laporan keuangan",
      "Mengawasi dana"
    ],
    programs: [
      "Pengelolaan anggaran",
      "Laporan keuangan",
      "Monitoring belanja",
      "Transparansi keuangan"
    ],
    members: [
      { name: "Arifah Nur Azizah", position: "Bendahara", photo: "assets/images/hero-placeholder.jpg" }
    ]
  },
  {
    id: "koordinator-psda",
    title: "Koordinator PSDA",
    description: "Pengembangan sumber daya anggota melalui pembinaan dan peningkatan kapasitas.",
    tupoksi: [
      "Mengembangkan potensi anggota",
      "Menyusun kegiatan pembinaan",
      "Mendorong keterlibatan",
      "Evaluasi kapasitas anggota"
    ],
    programs: [
      "Pengembangan kapasitas",
      "Pembinaan internal",
      "Pelatihan",
      "Kegiatan anggota",
      "Evaluasi"
    ],
    members: [
      { name: "Ibaduddurahman Al-Ghozi", position: "Koordinator PSDA", photo: "assets/images/hero-placeholder.jpg" }
    ]
  },
  {
    id: "koordinator-media",
    title: "Koordinator Media",
    description: "Pengelola media, publikasi, dokumentasi, dan informasi organisasi.",
    tupoksi: [
      "Mengelola media",
      "Strategi publikasi",
      "Konten digital",
      "Dokumentasi kegiatan",
      "Menyampaikan informasi"
    ],
    programs: [
      "Media sosial",
      "Desain dan publikasi",
      "Dokumentasi kegiatan",
      "Produksi konten",
      "Informasi digital"
    ],
    members: [
      { name: "Aisyah Hasna Zahidah", position: "Koordinator Media", photo: "assets/images/hero-placeholder.jpg" }
    ]
  },
  {
    id: "koordinator-regional",
    title: "Koordinator Regional",
    description: "Menjaga komunikasi dan koordinasi dengan anggota serta jaringan regional.",
    tupoksi: [
      "Membangun komunikasi regional",
      "Koordinasi antarwilayah",
      "Menjaga hubungan anggota",
      "Mengidentifikasi kerja sama",
      "Mendukung kegiatan regional"
    ],
    programs: [
      "Koordinasi regional",
      "Penguatan jaringan",
      "Komunikasi antarwilayah",
      "Kolaborasi regional"
    ],
    members: [
      { name: "Husamuddin Alfawwaz", position: "Koordinator Regional", photo: "assets/images/hero-placeholder.jpg" }
    ]
  },
  {
    id: "koordinator-humas",
    title: "Koordinator HUMAS",
    description: "Membangun dan menjaga hubungan organisasi dengan pihak internal maupun eksternal.",
    tupoksi: [
      "Kelola komunikasi eksternal",
      "Membangun hubungan",
      "Menjaga mitra",
      "Mengembangkan kerja sama",
      "Penghubung eksternal"
    ],
    programs: [
      "Hubungan eksternal",
      "Networking",
      "Kolaborasi",
      "Kerja sama",
      "Relasi dan kemitraan"
    ],
    members: [
      { name: "Umar Faqih Abdillah", position: "Koordinator HUMAS", photo: "assets/images/hero-placeholder.jpg" }
    ]
  }
];

const organizationDetailsMap = Object.fromEntries(organizationStructure.map((dept) => [dept.id, dept]));

function createOrgModal() {
  const modal = document.createElement("div");
  modal.id = "orgDetailModal";
  modal.className = "org-modal-backdrop";
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div class="org-modal" role="dialog" aria-modal="true" aria-labelledby="orgModalTitle">
      <div class="org-modal-header">
        <div>
          <p class="org-modal-kicker">Struktur Organisasi</p>
          <h3 id="orgModalTitle">Judul</h3>
        </div>
        <button type="button" class="org-modal-close" id="orgModalClose" aria-label="Tutup modal">×</button>
      </div>
      <div class="org-modal-body">
        <p class="org-modal-description"></p>
        <div class="org-modal-columns">
          <div class="org-modal-panel">
            <h4>Tugas Pokok &amp; Fungsi</h4>
            <ul class="org-modal-list" id="orgModalTupoksi"></ul>
          </div>
          <div class="org-modal-panel">
            <h4>Program Kerja</h4>
            <ul class="org-modal-list" id="orgModalPrograms"></ul>
          </div>
        </div>
        <div class="org-modal-members-wrap">
          <div class="org-modal-members-head">
            <h4>Anggota Kepengurusan</h4>
            <span id="orgModalMemberCount">0 Anggota Kepengurusan</span>
          </div>
          <div class="org-modal-members" id="orgModalMembers"></div>
        </div>
      </div>
      <div class="org-modal-footer">
        <button type="button" class="btn btn-primary btn-sm" id="orgModalCloseBtn">Tutup</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modal.dataset.selected = "";
  };

  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  modal.querySelector("#orgModalClose").addEventListener("click", close);
  modal.querySelector("#orgModalCloseBtn").addEventListener("click", close);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      close();
    }
  });

  return modal;
}

function openOrgModal(id) {
  const dept = organizationDetailsMap[id];
  if (!dept) return;

  let modal = document.getElementById("orgDetailModal");
  if (!modal) modal = createOrgModal();

  const members = dept.members && dept.members.length ? dept.members : [{ name: "Data anggota belum tersedia", position: "-", photo: "assets/images/hero-placeholder.jpg" }];

  modal.querySelector("#orgModalTitle").textContent = dept.title;
  modal.querySelector(".org-modal-description").textContent = dept.description;
  modal.querySelector("#orgModalTupoksi").innerHTML = (dept.tupoksi || []).map((item) => `<li>${item}</li>`).join("") || "<li>Data tugas pokok belum tersedia.</li>";
  modal.querySelector("#orgModalPrograms").innerHTML = (dept.programs || []).map((item) => `<li>${item}</li>`).join("") || "<li>Data program kerja belum tersedia.</li>";
  modal.querySelector("#orgModalMemberCount").textContent = `${members.length} Anggota Kepengurusan`;
  modal.querySelector("#orgModalMembers").innerHTML = members.map((member) => `
    <div class="org-member-item">
      <img src="${assetUrl(member.photo || "assets/images/hero-placeholder.jpg")}" alt="Foto ${member.name}" onerror="this.src='../assets/images/hero-placeholder.jpg'">
      <div>
        <strong>${member.name}</strong>
        <span>${member.position || dept.title}</span>
      </div>
    </div>
  `).join("");

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function bindOrgCardEvents() {
  const cards = document.querySelectorAll(".org-card");
  cards.forEach((card) => {
    const orgId = card.getAttribute("data-org-id");
    if (!orgId) return;

    card.addEventListener("click", () => openOrgModal(orgId));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openOrgModal(orgId);
      }
    });
  });
}

// ---------------------------------------------------------
// DATA ALUMNI
// ---------------------------------------------------------
const alumniData = [
  { nama: "Raihan Fattaha Sya’bani Al Khonsa’", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Ilmu Lingkungan", kota: "Solo", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Qorri Aena Putri", angkatan: "2026", universitas: "Universitas Mataram", jurusan: "S1 Hubungan Internasional", kota: "Mataram", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Wafa Hanifah", angkatan: "2026", universitas: "Institut Teknologi Sepuluh Nopember", jurusan: "Statistika", kota: "Surabaya", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Yumna Khansani", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "Fisika", kota: "Surakarta", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Aisyah Dhiyaulhaw", angkatan: "2026", universitas: "Universitas Gadjah Mada", jurusan: "Sastra Arab", kota: "Sleman", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Hanun Ghaitsa Syahidah", angkatan: "2026", universitas: "Universitas Mataram", jurusan: "D3 Perpajakan", kota: "Mataram", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Thaariq Muhammad Kamil", angkatan: "2026", universitas: "Universitas Gadjah Mada", jurusan: "S1 Psikologi", kota: "Sleman", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Muhammad Fauzan Na’im", angkatan: "2026", universitas: "Al-Azhar University", jurusan: "Syariah", kota: "Cairo", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Khadijah Nisa Farida", angkatan: "2026", universitas: "Al Azhar University", jurusan: "S1 Ushuluddin", kota: "Cairo", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Zahra Farras Setiawan", angkatan: "2026", universitas: "Universitas Gadjah Mada", jurusan: "Antropologi Budaya", kota: "Sleman", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Faiz Aquila Juardi Utama", angkatan: "2026", universitas: "Universitas Diponegoro", jurusan: "S1 Teknik Perkapalan", kota: "Semarang", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Fathy Farahat Akbar", angkatan: "2026", universitas: "Universitas Diponegoro", jurusan: "S1 Matematika", kota: "Semarang", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Muhammad Naufal Setyanto", angkatan: "2026", universitas: "UGM", jurusan: "Geofisika", kota: "Yogyakarta", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Mirdas Farhan Hanif", angkatan: "2026", universitas: "Universitas Gadjah Mada", jurusan: "S1 Kehutanan", kota: "Yogyakarta", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Ramadhan Miftahfarid Wiraputra", angkatan: "2026", universitas: "Universitas Diponegoro", jurusan: "D4 Rekayasa Perancangan Mesin", kota: "Semarang", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "El Hallaj Vaincenna Alfansyah", angkatan: "2026", universitas: "Universitas Brawijaya", jurusan: "S1 Instrumentasi", kota: "Malang", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Muhammad Izzuddin El Mizwary", angkatan: "2026", universitas: "UGM", jurusan: "S1 Teknik Pertanian", kota: "Sleman", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Qisiyyuna Hauna Quddama", angkatan: "2026", universitas: "UNS", jurusan: "S1 Pengelolaan Hutan", kota: "Surakarta", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Nasywa Maritza Azka", angkatan: "2026", universitas: "Politeknik Pekerjaan Umum", jurusan: "D3 Teknologi Konstruksi Bangunan Air", kota: "Semarang", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Muhammad Hafidz Nasrullah", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Sastra Inggris", kota: "Surakarta", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Farrel Kusuma Putra", angkatan: "2026", universitas: "UNDIP", jurusan: "S1 Fisika", kota: "Semarang", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Khansa Zainunnibras", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Sastra Arab", kota: "Surakarta", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Ubayyu Bachrunniam", angkatan: "2026", universitas: "UNDIP", jurusan: "D4 Teknik Listrik Industri", kota: "Semarang", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Hauzan Azmil Umur", angkatan: "2026", universitas: "Universitas Airlangga", jurusan: "D4 Teknologi Rekayasa Instrumentasi dan Kontrol", kota: "Surabaya", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Sabrina Hasna Abida Shalihah", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Proteksi Tanaman", kota: "Surakarta", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Daffa Ahmad Fitra", angkatan: "2026", universitas: "Universitas Gadjah Mada", jurusan: "S1 Akuakultur", kota: "Sleman", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Rita Dewi Nafisyah", angkatan: "2026", universitas: "Universitas Muhammadiyah Surakarta", jurusan: "S1 Sains Informasi Geografi", kota: "Surakarta", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Hasna Nailah Salsabila", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Matematika", kota: "Surakarta", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Ghaida Fatikha Pradania", angkatan: "2026", universitas: "Universitas Tidar", jurusan: "D3 Akuntansi", kota: "Magelang", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Tsalis Syahda Inatsan", angkatan: "2026", universitas: "Poltekkes Kemenkes Semarang", jurusan: "D3 Keperawatan", kota: "Semarang", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Hanifa Kayyisa Arraudhah", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Bahasa dan Kebudayaan Jepang", kota: "Surakarta", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Sumayyah Roihanatul Jannah", angkatan: "2026", universitas: "Universitas Brawijaya", jurusan: "S1 Agroekoteknologi", kota: "Malang", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Hamas Muhammad Fatahillah", angkatan: "2026", universitas: "POLINES", jurusan: "D4 Teknologi Rekayasa Komputer", kota: "Semarang", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Fawwaz Azzam Al Ghifari", angkatan: "2026", universitas: "Institut Teknologi Bandung", jurusan: "S1 Astronomi", kota: "Bandung", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Qoulan Sadida", angkatan: "2026", universitas: "UNS", jurusan: "S1 Biologi", kota: "Surakarta", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Qoidul Jaisyi Alfath", angkatan: "2026", universitas: "UNDIP", jurusan: "S1 Ilmu Perpustakaan", kota: "Semarang", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Hafidah Nurul Husna", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Hubungan Internasional", kota: "Surakarta", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Muhammad Rosyad Muzaffar", angkatan: "2026", universitas: "Institut Teknologi Bandung", jurusan: "S1 Fisika", kota: "Sumedang", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Fanniyya Laqif Karima", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "Pendidikan Luar Biasa", kota: "Surakarta", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Yasmin Zarifa", angkatan: "2026", universitas: "Universitas Brawijaya", jurusan: "S1 Psikologi", kota: "Malang", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Ganes Nirwasita Indrani", angkatan: "2026", universitas: "Universitas Negeri Surabaya", jurusan: "S1 Hubungan Internasional", kota: "Surabaya", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Bunayya Nisa Rasha Fatima", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Pendidikan Teknik Mesin", kota: "Surakarta", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Azka Aulia Rahman", angkatan: "2026", universitas: "Universitas Muhammadiyah Semarang", jurusan: "S1 DKV", kota: "Semarang", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Mohammad Rizki Robani", angkatan: "2026", universitas: "Lainnya", jurusan: "Lainnya", kota: "Surakarta", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Nabila Rozan Atmadi", angkatan: "2026", universitas: "Masih Menunggu", jurusan: "Masih Menunggu", kota: "Luar Negeri", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "M Ilham Rafi", angkatan: "2026", universitas: "UGM", jurusan: "S1 Akuakultur", kota: "Yogyakarta", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Keysa Aqilah", angkatan: "2026", universitas: "UPN Veteran Jatim", jurusan: "S1 Sains Data", kota: "Surabaya", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Fathiya Sitoresmi Azzahra", angkatan: "2026", universitas: "Universitas Airlangga", jurusan: "S1 Hubungan Internasional", kota: "Surabaya", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Fatia Amanina Syahidah", angkatan: "2026", universitas: "Unimma", jurusan: "S1 Teknik Industri", kota: "Magelang", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Saskia Azzahra", angkatan: "2026", universitas: "Universitas Wahid Hasyim Semarang", jurusan: "S1 Kedokteran", kota: "Semarang", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Naura Raysa Azkia Ahmad", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Teknologi Pendidikan", kota: "Surakarta", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Muhammad Haris Hazim", angkatan: "2026", universitas: "UNDIP", jurusan: "Teknologi Pangan", kota: "Semarang", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Nusaibah Fathur Rizky", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "S1 Pendidikan Fisika", kota: "Surakarta", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Ananda Aditya Ramadhan", angkatan: "2026", universitas: "UPNVY", jurusan: "S1 Informatika", kota: "Yogyakarta", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Alzena Verda Nareswari", angkatan: "2026", universitas: "Gap Year", jurusan: "-", kota: "Pekalongan", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Khansa Afifah Putri Prasetiyo", angkatan: "2026", universitas: "Institut Teknologi Sepuluh Nopember", jurusan: "Teknik Geomatika", kota: "Surabaya", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Bilqis Aristania Nuur Faiza", angkatan: "2026", universitas: "UPN Veteran Yogyakarta", jurusan: "S1 Teknik Metalurgi", kota: "Sleman", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Aulia Althafunnisa", angkatan: "2026", universitas: "UNDIP", jurusan: "S1 Farmasi", kota: "Semarang", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Nada Nafi'ah Ramadhani", angkatan: "2026", universitas: "UGM", jurusan: "S1 Ilmu Tanah", kota: "Yogyakarta", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Isfahan Rofi'ah Sugiarto", angkatan: "2026", universitas: "UNS", jurusan: "S1 Bimbingan dan Konseling", kota: "Surakarta", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Zufar Al Fatih", angkatan: "2026", universitas: "UNS", jurusan: "Pendidikan Fisika", kota: "Surakarta", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Rayya Tanisha Az Zahra", angkatan: "2026", universitas: "Universitas Diponegoro", jurusan: "S1 Psikologi", kota: "Semarang", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Muhammad Rizqy Ramadhani Sarwono", angkatan: "2026", universitas: "Universitas Gadjah Mada", jurusan: "S1 Ilmu dan Industri Peternakan", kota: "Yogyakarta", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Ahmad Hasan", angkatan: "2026", universitas: "Universitas Pendidikan Indonesia", jurusan: "S1 Rekayasa Perangkat Lunak", kota: "Bandung", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Makin Amin", angkatan: "2026", universitas: "UIN Raden Mas Said", jurusan: "Psikologi Islam", kota: "Kartasura", foto: "assets/images/alumni-placeholder-5.jpg" },
  { nama: "Rayhanun Nafa Az Zahra", angkatan: "2026", universitas: "Universitas Brawijaya", jurusan: "S1 Ilmu Hukum", kota: "Malang", foto: "assets/images/alumni-placeholder-6.jpg" },
  { nama: "Najma Rosyada", angkatan: "2026", universitas: "UIN Raden Mas Said", jurusan: "S1 Hukum Keluarga Islam", kota: "Surakarta", foto: "assets/images/alumni-placeholder-1.jpg" },
  { nama: "Muhammad Yafi Fathoni", angkatan: "2026", universitas: "UPN Veteran Yogyakarta", jurusan: "S1 Teknik Pertambangan", kota: "Sleman", foto: "assets/images/alumni-placeholder-2.jpg" },
  { nama: "Muhammad Maulida Al Ghifari", angkatan: "2026", universitas: "UPN Veteran Jawa Timur", jurusan: "S1 Teknik Industri", kota: "Surabaya", foto: "assets/images/alumni-placeholder-3.jpg" },
  { nama: "Mazaaya Huurin Dzakiyya", angkatan: "2026", universitas: "Universitas Sebelas Maret", jurusan: "D3 Usaha Perjalanan Wisata", kota: "Surakarta", foto: "assets/images/alumni-placeholder-4.jpg" },
  { nama: "Mazaya Raudhatul Husna", angkatan: "2026", universitas: "Masih Menunggu", jurusan: "S1 Communication", kota: "Malaysia", foto: "assets/images/alumni-placeholder-5.jpg" }
];

// ---------------------------------------------------------
// DATA PRESTASI (dummy)
// ---------------------------------------------------------
const prestasiData = [
  { nama: "Nama Alumni", angkatan: "Angkatan 2022", judul: "Juara Kompetisi Nasional", bidang: "Bidang Teknologi", foto: "assets/images/prestasi-placeholder-1.jpg" },
  { nama: "Nama Alumni", angkatan: "Angkatan 2020", judul: "Juara Olimpiade Sains", bidang: "Bidang Sains", foto: "assets/images/prestasi-placeholder-2.jpg" },
  { nama: "Nama Alumni", angkatan: "Angkatan 2021", judul: "Penghargaan Karya Tulis Ilmiah", bidang: "Bidang Akademik", foto: "assets/images/prestasi-placeholder-3.jpg" }
];

// ---------------------------------------------------------
// DATA WISUDA (dummy)
// ---------------------------------------------------------
const wisudaData = [
  { nama: "Nama Alumni", angkatan: "Angkatan 2019", universitas: "Universitas Diponegoro", jurusan: "Teknik Sipil", tahun: "2023", foto: "assets/images/wisuda-placeholder-1.jpg" },
  { nama: "Nama Alumni", angkatan: "Angkatan 2018", universitas: "Universitas Gadjah Mada", jurusan: "Akuntansi", tahun: "2022", foto: "assets/images/wisuda-placeholder-2.jpg" },
  { nama: "Nama Alumni", angkatan: "Angkatan 2020", universitas: "Universitas Indonesia", jurusan: "Psikologi", tahun: "2024", foto: "assets/images/wisuda-placeholder-3.jpg" }
];

// ---------------------------------------------------------
// DATA AGENDA (dummy)
// ---------------------------------------------------------
const agendaData = [
  { date: "2026-12-20", tanggal: "20 Des 2026", hari: "20", bulan: "Des", judul: "Reuni Alumni IKRAABI", lokasi: "SMATQ ABI-UMMI" },
  { date: "2027-01-10", tanggal: "10 Jan 2027", hari: "10", bulan: "Jan", judul: "Webinar Pengembangan Karier Alumni", lokasi: "Online via Zoom" },
  { date: "2027-02-05", tanggal: "05 Feb 2027", hari: "05", bulan: "Feb", judul: "Bakti Sosial Keluarga Besar IKRAABI", lokasi: "SMATQ ABI-UMMI" }
];

const agendaState = {
  currentMonth: new Date(agendaData[0]?.date || new Date())
};

// ---------------------------------------------------------
// DATA GALERI (dummy)
// ---------------------------------------------------------
const galleryData = Array.from({ length: 8 }, (_, i) => ({
  src: `assets/images/gallery-placeholder-${i + 1}.jpg`,
  caption: `Dokumentasi Kegiatan #${i + 1}`
}));

/* =========================================================
   INIT (khusus konten halaman beranda)
   common.js sudah menangani: form buttons, tema, navbar,
   mobile menu, dan back-to-top secara otomatis.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  renderOrgChart();
  renderAlumniDirectory();
  renderPrestasi();
  renderWisuda();
  renderNews();
  renderAgenda();
  renderGallery();
  initLightbox();
  initCounters();
  initReveal();
});

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;

  let current = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  };

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4000);
}

/* ---------- Org chart ---------- */
function renderOrgChart() {
  const wrap = document.getElementById("orgChart");
  if (!wrap) return;

  const personNode = (person, departmentId, extraClass = "") => `
    <div class="org-card org-node ${extraClass}" data-org-id="${departmentId}" tabindex="0" role="button" aria-label="Lihat detail ${person.jabatan}">
      <h4>${person.nama}</h4>
      <span>${person.jabatan}</span>
    </div>`;

  const groupNode = (title, departmentId, extraClass = "") => `
    <div class="org-card org-node org-node--group ${extraClass}" data-org-id="${departmentId}" tabindex="0" role="button" aria-label="Lihat detail ${title}">
      <h4>${title}</h4>
    </div>`;

  const coordinators = [
    { key: "psda", id: "koordinator-psda" },
    { key: "media", id: "koordinator-media" },
    { key: "regional", id: "koordinator-regional" },
    { key: "humas", id: "koordinator-humas" }
  ];

  const secretariat = [
    { name: "Nurul Azkiya Rajwanda", id: "sekretaris" },
    { name: "Rayya Tanisha Az-Zahra", id: "sekretaris" }
  ];

  const treasury = [
    { name: "Arifah Nur Azizah", id: "bendahara" },
    { name: "Mutia Khonsa Salsabila", id: "bendahara" }
  ];

  wrap.innerHTML = `
    <div class="org-tree">
      <div class="org-level org-level-1">
        ${groupNode("Pengurus Harian", "pengurus-harian", "org-node--primary")}
      </div>

      <div class="org-level org-level-2">
        ${personNode(organization.ketua, "ketua-umum", "org-node--primary")}
      </div>

      <div class="org-level org-level-3">
        ${personNode(organization.wakil, "wakil-umum", "org-node--secondary")}
      </div>

      <div class="org-level org-level-4">
        <div class="org-branch org-branch--two">
          ${groupNode("Sekretaris", "sekretaris")}
          ${groupNode("Bendahara", "bendahara")}
        </div>
      </div>

      <div class="org-level org-level-5">
        <div class="org-branch org-branch--coord">
          ${coordinators.map(({ key, id }) => personNode(organization[key], id, "org-node--coord")).join("")}
        </div>
      </div>
    </div>
  `;

  bindOrgCardEvents();
}

/* ---------- Alumni directory ---------- */
function renderAlumniDirectory() {
  const grid = document.getElementById("alumniGrid");
  const emptyState = document.getElementById("emptyState");
  const searchInput = document.getElementById("searchInput");
  const filterAngkatan = document.getElementById("filterAngkatan");
  const filterUniversitas = document.getElementById("filterUniversitas");
  const filterKota = document.getElementById("filterKota");
  const loadMoreBtn = document.getElementById("alumniLoadMore");
  if (!grid) return;

  const visibleStep = 12;
  let currentVisible = visibleStep;

  const uniqueValues = (key) => [...new Set(alumniData.map(a => a[key]))].sort();
  const populate = (select, values) => {
    values.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
  };
  populate(filterAngkatan, uniqueValues("angkatan"));
  populate(filterUniversitas, uniqueValues("universitas"));
  populate(filterKota, uniqueValues("kota"));

  const renderList = (list) => {
    const visibleList = list.slice(0, currentVisible);

    grid.innerHTML = visibleList.map(a => `
      <div class="alumni-card">
        <div class="photo"><img src="${assetUrl(a.foto)}" alt="Foto ${a.nama}" loading="lazy" onerror="this.src='../assets/images/alumni-placeholder-1.jpg'"></div>
        <div class="body">
          <h4>${a.nama}</h4>
          <div class="meta">
            <strong>Angkatan:</strong> ${a.angkatan}<br>
            <strong>Universitas:</strong> ${a.universitas}<br>
            <strong>Jurusan:</strong> ${a.jurusan || "-"}<br>
            <strong>Kota:</strong> ${a.kota}
          </div>
          <span class="tag">${a.angkatan}</span>
        </div>
      </div>
    `).join("");

    if (loadMoreBtn) {
      loadMoreBtn.style.display = list.length > visibleList.length ? "inline-flex" : "none";
      loadMoreBtn.disabled = visibleList.length >= list.length;
      loadMoreBtn.textContent = visibleList.length >= list.length ? "Semua data ditampilkan" : "Lihat lainnya";
    }

    emptyState.classList.toggle("show", list.length === 0);
  };

  const applyFilters = () => {
    const q = searchInput.value.trim().toLowerCase();
    const ang = filterAngkatan.value;
    const uni = filterUniversitas.value;
    const kota = filterKota.value;

    const filtered = alumniData.filter(a => {
      const matchQ = !q || a.nama.toLowerCase().includes(q) || a.universitas.toLowerCase().includes(q) || a.kota.toLowerCase().includes(q) || a.jurusan.toLowerCase().includes(q);
      const matchAng = !ang || a.angkatan === ang;
      const matchUni = !uni || a.universitas === uni;
      const matchKota = !kota || a.kota === kota;
      return matchQ && matchAng && matchUni && matchKota;
    });

    currentVisible = visibleStep;
    renderList(filtered);
  };

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const q = searchInput.value.trim().toLowerCase();
      const ang = filterAngkatan.value;
      const uni = filterUniversitas.value;
      const kota = filterKota.value;

      const filtered = alumniData.filter(a => {
        const matchQ = !q || a.nama.toLowerCase().includes(q) || a.universitas.toLowerCase().includes(q) || a.kota.toLowerCase().includes(q) || a.jurusan.toLowerCase().includes(q);
        const matchAng = !ang || a.angkatan === ang;
        const matchUni = !uni || a.universitas === uni;
        const matchKota = !kota || a.kota === kota;
        return matchQ && matchAng && matchUni && matchKota;
      });

      currentVisible = Math.min(currentVisible + visibleStep, filtered.length);
      renderList(filtered);
    });
  }

  [searchInput, filterAngkatan, filterUniversitas, filterKota].forEach(el => {
    el.addEventListener("input", applyFilters);
    el.addEventListener("change", applyFilters);
  });

  renderList(alumniData);
}

/* ---------- Prestasi ---------- */
function renderPrestasi() {
  const grid = document.getElementById("prestasiGrid");
  if (!grid) return;
  grid.innerHTML = prestasiData.map(p => `
    <div class="achieve-card">
      <div class="photo"><img src="${assetUrl(p.foto)}" alt="Foto ${p.nama}" loading="lazy" onerror="this.src='../assets/images/prestasi-placeholder-1.jpg'"></div>
      <div class="body">
        <span class="badge">${p.bidang}</span>
        <h4>${p.nama}</h4>
        <div class="meta">${p.angkatan}<br>${p.judul}</div>
      </div>
    </div>
  `).join("");
}

/* ---------- Wisuda ---------- */
function renderWisuda() {
  const grid = document.getElementById("wisudaGrid");
  if (!grid) return;
  grid.innerHTML = wisudaData.map(w => `
    <div class="wisuda-card">
      <div class="photo"><img src="${assetUrl(w.foto)}" alt="Foto ${w.nama}" loading="lazy" onerror="this.src='../assets/images/wisuda-placeholder-1.jpg'"></div>
      <div class="body">
        <h4>${w.nama}</h4>
        <div class="meta">
          ${w.angkatan}<br>
          ${w.universitas} — ${w.jurusan}<br>
          Wisuda ${w.tahun}
        </div>
      </div>
    </div>
  `).join("");
}

/* ---------- Berita (memakai data dari articles.js) ---------- */
function renderNews() {
  const grid = document.getElementById("newsGrid");
  const filters = document.getElementById("newsFilters");
  if (!grid || typeof articles === "undefined") return;

  const renderList = (cat) => {
    grid.innerHTML = articles.map(a => {
      const visible = cat === "Semua" || a.category === cat;
      return `
      <article class="news-card ${visible ? "show" : ""}" data-cat="${a.category}">
        <div class="photo"><img src="${assetUrl(a.image)}" alt="${a.title}" loading="lazy" onerror="this.src='../assets/images/berita-placeholder-1.jpg'"></div>
        <div class="body">
          <div class="news-meta"><span class="cat">${a.category}</span><span>•</span><span>${a.date}</span></div>
          <h4>${a.title}</h4>
          <p>${a.excerpt}</p>
          <a class="read-more" href="../berita-detail.html?slug=${a.slug}">Baca Selengkapnya →</a>
        </div>
      </article>`;
    }).join("");
  };

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".news-filter-btn");
    if (!btn) return;
    filters.querySelectorAll(".news-filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderList(btn.dataset.cat);
  });

  renderList("Semua");
}

/* ---------- Agenda ---------- */
function renderAgenda() {
  const list = document.getElementById("agendaList");
  const calendar = document.getElementById("agendaCalendar");
  const monthLabel = document.getElementById("agendaMonthLabel");
  const prevBtn = document.getElementById("agendaPrevMonth");
  const nextBtn = document.getElementById("agendaNextMonth");
  if (!list || !calendar || !monthLabel) return;

  const monthStart = new Date(agendaState.currentMonth.getFullYear(), agendaState.currentMonth.getMonth(), 1);
  const monthEnd = new Date(agendaState.currentMonth.getFullYear(), agendaState.currentMonth.getMonth() + 1, 0);
  const monthFormatter = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" });
  const weekdayFormatter = new Intl.DateTimeFormat("id-ID", { weekday: "short" });
  monthLabel.textContent = monthFormatter.format(monthStart);

  const agendaForMonth = agendaData
    .filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === monthStart.getFullYear() && itemDate.getMonth() === monthStart.getMonth();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  list.innerHTML = agendaForMonth.length
    ? agendaForMonth.map(a => `
        <div class="agenda-item">
          <div class="agenda-date"><span class="day">${a.hari}</span><span class="month">${a.bulan}</span></div>
          <div class="agenda-info">
            <h4>${a.judul}</h4>
            <div class="loc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ${a.lokasi}
            </div>
            <div class="agenda-date-full">${a.tanggal}</div>
          </div>
        </div>
      `).join("")
    : `<div class="agenda-empty">Belum ada agenda pada bulan ini.</div>`;

  const firstWeekday = (monthStart.getDay() + 6) % 7;
  const calendarCells = [];

  for (let i = 0; i < firstWeekday; i++) {
    calendarCells.push('<div class="agenda-calendar-cell agenda-calendar-empty"></div>');
  }

  for (let day = 1; day <= monthEnd.getDate(); day++) {
    const currentDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
    const eventsForDay = agendaData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === currentDate.getFullYear() && itemDate.getMonth() === currentDate.getMonth() && itemDate.getDate() === currentDate.getDate();
    });

    const dayLabel = currentDate.toISOString().split("T")[0];
    const hasEvents = eventsForDay.length > 0;
    const isToday = dayLabel === new Date().toISOString().split("T")[0] && monthStart.getMonth() === new Date().getMonth() && monthStart.getFullYear() === new Date().getFullYear();

    calendarCells.push(`
      <button type="button" class="agenda-calendar-cell agenda-day ${hasEvents ? "has-event" : ""} ${isToday ? "is-today" : ""}" data-date="${dayLabel}" aria-label="Agenda tanggal ${day}">
        <span>${day}</span>
        ${hasEvents ? '<small>' + eventsForDay.length + '</small>' : ''}
      </button>
    `);
  }

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push('<div class="agenda-calendar-cell agenda-calendar-empty"></div>');
  }

  calendar.innerHTML = calendarCells.join("");

  const dayButtons = calendar.querySelectorAll(".agenda-day");
  dayButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedDate = button.dataset.date;
      const selectedAgenda = agendaData.filter(item => item.date === selectedDate);
      if (!selectedAgenda.length) return;

      list.innerHTML = selectedAgenda.map(a => `
        <div class="agenda-item agenda-item-selected">
          <div class="agenda-date"><span class="day">${a.hari}</span><span class="month">${a.bulan}</span></div>
          <div class="agenda-info">
            <h4>${a.judul}</h4>
            <div class="loc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ${a.lokasi}
            </div>
            <div class="agenda-date-full">${a.tanggal}</div>
          </div>
        </div>
      `).join("");
    });
  });

  prevBtn.onclick = () => {
    agendaState.currentMonth = new Date(agendaState.currentMonth.getFullYear(), agendaState.currentMonth.getMonth() - 1, 1);
    renderAgenda();
  };

  nextBtn.onclick = () => {
    agendaState.currentMonth = new Date(agendaState.currentMonth.getFullYear(), agendaState.currentMonth.getMonth() + 1, 1);
    renderAgenda();
  };
}

/* ---------- Gallery + Lightbox ---------- */
let currentGalleryIndex = 0;

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = galleryData.map((g, i) => `
    <div class="gallery-item" data-index="${i}" tabindex="0" role="button" aria-label="Buka ${g.caption}">
      <img src="${assetUrl(g.src)}" alt="${g.caption}" loading="lazy" onerror="this.src='../assets/images/gallery-placeholder-1.jpg'">
      <div class="gallery-overlay"><span>${g.caption}</span></div>
    </div>
  `).join("");

  grid.querySelectorAll(".gallery-item").forEach(item => {
    const open = () => openLightbox(parseInt(item.dataset.index, 10));
    item.addEventListener("click", open);
    item.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  if (!lightbox) return;

  window._openLightbox = (index) => {
    currentGalleryIndex = index;
    updateLightboxImage();
    lightbox.classList.add("open");
    closeBtn.focus();
  };

  const close = () => lightbox.classList.remove("open");
  const updateLightboxImage = () => {
    const item = galleryData[currentGalleryIndex];
    img.src = item.src;
    img.alt = item.caption;
  };
  const next = () => { currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length; updateLightboxImage(); };
  const prev = () => { currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length; updateLightboxImage(); };

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
}

function openLightbox(index) {
  if (window._openLightbox) window._openLightbox(index);
}

/* ---------- Counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + (progress >= 1 ? "+" : "");
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  } else {
    counters.forEach(animate);
  }
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(i => i.classList.add("in-view"));
    return;
  }

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(i => obs.observe(i));
}
