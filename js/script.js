// Lista de livros
const books = [
    'Adão e Eva',
    'A Criação do Mundo',
    'A Verdadeira Páscoa',
    'A Vida de Jesus',
    'Arca de Noé',
    'Colorindo com Jesus',
    'Jesus o Verdadeiro Sentido da Páscoa',
    'Mulheres da Bíblia',
    'Jesus Acalma a Tempestade',
    'Onde o Céu Toca o Papel',
];

// Depoimentos
const testimonials = [
    { name: 'Maria Silva', text: 'Excelente material! Meus filhos adoram e aprendem muito sobre a Bíblia.' },
    { name: 'João Santos', text: 'Perfeito para usar na escola dominical. As crianças ficam encantadas!' },
    { name: 'Ana Costa', text: 'Qualidade incrível e preço justo. Recomendo para todas as famílias cristãs.' },
    { name: 'Pedro Oliveira', text: 'Material completo e bem organizado. Superou minhas expectativas!' },
    { name: 'Carla Souza', text: 'Os desenhos são lindos e as crianças aprendem enquanto se divertem.' },
    { name: 'Roberto Lima', text: 'Vale muito a pena! Já usei em várias atividades com as crianças.' },
    { name: 'Fernanda Alves', text: 'Acesso imediato e material de alta qualidade. Recomendo!' }
];

// Função para criar carrossel de livros
function createBooksGrid() {
    const booksCarousel = document.getElementById('books-carousel');
    if (!booksCarousel) {
        console.error('Elemento books-carousel não encontrado!');
        return;
    }

    // Array com as imagens disponíveis
    const bookImages = [
        'capa.png',
        'capa1.png',
        'capa2.png',
        'capa3.png',
        'capa4.png',
        'capa5.png',
        'capa6.jpg',
        'capa7.png',
        'capa8.png',
        'capa9.png',
    ];

    // Limpa o carrossel antes de adicionar
    booksCarousel.innerHTML = '';

    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-carousel-item';
        
        // Reutiliza as imagens em ciclo
        const imageIndex = index % bookImages.length;
        const imagePath = `images/${bookImages[imageIndex]}`;
        
        bookItem.innerHTML = `
            <div class="book-card">
                <div class="card border-0 shadow-sm h-100">
                    <img src="${imagePath}" 
                         alt="${book}" 
                         class="card-img-top"
                         loading="lazy"
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=${encodeURIComponent(book)}'">
                    <div class="card-body p-3">
                        <h6 class="card-title mb-0 text-center fw-bold">${book}</h6>
                    </div>
                </div>
            </div>
        `;
        
        booksCarousel.appendChild(bookItem);
    });
    
    // Inicializa o carrossel
    initCarousel();
}

// Variáveis do carrossel
let carouselPosition = 0;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// Função para inicializar o carrossel
function initCarousel() {
    const carousel = document.getElementById('books-carousel');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // Botões de navegação
    prevBtn.addEventListener('click', () => {
        scrollCarousel('prev');
    });
    
    nextBtn.addEventListener('click', () => {
        scrollCarousel('next');
    });
    
    // Funcionalidade de arrastar
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events para mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - carousel.offsetLeft;
        touchScrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - touchStartX) * 2;
        carousel.scrollLeft = touchScrollLeft - walk;
    });
    
    // Atualiza botões baseado na posição após um pequeno delay
    setTimeout(() => {
        updateCarouselButtons();
    }, 100);
    
    carousel.addEventListener('scroll', () => {
        updateCarouselButtons();
    });
    
    // Atualiza botões quando a janela é redimensionada
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateCarouselButtons();
        }, 100);
    });
}

// Função para rolar o carrossel
function scrollCarousel(direction) {
    const carousel = document.getElementById('books-carousel');
    if (!carousel) return;
    
    const itemWidth = carousel.querySelector('.book-carousel-item').offsetWidth + 24; // width + gap
    const scrollAmount = itemWidth * 2; // Rola 2 itens por vez
    
    if (direction === 'next') {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Função para atualizar visibilidade dos botões
function updateCarouselButtons() {
    const carousel = document.getElementById('books-carousel');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // Verifica se chegou ao início
    if (carousel.scrollLeft <= 10) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.pointerEvents = 'none';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
    }
    
    // Verifica se chegou ao fim
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 10) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.pointerEvents = 'none';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
    }
}

// Função para criar carrossel de depoimentos
function createTestimonialsGrid() {
    const testimonialsCarousel = document.getElementById('testimonials-carousel');
    if (!testimonialsCarousel) {
        console.error('Elemento testimonials-carousel não encontrado!');
        return;
    }

    // Limpa o carrossel antes de adicionar
    testimonialsCarousel.innerHTML = '';

    testimonials.forEach((testimonial) => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'testimonial-carousel-item';
        
        testimonialItem.innerHTML = `
            <div class="testimonial-card fade-in">
                <div class="stars mb-3">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
                <p class="mb-3">"${testimonial.text}"</p>
                <p class="mb-0 fw-bold text-muted">- ${testimonial.name}</p>
            </div>
        `;
        
        testimonialsCarousel.appendChild(testimonialItem);
    });
    
    // Inicializa o carrossel de depoimentos
    initTestimonialsCarousel();
}

// Variáveis do carrossel de depoimentos
let isDraggingTestimonials = false;
let startXTestimonials = 0;
let scrollLeftTestimonials = 0;

// Função para inicializar o carrossel de depoimentos
function initTestimonialsCarousel() {
    const carousel = document.getElementById('testimonials-carousel');
    const prevBtn = document.querySelector('.testimonials-prev');
    const nextBtn = document.querySelector('.testimonials-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // Botões de navegação
    prevBtn.addEventListener('click', () => {
        scrollTestimonialsCarousel('prev');
    });
    
    nextBtn.addEventListener('click', () => {
        scrollTestimonialsCarousel('next');
    });
    
    // Funcionalidade de arrastar
    carousel.addEventListener('mousedown', (e) => {
        isDraggingTestimonials = true;
        startXTestimonials = e.pageX - carousel.offsetLeft;
        scrollLeftTestimonials = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDraggingTestimonials = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDraggingTestimonials = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDraggingTestimonials) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startXTestimonials) * 2;
        carousel.scrollLeft = scrollLeftTestimonials - walk;
    });
    
    // Touch events para mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - carousel.offsetLeft;
        touchScrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - touchStartX) * 2;
        carousel.scrollLeft = touchScrollLeft - walk;
    });
    
    // Ajusta posição inicial no mobile
    if (window.innerWidth <= 576) {
        setTimeout(() => {
            carousel.scrollLeft = 0;
        }, 100);
    }
    
    // Atualiza botões baseado na posição
    setTimeout(() => {
        updateTestimonialsCarouselButtons();
    }, 100);
    
    carousel.addEventListener('scroll', () => {
        updateTestimonialsCarouselButtons();
    });
    
    // Atualiza botões quando a janela é redimensionada
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateTestimonialsCarouselButtons();
            if (window.innerWidth <= 576) {
                carousel.scrollLeft = 0;
            }
        }, 100);
    });
}

// Função para rolar o carrossel de depoimentos
function scrollTestimonialsCarousel(direction) {
    const carousel = document.getElementById('testimonials-carousel');
    if (!carousel) return;
    
    const itemWidth = carousel.querySelector('.testimonial-carousel-item').offsetWidth + 24; // width + gap
    const scrollAmount = itemWidth * 1.5; // Rola 1.5 itens por vez
    
    if (direction === 'next') {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Função para atualizar visibilidade dos botões do carrossel de depoimentos
function updateTestimonialsCarouselButtons() {
    const carousel = document.getElementById('testimonials-carousel');
    const prevBtn = document.querySelector('.testimonials-prev');
    const nextBtn = document.querySelector('.testimonials-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // Verifica se chegou ao início
    if (carousel.scrollLeft <= 10) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.pointerEvents = 'none';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
    }
    
    // Verifica se chegou ao fim
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 10) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.pointerEvents = 'none';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
    }
}

// Função para lidar com compra
function handlePurchase(packageType) {
    // URLs de checkout
    const checkoutUrls = {
        'basico': 'https://pay.cakto.com.br/cs8hm45_643992',
        'premium': 'https://pay.cakto.com.br/sdogn2m_644191'
    };
    
    // Redireciona para o checkout correspondente
    if (checkoutUrls[packageType]) {
        window.location.href = checkoutUrls[packageType];
    } else {
        console.error('Tipo de pacote inválido:', packageType);
    }
}

// Função para animação ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .animated');
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.remove('animated');
        }
    });
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {    
    // Aguarda um pouco para garantir que o DOM está totalmente renderizado
    setTimeout(function() {
        createBooksGrid();
        createTestimonialsGrid();
        
        // Adiciona animação apenas aos elementos específicos (não aos cards da seção why e do carrossel)
        // Aguarda um pouco mais para garantir que os elementos foram criados
        setTimeout(function() {
            const fadeElements = document.querySelectorAll('.testimonial-card, .offers-section .card');
            fadeElements.forEach((el, index) => {
                el.classList.add('animated');
                el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            });
            
            // Anima ao scroll
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Chama uma vez no carregamento
        }, 300);
    }, 100);
});

// Smooth scroll para links âncora
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

