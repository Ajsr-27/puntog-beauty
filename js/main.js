document.addEventListener('DOMContentLoaded', function() {
    // ===== CONSTANTES =====
    const formulario = document.getElementById('formulario-reservas');
    const btnAbrir = document.getElementById('btn-abrir-formulario');
    const formReserva = document.getElementById('form-reserva');
    const telefonoWhatsApp = '5491126641878';

    // ===== FUNCIONALIDAD DEL FORMULARIO =====
    // 1. Abrir formulario
    btnAbrir.addEventListener('click', function(e) {
        e.stopPropagation();
        formulario.style.display = 'block';
        formulario.scrollIntoView({ behavior: 'smooth' });
        document.body.classList.add('formulario-abierto');
    });

    // 2. Cerrar al hacer clic fuera (si no hay datos)
    document.addEventListener('click', function(e) {
        const isForm = formulario.contains(e.target) || e.target === btnAbrir;
        const hasData = Array.from(formReserva.elements).some(
            element => (element.type !== 'submit' && element.value !== '')
        );
        
        if (!isForm && !hasData && formulario.style.display === 'block') {
            formulario.style.display = 'none';
            document.body.classList.remove('formulario-abierto');
        }
    });

    // 3. Evitar cierre al hacer clic dentro del formulario
    formulario.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 4. Validación de fecha
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        fechaInput.min = new Date().toISOString().split('T')[0];
    }

    // 5. Envío a WhatsApp (VERSIÓN CORRECTA)
    formReserva.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 1. Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            fecha: new Date(document.getElementById('fecha').value).toLocaleDateString('es-AR'),
            hora: document.getElementById('hora').value,
            servicio: document.getElementById('servicio').value
        };

        // 2. Crear mensaje
        const mensaje = `📅 *NUEVA RESERVA - Punto G Beauty*%0A%0A` +
                       `👤 *Nombre:* ${formData.nombre}%0A` +
                       `📞 *Teléfono:* ${formData.telefono}%0A` +
                       `📅 *Fecha:* ${formData.fecha}%0A` +
                       `⏰ *Hora:* ${formData.hora}%0A` +
                       `💅 *Servicio:* ${formData.servicio}%0A%0A` +
                       `📍 Rivadavia 855, Monte Grande%0A%0A` +
                       `_Por favor, confirma esta reserva respondiendo 'OK'_`;

        // 3. Abrir WhatsApp
        const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
        const url = `https://${isMobile ? 'api' : 'web'}.whatsapp.com/send?phone=${telefonoWhatsApp}&text=${mensaje}`;
        
        window.open(url, '_blank', 'noopener,noreferrer');
        
        // 4. Resetear formulario
        this.reset();
        formulario.style.display = 'none';
        document.body.classList.remove('formulario-abierto');
    });

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== EFECTOS HOVER =====
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // ===== CARRUSEL HOVER =====
    const carouselImages = document.querySelectorAll('.carousel-item img');
    carouselImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.03)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
});