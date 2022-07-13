let carrito = JSON.parse(localStorage.getItem("CarritoDeCompras"));

const tablaProductos = document.getElementById("tabla-productos");
const txtPrecioFinal = document.getElementById("txtPrecioFinal");

function mostrarCarrito() {
    let tbody = document.querySelector('tbody');

    carrito.forEach(producto => {
        let index = carrito.indexOf(producto);
        let tr = document.createElement('tr');
        tr.setAttribute("id", "tr-" + index);
        tr.innerHTML += `
        <td>${index + 1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$ ${producto.precio.toLocaleString('de-DE')}</td>
            <td>
            <button id="btnEliminar" onclick="eliminarProducto(${index})" type="button" class="btn btn-danger">Eliminar</button>
            </td>
        `
        tbody.appendChild(tr);
        actualizarPrecioFinal();
    });

    tablaProductos.appendChild(tbody);
}

function eliminarProducto(index) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '¿Desea eliminar este producto del carrito?',
        text: "Si eliminas un producto deberás volver a la página principal para volver a agregarlo.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Producto eliminado!',
                'Se ha eliminado este producto del carrito correctamente!',
                'success'
            )

            console.log("Producto eliminado ID: " + index);
            let tr = document.getElementById(`tr-${index}`);
            tr.remove();
            carrito.splice(index, 1);
            localStorage.removeItem("CarritoDeCompras");
            localStorage.setItem("CarritoDeCompras", JSON.stringify(carrito));
            actualizarPrecioFinal();
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se ha eliminado ningun producto del carrito!',
                'error'
            )
        }
    })
}

function actualizarPrecioFinal() {
    let precioFinal = 0;

    carrito.forEach(producto => {
        precioFinal += producto.precio;
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