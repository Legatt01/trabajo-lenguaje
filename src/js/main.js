// ============================================
// QUERIES GLOBALES
// Elementos presentes en todas las páginas
// ============================================
const header = document.querySelector('header');
const nav = document.querySelector('.contenedor_nav');
const hamburguesa = document.querySelector('.hamburguesa');
const menu = document.querySelector('.contenedor_nav ul');

// ============================================
// NAV STICKY
// Añade clase .scrolled al bajar 50px
// Añade .sticky-active cuando el header desaparece
// usando IntersectionObserver
// ============================================
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

const observer = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) {
    // El header ya no es visible - fija el nav con animación
    nav.classList.remove('sticky-leaving');
    nav.classList.add('sticky-active');
  } else {
    // El header vuelve a ser visible - quita el sticky
    nav.classList.remove('sticky-active');
  }
});
observer.observe(header);

// ============================================
// MENÚ HAMBURGUESA
// Alterna el menú y transforma el icono en X
// Solo visible en móvil via CSS
// ============================================
hamburguesa.addEventListener('click', () => {
  menu.classList.toggle('visible');
  hamburguesa.classList.toggle('abierto');
});

// ============================================
// CUENTA ATRÁS - INDEX
// Solo se ejecuta si los elementos existen en la página
// Se actualiza cada segundo con setInterval
// ============================================
const dias = document.getElementById('dias');
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const fechaLanzamiento = new Date('2026-06-11T00:00:00');

if (dias) {
  function actualizarCuentaAtras() {
    const fechaActual = new Date();
    const tiempoRestante = fechaLanzamiento - fechaActual;

    // Si la fecha ya pasó muestra mensaje de lanzamiento
    if (tiempoRestante < 0) {
      document.querySelector('.timer').innerHTML = '<p>¡El gran día ha llegado! La nueva moto ya está aquí.</p>';
      return;
    }

    // Convierte milisegundos a días, horas, minutos y segundos
    // padStart asegura siempre dos dígitos (ej: 07 en vez de 7)
    dias.textContent = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    horas.textContent = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    minutos.textContent = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    segundos.textContent = Math.floor((tiempoRestante % (1000 * 60)) / 1000).toString().padStart(2, '0');
  }

  // Ejecuta inmediatamente al cargar y luego cada segundo
  actualizarCuentaAtras();
  setInterval(actualizarCuentaAtras, 1000);
}

// ============================================
// BOTÓN NOTIFÍCAME - INDEX
// Valida el email y muestra mensaje de respuesta
// Solo se ejecuta si el botón existe en la página
// ============================================
const email = document.getElementById('notify-email');
const botonNotify = document.getElementById('notify-btn');
const msgNotify = document.getElementById('notify-msg');

if (botonNotify) {
  botonNotify.addEventListener('click', () => {
    // Valida que el campo no esté vacío y tenga formato de email
    if (email.value.trim() === '' || !/\S+@\S+\.\S+/.test(email.value)) {
      msgNotify.textContent = 'Por favor, ingresa un correo electrónico válido.';
      msgNotify.style.color = 'red';
      msgNotify.classList.add('visible');
      return;
    }
    msgNotify.textContent = '¡Gracias por suscribirte! Te notificaremos cuando Gōjira ゴジラ esté disponible.';
    msgNotify.style.color = 'green';
    msgNotify.classList.add('visible');
    email.value = '';
  });
}

// ============================================
// FORMULARIO DE RESERVA - INDEX
// Valida nombre, apellido, teléfono, email,
// región y moto antes de enviar
// Solo se ejecuta si el formulario existe en la página
// ============================================
const formulario = document.querySelector('.reservation-form');

if (formulario) {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita la recarga de página
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const emailForm = document.getElementById('email').value.trim();
    const region = document.getElementById('region').value.trim();
    const moto = document.getElementById('moto').value.trim();

    // Comprueba que todos los campos obligatorios estén rellenos
    if (nombre === '' || apellido === '' || tel === '' || emailForm === '' || region === '' || moto === '') {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }
    // Valida formato de email
    if (!/\S+@\S+\.\S+/.test(emailForm)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    // Valida formato de teléfono - acepta +, espacios y guiones
    if (!/^\+?[\d\s\-]{7,15}$/.test(tel)) {
      alert('Por favor, ingresa un teléfono válido.');
      return;
    }
    alert(`¡Gracias por tu reserva, ${nombre}! Nos pondremos en contacto contigo pronto.`);
    formulario.reset();
  });
}

// ============================================
// FILTRO DE CATEGORÍAS - CATEGORÍAS
// Filtra los artículos según data-category
// Solo se ejecuta si hay botones de filtro en la página
// ============================================
const filtros = document.querySelectorAll('.filtro');
const articulos = document.querySelectorAll('.grid_catalogo article');

if (filtros.length > 0) {
  filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
      // Quita la clase activo de todos los botones
      filtros.forEach(f => f.classList.remove('activo'));
      // Añade activo al botón pulsado
      filtro.classList.add('activo');

      const categoria = filtro.getAttribute('data-category');

      // Muestra u oculta cada artículo según su categoría
      articulos.forEach(articulo => {
        if (categoria === 'todas' || articulo.getAttribute('data-category') === categoria) {
          articulo.style.display = 'block';
        } else {
          articulo.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// FORMULARIO DE CONTACTO - CONTACTO
// Valida nombre, email, asunto y mensaje
// Solo se ejecuta si el formulario existe en la página
// ============================================
const formularioContacto = document.querySelector('.datos-contacto');

if (formularioContacto) {
  formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita la recarga de página
    // Variables locales - no interfieren con el formulario de reserva
    const nombre = document.getElementById('nombre').value.trim();
    const emailForm = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Comprueba que todos los campos estén rellenos
    if (nombre === '' || emailForm === '' || asunto === '' || mensaje === '') {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }
    // Valida formato de email
    if (!/\S+@\S+\.\S+/.test(emailForm)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    alert(`¡Hola, ${nombre}! Nos pondremos en contacto contigo pronto.`);
    formularioContacto.reset();
  });
}

// ============================================
// EVENTOS FOCUS Y BLUR EN INPUTS
// Feedback visual al entrar y salir de cada campo
// Verde si tiene contenido, rojo si está vacío
// ============================================
const inputs = document.querySelectorAll('input, textarea');

if (inputs.length > 0) {
  inputs.forEach(input => {
    // Al entrar en el campo - resalta con color de marca
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--color-hover-texto)';
    });
    // Al salir del campo - indica si está relleno o vacío
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = 'green';
      }
    });
  });
}

// ============================================
// EVENTO MOUSEOVER EN TARJETAS DE MOTOS
// Muestra la categoría de la moto en el tooltip
// al pasar el ratón por encima
// ============================================
const articlesMouso = document.querySelectorAll('article');

if (articlesMouso.length > 0) {
  articlesMouso.forEach(article => {
    article.addEventListener('mouseover', () => {
      article.setAttribute('title', article.getAttribute('data-category') || '');
    });
  });
}