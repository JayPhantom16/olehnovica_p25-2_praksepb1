document.addEventListener('DOMContentLoaded', () => {
    
    // Select necessary elements from HTML
    const slides = document.querySelectorAll('.carousel-slide > div');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pausePlayBtn = document.getElementById('pause-play-btn');

    // Сarousel state
    let currentIndex = 0;       // Current image index
    let isPlaying = true;       // Whether the carousel is currently running automatically
    let slideInterval;          // Timer reference
    const intervalTime = 4000;  // Auto-slide speed (4000 ms = 4 s)

    // 2. Function to display a specific slide
    function showSlide(index) {
        // Check boundaries: if past the last image, loop back to the first
        if (index >= slides.length) {
            currentIndex = 0;
        } 
        // If clicking "Previous" on the first image, jump to the last
        else if (index < 0) {
            currentIndex = slides.length - 1;
        } 
        // Otherwise, set the chosen index
        else {
            currentIndex = index;
        }

        // Remove 'active' class from all slides (fades them out)
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add 'active' class to the current slide (fades it in)
        slides[currentIndex].classList.add('active');
    }

    // 3. Function to go to the next slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // 4. Function to go to the previous slide
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // 5. Function to start automatic sliding
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, intervalTime);
        isPlaying = true;
        pausePlayBtn.textContent = 'Pauze';
    }

    // 6. Function to stop automatic sliding
    function stopAutoSlide() {
        clearInterval(slideInterval);
        isPlaying = false;
        pausePlayBtn.textContent = 'Atsākt';
    }

    // 7. Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        if (isPlaying) {
            stopAutoSlide();
            startAutoSlide();
        }
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        if (isPlaying) {
            stopAutoSlide();
            startAutoSlide();
        }
    });

    // Pause / Resume button
    pausePlayBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // 8. Start the carousel when the page opens
    showSlide(currentIndex); // Show the 1st image
    startAutoSlide();        // Start auto sliding
});