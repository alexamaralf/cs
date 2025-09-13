document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // Carousel
    const carousel = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoplayInterval;

    function updateSlide(index) {
        carousel.style.transform = `translateX(-${index * 33.333}%)`;
        
        // Atualiza indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
            indicator.setAttribute('aria-selected', i === index);
        });

        // Atualiza atributos ARIA
        slides.forEach((slide, i) => {
            slide.setAttribute('aria-hidden', i !== index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        updateSlide((currentSlide + 1) % slideCount);
    }

    function prevSlide() {
        updateSlide((currentSlide - 1 + slideCount) % slideCount);
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlide(index);
            resetAutoplay();
        });
    });

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Pausa no hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', startAutoplay);

    // Inicia o carousel
    startAutoplay();

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Menu hamburguer mobile
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuWrapper = document.querySelector('.menu-wrapper');
    
    // Função para abrir o menu mobile
    function openMobileMenu() {
        mobileNav.style.display = 'flex';
        setTimeout(() => {
            mobileNav.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
        }, 10);
    }

    // Função para fechar o menu mobile
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        setTimeout(() => {
            mobileNav.style.display = 'none';
        }, 300);
    }

    // Toggle do menu mobile
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        if (!isExpanded) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });

    // Fecha menu mobile ao clicar em link
    document.querySelectorAll('.mobile-nav a, .simple-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Se for um link para a mesma página com âncora
            if (link.getAttribute('href').includes('#') && !link.getAttribute('href').startsWith('http')) {
                const targetId = link.getAttribute('href').split('#')[1];
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    const yOffset = -100; // Ajuste conforme necessário
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }
            }
            
            // Fecha o menu mobile se estiver aberto
            if (window.innerWidth <= 900) {
                closeMobileMenu();
            }
        });
    });

    // Efeito de scroll no menu
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            menuWrapper.classList.add('scrolled');
        } else {
            menuWrapper.classList.remove('scrolled');
        }
    });

    // Removido botão Voltar ao Topo

    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para enviar o formulário
            // Por exemplo, usando fetch para enviar para um servidor
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Por enquanto, apenas mostra um alerta
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset();
        });
    }
});