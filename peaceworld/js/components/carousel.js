// Extract carousel functionality from script.js
export class Carousel {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.items = document.querySelectorAll('.carousel-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-control.prev');
        this.nextBtn = document.querySelector('.carousel-control.next');
        this.currentIndex = 0;
        this.interval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50; // minimum distance for a swipe to register
        this.init();
    }

    init() {
        // Add event listeners
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Initialize indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.showSlide(index));
        });

        // Start auto-sliding
        this.startAutoSlide();

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
         // Add touch events
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.carousel.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.pauseAutoSlide(); // Pause auto-sliding while touching
    }

    handleTouchMove(e) {
        this.touchEndX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swiped right - go to previous slide
                this.prevSlide();
            } else {
                // Swiped left - go to next slide
                this.nextSlide();
            }
        }
        
        // Reset touch coordinates
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.startAutoSlide(); // Resume auto-sliding after touch
    }

    // ... rest of carousel methods
} 