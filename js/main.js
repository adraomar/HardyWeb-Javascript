let carritoDeCompras = [];

const contenedorProductos = document.getElementById("contenedor-productos");
const btnVistaCuad = document.getElementById("botonCuadricula");
const btnVistaLista = document.getElementById("botonLista");
const tablaProductos = document.getElementById("tabla-productos");

btnVistaCuad.addEventListener("click", () => {
    mostrarProductos();
});

btnVistaLista.addEventListener("click", () => {
    mostrarProductos();
});

mostrarProductos();

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
                    <p class="card-text">Precio: $ ${el.precio}</p>
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
    console.log(productoAgregar);
    carritoDeCompras.push(productoAgregar);
    mostrarCarrito(productoAgregar)
}

function mostrarCarrito(productoAgregar) {
    let tbody = document.createElement('tbody');
    
    tbody.innerHTML += `
        <tr>
            <td>${carritoDeCompras.indexOf(productoAgregar) + 1}</td>
            <td>${productoAgregar.nombre}</td>
            <td>${productoAgregar.tipo}</td>
            <td>$ ${productoAgregar.precio}</td>
            <td><button id="botonEliminar${productoAgregar.id}" type="button" class="btn btn-danger">Eliminar</button></td>
        </tr>`

    tablaProductos.appendChild(tbody);
    actualizarCarrito();
}

function actualizarCarrito() {
    let txtPrecioTotal = document.getElementById('txtPrecioFinal');
    txtPrecioTotal.value = "$ " + carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
}
