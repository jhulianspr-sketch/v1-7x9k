// ===== JAVASCRIPT CYBERPUNK - PARCHE DIGITAL =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== FONDO 3D HACKER =====
    initHacker3DScene();
    
    // ===== EFECTO CURSOR PERSONALIZADO =====
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

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

    // ===== EFECTO PARALLAX EN HERO =====
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            
            heroContent.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // ===== NAVEGACIÓN SUAVE =====
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // ===== ANIMACIÓN DE ENTRADA PARA TARJETAS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar tarjetas de posts
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observar tarjetas de categorías
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ===== FILTRO DE CATEGORÍAS =====
    const categoryFilterButtons = document.querySelectorAll('.category-card');
    const allPostCards = document.querySelectorAll('.post-card');

    categoryFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remover clase activa de todos los botones
            categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar posts
            allPostCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== EFECTO TYPING EN HERO TITLE =====
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

    // ===== EFECTO GLow DINÁMICO =====
    const neonElements = document.querySelectorAll('.neon-text, .glow-text');
    
    neonElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 1s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // ===== SCROLL REVELATOR =====
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ===== CONTADOR ANIMADO PARA ESTADÍSTICAS (si se agregan) =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // ===== EFECTO MATRIX BACKGROUND (opcional) =====
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px monospace';
            
            for(let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        // Commented out para no sobrecargar, se puede activar
        // setInterval(drawMatrix, 35);
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // ===== EFECTO PARTICLES (opcional) =====
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
        
        for(let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#00ffff';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Inicializar efectos
    createParticles();

    // ===== DETECCIÓN DE DISPOSITIVO =====
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // ===== OPTIMIZACIÓN PARA MÓVILES =====
    if (isMobile()) {
        // Reducir efectos en móviles para mejor rendimiento
        const cursor = document.querySelector('.cursor-glow');
        if (cursor) cursor.remove();
        
        // Remover animaciones pesadas
        document.querySelectorAll('.floating-card').forEach(card => {
            card.style.transition = 'all 0.3s ease';
        });
    }

    // ===== PRELOAD DE IMÁGENES =====
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
            }
        });
    }

    preloadImages();

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.log('Error en JavaScript:', e.error);
    });

    // ===== INTERACTIVIDAD DEL MENÚ DROPDOWN ===== */
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Efecto de entrada suave
        dropdown.addEventListener('mouseenter', function() {
            menu.style.animation = 'dropdownSlideIn 0.3s ease-out';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            menu.style.animation = 'dropdownSlideOut 0.3s ease-in';
        });
        
        // Efecto de clic para móviles
        if (window.innerWidth <= 768) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const isVisible = menu.style.display === 'block';
                
                // Cerrar otros dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.display = 'none';
                    }
                });
                
                menu.style.display = isVisible ? 'none' : 'block';
            });
        }
        
        // Resaltar post actual si está en la página
        const currentPath = window.location.pathname;
        const dropdownItems = menu.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            const itemPath = item.getAttribute('href');
            if (currentPath.includes(itemPath)) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== ANIMACIONES CSS PARA DROPDOWN ===== */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dropdownSlideIn {
            from {
                opacity: 0;
                transform: translateY(-10px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes dropdownSlideOut {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(-10px) scale(0.95);
            }
        }
        
        @keyframes dropdownGlow {
            0%, 100% {
                box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
            }
            50% {
                box-shadow: 0 10px 40px rgba(0, 255, 255, 0.4);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== CERRAR DROPDOWN AL HACER CLIC FUERA ===== */
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (window.innerWidth > 768) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                }
            });
        }
    });
    
    // ===== EFECTO DE ONDA EN ITEMS DEL DROPDOWN ===== */
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // ===== FONDO 3D HACKER =====
function initHacker3DScene() {
    // Crear contenedor 3D
    const scene = document.createElement('div');
    scene.className = 'hacker-3d-scene';
    document.body.appendChild(scene);
    
    // Datos para elementos 3D
    const hackerData = {
        code: [
            'function hack() {',
            '  const data = [];',
            '  return matrix;',
            '}',
            'class Hacker {',
            '  constructor() {',
            '    this.matrix = [];',
            '  }',
            '}',
            'if (system.access) {',
            '  execute();',
            '}',
            'while (true) {',
            '  process();',
            '}'
        ],
        binary: ['10101010', '11001100', '00110011', '11110000', '00001111', '01010101'],
        matrix: ['0x4A', '0x7F', '0x33', '0x88', '0xCC', '0x55', '0xAA', '0xFF'],
        data: ['[DATA]', '[PACKET]', '[STREAM]', '[BUFFER]', '[CACHE]', '[STACK]']
    };
    
    // Crear elementos 3D flotantes
    function createHackerElements() {
        const types = ['code', 'binary', 'matrix', 'data'];
        const totalElements = 15;
        
        for (let i = 0; i < totalElements; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            const dataArray = hackerData[type];
            const text = dataArray[Math.floor(Math.random() * dataArray.length)];
            
            const element = document.createElement('div');
            element.className = `hacker-element ${type}`;
            element.textContent = text;
            
            // Posición aleatoria
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.top = Math.random() * window.innerHeight + 'px';
            
            // Animación aleatoria
            const animations = ['float-3d', 'float-3d-reverse', 'rotate-3d'];
            const animation = animations[Math.floor(Math.random() * animations.length)];
            element.style.animation = `${animation} ${15 + Math.random() * 10}s infinite linear`;
            
            // Retraso aleatorio
            element.style.animationDelay = Math.random() * 5 + 's';
            
            scene.appendChild(element);
        }
    }
    
    // Crear partículas de datos
    function createDataParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            
            // Posición aleatoria
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            
            // Animación con retardo
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            scene.appendChild(particle);
        }
    }
    
    // Crear líneas de conexión
    function createConnectionLines() {
        const lineCount = 8;
        
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'connection-line';
            
            // Posición y tamaño aleatorios
            const x1 = Math.random() * window.innerWidth;
            const y1 = Math.random() * window.innerHeight;
            const x2 = Math.random() * window.innerWidth;
            const y2 = Math.random() * window.innerHeight;
            
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            line.style.left = x1 + 'px';
            line.style.top = y1 + 'px';
            line.style.width = length + 'px';
            line.style.transform = `rotate(${angle}deg)`;
            
            // Animación con retardo
            line.style.animationDelay = Math.random() * 2 + 's';
            
            scene.appendChild(line);
        }
    }
    
    // Crear cubos 3D
    function createHackerCubes() {
        const cubeCount = 5;
        
        for (let i = 0; i < cubeCount; i++) {
            const cube = document.createElement('div');
            cube.className = 'hacker-cube';
            
            // Crear 6 caras del cubo
            const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
            faces.forEach(face => {
                const faceDiv = document.createElement('div');
                faceDiv.className = `cube-face ${face}`;
                cube.appendChild(faceDiv);
            });
            
            // Posición aleatoria
            cube.style.left = Math.random() * window.innerWidth + 'px';
            cube.style.top = Math.random() * window.innerHeight + 'px';
            
            // Animación con retardo
            cube.style.animationDelay = Math.random() * 5 + 's';
            
            scene.appendChild(cube);
        }
    }
    
    // Crear efecto Matrix
    function createMatrixRain() {
        const rainCount = 10;
        
        for (let i = 0; i < rainCount; i++) {
            const rain = document.createElement('div');
            rain.className = 'matrix-rain';
            
            // Texto aleatorio
            const matrixChars = '01';
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
            }
            rain.innerHTML = text;
            
            // Posición aleatoria
            rain.style.left = Math.random() * window.innerWidth + 'px';
            rain.style.top = '-100px';
            
            // Animación con retardo
            rain.style.animationDelay = Math.random() * 8 + 's';
            
            scene.appendChild(rain);
        }
    }
    
    // Inicializar todos los elementos
    createHackerElements();
    createDataParticles();
    createConnectionLines();
    createHackerCubes();
    createMatrixRain();
    
    // Actualizar elementos en resize
    window.addEventListener('resize', () => {
        // Limpiar y recrear elementos para nuevas dimensiones
        scene.innerHTML = '';
        createHackerElements();
        createDataParticles();
        createConnectionLines();
        createHackerCubes();
        createMatrixRain();
    });
    
    // Efecto parallax 3D con el mouse
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        scene.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    
    console.log('%c🌐 Escena 3D Hacker inicializada', 'color: #00ccff; font-size: 12px;');
}

// ===== TOGGLE MODO OSCURO/CLARO =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle tema al hacer click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Animación de rotación
            themeToggle.classList.add('rotating');
            
            // Cambiar tema
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Actualizar icono
            setTimeout(() => {
                updateThemeIcon(newTheme);
                themeToggle.classList.remove('rotating');
            }, 300);
            
            // Efecto de transición suave
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            
            // Console message
            const themeName = newTheme === 'dark' ? 'Oscuro' : 'Claro';
            console.log(`%c🌓 Tema cambiado a modo ${themeName}`, `color: ${newTheme === 'dark' ? '#00ffff' : '#0066cc'}; font-size: 14px;`);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.textContent = '🌙';
                themeIcon.className = 'theme-icon moon';
            } else {
                themeIcon.textContent = '☀️';
                themeIcon.className = 'theme-icon sun';
            }
        }
    }
    
    // Detectar preferencia del sistema (opcional)
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', systemTheme);
            updateThemeIcon(systemTheme);
        }
    });
}

// ===== MENÚ DESLIZANTE VERTICAL =====
function initSlidingMenu() {
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const slidingMenu = document.getElementById('slidingMenu');
    const closeSlidingMenuBtn = document.getElementById('closeSlidingMenuBtn');
    const slidingMenuOverlay = document.getElementById('slidingMenuOverlay');
    const slidingNavLinks = document.querySelectorAll('.sliding-nav-link');
    
    // Toggle menú deslizante
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => {
            toggleSlidingMenu();
        });
    }
    
    // Cerrar menú con botón X
    if (closeSlidingMenuBtn) {
        closeSlidingMenuBtn.addEventListener('click', () => {
            closeSlidingMenu();
        });
    }
    
    // Cerrar menú con overlay
    if (slidingMenuOverlay) {
        slidingMenuOverlay.addEventListener('click', () => {
            closeSlidingMenu();
        });
    }
    
    // Cerrar menú al hacer click en enlaces
    slidingNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeSlidingMenu();
            // Actualizar enlace activo
            slidingNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    function toggleSlidingMenu() {
        if (slidingMenu && slidingMenuOverlay && menuToggleBtn) {
            const isOpen = slidingMenu.classList.contains('active');
            
            if (isOpen) {
                closeSlidingMenu();
            } else {
                openSlidingMenu();
            }
        }
    }
    
    function openSlidingMenu() {
        if (slidingMenu && slidingMenuOverlay && menuToggleBtn) {
            slidingMenu.classList.add('active');
            slidingMenuOverlay.classList.add('active');
            
            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';
            
            // Efecto de apertura
            addSlidingMenuOpenEffect();
        }
    }
    
    function closeSlidingMenu() {
        if (slidingMenu && slidingMenuOverlay && menuToggleBtn) {
            slidingMenu.classList.remove('active');
            slidingMenuOverlay.classList.remove('active');
            
            // Restaurar scroll del body
            document.body.style.overflow = '';
            
            // Efecto de cierre
            addSlidingMenuCloseEffect();
        }
    }
    
    function addSlidingMenuOpenEffect() {
        if (slidingMenu) {
            slidingMenu.style.animation = 'slidingMenuOpen 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }
    
    function addSlidingMenuCloseEffect() {
        if (slidingMenu) {
            slidingMenu.style.animation = 'slidingMenuClose 0.3s ease-in';
        }
    }
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && slidingMenu.classList.contains('active')) {
            closeSlidingMenu();
        }
    });
}

// ===== MANEJO DE FORMULARIO DE CONTACTO (SIN BACKEND) =====
function initContactForm() {
    const contactForm = document.querySelector('.terminal-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const terminalContent = contactForm.querySelector('.terminal-content');
            
            // Obtener datos del formulario
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                message: contactForm.querySelector('#message').value
            };
            
            // Mostrar estado de carga
            submitBtn.disabled = true;
            submitBtn.textContent = 'ENVIANDO...';
            
            // Simular envío (sin backend)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                addTerminalMessage('Sistema: Iniciando protocolo de envío...', 'system');
                setTimeout(() => {
                    addTerminalMessage('Sistema: Validando datos...', 'system');
                    setTimeout(() => {
                        addTerminalMessage('Sistema: Encriptando mensaje...', 'system');
                        setTimeout(() => {
                            addTerminalMessage('Sistema: Mensaje recibido correctamente', 'success');
                            addTerminalMessage(`Nombre: ${formData.name}`, 'info');
                            addTerminalMessage(`Email: ${formData.email}`, 'info');
                            addTerminalMessage('Estado: Almacenado localmente', 'info');
                            addTerminalMessage('Sistema: Gracias por contactarnos', 'success');
                            
                            // Resetear formulario
                            contactForm.reset();
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'ENVIAR MENSAJE';
                        }, 500);
                    }, 500);
                }, 500);
            }, 1000);
            
            function addTerminalMessage(message, type = 'info') {
                const messageLine = document.createElement('div');
                messageLine.className = `terminal-message ${type}`;
                messageLine.textContent = message;
                terminalContent.appendChild(messageLine);
                
                // Scroll al último mensaje
                terminalContent.scrollTop = terminalContent.scrollHeight;
                
                // Limitar mensajes
                const messages = terminalContent.querySelectorAll('.terminal-message');
                if (messages.length > 10) {
                    messages[0].remove();
                }
            }
        });
    }

// ===== FUNCIÓN PARA MOSTRAR MENSAJES EN EL TERMINAL =====
function showTerminalMessage(message, type = 'info') {
    const terminalContent = document.querySelector('.terminal-content');
    const terminalFooter = document.querySelector('.terminal-footer');
    
    if (!terminalContent || !terminalFooter) return;
    
    // Crear nueva línea de mensaje
        const messageLine = document.createElement('div');
        messageLine.className = 'terminal-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = 'root@parchedigital:~$ ';
        
        const output = document.createElement('span');
        output.className = 'terminal-output';
        
        if (type === 'error') {
            output.style.color = '#ff5f56';
            output.textContent = `ERROR: ${message}`;
        } else if (type === 'success') {
            output.style.color = '#27c93f';
            output.textContent = `SUCCESS: ${message}`;
        } else {
            output.textContent = message;
        }
        
        messageLine.appendChild(prompt);
        messageLine.appendChild(output);
        
        // Insertar antes del footer
        terminalContent.insertBefore(messageLine, terminalFooter);
        
        // Animación de entrada
        messageLine.style.opacity = '0';
        messageLine.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            messageLine.style.transition = 'all 0.3s ease';
            messageLine.style.opacity = '1';
            messageLine.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto-scroll al último mensaje
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    // Inicializar toggle de tema
    initThemeToggle();
    
    // Inicializar menú deslizante
    initSlidingMenu();
    
    // Inicializar formulario de contacto
    initContactForm();

    console.log('Parche Digital - Blog Cyberpunk cargado exitosamente');
    console.log('%c� Menú deslizante activo', 'color: #00ff41; font-size: 12px;');
    console.log('%c🌓 Toggle tema oscuro/claro activo', 'color: #ffaa00; font-size: 12px;');
    console.log('%c📧 Formulario de contacto (modo local)', 'color: #00bcd4; font-size: 12px;');
});
