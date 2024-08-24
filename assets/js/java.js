//zoom cards al pasar mouse
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.zoom-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease-in-out';
            card.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    //Mover carrusel automaticamente
    const carouselElement = document.querySelector('#carouselExampleIndicators');
    const bootstrapCarousel = new bootstrap.Carousel(carouselElement, {
        interval: 1500, 
        ride: 'carousel'
    });

    carouselElement.addEventListener('mouseenter', () => {
        bootstrapCarousel.pause();
    });

    carouselElement.addEventListener('mouseleave', () => {
        bootstrapCarousel.cycle();
    });
});

(function() {
    'use strict';
  
    var forms = document.querySelectorAll('.needs-validation');
  
    Array.prototype.slice.call(forms).forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add('was-validated');
      }, false);
    });
  })();
  
