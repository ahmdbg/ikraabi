function renderSharedChrome() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navigation = [
        ['index.html', 'Beranda'],
        ['about.html', 'Tentang IKRAABI'],
        ['layanan.html', 'Pendataan'],
        ['kalender.html', 'Kalender Kegiatan'],
        ['alumni.html', 'Direktori Alumni'],
        ['blog.html', 'Kabar IKRAABI']
    ];
    var links = navigation.map(function (item) {
        var active = currentPage === item[0] ? ' bg-blue-50 text-blue-800' : ' text-slate-700';
        return '<li><a class="block rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-slate-100' + active + '" href="' + item[0] + '">' + item[1] + '</a></li>';
    }).join('');
    var header = '<header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur"><nav class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Navigasi utama">' +
        '<a class="flex items-center gap-3" href="index.html"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-300 font-black text-slate-900">IK</span><span><span class="block text-base font-black leading-none text-slate-900">IKRAABI</span><span class="mt-1 block text-xs font-bold text-emerald-700">Periode 2025/2027</span></span></a>' +
        '<button class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 md:hidden" type="button" data-nav-toggle aria-expanded="false" aria-controls="siteNav" aria-label="Buka menu"><i data-lucide="menu"></i></button>' +
        '<ul class="hidden w-full flex-col gap-1 border-t border-slate-200 pt-3 md:flex md:w-auto md:flex-row md:items-center md:border-0 md:pt-0" id="siteNav">' + links + '</ul></nav></header>';
    var footer = '<footer class="mt-auto border-t-4 border-blue-700 bg-lime-500 py-10 text-slate-900"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 gap-8 border-b border-slate-900/20 pb-8 md:grid-cols-4"><div class="md:col-span-2"><h2 class="mb-3 text-lg font-black"><span class="text-blue-800">IKRAABI</span> 2025/2027</h2><p class="mb-2 font-semibold">Ikatan Alumni SMATQ ABI-UMMI</p><p class="mb-4 max-w-lg text-sm">Wadah silaturahmi, komunikasi, dan kolaborasi bagi keluarga besar alumni SMATQ ABI-UMMI.</p><div class="space-y-1 text-sm font-bold"><div><i data-lucide="message-circle" class="mr-2 inline h-4 w-4"></i>WhatsApp IKRAABI</div><div><i data-lucide="mail" class="mr-2 inline h-4 w-4"></i>info@ikraabi.official</div></div></div><div><h3 class="mb-3 text-sm font-black uppercase">Jelajahi</h3><ul class="space-y-2 text-sm font-semibold"><li><a href="about.html" class="hover:underline">Tentang IKRAABI</a></li><li><a href="layanan.html" class="hover:underline">Pendataan Alumni</a></li><li><a href="kalender.html" class="hover:underline">Kalender Kegiatan</a></li><li><a href="blog.html" class="hover:underline">Kabar IKRAABI</a></li><li><a href="alumni.html" class="hover:underline">Direktori Alumni</a></li></ul></div><div><h3 class="mb-3 text-sm font-black uppercase">Kontak</h3><ul class="space-y-2 text-sm font-semibold"><li><a href="https://wa.me/6281234567890" class="hover:underline">WhatsApp IKRAABI</a></li><li><a href="mailto:info@ikraabi.official" class="hover:underline">Email Pengurus</a></li></ul></div></div><div class="flex flex-wrap justify-between gap-3 pt-4 text-xs font-bold"><span>Terhubung dalam Silaturahmi, Bertumbuh dalam Kontribusi.</span><span>Portal alumni IKRAABI</span></div></div></footer>';
    document.querySelectorAll('body > nav, body > footer').forEach(function (element) { element.remove(); });
    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);
    var menuButton = document.querySelector('[data-nav-toggle]');
    menuButton.addEventListener('click', function () {
        var menu = document.getElementById('siteNav');
        var expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menu.classList.toggle('hidden', expanded);
        menuButton.setAttribute('aria-expanded', String(!expanded));
        menuButton.setAttribute('aria-label', expanded ? 'Buka menu' : 'Tutup menu');
        menuButton.innerHTML = '<i data-lucide="' + (expanded ? 'menu' : 'x') + '"></i>';
        if (window.lucide) window.lucide.createIcons();
    });
    if (window.lucide) window.lucide.createIcons();
}

var ikraabiEvents = [];

function eventDate(parts) {
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3] - 7, parts[4]));
}

function formatEventDate(date, options) {
    return new Intl.DateTimeFormat('id-ID', Object.assign({timeZone: 'Asia/Jakarta'}, options)).format(date);
}

function escapeEventText(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
        return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'}[character];
    });
}

function currentJakartaDateParts() {
    var parts = {};
    new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta', year: 'numeric', month: 'numeric', day: 'numeric'
    }).formatToParts(new Date()).forEach(function (part) {
        if (part.type !== 'literal') parts[part.type] = Number(part.value);
    });
    return [parts.year, parts.month, parts.day];
}

function eventUrl(event, month) {
    return 'event.html?id=' + encodeURIComponent(event.id) + '&month=' + month;
}

function eventStatus(event) {
    var now = Date.now();
    if (now > eventDate(event.end).getTime()) return 'Sudah terlaksana';
    if (now >= eventDate(event.start).getTime()) return 'Sedang berlangsung';
    return 'Akan datang';
}

function renderCalendar() {
    var calendar = document.querySelector('[data-calendar]');
    if (!calendar) return;

    var params = new URLSearchParams(window.location.search);
    var requestedMonth = params.get('month');
    var monthMatch = requestedMonth && requestedMonth.match(/^(\d{4})-(\d{2})$/);
    var today = currentJakartaDateParts();
    var year = monthMatch ? Number(monthMatch[1]) : today[0];
    var month = monthMatch ? Number(monthMatch[2]) - 1 : today[1] - 1;
    if (month < 0 || month > 11) {
        year = today[0];
        month = today[1] - 1;
    }

    var monthKey = year + '-' + String(month + 1).padStart(2, '0');
    var monthEvents = ikraabiEvents.filter(function (event) {
        return event.start[0] === year && event.start[1] === month + 1;
    }).sort(function (first, second) {
        return eventDate(first.start) - eventDate(second.start);
    });
    var firstWeekday = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var rows = Math.ceil((firstWeekday + daysInMonth) / 7);
    var cellList = [];
    for (var cellIndex = 0; cellIndex < rows * 7; cellIndex += 1) {
        var cellDay = cellIndex - firstWeekday + 1;
        if (cellDay < 1 || cellDay > daysInMonth) {
            cellList.push('<td class="calendar-day calendar-day-muted" aria-hidden="true"></td>');
            continue;
        }
        var cellEvents = monthEvents.filter(function (event) { return event.start[2] === cellDay; });
        var currentDay = today[0] === year && today[1] - 1 === month && today[2] === cellDay;
        var content = '<span class="calendar-day-number' + (currentDay ? ' is-today' : '') + '">' + cellDay + '</span>';
        content += cellEvents.map(function (event) {
            return '<a class="calendar-event-link" href="' + eventUrl(event, monthKey) + '" title="Lihat detail ' + escapeEventText(event.title) + '">' + escapeEventText(event.title) + '</a>';
        }).join('');
        cellList.push('<td class="calendar-day' + (cellEvents.length ? ' has-event' : '') + '">' + content + '</td>');
    }
    var weekRows = '';
    for (var week = 0; week < rows; week += 1) {
        weekRows += '<tr>' + cellList.slice(week * 7, week * 7 + 7).join('') + '</tr>';
    }

    document.querySelector('[data-calendar-title]').textContent = formatEventDate(new Date(Date.UTC(year, month, 1, 12)), { month: 'long', year: 'numeric' });
    document.querySelector('[data-calendar-grid]').innerHTML = weekRows;
    document.querySelector('[data-calendar-prev]').href = 'kalender.html?month=' + (month === 0 ? (year - 1) + '-12' : year + '-' + String(month).padStart(2, '0'));
    document.querySelector('[data-calendar-next]').href = 'kalender.html?month=' + (month === 11 ? (year + 1) + '-01' : year + '-' + String(month + 2).padStart(2, '0'));

    var agenda = document.querySelector('[data-month-agenda]');
    agenda.innerHTML = monthEvents.length ? monthEvents.map(function (event) {
        var status = eventStatus(event);
        var start = eventDate(event.start);
        var end = eventDate(event.end);
        var timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
        return '<a class="agenda-item" href="' + eventUrl(event, monthKey) + '"><span class="agenda-item-date">' + formatEventDate(start, { day: '2-digit', month: 'short', year: 'numeric' }) + '</span><span class="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white">' + status + '</span><h3>' + escapeEventText(event.title) + '</h3><p><i data-lucide="map-pin" class="mr-1 inline h-4 w-4"></i>' + escapeEventText(event.location) + '</p><p><i data-lucide="clock-3" class="mr-1 inline h-4 w-4"></i>' + formatEventDate(start, timeOptions) + ' - ' + formatEventDate(end, timeOptions) + ' WIB</p><span class="agenda-item-more">Lihat detail <i data-lucide="arrow-right" class="inline h-4 w-4"></i></span></a>';
    }).join('') : '<p class="mb-0 text-slate-500">Belum ada agenda pada bulan ini.</p>';
    if (window.lucide) window.lucide.createIcons();
}

function renderEventDetail() {
    var container = document.querySelector('[data-event-detail]');
    if (!container) return;
    var params = new URLSearchParams(window.location.search);
    var event = ikraabiEvents.find(function (item) { return item.id === params.get('id'); });
    if (!event) {
        container.innerHTML = '<div class="py-12 text-center"><i data-lucide="calendar-x-2" class="mx-auto h-12 w-12 text-slate-400"></i><h1 class="mt-3 text-2xl font-bold">Agenda tidak ditemukan</h1><p class="text-slate-500">Agenda ini tidak tersedia atau tautannya sudah tidak berlaku.</p><a class="mt-4 inline-flex rounded-full bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800" href="kalender.html">Buka kalender kegiatan</a></div>';
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    var start = eventDate(event.start);
    var end = eventDate(event.end);
    var status = eventStatus(event);
    var month = params.get('month') || (event.start[0] + '-' + String(event.start[1]).padStart(2, '0'));
    var timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    container.innerHTML = '<a class="detail-back-link" href="kalender.html?month=' + encodeURIComponent(month) + '"><i data-lucide="arrow-left" class="mr-1 inline h-4 w-4"></i>Kembali ke kalender</a><article class="event-detail-panel"><div class="event-detail-topline"><span class="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white">' + escapeEventText(event.category) + '</span><span class="inline-flex rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white">' + status + '</span></div><h1 class="mt-3 font-black">' + escapeEventText(event.title) + '</h1><p class="event-detail-description">' + escapeEventText(event.description) + '</p><dl class="event-detail-meta"><div><dt><i data-lucide="calendar-days" class="mr-1 inline h-4 w-4"></i>Tanggal</dt><dd>' + formatEventDate(start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '</dd></div><div><dt><i data-lucide="clock-3" class="mr-1 inline h-4 w-4"></i>Waktu</dt><dd>' + formatEventDate(start, timeOptions) + ' - ' + formatEventDate(end, timeOptions) + ' WIB</dd></div><div><dt><i data-lucide="map-pin" class="mr-1 inline h-4 w-4"></i>Lokasi</dt><dd>' + escapeEventText(event.location) + '</dd></div></dl>' + (start.getTime() > Date.now() ? '<div class="event-countdown"><span class="text-sm font-bold">Hitung mundur pelaksanaan</span><div class="font-black text-lg text-blue-700" data-countdown="' + start.toISOString() + '">Memuat waktu...</div></div>' : '') + '</article>';
    if (window.lucide) window.lucide.createIcons();
    document.title = event.title + ' - Agenda IKRAABI';
}

document.addEventListener('DOMContentLoaded', function () {
    renderSharedChrome();
    renderCalendar();
    renderEventDetail();
    document.querySelectorAll('form[data-static-form]').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var alert = document.createElement('div');
            alert.className = 'mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-sm';
            alert.setAttribute('role', 'alert');
            alert.innerHTML = '<h2 class="mb-2 font-bold"><i data-lucide="circle-check" class="mr-1 inline h-5 w-5"></i>Berhasil!</h2><p class="mb-0">' + (form.dataset.success || 'Formulir berhasil dikirim.') + '</p>';
            form.closest('.card-custom').parentElement.insertBefore(alert, form.closest('.card-custom'));
            if (window.lucide) window.lucide.createIcons();
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
                card.classList.toggle('hidden', !matches);
                if (matches) visible += 1;
            });
            if (emptyResults) emptyResults.classList.toggle('hidden', visible !== 0);
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
