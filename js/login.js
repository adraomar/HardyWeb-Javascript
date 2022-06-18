const user = "test";
const pass = "test";

/* LOGIN SYSTEM */
function ingresarUsuario() {
    let usuario = prompt("> Ingrese nombre de usuario: ");
    let password = prompt("> Ingresar contraseña: ");

    let verificado = verificarUsuario(usuario, password);

    if (verificado) {
        alert("> Usuario conectado correctamente!");
    } else {
        alert("> Nombre de usuario y/o contraseña incorrecto!");
    }
}

function verificarUsuario(usuario, password) {
    let resultado;

    if (usuario == user && password == pass) {
        resultado = true;
    } else {
        resultado = false;
    }

    return resultado;
}