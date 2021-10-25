'use strict';
//VARIABLES //////////////////////////////////
var nombre, precio, unidades, mostrarPrecioFinal, mostrarTotalArticulos;
var tarjeta, efectivo, titularTarjeta, numTarjeta, cvvTarjeta;
////////////////////////////////
var articulos = new Array(0);
var precioFinal = 0;
////////////////////////////////
var metodoPago;
var condiciones;
//////////////////////////////// 
var imprimir, restablecer, addCarrito;

//ARRANQUE DEL PROGRAMA ////////////////////////////////// 
window.addEventListener("load", function () {
    ////////////BOTON AÑADIR AL CARRITO////////////////////
    addCarrito = document.getElementById("add");
    addCarrito.onclick = addToCarrito;
    /////////////SELECT METODO DE PAGO///////////////////
    metodoPago = document.getElementById("metodoPago");
    metodoPago.onchange = seleccionMetodoPago;
    ///////////ACEPTO CONDICIONES DE PAGO///////////////
    condiciones = document.getElementById("aceptoCondiciones");
    condiciones.onclick = aceptoCondicionesDeCompra;
    //////////IMPRIMIR CARRITO/////////////////////////////
    imprimir = document.getElementById("imprimir");
    imprimir.onclick = imprimirCarrito;
    ///////////BOTON RESTABLECER//////////////////////////
    restablecer = document.getElementById("restablecer");
    restablecer.onclick = reset;

});


//FUNCIONES //////////////////////////////////
function addToCarrito() {
    // @ts-ignore
    nombre = document.MiFormulario.nombre;
    // @ts-ignore
    precio = document.MiFormulario.precio;
    // @ts-ignore
    unidades = document.MiFormulario.unidades;
    // @ts-ignore
    mostrarPrecioFinal = document.MiFormulario.precioFinal;
    // @ts-ignore
    mostrarTotalArticulos = document.MiFormulario.articulos;
    ////////////////////////////////////////////////////////
    var valorprecio = Number.parseFloat(precio.value);
    ///////////////////////////////////////////////////////////
    if (nombre.value == "" && precio.value == "") {
        console.log("Error: Debes añadir un producto y su precio");
        //-------------------------------------
        nombre.style.border = "1px solid red";
        nombre.placeholder = "Debes añadir un producto";
        precio.style.border = "1px solid red";
        precio.placeholder = "Debes añadir el precio";
        //-------------------------------------
        nombre.focus();
        //-------------------------------------
        precio.style.outlineColor = "red";
        nombre.style.outlineColor = "red";
    } else if (precio.value == "" || Number.isNaN(valorprecio)) {
        console.log("Error: Debes añadir el precio del producto,en formato número");
        //-------------------------------------
        // @ts-ignore
        precio.style.outlineColor = "red";
        precio.placeholder = "Debes añadir el precio: 3.57";
        //-------------------------------------
        precio.focus();
        nombre.style.outlineColor = "black";
        nombre.style.border = "1px solid black";
        precio.value = "";
    } else if (nombre.value == "") {
        console.log("Debes añadir un producto");
        nombre.style.outlineColor = "red";
        nombre.placeholder = "Debes añadir un producto";
        //-------------------------------------
        nombre.focus();
        precio.style.outlineColor = "black";
    } else {
        ////////----------------------------------------------------------------
        var x = precio.value.replaceAll(new RegExp(/,/g), ".");
        //------------------------------------
        precioFinal = precioFinal + (Number.parseFloat(x) * Number.parseFloat(unidades.value));
        articulos.push(nombre.value);
        //--------------------
        nombre.value = "";
        precio.value = "";
        unidades.value = 1;
        //-------------------------------------
        nombre.style.border = "1px solid black";
        nombre.placeholder = "";
        nombre.style.outlineColor = "black";
        //-------------------------------------
        precio.style.border = "1px solid black";
        precio.placeholder = "";
        precio.style.outlineColor = "black";
        //-------------------------------------
        console.log("------------Precio y producto añadidos----------");
        console.log(articulos.toString());
        console.log(precioFinal);
        nombre.focus();
    }

    //--------------------
    mostrarTotalArticulos.value = articulos.toString();
    mostrarPrecioFinal.value = precioFinal.toFixed(2) + " €";


}

function seleccionMetodoPago() {
    //----------------------------------------------------------
    tarjeta = document.getElementById("tarjeta");
    efectivo = document.getElementById("efectivo");
    var importeEfectivo = document.getElementById("importeEfectivo");
    //-----------------------------------------------------------
    // @ts-ignore
    if (tarjeta.selected) {
        document.getElementById("datosTarjeta").style.display = "block";
        document.getElementById("datosEfectivo").style.display = "none";
        restaurarCkyButton();
        // @ts-ignore
    } else if (efectivo.selected) {
        document.getElementById("datosEfectivo").style.display = "block";
        document.getElementById("datosTarjeta").style.display = "none";
        // @ts-ignore
        importeEfectivo.value = precioFinal.toFixed(2) + " €";
        //----------------------------------------------
        // @ts-ignore
        document.getElementById("titularTarjeta").value = "";
        // @ts-ignore
        document.getElementById("numTarjeta").value = "";
        // @ts-ignore
        document.getElementById("cvvTarjeta").value = "";
        restaurarCkyButton();
    }
}

function aceptoCondicionesDeCompra() {
    //------------------------------------
    imprimir = document.getElementById("imprimir");
    //------------------------------------
    ////////////////////////////////////
    titularTarjeta = document.getElementById("titularTarjeta");
    numTarjeta = document.getElementById("numTarjeta");
    cvvTarjeta = document.getElementById("cvvTarjeta");
    // @ts-ignore
    if (condiciones.checked) {
        // @ts-ignore
        if (metodoPago.value == "Tarjeta") {
            // @ts-ignore
            if (titularTarjeta.value == "" && numTarjeta.value == "" && cvvTarjeta.value == "") {
                //////////////////////////////
                //---------TITULAR-----------
                titularTarjeta.style.outlineColor = "red";
                // @ts-ignore
                titularTarjeta.placeholder = "Debes añadir un nombre";
                titularTarjeta.focus();
                //---------NUMERO-----------
                numTarjeta.style.outlineColor = "red";
                // @ts-ignore
                numTarjeta.placeholder = "Debes añadir un nº";
                //---------CVV-----------
                cvvTarjeta.style.outlineColor = "red";
                // @ts-ignore
                cvvTarjeta.placeholder = "Debes añadir el CVV";
                //--------------------------
                restaurarCkyButton();
                // @ts-ignore
            } else if (numTarjeta.value == "") {
                //---------NUMERO-----------
                numTarjeta.style.outlineColor = "red";
                // @ts-ignore
                numTarjeta.placeholder = "Debes añadir un nº";
                numTarjeta.focus();
                //------------------------------
                restaurarCkyButton();
                // @ts-ignore
            } else if (cvvTarjeta.value == "") {
                //---------CVV-----------
                cvvTarjeta.style.outlineColor = "red";
                // @ts-ignore
                cvvTarjeta.placeholder = "Debes añadir el CVV";
                cvvTarjeta.focus();
                //--------------------------
                restaurarCkyButton();
                // @ts-ignore
            } else if (titularTarjeta.value == "") {
                //---------CVV-----------
                titularTarjeta.style.outlineColor = "red";
                // @ts-ignore
                titularTarjeta.placeholder = "Debes añadir un nombre";
                titularTarjeta.focus();
                //--------------------------
                restaurarCkyButton();
            } else {
                // @ts-ignore
                imprimir.disabled = false;
            }
        } else {
            // @ts-ignore
            imprimir.disabled = false;
        }

    } else {
        // @ts-ignore
        imprimir.disabled = true;
    }
}

function imprimirCarrito() {

    // @ts-ignore
    if (metodoPago.value == "") {
        alert("Debes selecionar un metodo de pago.");
    } else {
        alert("Estos son los articulos de tu carrito: " + articulos + "\n"
            + "Este es el precio total de tu carrito: " + precioFinal.toFixed(2) + " €\n"
            // @ts-ignore
            + "Metodo de pago: " + metodoPago.value);
    }
}

function restaurarCkyButton() {
    condiciones.checked = false;
}

function reset() {
    document.getElementById("datosEfectivo").style.display = "none";
    document.getElementById("datosTarjeta").style.display = "none";
}




