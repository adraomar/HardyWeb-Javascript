let dbUsuarios = [
  { id: 1, user: "admin", name: "Administrador", password: "admin", status: false },
  { id: 2, user: "test", name: "Usuario Test", password: "test", status: false },
  { id: 3, user: "omikpo", name: "Omar Adra", password: "4275591", status: false }
];

let btnIngresar = document.getElementById("btnIngresar");
let btnRegistrar = document.getElementById("btnRegistrar");

function mostrarLogin() {
  Swal.fire({
    title: 'Iniciar sesión',
    html: `
        <div class="mb-3 text-start">
          <label for="txtUsuario" class="form-label">Nombre de usuario</label>
          <input type="email" class="form-control" id="txtUsuario" placeholder="Nombre de usuario">
        </div>
        <div class="mb-3 text-start">
        <label for="txtPassword" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="txtPassword" placeholder="***************">
        </div>`,
    confirmButtonText: 'Conectarse',
    confirmButtonColor: '#3085d6',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#txtUsuario').value
      const password = Swal.getPopup().querySelector('#txtPassword').value
      if (!login || !password) {
        Swal.showValidationMessage(`Por favor ingrese nombre de usuario y contraseña.`)
      }
      return { login: login, password: password }
    }
  }).then((result) => {
    let usuario = result.value.login;
    let password = result.value.password;
    let u = buscarUsuario(usuario, password);
    let lsData = {};

    if (u != undefined) {
      Swal.fire({
        icon: 'success',
        title: '¡Ingreso correcto!',
        text: 'Te has conectado correctamente.',
      })
      crearNavUser(u);
      lsData = { id: u.id, user: u.user, name: u.name, status: true };
      localStorage.setItem("UserData", JSON.stringify(lsData));
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El nombre de usuario y/o contraseña que has ingresado no son válidos.',
      })
    }
  })
}

function crearNavUser(usuario) {
  let ingresoRegistro = document.getElementById("ingreso-registro");
  let div = document.createElement("div");

  btnIngresar.className = "d-none";
  btnRegistrar.className = "d-none";
  div.className = "dropdown me-5 pe-3";
  div.setAttribute("id", "boton-usuario");
  div.innerHTML = `
      <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${usuario.name}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Mi Perfil</a></li>
        <li><a class="dropdown-item" href="#">Configuraciones</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><button class="dropdown-item" href="#" onclick="logoutUsuario()">Desconectarse</button></li>
      </ul>
      `;
  ingresoRegistro.appendChild(div);
}

function buscarUsuario(usuario, pass) {
  const u = dbUsuarios.find(us => {
    return us.user === usuario && us.password === pass;
  });

  return u;
}

function logoutUsuario() {
  Swal.fire({
    title: '¿Estás seguro que deseas desconectarte?',
    text: "Tus productos dentro del carrito no se perderán.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Desconectarse'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '¡Correcto!',
        'Te has desconectado del sistema correctamente.',
        'success'
      )

      let usuario = JSON.parse(localStorage.getItem("UserData"));
      lsData = { id: usuario.id, user: usuario.user, name: usuario.name, status: false };
      localStorage.setItem("UserData", JSON.stringify(lsData));
      estadoUsuario();
    }
  })
}

function estadoUsuario() {
  let user = JSON.parse(localStorage.getItem("UserData"));

  if (user != null) {
    if (user.status == false) {
      let div = document.getElementById("boton-usuario");

      if (div != null) {
        div.remove();
      }

      btnIngresar.className = "btn btn-outline-success me-2";
      btnRegistrar.className = "btn btn-warning";
    } else {
      crearNavUser(user);
    }
  } else {
    console.log("No se cargo la info de ningun usuario!");
  }
}