document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Menu Mobile Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // 2. Animação de Fade-in ao Rolar a Página (Intersection Observer)
    const fadeElements = document.querySelectorAll(".fade-section");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Ativa quando 15% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Para animar apenas na primeira vez
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 3. Simulação de Envio de Formulário
    const contactForm = document.getElementById("contactForm");
    
    if(contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Evita o recarregamento da página
            
            // Aqui entraria a lógica de envio para um servidor (PHP, Node, etc)
            const btn = this.querySelector('button');
            const textoOriginal = btn.innerText;
            
            btn.innerText = "Enviando...";
            btn.style.backgroundColor = "var(--text-main)";
            
            setTimeout(() => {
                alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
                contactForm.reset();
                btn.innerText = textoOriginal;
                btn.style.backgroundColor = "var(--accent-gold)";
            }, 1500);
        });
    }

    // --- LÓGICA DA GALERIA E LIGHTBOX ---

    // 1. Array de Imagens (Substitua as URLs pelas suas fotos separadas)
    const galleryItems = [
        {
            id: 0,
            beforeImg: "imagens/antes01.jpeg", 
            afterImg: "imagens/depois01.jpeg",
            title: "Drenagem linfática",
            desc: "Descubra o poder da drenagem linfática e renove suas energias"
        },
        {
            id: 1,
            beforeImg: "imagens/antes02.jpg",
            afterImg: "imagens/depois02.jpg",
            title: "Drenagem linfática",
            desc: "A leveza que você sente após a drenagem é o seu corpo agradecendo."
        },
        {
            id: 2,
            beforeImg: "imagens/antes03.jpg",
            afterImg: "imagens/depois03.jpg",
            title: "Limpeza de pele",
            desc: "Renove sua confiança com uma pele purificada!"
            
        },
        {
            id: 3,
            beforeImg: "imagens/antes04.jpg",
            afterImg: "imagens/depois04.jpg",
            title: "Limpeza de Pele",
            desc: "Respire fundo e deixe sua pele respirar também."
        },
        {
            id: 4,
            beforeImg: "imagens/antes05.jpg",
            afterImg: "imagens/depois05.jpg",
            title: "Limpeza de Pele",
            desc: "A sensação de frescor após uma limpeza de pele é indescritível"
        },
        // Você pode adicionar mais itens seguindo o mesmo padrão!
    ];

    const galleryGrid = document.getElementById("dynamic-gallery");
    
    // 2. Criar a grade na página principal
    if (galleryGrid) {
        galleryItems.forEach(item => {
            const thumb = document.createElement("div");
            thumb.className = "gallery-thumb";
            // A miniatura sempre mostra a foto do "Depois"
            thumb.innerHTML = `
                <img src="${item.afterImg}" alt="${item.title}">
                <div class="thumb-overlay">
                    <h4>${item.title}</h4>
                </div>
            `;
            thumb.addEventListener("click", () => openLightbox(item.id));
            galleryGrid.appendChild(thumb);
        });
    }

    // Variáveis do Modal
    const lightbox = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDesc = document.getElementById("lightbox-desc");
    const btnAntes = document.getElementById("btn-antes");
    const btnDepois = document.getElementById("btn-depois");
    
    let currentIndex = 0;
    let showingAfter = true; // Controla se está mostrando antes ou depois

    // 3. Funções do Lightbox
    function openLightbox(index) {
        currentIndex = index;
        showingAfter = true;
        updateLightboxContent();
        lightbox.classList.add("active");
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    function updateLightboxContent() {
        const item = galleryItems [currentIndex];
        lightboxTitle.innerText = item.title;
        lightboxDesc.innerText = item.desc;
        
        if (showingAfter) {
            lightboxImg.src = item.afterImg;
            btnDepois.classList.add("active");
            btnAntes.classList.remove("active");
        } else {
            lightboxImg.src = item.beforeImg;
            btnAntes.classList.add("active");
            btnDepois.classList.remove("active");
        }
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showingAfter = true;
        updateLightboxContent();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showingAfter = true;
        updateLightboxContent();
    }

    // 4. Eventos de Clique
    document.getElementById("close-lightbox").addEventListener("click", closeLightbox);
    document.getElementById("next-btn").addEventListener("click", nextImage);
    document.getElementById("prev-btn").addEventListener("click", prevImage);

    btnAntes.addEventListener("click", () => {
        showingAfter = false;
        updateLightboxContent();
    });

    btnDepois.addEventListener("click", () => {
        showingAfter = true;
        updateLightboxContent();
    });

    // Fechar ao clicar fora da imagem
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 5. Navegação por Teclado
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });
});