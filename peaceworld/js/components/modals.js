class NewsModal {
    constructor() {
        this.modal = null;
        this.image = null;
        this.scale = 1;
        this.isDragging = false;
        this.startPos = { x: 0, y: 0 };
        this.currentPos = { x: 0, y: 0 };
        this.init();
    }

    init() {
        // Create modal HTML
        const modalHTML = `
            <div class="news-modal">
                <span class="news-modal-close">&times;</span>
                <img class="news-modal-content">
                <div class="zoom-controls">
                    <button class="zoom-btn zoom-in">+</button>
                    <button class="zoom-btn zoom-out">-</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Get elements
        this.modal = document.querySelector('.news-modal');
        this.image = this.modal.querySelector('.news-modal-content');

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close button
        this.modal.querySelector('.news-modal-close').onclick = () => this.close();

        // Zoom controls
        this.modal.querySelector('.zoom-in').onclick = () => this.zoom(0.1);
        this.modal.querySelector('.zoom-out').onclick = () => this.zoom(-0.1);

        // Dragging
        this.image.addEventListener('mousedown', (e) => this.startDragging(e));
        window.addEventListener('mousemove', (e) => this.drag(e));
        window.addEventListener('mouseup', () => this.stopDragging());

        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        // Mouse wheel zoom
        this.modal.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            this.zoom(delta);
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.close();
            }
        });
    }

    open(imgElement) {
        this.image.src = imgElement.src;
        this.modal.style.display = 'block';
        this.reset();
    }

    close() {
        this.modal.style.display = 'none';
        this.reset();
    }

    reset() {
        this.scale = 1;
        this.currentPos = { x: 0, y: 0 };
        this.updateImageTransform();
    }

    zoom(delta) {
        this.scale = Math.min(Math.max(1, this.scale + delta), 3);
        this.updateImageTransform();
    }

    startDragging(e) {
        if (this.scale > 1) {
            this.isDragging = true;
            this.startPos = {
                x: e.clientX - this.currentPos.x,
                y: e.clientY - this.currentPos.y
            };
        }
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        this.currentPos = {
            x: e.clientX - this.startPos.x,
            y: e.clientY - this.startPos.y
        };
        this.updateImageTransform();
    }

    stopDragging() {
        this.isDragging = false;
    }

    updateImageTransform() {
        this.image.style.transform = `translate(${this.currentPos.x}px, ${this.currentPos.y}px) scale(${this.scale})`;
    }
}

// Initialize modal
const newsModal = new NewsModal();

// Make it globally available
window.openNewsModal = function(imgElement) {
    newsModal.open(imgElement);
};
