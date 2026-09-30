(function () {
    'use strict';
    // Isi dengan URL Web App dari spreadsheet Blog, bukan URL spreadsheet Alumni.
    var API_URL = 'https://script.google.com/macros/s/AKfycbxq22QiyVsz-YsgLnDP_GOkn3snWuA1hqE1gEZsPQd7zs8da10B6JhpgnDrx3mJW94oiQ/exec';
    var list = document.querySelector('[data-blog-list]');
    var detail = document.querySelector('[data-blog-detail]');
    var records = [];

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function (character) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'}[character];
        });
    }

    function showMessage(target, message, type) {
        var tone = type === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-red-200 bg-red-50 text-red-900';
        target.innerHTML = '<div class="rounded-xl border p-4 ' + tone + '" role="alert">' +
            escapeHtml(message) + '</div>';
    }

    function getAuthor(post) {
        return post.nama_penulis || post.penulis || post['nama penulis'] || '';
    }

    function getBody(post) {
        return post.isi_blog || post.isi || post['isi blog'] || '';
    }

    function getImagePath(post) {
        var number = String(post.nomor || '').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
        return number ? 'image/blog/' + encodeURIComponent(number) + '.jpg' : '';
    }

    function renderPosts() {
        if (!records.length) {
            list.innerHTML = '<div class="py-12 text-center text-lg text-slate-500 md:col-span-2"><p>Belum ada kabar yang diterbitkan.</p></div>';
            return;
        }
        list.innerHTML = records.map(function (post) {
            var image = getImagePath(post);
            var imageMarkup = image ? '<img src="' + escapeHtml(image) + '" onerror="this.hidden=true" class="mb-4 h-60 w-full rounded-2xl object-cover" alt="' + escapeHtml(post.judul) + '">' : '';
            var detailUrl = 'blog-detail.html?id=' + encodeURIComponent(post.nomor);
            return '<article class="card-custom flex h-full flex-col p-5">' + imageMarkup +
                '<div class="mb-2 text-sm text-slate-500"><i data-lucide="calendar-days" class="mr-1 inline h-4 w-4"></i>' + escapeHtml(post.tanggal) + ' · <span class="font-bold text-blue-700">' + escapeHtml(getAuthor(post)) + '</span></div>' +
                '<h2 class="text-xl font-bold text-slate-900">' + escapeHtml(post.judul) + '</h2>' +
                '<p class="flex-1 text-sm text-slate-600">' + escapeHtml(post.ringkasan) + '</p>' +
                '<a href="' + escapeHtml(detailUrl) + '" class="mt-4 block border-t border-slate-200 pt-4 font-bold text-blue-700 no-underline">Baca Selengkapnya <i data-lucide="arrow-right" class="ml-1 inline h-4 w-4"></i></a>' +
                '</article>';
        }).join('');
        if (window.lucide) window.lucide.createIcons();
    }

    function renderDetail() {
        var number = new URLSearchParams(window.location.search).get('id');
        var post = records.find(function (item) { return String(item.nomor || '') === String(number || ''); });
        if (!number || !post) {
            showMessage(detail, 'Artikel tidak ditemukan. Silakan kembali ke halaman Kabar IKRAABI.', 'warning');
            return;
        }
        document.title = post.judul + ' | Kabar IKRAABI';
        var image = getImagePath(post);
        var imageMarkup = image ? '<img src="' + escapeHtml(image) + '" onerror="this.hidden=true" class="mb-6 max-h-[480px] w-full rounded-2xl object-cover" alt="' + escapeHtml(post.judul) + '">' : '';
        detail.innerHTML = imageMarkup +
            '<a href="blog.html" class="mb-6 inline-flex items-center gap-1 font-bold text-blue-700 no-underline"><i data-lucide="arrow-left" class="h-4 w-4"></i> Kembali ke Kabar IKRAABI</a>' +
            '<div class="mb-2 text-sm text-slate-500"><i data-lucide="calendar-days" class="mr-1 inline h-4 w-4"></i>' + escapeHtml(post.tanggal) + ' · <span class="font-bold text-blue-700">' + escapeHtml(getAuthor(post)) + '</span></div>' +
            '<h1 class="mb-3 text-3xl font-black text-slate-900 sm:text-4xl">' + escapeHtml(post.judul) + '</h1>' +
            '<p class="mb-6 text-lg font-semibold text-slate-600">' + escapeHtml(post.ringkasan) + '</p>' +
            '<div class="leading-relaxed text-slate-600" style="white-space:pre-line">' + escapeHtml(getBody(post)) + '</div>';
        if (window.lucide) window.lucide.createIcons();
    }

    function loadBlog() {
        var target = list || detail;
        if ((!list && !detail) || !API_URL) {
            if (target) showMessage(target, 'Data blog belum terhubung. Isi API_URL di file blog-api.js sesuai panduan.', 'warning');
            return;
        }
        fetch(API_URL, {headers: {Accept: 'application/json'}})
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (payload) {
                if (!payload.success) throw new Error(payload.message || 'API mengembalikan respons yang tidak valid.');
                records = (payload.data || []).filter(function (post) { return post.judul; });
                if (records.some(function (post) { return !String(post.nomor || '').trim(); })) {
                    throw new Error('Kolom nomor belum tersedia. Periksa header spreadsheet dan respons API.');
                }
                if (list) renderPosts();
                if (detail) renderDetail();
            })
            .catch(function (error) {
                showMessage(target, 'Data blog gagal dimuat. Periksa URL API dan akses Web App Google Apps Script. (' + error.message + ')', 'danger');
            });
    }

    document.addEventListener('DOMContentLoaded', loadBlog);
}());
