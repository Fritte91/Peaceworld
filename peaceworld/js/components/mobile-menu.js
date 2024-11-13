document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    menuIcon.addEventListener('click', function() {
        this.classList.toggle('change');
        navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('change');
            navMenu.classList.remove('active');
        });
    });
}); 