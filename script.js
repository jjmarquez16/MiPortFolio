// Obtener los elementos del DOM
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Mostrar el modal al hacer clic en "Contáctame"
contactBtn.addEventListener('click', () => {
    contactModal.classList.remove('hidden');
});

// Ocultar el modal al hacer clic en "Cerrar"
closeModalBtn.addEventListener('click', () => {
    contactModal.classList.add('hidden');
});

// Opcional: Cerrar el modal al hacer clic fuera del contenido
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.add('hidden');
    }
});