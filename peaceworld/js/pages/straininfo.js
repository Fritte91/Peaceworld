document.addEventListener('DOMContentLoaded', () => {
    const strainGrid = document.getElementById('strainGrid');
    
    // Generate cards for each strain
    strainsData.forEach(strain => {
        strainGrid.innerHTML += createStrainCard(strain);
    });

    // Add click event to entire cards
    const cards = document.querySelectorAll('.strain-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If not clicking the close button, flip the card
            if (!e.target.classList.contains('close-info-btn')) {
                this.classList.toggle('flipped');
            }
        });

        // Add click handler for the close button if it exists
        const closeBtn = card.querySelector('.close-info-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click from triggering
                card.classList.remove('flipped');
            });
        }
    });

    // Keep the existing setupCardListeners function call
    setupCardListeners();
});

function createStrainCard(strain) {
    return `
        <div class="strain-card" data-strain-id="${strain.id}">
            <div class="strain-card-inner">
                <!-- Front of card -->
                <div class="strain-front">
                    <div class="strain-image">
                        <img src="${strain.image}" alt="${strain.name}" loading="lazy">
                    </div>
                    <div class="strain-details">
                        <h2 class="strain-name">${strain.name}</h2>
                        
                        <div class="attributes-section">
                            <div class="attribute-category">
                                <h3>Taste Profile</h3>
                                <div class="attribute-tags">
                                    ${strain.tasteProfile.map(taste => 
                                        `<span class="tag">${taste}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            
                            <div class="attribute-category">
                                <h3>Top Effects</h3>
                                <div class="attribute-tags">
                                    ${strain.effects.map(effect => 
                                        `<span class="tag">${effect}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                        <button class="more-info-btn">More Info</button>
                    </div>
                </div>
                
                <!-- Back of card -->
                <div class="strain-back">
                    <h2 class="strain-name">${strain.name}</h2>
                    <div class="strain-description">
                        <h3>Genetics</h3>
                        <p>${strain.genetics}</p>
                        
                        <h3>Description</h3>
                        <p>${strain.description}</p>
                    </div>
                    
                    <button class="close-info-btn">Close</button>
                </div>
            </div>
        </div>
    `;
}

function setupCardListeners() {
    // More Info button listeners
    document.querySelectorAll('.more-info-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.strain-card');
            card.classList.add('flipped');
        });
    });

    // Close button listeners
    document.querySelectorAll('.close-info-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.strain-card');
            card.classList.remove('flipped');
        });
    });

    // Add error handling for images
    document.querySelectorAll('.strain-image img').forEach(img => {
        img.onerror = function() {
            this.src = 'images/placeholder.png'; // Add a placeholder image
            this.alt = 'Image not available';
        };
    });
}
