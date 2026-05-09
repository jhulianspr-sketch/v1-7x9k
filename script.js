// ===== JAVASCRIPT CYBERPUNK - PARCHE DIGITAL =====

// ===== SISTEMA DARK MODE FUNCIONAL =====
function initThemeSystem() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    let currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }

        if (themeIcon) {
            if (theme === 'light') {
                themeIcon.textContent = '☀️';
                themeIcon.className = 'theme-icon sun';
            } else {
                themeIcon.textContent = '🌙';
                themeIcon.className = 'theme-icon moon';
            }
        }

        localStorage.setItem('theme', theme);
    }

    setTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();

            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(currentTheme);
        });
    }
}

// ===== INICIAR SISTEMA =====
initThemeSystem();

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function () {

    // ===== CURSOR PERSONALIZADO =====
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // ===== PARALLAX HERO =====
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;

            heroContent.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // ===== SCROLL SUAVE =====
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== OBSERVER =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const postCards = document.querySelectorAll('.post-card');

    postCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;

        observer.observe(card);
    });

    // ===== EFECTO TYPING =====
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
        const text = heroTitle.textContent;

        heroTitle.textContent = '';

        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;

                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 500);
    }

    // ===== HEADER EFFECT =====
    const header = document.querySelector('.header');

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll) {
            header.classList.add('scroll-down');
            header.classList.remove('scroll-up');
        } else {
            header.classList.add('scroll-up');
            header.classList.remove('scroll-down');
        }

        lastScroll = currentScroll;
    });

    // ===== PARTÍCULAS =====
    function createParticles() {

        const particlesContainer = document.createElement('div');

        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';

        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 40; i++) {

            const particle = document.createElement('div');

            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.borderRadius = '50%';
            particle.style.background = '#00ffff';

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            particle.style.opacity = Math.random();

            particle.style.animation = `float ${10 + Math.random() * 10}s linear infinite`;

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    
    // ===== FONDO HACKER =====
    initHacker3DScene();
    
    // ===== CONTACTO 3D =====
    initContactForm3D();

});

// ===== FORMULARIO DE CONTACTO 3D =====
function initContactForm3D() {
    const form = document.getElementById('contactForm3D');
    const messageField = document.getElementById('messageField');
    
    if (!form || !messageField) return;
    
    // Efecto al escribir en el campo
    messageField.addEventListener('input', function() {
        const value = this.value;
        const length = value.length;
        
        // Efecto de pulso basado en la longitud
        if (length > 0) {
            this.style.boxShadow = `
                0 15px 35px rgba(102, 126, 234, ${0.2 + (length * 0.01)}),
                0 0 50px rgba(102, 126, 234, ${0.1 + (length * 0.005)})
            `;
        }
    });
    
    // Efecto al enviar formulario por correo
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn-3d');
        const btnText = submitBtn.querySelector('.btn-text-3d');
        const successLogo = document.getElementById('successLogo');
        const message = messageField.value.trim();
        
        if (!message) {
            // Mostrar error si no hay mensaje
            messageField.style.borderColor = '#ff5f56';
            messageField.focus();
            return;
        }
        
        // Animación de envío
        btnText.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.95)';
        
        // Preparar correo electrónico
        const emailSubject = encodeURIComponent('Nuevo mensaje desde Parche Digital');
        const emailBody = encodeURIComponent(`📩 *Nuevo mensaje desde Parche Digital*\n\n${message}\n\n---\n*Enviado desde el formulario de contacto*`);
        const emailAddress = 'jhuliansjoseb@gmail.com';
        const mailtoUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;
        
        // Enviar correo
        setTimeout(() => {
            // Crear enlace de correo y hacer clic
            const link = document.createElement('a');
            link.href = mailtoUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Mostrar logo de éxito
            successLogo.classList.add('show');
            
            // Resetear formulario
            form.reset();
            btnText.textContent = 'ENVIAR POR CORREO';
            submitBtn.disabled = false;
            submitBtn.style.transform = '';
            submitBtn.style.background = '';
            messageField.style.borderColor = '';
            
            // Ocultar logo de éxito después de 4 segundos
            setTimeout(() => {
                successLogo.classList.remove('show');
            }, 4000);
        }, 1500);
    });
    
    // Efecto hover avanzado para el botón
    const submitBtn = form.querySelector('.submit-btn-3d');
    submitBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotateX(5deg) scale(1.02)';
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    // Limpiar error al escribir
    messageField.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '';
        }
    });
}

// ===== ESCENA HACKER =====
function initHacker3DScene() {

    const scene = document.createElement('div');

    scene.className = 'hacker-3d-scene';

    document.body.appendChild(scene);

    // ===== ELEMENTOS =====
    function createElements() {

        const texts = [
            '0x4A',
            'ACCESS',
            'SYSTEM',
            'HACK',
            'DATA',
            '010101',
            'function()',
            'const x = 1;',
            '[PACKET]',
            '[BUFFER]'
        ];

        for (let i = 0; i < 15; i++) {

            const element = document.createElement('div');

            element.className = 'hacker-element';

            element.textContent =
                texts[Math.floor(Math.random() * texts.length)];

            element.style.position = 'absolute';

            element.style.left =
                Math.random() * window.innerWidth + 'px';

            element.style.top =
                Math.random() * window.innerHeight + 'px';

            element.style.opacity = '0.5';

            element.style.animation =
                `float ${10 + Math.random() * 10}s linear infinite`;

            scene.appendChild(element);
        }
    }

    // ===== LÍNEAS =====
    function createConnectionLines() {

        for (let i = 0; i < 8; i++) {

            const line = document.createElement('div');

            line.className = 'connection-line';

            const x1 = Math.random() * window.innerWidth;
            const y1 = Math.random() * window.innerHeight;

            const x2 = Math.random() * window.innerWidth;
            const y2 = Math.random() * window.innerHeight;

            const length =
                Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

            const angle =
                Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

            line.style.position = 'absolute';
            line.style.height = '1px';
            line.style.background = 'rgba(0,255,255,0.3)';

            line.style.left = x1 + 'px';
            line.style.top = y1 + 'px';

            line.style.width = length + 'px';

            line.style.transform =
                `rotate(${angle}deg)`;

            scene.appendChild(line);
        }
    }

    createElements();
    createConnectionLines();

    // ===== RESIZE =====
    window.addEventListener('resize', () => {

        scene.innerHTML = '';

        createElements();
        createConnectionLines();
    });
}
