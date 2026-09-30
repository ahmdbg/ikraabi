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
        var tone = type === 'danger' ? 'border-red-200 bg-red-50 text-red-900' : 'border-amber-200 bg-amber-50 text-amber-900';
        list.innerHTML = '<div class="sm:col-span-2 lg:col-span-4"><div class="rounded-xl border p-4 ' + tone + '" role="alert">' +
            escapeHtml(message) + '</div></div>';
    }

    function renderAlumni(records) {
        if (!records.length) {
            list.innerHTML = '<div class="py-12 text-center text-lg text-slate-500 sm:col-span-2 lg:col-span-4" data-empty-results><p>Belum ada data alumni yang dipublikasikan.</p></div>';
            return;
        }
        list.innerHTML = records.map(function (alumni) {
            var search = [alumni.nama, alumni.angkatan, alumni.sekolah_lanjutan, alumni.jurusan, alumni.pekerjaan, alumni.instansi, alumni.kota, alumni.status].join(' ').toLowerCase();
            return '<article class="card-custom p-5" data-alumni-card data-search="' + escapeHtml(search) + '" data-year="' + escapeHtml(alumni.angkatan) + '" data-status="' + escapeHtml(alumni.status) + '">' +
                '<span class="mb-3 inline-flex self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">' + escapeHtml(alumni.status) + '</span>' +
                '<h2 class="mb-4 text-lg font-bold text-slate-900">' + escapeHtml(alumni.nama) + '</h2><div class="space-y-2 text-sm text-slate-600">' +
                '<div><i data-lucide="calendar-days" class="mr-1 inline h-4 w-4"></i> Angkatan ' + escapeHtml(alumni.angkatan) + '</div>' +
                '<div><i data-lucide="graduation-cap" class="mr-1 inline h-4 w-4"></i> ' + escapeHtml(alumni.jurusan) + ' · ' + escapeHtml(alumni.sekolah_lanjutan) + '</div>' +
                '<div><i data-lucide="briefcase-business" class="mr-1 inline h-4 w-4"></i> <strong>' + escapeHtml(alumni.pekerjaan) + '</strong> · ' + escapeHtml(alumni.instansi) + '</div>' +
                '<div><i data-lucide="map-pin" class="mr-1 inline h-4 w-4 text-red-600"></i> Domisili: ' + escapeHtml(alumni.kota) + '</div>' +
                '</div></article>';
        }).join('') + '<div class="hidden py-12 text-center text-lg text-slate-500 sm:col-span-2 lg:col-span-4" data-empty-results><p>Tidak ditemukan data alumni sesuai kriteria pencarian.</p></div>';
        if (window.lucide) window.lucide.createIcons();
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