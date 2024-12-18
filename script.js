// Função para atualizar o contador do carrinho nos ícones
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const navCartCountElement = document.getElementById('nav-cart-count');
    const fixedCartCountElement = document.getElementById('fixed-cart-count');

    const count = cart.length;
    navCartCountElement.textContent = count > 0 ? count : '';
    fixedCartCountElement.textContent = count > 0 ? count : '';
}

// Função para carregar o carrinho
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-list');
    const checkoutContainer = document.getElementById('checkout-container');

    if (!cartContainer) {
        console.error("Elemento '.cart-list' não encontrado no DOM.");
        return;
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>O seu carrinho está vazio.</p><a href="catalogo.html" class="btn btn-primary">Ir para o Catálogo</a>';
        checkoutContainer.innerHTML = ''; // Remove o botão de "Comprar" se o carrinho estiver vazio
    } else {
        cartContainer.innerHTML = '';
        cart.forEach(productId => {
            const productCard = createProductCard(productId);
            cartContainer.appendChild(productCard);
        });

        // Adiciona o botão de "Comprar" se houver itens no carrinho
        checkoutContainer.innerHTML = `<button class="btn btn-success" onclick="checkout()">Comprar</button>`;
    }
    updateCartCount(); // Atualiza o contador do carrinho
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    updateCartCount(); // Atualiza o contador após adicionar
    loadCart(); // Atualiza a lista do carrinho
    showCustomAlert(); // Exibe alerta de item adicionado ao carrinho
}

// Função para remover do carrinho
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.indexOf(productId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateCartCount(); // Atualiza o contador após remover
    loadCart(); // Atualiza a visualização
}

// Função para criar os cartões dos produtos no carrinho
function createProductCard(productId) {
    const productData = {
        'produto1': { img: 'imagens/frente.webp', ref: 'REF: 001', size: 'Tamanho: G' },
        'produto2': { img: 'imagens/frente.webp', ref: 'REF: 002', size: 'Tamanho: G' },
        'produto3': { img: 'imagens/frente.webp', ref: 'REF: 003', size: 'Tamanho: M' },
        'produto4': { img: 'imagens/frente.webp', ref: 'REF: 004', size: 'Tamanho: P' },
        'produto5': { img: 'imagens/frente.webp', ref: 'REF: 005', size: 'Tamanho: GG' },
        'produto6': { img: 'imagens/frente.webp', ref: 'REF: 006', size: 'Tamanho: G' },
        'produto7': { img: 'imagens/frente.webp', ref: 'REF: 007', size: 'Tamanho: M' },
        'produto8': { img: 'imagens/frente.webp', ref: 'REF: 008', size: 'Tamanho: GG' },
        'produto9': { img: 'imagens/frente.webp', ref: 'REF: 009', size: 'Tamanho: P' },
        'produto10': { img: 'imagens/frente.webp', ref: 'REF: 010', size: 'Tamanho: G' },
        'produto11': { img: 'imagens/frente11.webp', ref: 'REF: 011', size: 'Tamanho: P' },
        'produto12': { img: 'imagens/frente12.webp', ref: 'REF: 012', size: 'Tamanho: G' },
        'produto13': { img: 'imagens/frente13.webp', ref: 'REF: 013', size: 'Tamanho: M' },
        'produto14': { img: 'imagens/frente14.webp', ref: 'REF: 014', size: 'Tamanho: GG' },
        'produto15': { img: 'imagens/frente15.webp', ref: 'REF: 015', size: 'Tamanho: P' },
        'produto16': { img: 'imagens/frente16.webp', ref: 'REF: 016', size: 'Tamanho: G' },
        'produto17': { img: 'imagens/frente17.webp', ref: 'REF: 017', size: 'Tamanho: GG' },
        'produto18': { img: 'imagens/frente18.webp', ref: 'REF: 018', size: 'Tamanho: P' },
        'produto19': { img: 'imagens/frente19.webp', ref: 'REF: 019', size: 'Tamanho: G' },
        'produto20': { img: 'imagens/frente20.webp', ref: 'REF: 020', size: 'Tamanho: GG' }
    };

    const card = document.createElement('div');
    card.classList.add('card', 'my-2');
    card.innerHTML = `
        <img src="${productData[productId].img}" class="card-img-top" alt="${productId}" />
        <div class="card-body text-center">
            <h5 class="card-title">${productData[productId].ref}</h5>
            <p class="text-muted">${productData[productId].size}</p>
            <button class="btn btn-light" onclick="removeFromCart('${productId}')">Remover do Carrinho</button>
        </div>`;
    return card;
}

// Função para carregar o carrinho na página ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Atualiza o contador ao carregar a página
    loadCart(); // Carrega o carrinho
    
    // Se necessário, pode ser adicionado um evento de clique para ir diretamente para o carrinho
    document.getElementById('cart-icon').addEventListener('click', () => {
        window.location.href = 'carrinho.html'; // Redireciona para a página do carrinho
    });

    // Inicializa o carrossel
    startCarousel();
});

// Função para ir para a página do carrinho
function goToCart() {
    window.location.href = 'carrinho.html'; // Redireciona para a página do carrinho
}

// ALERTA DE ADICIONADO AO CARRINHO
// Exibir o alerta
function showCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    const overlay = document.getElementById('dark-overlay');

    if (alertBox && overlay) {
        alertBox.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        console.error("Elementos do alerta não encontrados no DOM.");
    }
}

// Ocultar o alerta
function hideCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    const overlay = document.getElementById('dark-overlay');

    if (alertBox && overlay) {
        alertBox.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        console.error("Elementos do alerta não encontrados no DOM.");
    }
}

// Continuar comprando
function continueShopping() {
    hideCustomAlert();
}

// Ir para o carrinho
function goToCart() {
    window.location.href = 'carrinho.html';
}

// CARROSEL
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel .slide');
    const carousel = document.querySelector('.carousel');
    if (!slides.length) return;
    const totalSlides = slides.length;

    // Ajusta o índice para o ciclo
    currentSlide = (index + totalSlides) % totalSlides;

    // Move o carrossel usando transform
    const offset = -currentSlide * 100; // Assume que cada slide ocupa 100% da largura
    carousel.style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        moveSlide(1); // Avança para o próximo slide
    }, 3000); // Altere 3000 para o intervalo desejado (em milissegundos)
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Inicializa o carrossel
function startCarousel() {
    const slides = document.querySelectorAll('.carousel .slide');
    const carouselContainer = document.querySelector('.carousel-container');

    if (slides.length) {
        showSlide(currentSlide);
        startAutoSlide();

        // Para a transição automática ao passar o mouse
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
}


// FUNÇÃO PARA CRIAR MENSAGEM E ABRIR WHATSAPP
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productData = {
        'produto1': { ref: 'REF: #001', size: 'Tamanho: G' },
        'produto2': { ref: 'REF: #002', size: 'Tamanho: G' },
        'produto3': { ref: 'REF: #003', size: 'Tamanho: M' },
        'produto4': { ref: 'REF: #004', size: 'Tamanho: P' },
        'produto5': { ref: 'REF: #005', size: 'Tamanho: GG' },
        'produto6': { ref: 'REF: #006', size: 'Tamanho: G' },
        'produto7': { ref: 'REF: #007', size: 'Tamanho: M' },
        'produto8': { ref: 'REF: #008', size: 'Tamanho: GG' },
        'produto9': { ref: 'REF: #009', size: 'Tamanho: P' },
        'produto10': { ref: 'REF: #010', size: 'Tamanho: G' },
        'produto11': { ref: 'REF: #011', size: 'Tamanho: P' },
        'produto12': { ref: 'REF: #012', size: 'Tamanho: G' },
        'produto13': { ref: 'REF: #013', size: 'Tamanho: M' },
        'produto14': { ref: 'REF: #014', size: 'Tamanho: GG' },
        'produto15': { ref: 'REF: #015', size: 'Tamanho: P' },
        'produto16': { ref: 'REF: #016', size: 'Tamanho: G' },
        'produto17': { ref: 'REF: #017', size: 'Tamanho: GG' },
        'produto18': { ref: 'REF: #018', size: 'Tamanho: P' },
        'produto19': { ref: 'REF: #019', size: 'Tamanho: G' },
        'produto20': { ref: 'REF: #020', size: 'Tamanho: GG' }
    };

    let message = 'Olá, gostaria de comprar os seguintes itens:\n';
    cart.forEach(productId => {
        const product = productData[productId];
        message += `📦 ${product.ref}\n📏 ${product.size}\n`;
    });

    const whatsappLink = `https://wa.me/5531985079718?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// Função para verificar a página atual e mostrar/ocultar o ícone do carrinho
function checkCartIconVisibility() {
    const cartIcon = document.getElementById('cart-icon');
    const currentPage = window.location.pathname.split('/').pop(); // Pega o nome do arquivo atual
    if (currentPage === 'index.html' || currentPage === 'catalogo.html') {
        cartIcon.style.display = 'block'; // Mostra o ícone
    } else {
        cartIcon.style.display = 'none'; // Esconde o ícone
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    checkCartIconVisibility(); // Verifica a visibilidade do ícone do carrinho
    updateCartCount(); // Atualiza o contador ao carregar a página
    loadCart(); // Carrega o carrinho
});

// Função para rolar até o topo da página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // Rolagem suave
    });
}
