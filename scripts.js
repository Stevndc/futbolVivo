document.addEventListener('DOMContentLoaded', () => {
    const landingView = document.getElementById('landing-view');
    const matchView = document.getElementById('match-view');
    const matchCards = document.querySelectorAll('.match-card');
    const notification = document.getElementById('notification');
    const logo = document.querySelector('.logo');
    const playOverlay = document.querySelector('.play-overlay');
    const serverButtons = document.querySelectorAll('.server-btn');

    // Volver a la página principal al hacer clic en el logo
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
        matchView.style.display = 'none';
        landingView.style.display = 'block';
        window.scrollTo(0, 0);
    });

    // Cargar historial de clics de la sesión
    let clickCount = JSON.parse(sessionStorage.getItem('futbolVivoClicks')) || {};

    // 1. Lógica para las tarjetas de la página principal
    matchCards.forEach(card => {
        card.addEventListener('click', () => {
            const matchId = card.getAttribute('data-match-id');
            const adUrl = card.getAttribute('data-ad-url');
            const matchUrl = card.getAttribute('data-match-url');

            if (!clickCount[matchId]) clickCount[matchId] = 0;

            if (clickCount[matchId] < 1) {
                // PRIMER CLIC: Abrir Anuncio
                clickCount[matchId]++;
                sessionStorage.setItem('futbolVivoClicks', JSON.stringify(clickCount));
                showNotification("¡Anuncio cargado! Haz clic de nuevo para ver detalles.");
                window.open(adUrl, '_blank');
            } else {
                // SEGUNDO CLIC: Entrar al partido
                if (matchUrl === 'detail') {
                    showNotification("Cargando servidor premium...");
                    landingView.style.display = 'none';
                    matchView.style.display = 'block';
                    window.scrollTo(0, 0);
                } else {
                    // Abrir en nueva pestaña para no perder la web
                    window.open(matchUrl, '_blank');
                }
            }
        });
    });

    // 2. Lógica para la imagen del partido (Play Overlay)
    if (playOverlay) {
        playOverlay.addEventListener('click', () => {
            const adUrl = "https://www.profitablecpmratenetwork.com/hqh5t3twpm?key=cd9aed8a088b43801e0628122e31b720";
            showNotification("Cargando anuncio de imagen...");
            window.open(adUrl, '_blank');
        });
    }

    // 3. Lógica para los botones de servidores dentro del partido
    serverButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serverId = btn.textContent.trim(); // Usamos el nombre del botón como ID único
            const adUrl = btn.getAttribute('data-ad-url');
            const matchUrl = btn.getAttribute('data-match-url');

            if (!clickCount[serverId]) clickCount[serverId] = 0;

            if (clickCount[serverId] < 1) {
                // PRIMER CLIC: Abrir Anuncio
                clickCount[serverId]++;
                sessionStorage.setItem('futbolVivoClicks', JSON.stringify(clickCount));
                showNotification("Enlace listo. Haz clic de nuevo para ver el partido.");
                window.open(adUrl, '_blank');
            } else {
                // SEGUNDO CLIC: Abrir Partido
                showNotification("Conectando con el servidor...");
                window.open(matchUrl, '_blank');
            }
        });
    });

    // Navegación de regreso
    const navHome = document.getElementById('nav-home');
    const backBtn = document.getElementById('back-to-list');

    const goHome = (e) => {
        if (e) e.preventDefault();
        matchView.style.display = 'none';
        landingView.style.display = 'block';
        window.scrollTo(0, 0);
    };

    if (logo) logo.style.cursor = 'pointer';
    logo?.addEventListener('click', goHome);
    navHome?.addEventListener('click', goHome);
    backBtn?.addEventListener('click', goHome);

    // Función para mostrar notificaciones
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }

    // Animación de aparición de tarjetas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    matchCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
});