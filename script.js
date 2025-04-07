document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init();

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-bs-theme') === 'light') {
            document.body.setAttribute('data-bs-theme', 'dark');
            themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        } else {
            document.body.setAttribute('data-bs-theme', 'light');
            themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        }
    });

    // Star rating functionality
    const ratingStars = document.querySelectorAll('.star-rating');
    const ratingInput = document.getElementById('puntuacion');

    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function () {
            const rating = this.getAttribute('data-rating');
            updateStars(rating, 'hover');
        });

        star.addEventListener('mouseout', function () {
            const currentRating = ratingInput.value;
            updateStars(currentRating, 'selected');
        });

        star.addEventListener('click', function () {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;
            updateStars(rating, 'selected');
        });
    });

    function updateStars(rating, state) {
        ratingStars.forEach(star => {
            const starRating = star.getAttribute('data-rating');
            if (starRating <= rating) {
                star.classList.remove('bi-star');
                star.classList.add('bi-star-fill');
                star.classList.add(state === 'hover' ? 'text-warning' : 'text-warning');
            } else {
                star.classList.remove('bi-star-fill', 'text-warning');
                star.classList.add('bi-star');
            }
        });
    }

    // Form validation and submission
    const opinionForm = document.getElementById('opinionForm');
    const opinionesCarousel = document.getElementById('opinionesCarousel');
    const carouselInner = opinionesCarousel.querySelector('.carousel-inner');

    opinionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            event.stopPropagation();
            this.classList.add('was-validated');
            return;
        }

        const nombre = document.getElementById('nombreOpinion').value;
        const puntuacion = document.getElementById('puntuacion').value;
        const comentario = document.getElementById('comentario').value;

        // Create new carousel item
        const newOpinion = document.createElement('div');
        newOpinion.className = 'carousel-item';
        newOpinion.innerHTML = `
            <div class="card text-center mx-auto" style="max-width: 600px;">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <div class="mb-2">
                        ${Array(parseInt(puntuacion)).fill('<i class="bi bi-star-fill text-warning"></i>').join('')}
                        ${Array(5 - parseInt(puntuacion)).fill('<i class="bi bi-star text-warning"></i>').join('')}
                    </div>
                    <p class="card-text">"${comentario}"</p>
                </div>
            </div>
        `;

        // Add new opinion to carousel
        carouselInner.appendChild(newOpinion);

        // Reset form
        this.reset();
        ratingInput.value = '0';
        updateStars(0, 'selected');
        this.classList.remove('was-validated');

        // Show success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-3';
        alert.textContent = '¡Gracias por tu opinión!';
        this.appendChild(alert);

        // Remove alert after 3 seconds
        setTimeout(() => alert.remove(), 3000);
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})