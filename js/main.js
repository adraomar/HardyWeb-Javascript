let carritoDeCompras = [];

const contenedorProductos = document.getElementById("contenedor-productos");
const tablaProductos = document.getElementById("tabla-productos");

btnMostrarProductos.addEventListener('click', () => {
    mostrarProductos();
})

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
    console.log("Se ha agregado un producto al carrito.");
    carritoDeCompras.push(productoAgregar);
    localStorage.setItem("CarritoDeCompras", JSON.stringify(carritoDeCompras));
    mostrarCarrito(productoAgregar)
}

function mostrarCarrito(producto) {
    let idx = carritoDeCompras.indexOf(producto)
    let tbody = document.createElement('tbody');
    
    tbody.innerHTML += `
        <tr id="producto-${idx}">
            <td>${idx + 1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.tipo}</td>
            <td>$ ${producto.precio}</td>
            <td><button id="botonDelete${idx}" type="button" class="btn btn-danger">Eliminar</button></td>
        </tr>`

    tablaProductos.appendChild(tbody);
    actualizarCarrito();

    let btnElimiar = document.getElementById(`botonDelete${carritoDeCompras.indexOf(producto)}`);
    btnElimiar.addEventListener('click', () => {
        console.log("Array item: " + carritoDeCompras.indexOf(producto));
        eliminarCarrito(carritoDeCompras.indexOf(producto));
    });

}

function eliminarCarrito(producto) {
    let tr = document.getElementById(`producto-${producto.id}`);
    tr.remove();
    let idx = carritoDeCompras.map(producto => producto.nombre).indexOf(producto.nombre);
    carritoDeCompras.splice(idx, 1);

    console.log(idx)
    console.log(carritoDeCompras)
    actualizarCarrito();
}

function actualizarCarrito() {
    let txtPrecioTotal = document.getElementById('txtPrecioFinal');
    txtPrecioTotal.value = "$ " + carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
}

function removerItemArray(array, item) {
    var i = array.indexOf(item);
 
    if (i !== -1) {
        array.splice(i, 1);
    }
}

function obtenerProductoPorNombre(productos, nombre) {
    return productos.filter(
        function(producto) { 
            return producto.nombre == nombre 
        }
    );
}