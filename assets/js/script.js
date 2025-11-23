// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// ==========================================
// FORM VALIDATION (Client-side)
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Check if fields are empty
        if (name === '' || email === '' || message === '') {
            e.preventDefault();
            alert('Please fill in all fields');
            return false;
        }
        
        // Validate name length
        if (name.length < 2) {
            e.preventDefault();
            alert('Name must be at least 2 characters long');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address');
            return false;
        }
        
        // Validate message length
        if (message.length < 10) {
            e.preventDefault();
            alert('Message must be at least 10 characters long');
            return false;
        }
        
        // If all validations pass, form will submit to PHP
    });
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature-card, .pricing-card, .info-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements with opacity 0
document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('.feature-card, .pricing-card, .info-card');
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check on page load

// ==========================================
// DISPLAY ERROR MESSAGES (if any from PHP)
// ==========================================
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    
    if (error) {
        alert('Error: ' + decodeURIComponent(error));
    }
});

// ==========================================
// TYPING EFFECT FOR HERO TITLE (Optional)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const gradientText = document.querySelector('.gradient-text');
    
    if (gradientText) {
        const text = gradientText.textContent;
        gradientText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                gradientText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});