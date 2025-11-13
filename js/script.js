// ===================================
// BIMARCH - SCRIPT.JS FINAL
// Todas as animações e interações funcionando
// ===================================

(function() {
    'use strict';
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== MOBILE HEADER (PERFORMANCE OPTIMIZED) =====
    let headerTicking = false;
    window.addEventListener('scroll', function() {
        if (!headerTicking) {
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
                headerTicking = false;
            });
            headerTicking = true;
        }
    });
    
    // ===== DOMCONTENTLOADED - INICIALIZAÇÃO =====
    document.addEventListener('DOMContentLoaded', function() {
        
        console.log('🚀 Bimarch: Inicializando...');
        
        // ===== TABS FUNCTIONALITY (VERSÃO ROBUSTA) =====
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        console.log('📑 Tabs encontrados:', {
            botoes: tabBtns.length,
            conteudos: tabContents.length
        });
        
        if (tabBtns.length > 0 && tabContents.length > 0) {
            
            // Função para trocar tabs
            function switchTab(targetId) {
                console.log('🔄 Trocando para:', targetId);
                
                // Remover active de todos
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none'; // Forçar esconder
                });
                
                // Adicionar active no botão clicado
                const clickedButton = document.querySelector(`[data-tab="${targetId}"]`);
                if (clickedButton) {
                    clickedButton.classList.add('active');
                }
                
                // Mostrar conteúdo correspondente
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = 'block'; // Forçar mostrar
                    
                    // Animação suave
                    targetContent.style.opacity = '0';
                    targetContent.style.transform = 'translateY(20px)';
                    
                    requestAnimationFrame(() => {
                        targetContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        targetContent.style.opacity = '1';
                        targetContent.style.transform = 'translateY(0)';
                    });
                    
                    console.log('✅ Tab ativado:', targetId);
                } else {
                    console.error('❌ Conteúdo não encontrado:', targetId);
                }
            }
            
            // Event listeners nos botões
            tabBtns.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('data-tab');
                    console.log('🖱️ Botão clicado:', targetId);
                    switchTab(targetId);
                });
            });
            
            // Garantir que o primeiro tab esteja visível
            const firstTab = document.querySelector('.tab-content.active');
            if (firstTab) {
                firstTab.style.display = 'block';
                firstTab.style.opacity = '1';
                firstTab.style.transform = 'translateY(0)';
            }
            
            console.log('✅ Tabs inicializados com sucesso!');
        } else {
            console.warn('⚠️ Tabs não encontrados no DOM');
        }
        
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
                submitBtn.style.opacity = '0.7';
                
                // Coletar dados
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
                    submitBtn.style.opacity = '1';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                })
                .catch((error) => {
                    // Erro
                    submitBtn.textContent = '✗ Erro';
                    submitBtn.style.backgroundColor = '#f44336';
                    submitBtn.style.opacity = '1';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                    
                    console.error('Erro:', error);
                });
            });
            
            console.log('✅ Formulário inicializado');
        }
        
        // ===== INTERSECTION OBSERVER (SCROLL ANIMATIONS) =====
        const animatedElements = document.querySelectorAll(
            '.section-header, .definition-box, .component-item, .comparison-item, ' +
            '.stat-highlight, .benefit-item, .application-visual-item, ' +
            '.advantages-box, .esg-item, .ecosystem-diagram, .eco-component, ' +
            '.use-case-item, .case-study-item, .timeline-item, .roi-chart, ' +
            '.roi-details, .next-steps-item, .conclusion-content, .vision-box, ' +
            '.cta-box, .contact-item, .contact-form, .fade-in'
        );
        
        if (animatedElements.length > 0) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            animatedElements.forEach(element => {
                // Estado inicial
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(element);
            });
            
            console.log('✅ Animações de scroll inicializadas:', animatedElements.length, 'elementos');
        }
        
        // ===== LAZY LOADING IMAGES =====
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
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
            console.log('✅ Lazy loading inicializado:', images.length, 'imagens');
        }
        
        // ===== VIDEO PAUSE WHEN NOT VISIBLE =====
        const videos = document.querySelectorAll('video');
        if (videos.length > 0) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.play().catch(e => console.log('Video play prevented:', e));
                    } else {
                        entry.target.pause();
                    }
                });
            }, { threshold: 0.5 });
            
            videos.forEach(video => videoObserver.observe(video));
            console.log('✅ Video observer inicializado:', videos.length, 'vídeos');
        }
        
        console.log('✅ Bimarch: Inicialização completa!');
    });
    
    // ===== PARALLAX EFFECT (HERO SECTION) =====
    let parallaxTicking = false;
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            window.requestAnimationFrame(function() {
                const hero = document.getElementById('hero');
                if (hero) {
                    const scrollPosition = window.scrollY;
                    hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });
    
    // ===== ACCESSIBILITY: SKIP NAVIGATION =====
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
            document.body.classList.add('reduce-motion');
            console.log('⚠️ Conexão lenta detectada - animações reduzidas');
        }
    }
    
    // ===== RESPECT PREFERS-REDUCED-MOTION =====
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
        console.log('♿ Preferência de movimento reduzido detectada');
    }
    
    // ===== LOADING INDICATOR =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        console.log('✅ Página carregada completamente');
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
    
})();

console.log('📄 Bimarch script.js carregado');
