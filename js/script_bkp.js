// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile header with performance optimization
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const header = document.querySelector('header');
            const mobileHeader = document.querySelector('.mobile-header');
            
            if (header && mobileHeader) {
                if (window.scrollY > 100) {
                    header.style.display = 'none';
                    mobileHeader.style.transform = 'translateY(0)';
                } else {
                    header.style.display = 'block';
                    mobileHeader.style.transform = 'translateY(-100%)';
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});

// DOMContentLoaded - Inicialização
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TABS FUNCTIONALITY =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
    
    // ===== FORM SUBMISSION (NETLIFY FORMS) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Feedback visual
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Coletar dados do formulário
            const formData = new FormData(contactForm);
            
            // Enviar via Netlify Forms
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Sucesso
                submitBtn.textContent = '✓ Enviado!';
                submitBtn.style.backgroundColor = '#4CAF50';
                contactForm.reset();
                
                // Resetar botão após 3 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            })
            .catch((error) => {
                // Erro
                submitBtn.textContent = '✗ Erro ao enviar';
                submitBtn.style.backgroundColor = '#f44336';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
                
                console.error('Erro:', error);
            });
        });
    }
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const animatedElements = document.querySelectorAll(
        '.section-header, .definition-box, .component-item, .comparison-item, ' +
        '.stat-highlight, .benefit-item, .tab-btn, .tab-content, ' +
        '.application-visual-item, .advantages-box, .esg-item, ' +
        '.ecosystem-diagram, .eco-component, .use-case-item, ' +
        '.case-study-item, .timeline-item, .roi-chart, .roi-details, ' +
        '.next-steps-item, .conclusion-content, .vision-box, .cta-box, ' +
        '.contact-item, .contact-form, .fade-in'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // ===== LAZY LOADING IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== VIDEO PAUSE WHEN NOT VISIBLE =====
    const videos = document.querySelectorAll('video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videos.forEach(video => videoObserver.observe(video));
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
let parallaxTicking = false;
window.addEventListener('scroll', function() {
    if (!parallaxTicking) {
        window.requestAnimationFrame(function() {
            const hero = document.getElementById('hero');
            const scrollPosition = window.scrollY;
            
            if (hero) {
                hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// ===== SKIP NAVIGATION (ACCESSIBILITY) =====
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Pular para o conteúdo principal';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===== DETECT SLOW CONNECTION =====
if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        // Disable animations on slow connections
        document.body.classList.add('reduce-motion');
    }
}

// ===== RESPECT PREFERS-REDUCED-MOTION =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
}

// ===== LOADING INDICATOR =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===== RIPPLE EFFECT ON BUTTONS =====
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .btn')) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        e.target.appendChild(ripple);
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    }
});
