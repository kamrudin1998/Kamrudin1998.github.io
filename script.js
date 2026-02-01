// ============================================
// STEP TOWARDS HEAVEN - CUSTOM JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============ PRELOADER ============
    setupPreloader();

    // ============ SMOOTH SCROLLING ============
    setupSmoothScroll();

    // ============ NAVBAR SCROLL EFFECT ============
    setupNavbarScroll();

    // ============ FORM HANDLING ============
    setupFormHandling();

    // ============ WHATSAPP INTEGRATION ============
    setupWhatsAppButtons();

    // ============ BOOK NOW BUTTONS ============
    setupBookNowButtons();

    // ============ SCROLL ANIMATIONS ============
    setupScrollAnimations();

    // ============ GALLERY LIGHTBOX ============
    setupGalleryLightbox();

    // ============ NAVBAR COLLAPSE ON LINK CLICK ============
    setupNavbarCollapse();

    // ============ SCROLL TO TOP ============
    setupScrollTop();
});

// ============ PRELOADER ============
function setupPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 500);
        });
    }
}

// ============ SMOOTH SCROLL FUNCTION ============
function setupSmoothScroll() {
    document.querySelectorAll('.smooth-scroll').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============ NAVBAR SCROLL EFFECT ============
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============ FORM HANDLING ============
function setupFormHandling() {
    const form = document.getElementById('bookingForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                package: document.getElementById('package').value,
                travelers: document.getElementById('travelers').value,
                dates: document.getElementById('dates').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!validateForm(formData)) {
                return;
            }

            // Send to WhatsApp
            sendToWhatsApp(formData);

            // Reset form
            form.reset();

            // Show success message
            showAlert('Thank you! We will contact you shortly.', 'success');
        });
    }
}

// ============ FORM VALIDATION ============
function validateForm(data) {
    if (!data.name || !data.email || !data.phone || !data.package || !data.travelers || !data.dates) {
        showAlert('Please fill in all required fields!', 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('Please enter a valid email address!', 'error');
        return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    const phoneOnly = data.phone.replace(/\D/g, '');
    if (!phoneRegex.test(phoneOnly)) {
        showAlert('Please enter a valid 10-digit phone number!', 'error');
        return false;
    }

    return true;
}

// ============ SEND TO WHATSAPP ============
function sendToWhatsApp(data) {
    const phone = '+917006250086'; // Replace with actual WhatsApp number

    const message = `Hi Step Towards Heaven! 👋\n\n` +
        `I would like to book the ${data.package}.\n\n` +
        `Personal Details:\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Number of Travelers: ${data.travelers}\n` +
        `Preferred Dates: ${data.dates}\n\n` +
        `Special Requests:\n${data.message || 'None'}\n\n` +
        `Looking forward to hearing from you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}

// ============ WHATSAPP BUTTON SETUP ============
function setupWhatsAppButtons() {
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const packageName = this.getAttribute('data-package');
            const phone = '917006250086'; // Replace with actual WhatsApp number

            const message = `Hi Step Towards Heaven! I'm interested in the ${packageName}. Can you provide more details?`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
        });
    });
}

// ============ BOOK NOW BUTTON SETUP ============
function setupBookNowButtons() {
    document.querySelectorAll('.book-now-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const packageName = this.getAttribute('data-package');
            const selectElement = document.getElementById('package');
            
            // Scroll to form
            scrollToForm();

            // Set select value
            if (selectElement) {
                // Try to find the option with the text or value
                for (let i = 0; i < selectElement.options.length; i++) {
                    if (selectElement.options[i].value === packageName) {
                        selectElement.selectedIndex = i;
                        // Highlight the field
                        selectElement.focus();
                        selectElement.parentElement.classList.add('highlight-input');
                        setTimeout(() => {
                            selectElement.parentElement.classList.remove('highlight-input');
                        }, 2000);
                        break;
                    }
                }
            }
        });
    });
}

// ============ SCROLL ANIMATIONS & COUNTERS ============
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                    // Unobserve after starting animation
                    observer.unobserve(entry.target);
                } else {
                    entry.target.classList.add('animated');
                }
            }
        });
    }, observerOptions);

    // Add scroll-animate class to elements
    document.querySelectorAll('.feature-box, .why-us-card, .testimonial-card, .package-card').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Observe counters
    document.querySelectorAll('.counter').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = 20; // Update every 20ms
    const totalSteps = duration / step;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target + "+"; // Add + only if desirable, removed for exactness: target
            clearInterval(timer);
        } else {
            counter.textContent = Math.ceil(current);
        }
    }, step);
}

// ============ GALLERY LIGHTBOX ============
function setupGalleryLightbox() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function (e) {
            const img = this.querySelector('img');
            const imgSrc = img.src;
            const imgAlt = img.alt;

            // Create lightbox
            createLightbox(imgSrc, imgAlt);
        });
    });
}

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
        </div>
    `;

    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
    `;

    const img = content.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 10px;
        max-height: 85vh;
    `;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('mouseenter', function () {
        this.style.color = '#25d366';
    });

    closeBtn.addEventListener('mouseleave', function () {
        this.style.color = 'white';
    });

    // Close lightbox
    closeBtn.addEventListener('click', function () {
        lightbox.remove();
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === this) {
            this.remove();
        }
    });

    document.body.appendChild(lightbox);
}

// ============ NAVBAR COLLAPSE ============
function setupNavbarCollapse() {
    const navlinks = document.querySelectorAll('.navbar-collapse a');
    const navbarToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navlinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navbarCollapse.classList.contains('show')) {
                // Use Bootstrap's collapse instance if available, or just click toggle
                navbarToggle.click();
            }
        });
    });
}

// ============ SCROLL TO FORM ============
function scrollToForm() {
    const contactSection = document.getElementById('contact');
    const headerOffset = 80;
    const elementPosition = contactSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// ============ SCROLL TO TOP ============
function setupScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============ SHOW ALERT ============
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
    }, 5000);
}

// ============ ACTIVE NAV LINK ON SCROLL ============
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

// Call the function
updateActiveNavLink();

// ============ LAZY LOAD IMAGES ============
function setupLazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ============ COOKIE CONSENT ============
function setupCookieConsent() {
    const consentKey = 'kashmir-website-consent';
    const consent = localStorage.getItem(consentKey);

    if (!consent) {
        const cookieNotice = document.createElement('div');
        cookieNotice.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            color: white;
            padding: 20px;
            text-align: center;
            z-index: 9998;
            backdrop-filter: blur(5px);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        `;

        cookieNotice.innerHTML = `
            <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <p style="margin: 0;">We use cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.</p>
                <button id="acceptCookie" class="btn btn-sm btn-primary px-4">Accept</button>
            </div>
        `;

        document.body.appendChild(cookieNotice);

        document.getElementById('acceptCookie').addEventListener('click', () => {
            localStorage.setItem(consentKey, 'true');
            cookieNotice.style.opacity = '0';
            setTimeout(() => cookieNotice.remove(), 300);
        });
    }
}

// Initialize lazy loading and cookie consent
setupLazyLoadImages();
setupCookieConsent();

// ============ LOGO CONSOLE ============
console.log('%c🏔️ Step Towards Heaven - Kashmir Tours', 'color: #2563eb; font-size: 18px; font-weight: bold;');
console.log('%cPremium Kashmir Travel Experience', 'color: #666; font-size: 14px;');
