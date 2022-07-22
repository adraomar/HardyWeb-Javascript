let carrito = JSON.parse(localStorage.getItem("CarritoDeCompras"));
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

btnFinalizarCompra.addEventListener('click', e => {
  const forms = document.querySelectorAll('.needs-validation')

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '¡Compra finalizada!',
        'Los datos de envío y facturación fueron enviados a tu correo electrónico.',
        'success'
      )

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
    }
})
})

function mostrarCarrito() {

  let ul = document.getElementById("tu-carrito");
  let tituloCarrito = document.getElementById("titulo-carrito");

  let span = document.createElement("span");
  span.className = "badge bg-primary rounded-pill";

  let contador = 0;
  let precioTotal = 0;

  carrito.forEach(producto => {
    ul.innerHTML += `
    <li class="list-group-item d-flex justify-content-between lh-sm">
      <div>
        <h6 class="my-0">${producto.title}</h6>
        <small class="text-muted">${producto.category}</small>
      </div>
      <span class="text-muted">$ ${producto.price.toLocaleString('de-DE')}</span>
    </li>`;

    contador++;
    precioTotal += producto.price;
  });

  ul.innerHTML += `
  <li class="list-group-item d-flex justify-content-between bg-dark text-white">
    <span>Total (USD)</span>
    <strong>$ ${precioTotal.toLocaleString('de-DE')}</strong>
  </li>`;

  span.innerText = contador;

  tituloCarrito.appendChild(span);
}
