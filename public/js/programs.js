
// Search filter
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const programItems = document.querySelectorAll('.program-item');

function filterPrograms() {
    const query = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

    programItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const department = item.dataset.department;
        const match =
            text.includes(query) && (filter === 'all' || department === filter);
        item.style.display = match ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', filterPrograms);
filterSelect.addEventListener('change', filterPrograms);

// Lightbox functions
function openLightbox(url) {
    document.getElementById('lightboxFrame').src = url;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightboxFrame').src = '';
}