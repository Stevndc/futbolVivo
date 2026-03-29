document.addEventListener('DOMContentLoaded', () => {
  const matchCards = document.querySelectorAll('.match-card');
  const notification = document.getElementById('notification');

  // Load click history from session (resets on tab close)
  let clickHistory = JSON.parse(sessionStorage.getItem('matchClickHistory')) || {};

  matchCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      
      const matchId = card.getAttribute('data-match-id');
      const adUrl = card.getAttribute('data-ad-url');
      const matchUrl = card.getAttribute('data-match-url');
      
      // Initialize count if not exists
      if (!clickHistory[matchId]) {
        clickHistory[matchId] = 0;
      }

      if (clickHistory[matchId] < 1) {
        // First click: Open AD
        clickHistory[matchId]++;
        sessionStorage.setItem('matchClickHistory', JSON.stringify(clickHistory));
        
        // Show feedback
        showNotification("Enlace cargado. ¡Haz clic de nuevo para ver el partido!");
        
        // Open AD in a new window/tab
        window.open(adUrl, '_blank');
      } else {
        // Second click: Open MATCH
        showNotification("Redireccionando al servidor del partido...");
        
        // Redirect or open in new tab (user preference, but usually redirect is better for streaming sites)
        window.location.href = matchUrl;
      }
    });
  });

  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 4000);
  }

  // Smooth appearance of cards on load
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
    card.style.transition = `0.5s ease-out ${index * 0.1}s`;
    observer.observe(card);
  });
});
