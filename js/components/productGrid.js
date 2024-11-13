export class ProductGrid {
    constructor() {
        this.cart = [];
        this.init();
    }

    init() {
        this.setupCategoryFilters();
        this.setupAddToCartButtons();
    }

    setupCategoryFilters() {
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => this.filterProducts(button));
        });
    }

    // ... rest of product grid methods
} 