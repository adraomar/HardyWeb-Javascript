let carritoDeCompras = [];

const contenedorProductos = document.getElementById("contenedor-productos");

function mostrarProductos() {
    stockProductos.forEach(el => {
        let div = document.createElement('div');
        div.className = 'card mb-3';
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${el.img}" class="img-fluid rounded-start" style="width: 13rem;" alt="...">
             </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">${el.nombre}</h5>
                    <p class="card-text">Precio: $ ${el.precio.toLocaleString('de-DE')}</p>
                    <button id="boton${el.id}" type="button" class="btn btn-success"><i class="bi bi-cart-plus-fill"></i> Agregar al carrito</button>
                </div>
            </div>
        </div>`;

        contenedorProductos.appendChild(div);

        let btnAgregar = document.getElementById(`boton${el.id}`);
        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(el.id);
        });
    });
}

// Carrito System
function agregarAlCarrito(id) {
    let productoAgregar = stockProductos.find(item => item.id === id)
    console.log("Se ha agregado un producto al carrito.");
    carritoDeCompras.push(productoAgregar);
    localStorage.setItem("CarritoDeCompras", JSON.stringify(carritoDeCompras));
}