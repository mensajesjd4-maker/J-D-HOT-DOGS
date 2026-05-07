const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');

openBtn.addEventListener('click', () => {
  sideMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('active');
});

// Abrir menú y mostrar desenfoque
openBtn.onclick = () => {
  sideMenu.classList.add('active');
  overlay.style.display = 'block';
};

// Cerrar menú y quitar desenfoque
const cerrar = () => {
  sideMenu.classList.remove('active');
  overlay.style.display = 'none';
};

closeBtn.onclick = cerrar;
overlay.onclick = cerrar; // Esto permite cerrar el menú al tocar el desenfoque