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
        this.minSwipeDistance = 50;
        this.init();
    }

    init() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.showSlide(index));
        });

        this.startAutoSlide();

        // Touch events
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.carousel.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        this.carousel.addEventListener('touchend', () => this.handleTouchEnd(), { passive: true });

        // Mouse events for desktop testing
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    showSlide(index) {
        // Remove active class from all items and indicators
        this.items.forEach(item => item.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current item and indicator
        this.items[index].classList.add('active');
        this.indicators[index].classList.add('active');
        this.currentIndex = index;
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showSlide(prevIndex);
    }

    startAutoSlide() {
        this.pauseAutoSlide(); // Clear any existing interval
        this.interval = setInterval(() => this.nextSlide(), 5000);
    }

    pauseAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.pauseAutoSlide();
    }

    handleTouchMove(e) {
        if (!this.touchStartX) return;
        this.touchEndX = e.touches[0].clientX;
        
        // Prevent default scrolling while swiping
        const swipeDistance = this.touchEndX - this.touchStartX;
        if (Math.abs(swipeDistance) > 10) {
            e.preventDefault();
        }
    }

    handleTouchEnd() {
        if (!this.touchStartX || !this.touchEndX) return;

        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }

        // Reset touch coordinates
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.startAutoSlide();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
}); 