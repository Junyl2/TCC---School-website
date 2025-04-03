
// Aos initialized
AOS.init({ duration: 800, once: true });

const scrollBtn = document.getElementById('scrollBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});


// Select all nav or dropdown links with hash anchors , smooth transition for clicked section
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetID = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetID);

        if (targetElement) {
            e.preventDefault();

            const offset = 140;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});



