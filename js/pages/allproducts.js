// Product Data
const products = [
    // Flower Category
    {
        id: 1,
        name: "Purple Haze",
        category: "flower",
        price: 750,
        description: "A classic sativa-dominant hybrid with sweet and earthy flavors. Known for its euphoric and creative effects.",
        images: ["../images/strains/bud1.png", "../images/strains/bud2.png", "../images/strains/bud3.png"]
    },
    {
        id: 2,
        name: "OG Kush",
        category: "flower",
        price: 800,
        description: "A potent indica-dominant hybrid with a piney aroma. Perfect for relaxation and stress relief.",
        images: ["../images/strains/bud2.png", "../images/strains/bud3.png", "../images/strains/bud4.png"]
    },
    {
        id: 3,
        name: "Blue Dream",
        category: "flower",
        price: 700,
        description: "A balanced hybrid with sweet berry flavors. Offers full-body relaxation with gentle cerebral invigoration.",
        images: ["../images/strains/bud3.png", "../images/strains/bud4.png", "../images/strains/bud5.png"]
    },
    {
        id: 4,
        name: "Sour Diesel",
        category: "flower",
        price: 850,
        description: "Energetic and dreamy cerebral effects. Fast-acting strain that delivers energizing, dreamy effects.",
        images: ["../images/strains/bud4.png", "../images/strains/bud5.png", "../images/strains/bud1.png"]
    },
    {
        id: 5,
        name: "Northern Lights",
        category: "flower",
        price: 780,
        description: "Pure indica strain with relaxing effects. Sweet and spicy aromas with a smooth finish.",
        images: ["../images/strains/bud5.png", "../images/strains/bud1.png", "../images/strains/bud2.png"]
    },

    // Bongs Category
    {
        id: 6,
        name: "Glass Beaker Bong",
        category: "bongs",
        price: 1200,
        description: "Classic beaker-style glass water pipe with ice catcher. Made from high-quality borosilicate glass.",
        images: ["../images/bongs/Daco_4118695.png"]
    },
    {
        id: 7,
        name: "Percolator Bong",
        category: "bongs",
        price: 1500,
        description: "Advanced percolator system for smooth hits. Multiple chambers for optimal filtration.",
        images: ["../images/bongs/Daco_2759734.png"]
    },
    {
        id: 8,
        name: "Mini Bong",
        category: "bongs",
        price: 800,
        description: "Compact and portable glass water pipe. Perfect for on-the-go use.",
        images: ["../images/bongs/Daco_165051.png"]
    },

    // Art Category
    {
        id: 9,
        name: "Psychedelic Canvas",
        category: "art",
        price: 2500,
        description: "Vibrant psychedelic art print on premium canvas. Limited edition artwork.",
        images: ["../images/art/art1.jpeg"]
    },
    {
        id: 10,
        name: "Cannabis Wall Art",
        category: "art",
        price: 1800,
        description: "Cannabis-inspired wall art piece. High-quality print on premium materials.",
        images: ["../images/art/art3.jpeg"]
    },

    // Merchandise Category
    {
        id: 11,
        name: "Peace World T-Shirt",
        category: "merchandise",
        price: 599,
        description: "Premium cotton t-shirt with Peace World logo. Comfortable fit with high-quality print.",
        images: ["../images/merchandise/shirt2.jpg"],
        variants: {
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: [
                { name: "Black", code: "#000000" },
                { name: "White", code: "#FFFFFF" },
                { name: "Green", code: "#00FF00" },
                { name: "Grey", code: "#808080" }
            ]
        }
    },
    {
        id: 12,
        name: "Peace World Hoodie",
        category: "merchandise",
        price: 999,
        description: "Comfortable hoodie with embroidered logo. Perfect for cool evenings.",
        images: ["../images/merchandise/shirt3.jpg"],
        variants: {
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: [
                { name: "Black", code: "#000000" },
                { name: "Grey", code: "#808080" },
                { name: "Dark Green", code: "#006400" }
            ]
        }
    },
    {
        id: 13,
        name: "Peace World Cap",
        category: "merchandise",
        price: 399,
        description: "Adjustable cap with embroidered logo. One size fits most.",
        images: ["../images/merchandise/shorts1.jpg"]
    }
];

// DOM Elements
const productsContainer = document.querySelector('.products-container');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartIcon = document.querySelector('.shopping-cart-icon');
const cartModal = document.querySelector('.shopping-cart-modal');
const productModal = document.querySelector('.product-modal');
const cartItemsContainer = document.querySelector('.cart-items-container');
const cartCount = document.querySelector('.cart-count');
const cartTotalDisplay = document.querySelector('.cart-total');
const clearCartBtn = document.querySelector('.clear-cart-btn');

// State
let cart = [];
let selectedSize = null;
let selectedColor = null;

// Helper Functions
function wrapWithLoadingContainer(imgSrc, imgAlt, additionalClasses = '') {
    return `
        <div class="image-container">
            <div class="loading-spinner"></div>
            <img 
                class="product-image ${additionalClasses}"
                src="${imgSrc}" 
                alt="${imgAlt}"
                loading="lazy"
                onload="this.parentElement.classList.add('image-loaded')"
                onerror="handleImageError(this)"
            >
        </div>
    `;
}

function handleImageError(img) {
    img.onerror = null;
    img.src = '../images/placeholder.png';
    img.parentElement.classList.add('image-loaded');
}

// Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    selectedSize = null;
    selectedColor = null;

    const variantSection = product.category === 'merchandise' && product.variants ? `
        <div class="product-variants">
            <div class="size-selection">
                <h3>Select Size</h3>
                <div class="size-options">
                    ${product.variants.sizes.map(size => `
                        <button class="size-btn" data-size="${size}">${size}</button>
                    `).join('')}
                </div>
            </div>
            <div class="color-selection">
                <h3>Select Color</h3>
                <div class="color-options">
                    ${product.variants.colors.map(color => `
                        <button class="color-btn" 
                                data-color="${color.name}"
                                style="background-color: ${color.code}">
                            <span class="color-name">${color.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    ` : '';

    const modalContent = productModal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <button class="close-modal" onclick="closeProductModal()">
            <i class="fas fa-times"></i>
        </button>
        <div class="modal-gallery">
            <div class="main-image">
                ${wrapWithLoadingContainer(product.images[0], product.name)}
            </div>
            <div class="thumbnail-strip">
                ${product.images.map((img, index) => `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" 
                         onclick="changeModalImage('${img}', this)">
                        ${wrapWithLoadingContainer(img, product.name)}
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="modal-info">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <div class="product-price">฿${product.price}</div>
            ${variantSection}
            <div class="product-actions">
                <button class="add-to-list" onclick="addToCart(${product.id})">
                    Add to List
                </button>
            </div>
        </div>
    `;

    if (product.category === 'merchandise' && product.variants) {
        setupVariantSelectors();
    }

    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeModalImage(imgSrc, thumbnailElement) {
    const mainImage = productModal.querySelector('.main-image');
    mainImage.innerHTML = wrapWithLoadingContainer(imgSrc, 'Product Image');

    const thumbnails = productModal.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
}

function setupVariantSelectors() {
    const sizeBtns = productModal.querySelectorAll('.size-btn');
    const colorBtns = productModal.querySelectorAll('.color-btn');

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.dataset.size;
        });
    });

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedColor = btn.dataset.color;
        });
    });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cartItem = {
        ...product,
        quantity: 1
    };

    if (product.category === 'merchandise' && product.variants) {
        if (!selectedSize || !selectedColor) {
            alert('Please select size and color');
            return;
        }
        cartItem.selectedSize = selectedSize;
        cartItem.selectedColor = selectedColor;
    }

    const existingItem = cart.find(item => {
        if (item.id === productId) {
            if (product.category === 'merchandise') {
                return item.selectedSize === selectedSize && 
                       item.selectedColor === selectedColor;
            }
            return true;
        }
        return false;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    updateCartDisplay();
    closeProductModal();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

// Render Functions
function renderProducts(productsToRender) {
    productsContainer.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="card-image">
                ${wrapWithLoadingContainer(product.images[0], product.name)}
                <div class="card-overlay">
                    <button class="view-details-btn" onclick="openProductModal(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
            <div class="card-info">
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 50)}...</p>
                <span class="price">฿${product.price}</span>
            </div>
        </div>
    `).join('');
}

function updateCartDisplay() {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalDisplay.textContent = `Total: ฿${total}`;

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <img src="${item.images[0]}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">
                        ${item.name}
                        ${item.selectedSize ? ` - ${item.selectedSize}` : ''}
                        ${item.selectedColor ? ` - ${item.selectedColor}` : ''}
                    </div>
                    <div class="cart-item-price">฿${item.price}</div>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Event Listeners
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        
        renderProducts(filteredProducts);
    });
});

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

document.querySelector('.close-cart-modal').addEventListener('click', () => {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

clearCartBtn.addEventListener('click', clearCart);

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (event.target === productModal) {
        closeProductModal();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCartDisplay();
});

