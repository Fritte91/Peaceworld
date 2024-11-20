class ImageModal {
    constructor() {
        this.modal = document.getElementById('newsModal');
        this.modalImg = document.getElementById('modalImage');
        this.closeBtn = document.querySelector('.modal-close');
        this.zoomInBtn = document.querySelector('.zoom-btn.zoom-in');
        this.zoomOutBtn = document.querySelector('.zoom-btn.zoom-out');
        
        this.scale = 1;
        this.isDragging = false;
        this.startPos = { x: 0, y: 0 };
        this.currentPos = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        // Close button
        this.closeBtn.onclick = () => this.closeModal();

        // Zoom controls
        this.zoomInBtn.onclick = () => this.zoom(0.2);
        this.zoomOutBtn.onclick = () => this.zoom(-0.2);

        // Drag functionality
        this.modalImg.addEventListener('mousedown', (e) => this.startDragging(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDragging());

        // Touch events
        this.modalImg.addEventListener('touchstart', (e) => this.startDragging(e));
        document.addEventListener('touchmove', (e) => this.drag(e));
        document.addEventListener('touchend', () => this.stopDragging());

        // Wheel zoom
        this.modal.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY * -0.01;
            this.zoom(delta);
        });

        // Double click to reset
        this.modalImg.addEventListener('dblclick', () => this.reset());
    }

    openModal(img) {
        this.modal.style.display = 'flex';
        this.modalImg.src = img.src;
        
        // Wait for image to load before centering
        this.modalImg.onload = () => {
            this.reset();
            // Ensure image is visible and centered
            this.currentPos = { x: 0, y: 0 };
            this.scale = Math.min(
                window.innerWidth * 0.9 / this.modalImg.naturalWidth,
                window.innerHeight * 0.9 / this.modalImg.naturalHeight,
                1
            );
            this.updateTransform();
        };
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.reset();
    }

    reset() {
        this.scale = 1;
        this.currentPos = { x: 0, y: 0 };
        this.updateTransform();
    }

    zoom(delta) {
        const newScale = this.scale + delta;
        if (newScale >= 0.5 && newScale <= 4) {
            this.scale = newScale;
            this.updateTransform();
        }
    }

    startDragging(e) {
        this.isDragging = true;
        this.modalImg.classList.add('dragging');
        
        const point = e.touches ? e.touches[0] : e;
        this.startPos = {
            x: point.clientX - this.currentPos.x,
            y: point.clientY - this.currentPos.y
        };
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();

        const point = e.touches ? e.touches[0] : e;
        this.currentPos = {
            x: point.clientX - this.startPos.x,
            y: point.clientY - this.startPos.y
        };

        this.updateTransform();
    }

    stopDragging() {
        this.isDragging = false;
        this.modalImg.classList.remove('dragging');
    }

    updateTransform() {
        const transform = `translate(${this.currentPos.x}px, ${this.currentPos.y}px) scale(${this.scale})`;
        this.modalImg.style.transform = transform;
    }
}

// Initialize modal
const imageModal = new ImageModal();

// Update the openNewsModal function
function openNewsModal(img) {
    imageModal.openModal(img);
}

// Update the closeNewsModal function
function closeNewsModal() {
    imageModal.closeModal();
}
