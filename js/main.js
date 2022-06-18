let carritoDeCompras = [];

const contenedorProductos = document.getElementById("contenedor-productos");

mostrarProductos();

function mostrarProductos() {
    stockProductos.forEach(el => {
        let div = document.createElement('div');
        div.className = 'card mb-3';
        div.innerHTML = `<div class="row g-0">
                            <div class="col-md-2">
                                <img src="${el.img}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-10 px-5">
                                <div class="card-body">
                                    <h5 class="card-title">${el.nombre}</h5>
                                    <p class="card-text">Precio: $ ${el.precio}</p>
                                    <button type="button" class="btn btn-success">Agregar al Carrito</button>
                                </div>
                            </div>
                        </div>`;

        contenedorProductos.appendChild(div);                
    })
}

// Carrito System
function agregarAlCarrito() {

}

function mostrarCarrito() {

}

function actualizarCarrito() {

}