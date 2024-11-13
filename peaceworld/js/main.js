import { Carousel } from './components/carousel.js';
import { MobileMenu } from './components/mobileMenu.js';
import { ProductGrid } from './components/productGrid.js';
import * as helpers from './utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new MobileMenu();
    
    if (document.querySelector('.carousel')) {
        new Carousel();
    }
    
    if (document.querySelector('.products-grid')) {
        new ProductGrid();
    }
}); 