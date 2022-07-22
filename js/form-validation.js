let carrito = JSON.parse(localStorage.getItem("CarritoDeCompras"));

(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    })
  })
  
})()

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
