let carritoDeCompras = new Array();
let stock = new Array();
let seleccionados = 0;

const contenedorProductos = document.getElementById("contenedor-productos");
const txtCantidadProductos = document.getElementById("txtCantidadProductos");

function mostrarProductos() {
    fetch('https://dummyjson.com/products').then(response => response.json()).then(prod => {
        stock = prod;
        renderProductos(prod);
    });
}

function renderProductos(stockProductos) {
    stockProductos.products.forEach(el => {
        let div = document.createElement('div');
        div.className = 'card mb-3';
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${el.images[2]}" class="img-fluid rounded-start" style="width: 13rem;" alt="...">
             </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">Precio: $ ${el.price.toLocaleString('de-DE')}</p>
                    <button id="boton${el.id}" type="button" class="btn btn-success"><i class="bi bi-cart-plus-fill"></i> Agregar al carrito</button>
                </div>
            </div>
        </div>`;

        contenedorProductos.appendChild(div);

        let btnAgregar = document.getElementById(`boton${el.id}`);
        btnAgregar.addEventListener('click', () => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Desea agregar este producto al carrito?',
                text: "",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Agregar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(`${el.id}`);
                    swalWithBootstrapButtons.fire(
                        'Producto agregado',
                        'Se ha agregado este producto al carrito correctamente!',
                        'success'
                    )
                    agregarAlCarrito(el.id);
                    actualizarSeleccionados();
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'No se ha agregado ningun producto al carrito!',
                        'error'
                    )
                }
            })
        });
    });
}

// Carrito System
function agregarAlCarrito(id) {
    let productoAgregar = stock.products.find(item => item.id === id)
    console.log("Se ha agregado un producto al carrito.");
    carritoDeCompras.push(productoAgregar);
    localStorage.setItem("CarritoDeCompras", JSON.stringify(carritoDeCompras));
    actualizarSeleccionados();
}

function actualizarSeleccionados() {
    contador = 0;
    carritoDeCompras.forEach(producto => {
        contador++;
    });

    seleccionados = contador;
    txtCantidadProductos.value = seleccionados;
}