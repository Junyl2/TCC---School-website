

//to browse gallerry
document.getElementById('browse-gallery').addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.getElementById('gallery');

    if (targetElement) {
        const offset = 130;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});


//light box to display img with overlay
const galleryImages = document.querySelectorAll('.gallery-container img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden';
        
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== closeBtn) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
});


