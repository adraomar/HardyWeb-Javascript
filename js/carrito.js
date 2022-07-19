let carrito = JSON.parse(localStorage.getItem("CarritoDeCompras"));
let aUsuarios = JSON.parse(localStorage.getItem("UserData"));

const tablaProductos = document.getElementById("tabla-productos");
const txtPrecioFinal = document.getElementById("txtPrecioFinal");
const botonIngresar = document.getElementById("btnIngresar");
const botonRegistrar = document.getElementById("btnRegistrar");
const contenedorBotonesIngreso = document.getElementById("ingreso-registro");

function mostrarCarrito() {
    let tbody = document.querySelector('tbody');

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

    if (aUsuarios[0][1] == true) {
        contenedorBotonesIngreso.removeChild(botonIngresar);
        contenedorBotonesIngreso.removeChild(botonRegistrar);
        actualizarNavbar(aUsuarios, 1);
    }
    else {
        console.log("Ningun usuario logueado");
    }
}

function actualizarNavbar(usuario, logueado) {

    switch (logueado) {
        case 1:
            let div = document.createElement('div');
            div.className = 'btn-group mx-3 px-3';
            div.innerHTML = `
                <button type="button" class="btn btn-primary">${usuario[0][0]}</button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Mi Perfil</a></li>
                    <li><a class="dropdown-item" href="#">Configuración</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Desconectarse</a></li>
                </ul>
                `;

            contenedorBotonesIngreso.appendChild(div);
            break;
        case 1:
            break;
    }

}