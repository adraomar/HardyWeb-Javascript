let carrito = JSON.parse(localStorage.getItem("CarritoDeCompras"));

const tablaProductos = document.getElementById("tabla-productos");
const txtPrecioFinal = document.getElementById("txtPrecioFinal");
const botonIngresar = document.getElementById("btnIngresar");
const botonRegistrar = document.getElementById("btnRegistrar");
const contenedorBotonesIngreso = document.getElementById("ingreso-registro");

function mostrarCarrito() {
    let tbody = document.querySelector('tbody');

    if(carrito != null) {
        carrito.forEach(producto => {
            let index = carrito.indexOf(producto);
            let tr = document.createElement('tr');
            tr.setAttribute("id", "tr-" + index);
            tr.innerHTML += `
                <td>${index + 1}</td>
                    <td>${producto.title}</td>
                    <td>${producto.category}</td>
                    <td>$ ${producto.price.toLocaleString('de-DE')}</td>
                    <td>
                    <button id="btnEliminar" onclick="eliminarProducto(${index})" type="button" class="btn btn-danger">Eliminar</button>
                    </td>
                `
            tbody.appendChild(tr);
            actualizarPrecioFinal();
        });
    }
    

    tablaProductos.appendChild(tbody);
}

function eliminarProducto(index) {
    Swal.fire({
        title: '¿Desea eliminar este producto del carrito?',
        text: "Puedes volver a todos los productos y agregarlo nuevamente.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Correcto!',
                text: "Producto eliminado del carrito correctamente.",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            })

            console.log("Producto eliminado ID: " + index);
            let tr = document.getElementById(`tr-${index}`);
            tr.remove();
            carrito.splice(index, 1);
            localStorage.removeItem("CarritoDeCompras");
            localStorage.setItem("CarritoDeCompras", JSON.stringify(carrito));
            actualizarPrecioFinal();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: '¡Cancelado!',
                text: "Producto no ha sido eliminado del carrito.",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            })
        }
    })
}

function actualizarPrecioFinal() {
    let precioFinal = 0;

    carrito.forEach(producto => {
        precioFinal += producto.price;
    });

    txtPrecioFinal.value = "$ " + (precioFinal.toLocaleString('de-DE'));
}

function obtenerProductoPorNombre(productos, nombre) {
    return productos.filter(
        function (producto) {
            return producto.nombre == nombre
        }
    );
}

function cargarElementos() {
    mostrarCarrito();
    estadoUsuario();
}

function sitioEnConstruccion() {
    Swal.fire('Esta sección se encuentra en construcción no puedes acceder momentaneamente.');
}