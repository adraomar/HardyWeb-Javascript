const user = "test";
const pass = "test";
const carrito = [];
const productos = [];

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

/* PRODUCTOS SYSTEM*/
function generarID() {
    return parseInt(Math.random() * 10000);
}

function agregarProducto() {
    let nombre = prompt("> Ingrese el nombre del producto: ");
    let precio = prompt("> Ingrese el precio del producto: ");
    productos.push(new Producto(generarID(), nombre.toUpperCase(), precio));
    console.table(productos);
}

function buscarProducto() {
    let prod = prompt("> Ingrese el nombre del producto:")
    if (prod !== "") {
        let resultado = productos.find(p => p.nombre === prod.toUpperCase());
        console.table(resultado);
    } else {
        alert("ERROR: El nombre del producto no es válido.");
    }
}

function filtrarProducto() {
    let nomProd = prompt("> Ingrese parte del nombre de los productos a filtrar:");
    let resultado = productos.filter(p => p.nombre.includes(nomProd.toUpperCase()));
    console.table(resultado);
}

function existeProducto() {
    let codigo = parseInt(prompt("> Ingrese el código de producto:"));
    let existe = productos.some(p => p.id === codigo);
    if (existe) {
        alert("> Existe el código de producto");
    } else {
        alert("> No se encontró el código ingresado");
    }

}

/* CARRITO SYSTEM*/
function listarCarrito() {
    for(let producto of carrito) {
        console.table(producto);
    }
}

function agregarACarrito() {
    let producto = prompt("> Ingresar nombre del producto a agregar al carrito: ");
    if(producto !== "") {
        let resultado = productos.find(p => p.id === prod.toUpperCase());
        carrito.push(resultado);
    } else {
        alert("ERROR: El nombre del producto no es válido.");
    }
    console.table(carrito);
}

function eliminarDelCarrito() {
    let producto = prompt("> Ingrese el nombre del producto a quitar del carrito: ");
    let indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    console.table(carrito);
}