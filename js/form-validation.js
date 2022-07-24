(() => {
  const forms = document.querySelectorAll('.needs-validation')
  const btnVolver = document.getElementById("btnVolver");

  btnVolver.addEventListener('click', () => {
    location.href = '../index.html';
  })
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated');
    }, false)
  })
})()

function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("CarritoDeCompras"));

  let ul = document.getElementById("tu-carrito");
  let tituloCarrito = document.getElementById("titulo-carrito");

  let span = document.createElement("span");
  span.className = "badge bg-primary rounded-pill";

  let contador = 0;
  let precioTotal = 0;

  if(carrito != null) {
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
  }
  

  ul.innerHTML += `
  <li class="list-group-item d-flex justify-content-between bg-dark text-white">
    <span>Total (USD)</span>
    <strong>$ ${precioTotal.toLocaleString('de-DE')}</strong>
  </li>`;

  span.innerText = contador;

  tituloCarrito.appendChild(span);
}
