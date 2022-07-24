let dbUsuarios = [
  { id: 1, user: "admin", name: "Administrador", password: "admin", status: false },
  { id: 2, user: "test", name: "Usuario Test", password: "test", status: false },
  { id: 3, user: "omikpo", name: "Omar Adra", password: "4275591", status: false }
];

const btnIngresar = document.getElementById("btnIngresar");
const btnRegistrar = document.getElementById("btnRegistrar");

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

    if(u != undefined) {
      console.log("Usuario logueado");
      crearNavUser(u);
      lsData = {id: u.id, user: u.user, name: u.name, status: true};
      localStorage.setItem("UserData", JSON.stringify(lsData));
    } else {
      console.log("Usuario y/o contraseña ingresada incorrecta!");
    }
  })
}

function crearNavUser(usuario) {
  let ingresoRegistro = document.getElementById("ingreso-registro");
  let div = document.createElement("div");

  btnIngresar.remove();
  btnRegistrar.remove();
  div.className = "dropdown me-5 pe-3";
  div.innerHTML = `
      <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${usuario.name}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Mi Perfil</a></li>
        <li><a class="dropdown-item" href="#">Configuraciones</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Desconectarse</a></li>
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

function cargarElementos() {
  mostrarProductos();
}