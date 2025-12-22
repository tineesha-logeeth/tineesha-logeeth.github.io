// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Christmas Music Toggle
    const musicToggle = document.getElementById('music-toggle');
    const christmasMusic = document.getElementById('christmas-music');
    
    if (musicToggle && christmasMusic) {
        // Check if music was previously muted (stored in localStorage)
        const wasMuted = localStorage.getItem('musicMuted') === 'true';
        
        if (wasMuted) {
            christmasMusic.muted = true;
            musicToggle.classList.add('muted');
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            christmasMusic.muted = false;
            musicToggle.classList.remove('muted');
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        
        // Toggle music on button click
        musicToggle.addEventListener('click', function () {
            if (christmasMusic.muted) {
                christmasMusic.muted = false;
                musicToggle.classList.remove('muted');
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                localStorage.setItem('musicMuted', 'false');
            } else {
                christmasMusic.muted = true;
                musicToggle.classList.add('muted');
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                localStorage.setItem('musicMuted', 'true');
            }
        });
    }
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Toggle body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });


    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });


    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'hsla(202, 94%, 7%, 0.41)3c';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.backgroundColor = 'hsla(202, 94%, 7%, 0.41)3c';
            navbar.style.padding = '1.2rem 0';
        }
    });

    // Typing effect for hero section
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ['Creative Designer', 'Video Editor', 'Content Creator'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 500;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay);
        }
    }

    // Start typing effect on page load
    if (textArray.length) setTimeout(type, newTextDelay + 50);

    // Animate skill bars when they come into view
    const skillSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');

    // Initially set width to 0 for animation
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        bar.dataset.width = width;
    });

    // Intersection Observer for skill bars animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
            }
        });
    }, { threshold: 0.5 });

    if (skillSection) {
        observer.observe(skillSection);
    }

    // Animate statistics counter
    const statItems = document.querySelectorAll('.stat-number');

    function animateCounter(element, target, prefix) {
        let count = 0;
        const duration = 2000; // Duration in milliseconds
        const increment = target / (duration / 16); // 16ms per frame for 60fps

        const updateCount = () => {
            count += increment;
            if (count < target) {
                element.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = `${target}${prefix}`;
            }
        };

        updateCount();
    }

    // Intersection Observer for statistics counter
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statItems.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    const prefix = stat.getAttribute('finish-prefix') || "";
                    animateCounter(stat, target, prefix);
                });
                statsObserver.disconnect(); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }

    // Form submission handling - Send to WhatsApp
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple form validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const subjectInput = this.querySelector('input[type="text"]');
            const messageInput = this.querySelector('textarea');

            let isValid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameInput);
            }

            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailInput);
            }

            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'Please enter a subject');
                isValid = false;
            } else {
                removeError(subjectInput);
            }

            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                removeError(messageInput);
            }

            if (isValid) {
                // Format message for WhatsApp
                const name = nameInput.value;
                const email = emailInput.value;
                const subject = subjectInput.value;
                const message = messageInput.value;

                // Create formatted WhatsApp message
                const whatsappMessage = `*New Message from Contact Form*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
                
                // Encode message for URL
                const encodedMessage = encodeURIComponent(whatsappMessage);
                
                // Your WhatsApp number (formatted without spaces or +)
                const whatsappNumber = '94781674288';
                
                // Create WhatsApp URL
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                
                // Show feedback
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
                submitBtn.disabled = true;

                // Open WhatsApp in new tab
                setTimeout(() => {
                    window.open(whatsappURL, '_blank');
                    
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Ready!';
                    submitBtn.style.backgroundColor = '#25d366';

                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                        this.reset();
                    }, 2000);
                }, 500);
            }
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff6b6b';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        input.style.borderColor = '#ff6b6b';
    }

    // Remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            errorElement.remove();
        }

        input.style.borderColor = '';
    }

    // Project card click functionality - make entire card clickable
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Find the link within the card
            const link = this.querySelector('.project-links a');
            if (link && !e.target.closest('a')) {
                // Only open if we didn't click on an interactive element
                link.click();
            }
        });
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach((element, index) => {
        // Set random initial position and animation delay
        element.style.animationDelay = `${index * 0.5}s`;
    });

    // Add scroll reveal animation for elements
    function checkScroll() {
        const elements = document.querySelectorAll('[data-aos]');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);

            if (isVisible) {
                element.classList.add('aos-animate');
            }
        });
    }

    // Initial check on load
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});

const month = new Date().getMonth(); // 0 = Jan, 11 = Dec

if (new Date().toLocaleString('en-US', { month: 'short' }) === 'Dec') {
particlesJS("particles-js", {"particles":{"number":{"value":70,"density":{"enable":true,"value_area":789.1476416322727}},"color":{"value":"#fff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#ffffffff"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":10,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.4,"width":2},"move":{"enable":true,"speed":3,"direction":"bottom","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"window","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},"bubble":{"distance":400,"size":4,"duration":0.3,"opacity":1,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
}