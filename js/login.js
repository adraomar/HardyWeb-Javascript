let aUsuarios = [];

const botonIngresar = document.getElementById("btnIngresar");
const botonRegistrar = document.getElementById("btnRegistrar");
const contenedorBotonesIngreso = document.getElementById("ingreso-registro");

botonIngresar.addEventListener('click', () => {
    Swal.fire({
        title: 'Ingresar datos de usuario',
        html:
            '<form>' +
            '<div class="mt-3 mb-3 text-start">' +
            '<label for="txtUsuario" class="form-label">Nombre de usuario: </label>' +
            '<input type="text" class="form-control" id="txtUsuario" placeholder="Nombre de usuario">' +
            '</div>' +
            '<div class="mb-3 text-start">' +
            '<label for="txtPassword" class="form-label">Contraseña: </label>' +
            '<input type="password" class="form-control" id="txtPassword" placeholder="•••••••••">' +
            '</div>' +
            '</form>',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ingresar',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#txtUsuario').value
            const password = Swal.getPopup().querySelector('#txtPassword').value
            if (!login || !password) {
                Swal.showValidationMessage(`Debe ingresar un nombre de usuario y contraseña.`)
            }
            return { login: login, password: password }
        }
    }).then((result) => {
        let validado = verificarUsuario(`${result.value.login}`, `${result.value.password}`)

        if (validado) {
            Swal.fire({
                icon: 'success',
                title: '¡Acceso exitoso!',
                text: 'Te has conectado con las credenciales correctamente.',
                confirmButtonText: 'Cerrar'
            });

            guardarUsuario(`${result.value.login}`);
            contenedorBotonesIngreso.removeChild(botonIngresar);
            contenedorBotonesIngreso.removeChild(botonRegistrar);
            actualizarNavbar(aUsuarios);
            
            
        }
        else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'El nombre de usuario y contraseña que ha ingresado no son válidos.',
                confirmButtonText: 'Cerrar'
            })
        }

    })
})

function verificarUsuario(usuario, password) {
    let resultado;

    if (usuario == "admin" && password == "admin") {
        resultado = true;
    } else {
        resultado = false;
    }

    return resultado;
}

function guardarUsuario(usuario) {
    let usuarioAgregar = usuario;
    console.log("Se ha agregado un usuario al localstorage.");
    aUsuarios.push(usuarioAgregar);
    localStorage.setItem("UserData", JSON.stringify(aUsuarios));
}

function actualizarNavbar(usuario) {
    let div = document.createElement('div');
    div.className = 'btn-group mx-3 px-3';
    div.innerHTML = `
    <button type="button" class="btn btn-primary">${usuario[0]}</button>
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
}