class AgeVerification {
    constructor() {
        // Get modal elements
        this.modal = document.getElementById('ageVerificationModal');
        this.verifyBtn = document.getElementById('verifyAge');
        this.rejectBtn = document.getElementById('rejectAge');
        
        // Check if user has already verified age
        if (!this.hasVerifiedAge()) {
            this.showModal();
            this.initializeEventListeners();
        } else {
            this.hideModal();
        }
    }

    hasVerifiedAge() {
        return localStorage.getItem('ageVerified') === 'true';
    }

    showModal() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    verifyAge() {
        localStorage.setItem('ageVerified', 'true');
        this.hideModal();
    }

    rejectAge() {
        window.location.href = 'https://www.google.com';
    }

    initializeEventListeners() {
        if (this.verifyBtn) {
            this.verifyBtn.addEventListener('click', () => {
                this.verifyAge();
            });
        }

        if (this.rejectBtn) {
            this.rejectBtn.addEventListener('click', () => {
                this.rejectAge();
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const ageVerification = new AgeVerification();
}); 