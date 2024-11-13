// Global variables for modal functionality
let scale = 1;
let isDragging = false;
let startPos = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };

function openNewsModal(imgElement) {
    const modal = document.getElementById('newsModal');
    const modalImg = document.getElementById('modalImage');
    
    if (!modal || !modalImg) return;
    
    // Reset zoom and position
    scale = 1;
    currentPos = { x: 0, y: 0 };
    modalImg.src = imgElement.src;
    modal.style.display = "block";
    updateImageTransform();
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    if (modal) {
        modal.style.display = "none";
        scale = 1;
        currentPos = { x: 0, y: 0 };
        isDragging = false;
    }
}

function updateImageTransform() {
    const modalImg = document.getElementById('modalImage');
    if (modalImg) {
        modalImg.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px) scale(${scale})`;
    }
}

function zoom(delta) {
    const newScale = scale + delta;
    if (newScale >= 1 && newScale <= 3) {
        scale = newScale;
        updateImageTransform();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Main Carousel functionality
    const mainCarousel = document.querySelector('.carousel-container .carousel');
    const mainIndicators = document.querySelectorAll('.carousel-container .indicator');
    const mainPrevButton = document.querySelector('.carousel-container .carousel-control.prev');
    const mainNextButton = document.querySelector('.carousel-container .carousel-control.next');
    const mainItems = document.querySelectorAll('.carousel-container .carousel-item');
    let mainCurrentIndex = 0;
    let mainIntervalId;

    // News Slider functionality
    const newsSlider = document.querySelector('.news-slider');
    const newsPrevButton = document.querySelector('.news-slider-container .prev-btn');
    const newsNextButton = document.querySelector('.news-slider-container .next-btn');
    const newsItems = document.querySelectorAll('.news-item');
    let newsCurrentIndex = 0;
    const newsItemWidth = newsItems.length > 0 ? newsItems[0].offsetWidth : 0;

    // Initialize Main Carousel
    if (mainCarousel && mainItems.length > 0) {
        function showMainSlide(index) {
            mainItems.forEach(item => item.classList.remove('active'));
            mainIndicators.forEach(indicator => indicator.classList.remove('active'));
            
            mainItems[index].classList.add('active');
            mainIndicators[index].classList.add('active');
        }

        function nextMainSlide() {
            mainCurrentIndex = (mainCurrentIndex + 1) % mainItems.length;
            showMainSlide(mainCurrentIndex);
        }

        function prevMainSlide() {
            mainCurrentIndex = (mainCurrentIndex - 1 + mainItems.length) % mainItems.length;
            showMainSlide(mainCurrentIndex);
        }

        // Set up main carousel controls
        if (mainPrevButton) {
            mainPrevButton.addEventListener('click', () => {
                prevMainSlide();
                resetMainInterval();
            });
        }

        if (mainNextButton) {
            mainNextButton.addEventListener('click', () => {
                nextMainSlide();
                resetMainInterval();
            });
        }

        // Set up main carousel indicators
        mainIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                mainCurrentIndex = index;
                showMainSlide(mainCurrentIndex);
                resetMainInterval();
            });
        });

        function resetMainInterval() {
            clearInterval(mainIntervalId);
            startMainInterval();
        }

        function startMainInterval() {
            mainIntervalId = setInterval(nextMainSlide, 5000);
        }

        // Start main carousel
        startMainInterval();
    }

    // Initialize News Slider
    if (newsSlider && newsItems.length > 0) {
        function slideNews(direction) {
            if (direction === 'next') {
                newsCurrentIndex = Math.min(newsCurrentIndex + 1, newsItems.length - 1);
            } else {
                newsCurrentIndex = Math.max(newsCurrentIndex - 1, 0);
            }
            
            newsSlider.style.transform = `translateX(-${newsCurrentIndex * newsItemWidth}px)`;
            updateNewsButtons();
        }

        function updateNewsButtons() {
            if (newsPrevButton) {
                newsPrevButton.style.display = newsCurrentIndex === 0 ? 'none' : 'block';
            }
            if (newsNextButton) {
                newsNextButton.style.display = 
                    newsCurrentIndex >= newsItems.length - 1 ? 'none' : 'block';
            }
        }

        // Set up news slider controls
        if (newsPrevButton) {
            newsPrevButton.addEventListener('click', () => slideNews('prev'));
        }

        if (newsNextButton) {
            newsNextButton.addEventListener('click', () => slideNews('next'));
        }

        // Initialize news slider state
        updateNewsButtons();
    }

    // Category button functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCategories = document.querySelectorAll('.product-category');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            productCategories.forEach(productCategory => {
                if (productCategory.getAttribute('data-category') === category) {
                    productCategory.classList.add('active');
                } else {
                    productCategory.classList.remove('active');
                }
            });
        });
    });

    // Modal zoom controls
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const modalImg = document.getElementById('modalImage');
    const modal = document.getElementById('newsModal');

    if (zoomInBtn && zoomOutBtn) {
        zoomInBtn.addEventListener('click', () => zoom(0.2));
        zoomOutBtn.addEventListener('click', () => zoom(-0.2));
    }

    if (modalImg) {
        modalImg.addEventListener('wheel', function(e) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.2 : 0.2;
            zoom(delta);
        });

        modalImg.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        modalImg.addEventListener('touchstart', handleTouchStart);
        modalImg.addEventListener('touchmove', handleTouchMove);
        modalImg.addEventListener('touchend', handleTouchEnd);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeNewsModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeNewsModal();
    });
});

// Mouse event handlers
function startDragging(e) {
    if (scale <= 1) return;
    isDragging = true;
    startPos = {
        x: e.clientX - currentPos.x,
        y: e.clientY - currentPos.y
    };
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentPos = {
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
    };
    updateImageTransform();
}

function stopDragging() {
    isDragging = false;
}

// Touch event handlers
let lastTouchDistance = 0;

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        if (scale <= 1) return;
        isDragging = true;
        startPos = {
            x: e.touches[0].clientX - currentPos.x,
            y: e.touches[0].clientY - currentPos.y
        };
    } else if (e.touches.length === 2) {
        lastTouchDistance = getTouchDistance(e.touches);
    }
}

function handleTouchMove(e) {
    e.preventDefault();

    if (e.touches.length === 1 && isDragging) {
        currentPos = {
            x: e.touches[0].clientX - startPos.x,
            y: e.touches[0].clientY - startPos.y
        };
        updateImageTransform();
    } else if (e.touches.length === 2) {
        const currentDistance = getTouchDistance(e.touches);
        const delta = (currentDistance - lastTouchDistance) * 0.01;
        lastTouchDistance = currentDistance;
        zoom(delta);
    }
}

function handleTouchEnd() {
    isDragging = false;
    lastTouchDistance = 0;
}

function getTouchDistance(touches) {
    return Math.hypot(
        touches[1].clientX - touches[0].clientX,
        touches[1].clientY - touches[0].clientY
    );
}

// Make functions globally available
window.openNewsModal = openNewsModal;
window.closeNewsModal = closeNewsModal;

