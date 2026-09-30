(function () {
    'use strict';
    var API_URL = 'https://script.google.com/macros/s/AKfycbz_YfzIPKo05jZdjurYt25eBP9Mv-i1LVm-1O8qVrZIKj946p8Fhfv3eHmmCxh0MmAg/exec';

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function (character) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'}[character];
        });
    }

    function parseEventDate(value) {
        var text = String(value || '').trim();
        var isoMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (isoMatch) return isoMatch.slice(1).map(Number);

        var dateMatch = text.match(/^[A-Za-z]{3}\s+([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})\b/);
        if (!dateMatch) return null;
        var months = {Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12};
        var month = months[dateMatch[1]];
        return month ? [Number(dateMatch[3]), month, Number(dateMatch[2])] : null;
    }

    function parseEventTime(value) {
        var timeMatch = String(value || '').trim().match(/(?:^|[T\s])(\d{1,2}):([0-5]\d)(?::[0-5]\d)?(?:\s*(AM|PM))?(?=\s|$)/i);
        if (!timeMatch) return null;
        var hours = Number(timeMatch[1]);
        var meridiem = (timeMatch[3] || '').toUpperCase();
        if (meridiem) {
            if (hours < 1 || hours > 12) return null;
            hours = hours % 12 + (meridiem === 'PM' ? 12 : 0);
        }
        if (hours > 23) return null;
        return [hours, Number(timeMatch[2])];
    }

    function parseEventParts(dateValue, timeValue) {
        var dateParts = parseEventDate(dateValue);
        var timeParts = parseEventTime(timeValue);
        if (!dateParts || !timeParts) return null;
        var parts = dateParts;
        var date = new Date(parts[0], parts[1] - 1, parts[2]);
        if (date.getFullYear() !== parts[0] || date.getMonth() !== parts[1] - 1 || date.getDate() !== parts[2]) return null;
        parts.push(timeParts[0], timeParts[1]);
        return parts;
    }

    function normalizeEvent(row) {
        var start = parseEventParts(row.tanggal, row.mulai);
        var end = parseEventParts(row.tanggal, row.selesai);
        if (!String(row.id || '').trim() || !String(row.judul || '').trim() || !start || !end) return null;
        if (end[3] * 60 + end[4] < start[3] * 60 + start[4]) return null;
        return {
            id: String(row.id).trim(),
            title: String(row.judul).trim(),
            description: String(row.deskripsi || '').trim(),
            location: String(row.lokasi || '').trim(),
            category: String(row.kategori || 'Kegiatan').trim(),
            start: start,
            end: end
        };
    }

    function showLoadError(message) {
        var agenda = document.querySelector('[data-month-agenda]');
        var detail = document.querySelector('[data-event-detail]');
        var markup = '<div class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900" role="status">' + escapeHtml(message) + '</div>';
        if (agenda) agenda.innerHTML = markup;
        if (detail) detail.innerHTML = markup;
    }

    function startCountdown() {
        var element = document.querySelector('[data-countdown]');
        if (!element) return;
        var target = new Date(element.dataset.countdown).getTime();
        function update() {
            var distance = target - Date.now();
            if (distance <= 0) {
                element.textContent = 'Acara sedang / telah berlangsung';
                return;
            }
            var days = Math.floor(distance / 86400000);
            var hours = Math.floor((distance % 86400000) / 3600000);
            var minutes = Math.floor((distance % 3600000) / 60000);
            var seconds = Math.floor((distance % 60000) / 1000);
            element.textContent = days + ' Hari ' + hours + ' Jam ' + minutes + ' Menit ' + seconds + ' Detik';
        }
        update();
        window.setInterval(update, 1000);
    }

    function loadEvents() {
        var calendar = document.querySelector('[data-calendar]');
        var detail = document.querySelector('[data-event-detail]');
        if (!calendar && !detail) return;
        if (!API_URL) {
            showLoadError('Data kegiatan belum terhubung. Isi API_URL di event-api.js sesuai panduan spreadsheet event.');
            return;
        }
        if (calendar) document.querySelector('[data-month-agenda]').innerHTML = '<p class="mb-0 text-slate-500">Memuat data kegiatan...</p>';
        if (detail) detail.innerHTML = '<p class="text-slate-500">Memuat detail agenda...</p>';

        fetch(API_URL, {headers: {Accept: 'application/json'}, cache: 'no-store'})
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (payload) {
                if (!payload.success) throw new Error(payload.message || 'API mengembalikan respons yang tidak valid.');
                if (!Array.isArray(payload.data)) throw new Error('Respons API tidak memiliki daftar data kegiatan.');
                ikraabiEvents = payload.data.map(normalizeEvent).filter(Boolean);
                renderCalendar();
                renderEventDetail();
                startCountdown();
            })
            .catch(function (error) {
                showLoadError('Data kegiatan gagal dimuat. Periksa URL API dan akses Web App Google Apps Script. (' + error.message + ')');
            });
    }

    document.addEventListener('DOMContentLoaded', loadEvents);
}());