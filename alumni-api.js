(function () {
    'use strict';
    // Paste the IKRAABI Google Apps Script Web App URL here.
    var API_URL = 'https://script.google.com/macros/s/AKfycbwMXrTuISgxj2tD7ogFmNqVZBy_vRGwFjVjEs46ZN102Qexkz_TKMlNq9Enh6m-CFSD/exec';
    var list = document.querySelector('[data-alumni-list]');

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function (character) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'}[character];
        });
    }

    function showMessage(message, type) {
        list.innerHTML = '<div class="col-12"><div class="alert alert-' + type + ' mb-0" role="alert">' +
            escapeHtml(message) + '</div></div>';
    }

    function renderAlumni(records) {
        if (!records.length) {
            list.innerHTML = '<div class="col-12 text-center py-5" data-empty-results><p class="text-muted fs-5">Belum ada data alumni yang dipublikasikan.</p></div>';
            return;
        }
        list.innerHTML = records.map(function (alumni) {
            var search = [alumni.nama, alumni.angkatan, alumni.sekolah_lanjutan, alumni.jurusan, alumni.pekerjaan, alumni.instansi, alumni.kota, alumni.status].join(' ').toLowerCase();
            return '<div class="col-md-3" data-alumni-card data-search="' + escapeHtml(search) + '" data-year="' + escapeHtml(alumni.angkatan) + '" data-status="' + escapeHtml(alumni.status) + '">' +
                '<div class="card card-custom p-4 h-100"><span class="badge bg-primary-subtle text-primary fw-bold align-self-start mb-2">' + escapeHtml(alumni.status) + '</span>' +
                '<h5 class="fw-bold text-dark">' + escapeHtml(alumni.nama) + '</h5><div class="small text-secondary">' +
                '<div><i class="bi bi-calendar3"></i> Angkatan ' + escapeHtml(alumni.angkatan) + '</div>' +
                '<div><i class="bi bi-mortarboard"></i> ' + escapeHtml(alumni.jurusan) + ' · ' + escapeHtml(alumni.sekolah_lanjutan) + '</div>' +
                '<div><i class="bi bi-briefcase"></i> <strong>' + escapeHtml(alumni.pekerjaan) + '</strong> · ' + escapeHtml(alumni.instansi) + '</div>' +
                '<div><i class="bi bi-geo-alt text-danger"></i> Domisili: ' + escapeHtml(alumni.kota) + '</div>' +
                '</div></div></div>';
        }).join('') + '<div class="col-12 text-center py-5 d-none" data-empty-results><p class="text-muted fs-5">Tidak ditemukan data alumni sesuai kriteria pencarian.</p></div>';
    }

    function loadAlumni() {
        if (!list || !API_URL) {
            showMessage('Data alumni belum terhubung. Isi API_URL di file alumni-api.js sesuai panduan.', 'warning');
            return;
        }
        fetch(API_URL + '?action=list', {headers: {Accept: 'application/json'}})
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (payload) {
                if (!payload.success) throw new Error(payload.message || 'API mengembalikan respons yang tidak valid.');
                renderAlumni(payload.data || []);
            })
            .catch(function (error) {
                showMessage('Data alumni gagal dimuat. Periksa URL API dan akses Web App Google Apps Script. (' + error.message + ')', 'danger');
            });
    }

    document.addEventListener('DOMContentLoaded', loadAlumni);
}());