(function () {
    'use strict';
    // Isi dengan URL Web App dari spreadsheet Blog, bukan URL spreadsheet Alumni.
    var API_URL = 'https://script.google.com/macros/s/AKfycbybMHmFOTZR1chSaIIDVxl90k0VqgesjktPHBeKxZr7A965uOqk1o8Cn1_nPoTSmn1o1Q/exec';
    var list = document.querySelector('[data-blog-list]');
    var filters = document.querySelector('[data-blog-filters]');
    var records = [];

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function (character) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'}[character];
        });
    }

    function showMessage(message, type) {
        list.innerHTML = '<div class="col-12"><div class="alert alert-' + type + ' mb-0" role="alert">' +
            escapeHtml(message) + '</div></div>';
    }

    function renderFilters() {
        var categories = records.map(function (post) { return post.kategori; }).filter(function (category, index, values) {
            return category && values.indexOf(category) === index;
        });
        filters.innerHTML = '<button type="button" class="btn btn-primary btn-sm rounded-pill px-4 fw-bold" data-blog-category="">Semua</button>' +
            categories.map(function (category) {
                return '<button type="button" class="btn btn-outline-secondary btn-sm rounded-pill px-4 fw-bold" data-blog-category="' +
                    escapeHtml(category) + '">' + escapeHtml(category) + '</button>';
            }).join('');
        filters.addEventListener('click', function (event) {
            var button = event.target.closest('[data-blog-category]');
            if (!button) return;
            filters.querySelectorAll('[data-blog-category]').forEach(function (item) {
                var active = item === button;
                item.classList.toggle('btn-primary', active);
                item.classList.toggle('btn-outline-secondary', !active);
            });
            renderPosts(button.dataset.blogCategory);
        });
    }

    function renderPosts(category) {
        var visible = records.filter(function (post) { return !category || post.kategori === category; });
        if (!visible.length) {
            list.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted fs-5">Belum ada kabar pada kategori ini.</p></div>';
            return;
        }
        list.innerHTML = visible.map(function (post) {
            var image = post.gambar || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80';
            var link = post.tautan ? '<a href="' + escapeHtml(post.tautan) + '" target="_blank" rel="noopener" class="pt-3 border-top text-primary fw-bold text-decoration-none d-block">Baca Selengkapnya &rarr;</a>' : '';
            return '<div class="col-md-6"><article class="card card-custom p-4 h-100">' +
                '<img src="' + escapeHtml(image) + '" class="w-100 rounded-4 mb-3" style="height:240px;object-fit:cover" alt="' + escapeHtml(post.judul) + '">' +
                '<div class="small text-muted mb-2"><i class="bi bi-calendar"></i> ' + escapeHtml(post.tanggal) + ' · <span class="text-primary fw-bold">' + escapeHtml(post.penulis || post.kategori) + '</span></div>' +
                '<h4 class="fw-bold text-dark">' + escapeHtml(post.judul) + '</h4>' +
                '<p class="text-secondary small">' + escapeHtml(post.ringkasan) + '</p>' + link +
                '</article></div>';
        }).join('');
    }

    function loadBlog() {
        if (!list || !API_URL) {
            showMessage('Data blog belum terhubung. Isi API_URL di file blog-api.js sesuai panduan.', 'warning');
            return;
        }
        fetch(API_URL, {headers: {Accept: 'application/json'}})
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (payload) {
                if (!payload.success) throw new Error(payload.message || 'API mengembalikan respons yang tidak valid.');
                records = (payload.data || []).filter(function (post) {
                    return String(post.status || 'publish').toLowerCase() === 'publish' && post.judul;
                });
                renderFilters();
                renderPosts('');
            })
            .catch(function (error) {
                showMessage('Data blog gagal dimuat. Periksa URL API dan akses Web App Google Apps Script. (' + error.message + ')', 'danger');
            });
    }

    document.addEventListener('DOMContentLoaded', loadBlog);
}());
