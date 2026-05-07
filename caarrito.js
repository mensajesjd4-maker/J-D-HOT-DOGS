// 1. Cargar datos iniciales desde LocalStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    
    // Si estamos en la página del carrito, renderizar la lista
    if (document.getElementById('lista-carrito')) {
        renderizarCarrito();
    }

    // Configurar botones de "Agregar" (Página Index)
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarProducto);
    });

    // Botón Vaciar
    const btnVaciar = document.getElementById('vaciar-carrito');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            carrito = [];
            guardarYRefrescar();
        });
    }
});

function agregarProducto(e) {
    const id = e.target.dataset.id;
    const nombre = e.target.dataset.nombre;
    const precio = parseFloat(e.target.dataset.precio);

    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        carrito[index].cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    guardarYRefrescar();
}

function guardarYRefrescar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    if (document.getElementById('lista-carrito')) renderizarCarrito();
}

function actualizarContador() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}

function renderizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');
    let total = 0;

    lista.innerHTML = ''; // Limpiar contenido previo

    if (carrito.length === 0) {
        lista.innerHTML = '<p>El carrito está vacío</p>';
        totalElemento.innerText = '0.00';
        return;
    }

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('item-carrito');
        li.innerHTML = `
            <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
            <div class="controles-cantidad">
                <button class="btn-restar" data-id="${item.id}">-</button>
                <span>${item.cantidad}</span>
                <button class="btn-sumar" data-id="${item.id}">+</button>
                <button class="btn-eliminar" data-id="${item.id}" style="margin-left:10px;">🗑️</button>
            </div>
        `;
        lista.appendChild(li);
        total += item.precio * item.cantidad;
    });

    totalElemento.innerText = total.toFixed(2);
}

// Escuchar clics en el contenedor del carrito (Delegación de eventos)
document.getElementById('lista-carrito').addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');

    if (e.target.classList.contains('btn-sumar')) {
        cambiarCantidad(id, 1);
    } else if (e.target.classList.contains('btn-restar')) {
        cambiarCantidad(id, -1);
    } else if (e.target.classList.contains('btn-eliminar')) {
        eliminarProducto(id);
    }
});

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);

    if (producto) {
        producto.cantidad += cambio;

        // Si la cantidad llega a 0, lo eliminamos
        if (producto.cantidad <= 0) {
            eliminarProducto(id);
        } else {
            guardarYActualizar();
        }
    }
}

function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarYActualizar();
}

function guardarYActualizar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();

}

// Asegúrate de poner esto dentro del DOMContentLoaded o al final del archivo
const btnFinalizar = document.getElementById('Comprar-carrito');

if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. ¡Agrega algunos productos primero!");
            return;
        }

        // Simulación de proceso de compra
        const totalCompra = document.getElementById('total').innerText;
        
        alert(`¡Gracias por tu compra!\nEl total fue de: $${totalCompra}\nTu pedido está en camino.`);

        // Limpiar el carrito después de la compra
        vaciarTodoElCarrito();
    });
}

// Función auxiliar para limpiar todo
function vaciarTodoElCarrito() {
    carrito = []; // Vacía el arreglo
    localStorage.removeItem('carrito'); // Borra el almacenamiento local
    
    // Si estamos en la página de carrito, refresca la vista
    if (document.getElementById('lista-carrito')) {
        renderizarCarrito();
    }
    
    actualizarContador();
}