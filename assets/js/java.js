
// objeto: Productos con las propiedades id, nombre, descripcion, precio, imagen, promocio
class Producto {
    constructor(id, nombre, Descripcion, precio, imagen, promocion) {
        this.id = id;
        this.nombre = nombre;
        this.Descripcion = Descripcion;
        this.precio = precio; 
        this.imagen = imagen;
        this.promocion = promocion;
    }
}

// objeto: carrito con las propiedades id, nombre, precio, cantidad
class Carrito {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

//variables de los productos
const ListaProductos = [
    new Producto("001", "Platano", "Plátano Granel, 1 kg", 1400, "assets/img/Platano.png", "si"),
    new Producto("002", "Papas", "Papa Granel, 1 kg", 1800, "assets/img/Papas.png", "si"),
    new Producto("003", "Pimenton", "Pimenton rojo, 1 und.", 1690, "assets/img/Pimenton.png", "si"),
    new Producto("004", "Lechuga", "Lechuga Escarola, 1 und.", 1490, "assets/img/lechuga.png", "si"),
    new Producto("005", "Tomate", "Tomate larga vida, 1 kg", 1950, "assets/img/tomate.png", "si"),
    new Producto("006", "Cebolla", "Cebolla Granel, 1 kg", 1550, "assets/img/Cebollas.png", "si"),
    new Producto("007", "Manzana", "Manzana Fuji Granel, 1 kg", 2390, "assets/img/manzana.png", "si"),   
    new Producto("008", "Naranja", "Naranja Granel, 1 kg", 2290, "assets/img/naranja.png", "si")   
];

const ListaCarrito = [];


//Funcion para generar las tarjetas de los productos
function carga_inicial() {
    let total = 0.0;
    let cont = ListaProductos.length;
    let encabezado_tarjetas = false;
    let num_cards = 0;

    let contenedor = document.getElementById("contenedor");
    let contenido = '';
    contenedor.innerHTML = ''

    for (let i = 0; i < cont; i++) {
        if ((num_cards == 0) && (encabezado_tarjetas == false)) {
            contenido += '<div class="d-flex justify-content-around flex-wrap p-2 bd-highlight">';
            encabezado_tarjetas = true;
        }

        if (ListaProductos[i].promocion == "si") {
            contenido += '<div class="card shadow p-3 mb-5 bg-body rounded zoom-card" style="width: 18rem;">';
            contenido += '<img src="' + ListaProductos[i].imagen + '" class="card-img-top" alt="..." style="height: 200px">';
            contenido += '<div class="card-body">';
            contenido += '<h5 class="card-title">' + ListaProductos[i].nombre + '</h5>';
            contenido += '<p class="card-text">' + ListaProductos[i].Descripcion + '</p>';
            contenido += '</div>';
            contenido += '<div class="card-footer text-center"> Precio $' + ListaProductos[i].precio + '</div>';
            contenido += '<div class="text-center"><a href="#" class="btn btn-primary" onclick="agrega_carrito(\'' + ListaProductos[i].id + '\', 1, 0)">Agregar al carrito</a></div>';
            contenido += '</div>';
            num_cards++;
        }

        if (num_cards == 4) {
            contenido += '</div>';
            num_cards = 0;
            encabezado_tarjetas = false;
        }

    }
        if (num_cards !== 4) {
            contenido += '</div>';
        }

        contenedor.innerHTML = contenido;
    }

// reajustar altura del body
function resizeIframe() {
    let iframe = document.getElementById('frmBody');
    let contenido = iframe.contentWindow.document.body;
 
    iframe.style.height = contenido.scrollHeight + 'px';
}

//Funcion que actualiza el contador del carrito
function actualizarContadorCarrito() {
    const contador = calcular_cantidad_total();
    const contadorSpan = document.getElementById('contador-carrito');

    contadorSpan.innerText = contador > 0 ? contador : '';
}

// funcion para agregar productos al carrito
function agrega_carrito(id, cantidad, limpiar) {
    let resultado = ListaCarrito.find(obj => obj.id === id);

    if (resultado) {
        resultado.cantidad += 1;
    } else {
        let producto = ListaProductos.find(obj => obj.id === id);
        ListaCarrito.push(new Carrito(id, producto.nombre, producto.precio, cantidad));
        alert("Se ha agregado un producto al carrito de compras");
    }

// Actualizar el contador del carrito
    actualizarContadorCarrito();

    if (limpiar == 1) {
        ver_carrito();
    }
}

//funcion para disminuir la cantidad de productos en el carrito
function disminuye_carrito(id, cantidad) {
    for (let i = 0; i < ListaCarrito.length; i++) {
        if (ListaCarrito[i].id === id) {
            if (ListaCarrito[i].cantidad > 1) {
                ListaCarrito[i].cantidad -= cantidad;
            } else {
                elimina_producto(id);
            }
            break;
        }
    }

 // Actualizar el contador del carrito
    actualizarContadorCarrito();
    ver_carrito();
}

//funcion para eliminar un producto del carrito (una fila de productos)
function elimina_producto(id) {
    const index = ListaCarrito.findIndex(obj => obj.id === id);
    if (index !== -1) {
        ListaCarrito.splice(index, 1);
    }

    // Actualizar el contador del carrito
    actualizarContadorCarrito();
    ver_carrito();
}


 //funcion para calcular el precio total de la co,pra
function calcular_total() {
    let total = 0;
    for (let i = 0; i < ListaCarrito.length; i++) {
        let subtotal = ListaCarrito[i].cantidad * ListaCarrito[i].precio;
        total += subtotal;
    }
    return total;
}

//funcion para confirmar que se desea finalizar la compra
function finalizar_compra() {
    alert("Compra finalizada. ¡Gracias por elegirnos!");
}

//funcion que calcula la cantidad total de productos comprados para agregarlos al icono del carrito
function calcular_cantidad_total() {
    let cantidadTotal = 0;
    for (let i = 0; i < ListaCarrito.length; i++) {
        cantidadTotal += ListaCarrito[i].cantidad;
    }
    return cantidadTotal;
}


//funcion que muestra la tabla con los productos agregados al carrito
function ver_carrito() {
    let contenedor = document.getElementById('contenedor');

    contenedor.innerHTML = '';
    let contenido = '';

    contenido += '<h1>Carrito de compras</h1>';
    contenido += '<table class="table table-striped table-hover">';
    contenido += '<thead><tr>';
    contenido += '<th scope="col">Codigo</th>';
    contenido += '<th scope="col">Nombre</th>';
    contenido += '<th scope="col">Cantidad</th>';
    contenido += '<th scope="col">Precio</th>';
    contenido += '<th scope="col">Subtotal</th>';
    contenido += '<th scope="col"></th>';
    contenido += '</tr></thead><tbody>';

    let cont = ListaCarrito.length;

    for (let i = 0; i < cont; i++) {
        contenido += '<tr>';
        contenido += '<td>' + ListaCarrito[i].id + '</td>';
        contenido += '<td>' + ListaCarrito[i].nombre + '</td>';
        contenido += '<td>' + 
            ' <a href="#" onclick="disminuye_carrito(\'' + ListaCarrito[i].id + '\', 1)"><i class="bi bi-dash-square"></i></a>' +
            ' ' + ListaCarrito[i].cantidad + 
            ' <a href="#" onclick="agrega_carrito(\'' + ListaCarrito[i].id + '\', 1, 1)"><i class="bi bi-plus-square"></i></a></td>';
        contenido += '<td>$' + ListaCarrito[i].precio + '</td>';
        let subtotal = ListaCarrito[i].cantidad * ListaCarrito[i].precio;
        contenido += '<td>$' + subtotal + '</td>';
        contenido += '<td><button type="button" id="btnElimina" class="btn btn-danger" onclick="elimina_producto(\'' + ListaCarrito[i].id + '\')">Eliminar</button></td>';
        contenido += '</tr>';
    }
    
    contenido += '</tbody></table>'; 

    let total = calcular_total();
    contenido += '<h3 style="color: black;">Total: $' + total + '</h3>';
    contenido += '<button class="btn btn-success" onclick="finalizar_compra()"><i class="bi bi-check-circle"></i> Finalizar compra</button>';
    
    contenedor.innerHTML = contenido;
}

// Efecto de zoom en las cards del producto
document.addEventListener('mouseover', function (e) {
    if (e.target.closest('.zoom-card')) {
        let card = e.target.closest('.zoom-card');
        card.style.transition = 'transform 0.3s ease-in-out, z-index 0.3s ease-in-out';
        card.style.transform = 'scale(1.2)';
        card.style.zIndex = '10'; 
    }
});

document.addEventListener('mouseout', function (e) {
    if (e.target.closest('.zoom-card')) {
        let card = e.target.closest('.zoom-card');
        card.style.transform = 'scale(1)';
        card.style.zIndex = '1'; 
    }
});

//pie de pagina
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('footer').innerHTML = `
      <div class="container-fluid p-0">
        <div class="row text-center p-2 m-0">
          <div class="col">El Mercado Campesino, 2024</div>
          <div class="col">
            <a href="https://github.com/BastianMartinez01" target="_blank"><i class="fab fa-github-square fa-2x"></i></a>
            <a href="https://cl.linkedin.com/in/basti%C3%A1n-mart%C3%ADnez-inzunza-ba41302b5" target="_blank"><i class="fab fa-linkedin fa-2x"></i></a>
            <a href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter-square fa-2x"></i></a>
            <a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-square fa-2x"></i></a>
          </div>
        </div>
      </div>
    `;
});
