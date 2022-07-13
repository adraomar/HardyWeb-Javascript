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
            })
            contenedorBotonesIngreso.removeChild(botonIngresar);
            contenedorBotonesIngreso.removeChild(botonRegistrar);
            
            let h3 = document.createElement('h3');
            h3.className = 'h3 text-light';
            h3.innerText = `${result.value.login}`;
            contenedorBotonesIngreso.appendChild(h3);
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