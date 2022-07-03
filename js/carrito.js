let carrito = JSON.parse(localStorage.getItem("CarritoDeCompras"));

const tablaProductos = document.getElementById("tabla-productos");
const txtPrecioFinal = document.getElementById("txtPrecioFinal");

function mostrarCarrito() {
    let tbody = document.querySelector('tbody');
    let precioFinal = 0;

    carrito.forEach(producto => {
        let index = carrito.indexOf(producto);
        let tr = document.createElement('tr');
        tr.setAttribute("id", "tr-" + index);
        tr.innerHTML += `
        <td>${index + 1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.tipo}</td>
            <td>$ ${producto.precio.toLocaleString('de-DE')}</td>
            <td>
            <button id="btnEliminar" onclick="eliminarProducto(${index})" type="button" class="btn btn-danger">Eliminar</button>
            </td>
        `
        tbody.appendChild(tr);

        precioFinal += producto.precio;
    });

    tablaProductos.appendChild(tbody);
    txtPrecioFinal.value = "$ " + (precioFinal.toLocaleString('de-DE'));
}

function eliminarProducto(index) {
    console.log("Producto eliminado ID: " + index);
    let tr = document.getElementById(`tr-${index}`);
    tr.remove();
    carrito.splice(index, 1);
    localStorage.removeItem("CarritoDeCompras");
    localStorage.setItem("CarritoDeCompras", JSON.stringify(carrito));
}

/*
<button id="botonDelete-${index}" type="button" class="btn btn-danger">Eliminar</button>

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
} */

function obtenerProductoPorNombre(productos, nombre) {
    return productos.filter(
        function (producto) {
            return producto.nombre == nombre
        }
    );
}