(function () {
    let currentSlide = 0;

    function showSlide(n) {
        const slides = document.querySelector('.slides');
        const totalSlides = slides.children.length;

        if (n >= totalSlides) currentSlide = 0;
        if (n < 0) currentSlide = totalSlides - 1;

        slides.style.transition = 'transform 0.5s ease-in-out';
        slides.style.transform = `translateX(${-currentSlide * 100}%)`;
        updateDots();
    }

    function changeSlide(n) {
        currentSlide += n;
        showSlide(currentSlide);
    }

    function setCurrentSlide(n) {
        currentSlide = n - 1;
        showSlide(currentSlide);
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    showSlide(currentSlide);

    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    startAutoplay();

    window.changeSlide = changeSlide;
    window.currentSlide = setCurrentSlide;
})();
