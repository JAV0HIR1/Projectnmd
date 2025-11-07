// ===========================
// Navigation & Mobile Menu
// ===========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelector('.nav-buttons');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navButtons.classList.remove('active');
    });
});

// ===========================
// Active Navigation on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Course Category Filter
// ===========================
const categoryButtons = document.querySelectorAll('.category-btn');
const courseCards = document.querySelectorAll('.course-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        // Filter courses
        courseCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===========================
// Animated Counter for Stats
// ===========================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
}

function checkCounterVisibility() {
    if (hasAnimated) return;

    const aboutSection = document.querySelector('.about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (aboutPosition < screenPosition) {
        hasAnimated = true;
        statNumbers.forEach(stat => animateCounter(stat));
    }
}

window.addEventListener('scroll', checkCounterVisibility);

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission (in real application, send to backend)
    setTimeout(() => {
        showMessage('Thank you for contacting us! We will get back to you soon.', 'success');
        contactForm.reset();
    }, 1000);
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===========================
// Scroll to Top Button
// ===========================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Course Enrollment Buttons
// ===========================
const enrollButtons = document.querySelectorAll('.btn-course');

enrollButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const courseCard = e.target.closest('.course-card');
        const courseTitle = courseCard.querySelector('.course-title').textContent;
        
        // Show enrollment confirmation (in real application, redirect to enrollment page)
        alert(`You're about to enroll in: ${courseTitle}\n\nThis would typically redirect you to the enrollment page.`);
    });
});

// ===========================
// Hero CTA Buttons
// ===========================
const heroCTA = document.querySelectorAll('.hero-buttons .btn');

heroCTA.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        
        if (buttonText.includes('Get Started') || buttonText.includes('Sign Up')) {
            // In real application, redirect to signup page
            alert('This would redirect to the sign-up page.');
        } else if (buttonText.includes('Browse Courses')) {
            // Scroll to courses section
            const coursesSection = document.getElementById('courses');
            coursesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================
// Newsletter Form
// ===========================
const newsletterForm = document.querySelector('.footer-newsletter');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate newsletter subscription
        alert(`Thank you for subscribing!\n\nYou'll receive our latest updates at: ${email}`);
        emailInput.value = '';
    });
}

// ===========================
// Add Animation Classes on Scroll
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.course-card, .feature-card, .stat-box, .contact-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===========================
// Login/Signup Button Handlers
// ===========================
const loginBtn = document.querySelector('.nav-buttons .btn-outline');
const signupBtn = document.querySelector('.nav-buttons .btn-primary');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        alert('This would redirect to the login page.');
    });
}

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        alert('This would redirect to the sign-up page.');
    });
}

// ===========================
// Parallax Effect on Hero Section
// ===========================
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (heroSection && scrolled <= window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// Dynamic Year in Footer
// ===========================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
}

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🎓 Welcome to EduLearn! ', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cStart your learning journey today!', 'font-size: 14px; color: #10b981;');

// ===========================
// Initialize on Page Load
// ===========================
window.addEventListener('load', () => {
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Initial check for counter animation
    checkCounterVisibility();
    
    // Initial active nav update
    updateActiveNav();
});