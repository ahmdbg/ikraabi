function renderSharedChrome() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navigation = [
        ['index.html', 'Beranda'],
        ['about.html', 'Tentang IKRAABI'],
        ['layanan.html', 'Pendataan'],
        ['kalender.html', 'Kalender Kegiatan'],
        ['alumni.html', 'Direktori Alumni'],
        ['blog.html', 'Kabar IKRAABI'],
        ['event.html', 'Agenda']
    ];
    var links = navigation.map(function (item) {
        var active = currentPage === item[0] ? ' active text-primary fw-bold' : '';
        return '<li class="nav-item"><a class="nav-link' + active + '" href="' + item[0] + '">' + item[1] + '</a></li>';
    }).join('');
    var header = '<nav class="navbar navbar-expand-lg bg-white shadow-sm sticky-top border-bottom"><div class="container">' +
        '<a class="navbar-brand d-flex align-items-center gap-2" href="index.html"><div class="d-flex align-items-center gap-1 p-1 bg-light border rounded-3"><span class="badge bg-warning text-dark fw-bold rounded-circle p-2">IK</span><span class="badge bg-primary rounded-circle p-2"><i class="bi bi-people-fill"></i></span></div><div><div class="fw-black text-dark lh-1" style="font-size:.95rem">IKRAABI</div><div class="text-success fw-bold" style="font-size:.75rem">Periode 2025/2027</div></div></a>' +
        '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteNav"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="siteNav"><ul class="navbar-nav ms-auto mb-2 mb-lg-0 fw-semibold align-items-center gap-1">' + links + '</ul></div></div></nav>';
    var footer = '<footer class="mt-auto pt-5 pb-4 text-dark" style="background-color:#;border-top:3px solid #2564ebac"><div class="container"><div class="row g-4 pb-4 border-bottom border-dark border-opacity-25"><div class="col-md-6"><h5 class="fw-bold mb-3"><span class="text-primary">IKRAABI</span> 2025/2027</h5><p class="fw-semibold mb-2">Ikatan Alumni SMATQ ABI-UMMI</p><p class="small max-w-lg">Wadah silaturahmi, komunikasi, dan kolaborasi bagi keluarga besar alumni SMATQ ABI-UMMI.</p><div class="small fw-bold"><div><i class="bi bi-whatsapp"></i> WhatsApp IKRAABI</div><div><i class="bi bi-envelope"></i> info@ikraabi.official</div></div></div><div class="col-6 col-md-3"><h6 class="fw-bold text-uppercase mb-3">JELAJAHI</h6><ul class="list-unstyled small fw-bold"><li><a href="about.html" class="text-dark text-decoration-none">Tentang IKRAABI</a></li><li><a href="layanan.html" class="text-dark text-decoration-none">Pendataan Alumni</a></li><li><a href="kalender.html" class="text-dark text-decoration-none">Kalender Kegiatan</a></li><li><a href="event.html" class="text-dark text-decoration-none">Agenda IKRAABI</a></li><li><a href="blog.html" class="text-dark text-decoration-none">Kabar IKRAABI</a></li><li><a href="alumni.html" class="text-dark text-decoration-none">Direktori Alumni</a></li></ul></div><div class="col-6 col-md-3"><h6 class="fw-bold text-uppercase mb-3">KONTAK</h6><ul class="list-unstyled small fw-bold"><li class="mb-1"><a href="https://wa.me/6281234567890" class="text-dark text-decoration-none">WhatsApp IKRAABI</a></li><li><a href="mailto:info@ikraabi.official" class="text-dark text-decoration-none">Email Pengurus</a></li></ul></div></div><div class="d-flex flex-wrap justify-content-between align-items-center gap-3 pt-3 small fw-bold"><div>Terhubung dalam Silaturahmi, Bertumbuh dalam Kontribusi.</div><div>Portal alumni IKRAABI</div></div></div></footer>';
    document.querySelectorAll('body > nav, body > footer').forEach(function (element) { element.remove(); });
    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);
}

document.addEventListener('DOMContentLoaded', function () {
    renderSharedChrome();
    document.querySelectorAll('form[data-static-form]').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var alert = document.createElement('div');
            alert.className = 'alert alert-success rounded-4 shadow-sm p-4 mb-4';
            alert.setAttribute('role', 'alert');
            alert.innerHTML = '<h5 class="fw-bold"><i class="bi bi-check-circle-fill"></i> Berhasil!</h5><p class="mb-0">' + (form.dataset.success || 'Formulir berhasil dikirim.') + '</p>';
            form.closest('.card').parentElement.insertBefore(alert, form.closest('.card'));
            form.reset();
        });
    });
    var searchForm = document.querySelector('[data-alumni-filter]');
    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var query = searchForm.querySelector('[name="q"]').value.toLowerCase().trim();
            var year = searchForm.querySelector('[name="angkatan"]').value;
            var status = searchForm.querySelector('[name="status"]').value;
            var visible = 0;
            var emptyResults = document.querySelector('[data-empty-results]');
            document.querySelectorAll('[data-alumni-card]').forEach(function (card) {
                var matches = (!query || card.dataset.search.includes(query)) && (!year || card.dataset.year === year) && (!status || card.dataset.status === status);
                card.closest('.col-md-6').classList.toggle('d-none', !matches);
                if (matches) visible += 1;
            });
            if (emptyResults) emptyResults.classList.toggle('d-none', visible !== 0);
        });
    }
    document.querySelectorAll('[data-countdown]').forEach(function (element) {
        var target = new Date(element.dataset.countdown).getTime();
        function updateCountdown() {
            var distance = target - Date.now();
            if (distance < 0) { element.textContent = 'Acara Sedang / Telah Berlangsung'; return; }
            var days = Math.floor(distance / 86400000);
            var hours = Math.floor((distance % 86400000) / 3600000);
            var minutes = Math.floor((distance % 3600000) / 60000);
            var seconds = Math.floor((distance % 60000) / 1000);
            element.textContent = days + ' Hari ' + hours + ' Jam ' + minutes + ' Menit ' + seconds + ' Detik';
        }
        updateCountdown();
        window.setInterval(updateCountdown, 1000);
    });
});
