let aUsuarios = [{ user: "admin", name: "Omar Adra", password: "admin", status: true }];

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
    let validado = validarLogin(`${result.value.login}`, `${result.value.password}`);

    if (validado) {
      btnIngresar.remove();
      btnRegistrar.remove();
      crearNavUser();
      localStorage.setItem("UserData", JSON.stringify(aUsuarios));
    }

  })
}

function validarLogin(usuario, password) {
  let validado = false;

  if (usuario === aUsuarios[0].user && password === aUsuarios[0].password) {
    validado = true;
  } else {
    validado = false;
  }

  return validado;
}

function crearNavUser() {
  let ingresoRegistro = document.getElementById("ingreso-registro");

  let div = document.createElement("div");
  div.className = "dropdown me-5 pe-3";
  div.innerHTML = `
      <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${aUsuarios[0].name}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Mi Perfil</a></li>
        <li><a class="dropdown-item" href="#">Configuraciones</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Desconectarse</a></li>
      </ul>
      `

  ingresoRegistro.appendChild(div);
}