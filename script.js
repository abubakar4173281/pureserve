// PureServe Restaurant Water Solutions - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ====== SET CURRENT YEAR IN FOOTER ======
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // ====== MOBILE NAVIGATION ======
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger to X
        const bars = mobileToggle.querySelectorAll('.bar');
        if (mobileNav.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger icon
        const bars = mobileToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
    
    // Event Listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // ====== SMOOTH SCROLLING ======
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active state
                allNavLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Calculate scroll position (accounting for fixed header)
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====== ACTIVE NAVIGATION ON SCROLL ======
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        let currentSectionId = '';
        let maxVisibleArea = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            
            if (visibleHeight > maxVisibleArea && visibleHeight > 0) {
                maxVisibleArea = visibleHeight;
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial call
    updateActiveNav();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // ====== BACK TO TOP BUTTON ======
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleBackToTop();
    
    // Update on scroll
    window.addEventListener('scroll', toggleBackToTop);
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ====== CONTACT FORM VALIDATION ======
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const restaurant = document.getElementById('restaurant').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Simple validation
        if (!name) {
            showError('name', 'Please enter your name');
            isValid = false;
        }
        
        if (!restaurant) {
            showError('restaurant', 'Please enter your restaurant name');
            isValid = false;
        }
        
        if (!phone) {
            showError('phone', 'Please enter your phone number');
            isValid = false;
        }
        
        if (email && !isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // If form is valid
        if (isValid) {
            // In a real application, you would send data to a server here
            console.log('Form submitted:', { name, restaurant, phone, email, message });
            
            // Show success message
            formSuccess.style.display = 'flex';
            contactForm.reset();
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
    
    // Helper function for email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show error (simple version)
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.style.borderColor = 'var(--error)';
        
        // Create error message element if it doesn't exist
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error)';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        
        // Remove error on input
        field.addEventListener('input', function() {
            this.style.borderColor = '';
            if (errorElement) {
                errorElement.textContent = '';
            }
        }, { once: true });
    }
    
    // ====== ANIMATION ON SCROLL ======
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .benefit-card, .portfolio-item, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements with opacity 0
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .portfolio-item, .step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial animation check
    animateOnScroll();
    
    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // ====== CTA BUTTON EFFECTS ======
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ====== SERVICE CARDS HOVER EFFECT ======
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // ====== INITIALIZE EVERYTHING ======
    console.log('PureServe website loaded successfully!');
    console.log('Restaurant Water Solutions - Professional Branding Service');
    
});