/* Carrusel comidas */
function cambio1(sen) {
    let carrusel = document.getElementById('comidas');
    carrusel.contador += sen;
    if (carrusel.contador == carrusel.lista.length) {
        carrusel.contador = 0;
    }
    else if (carrusel.contador < 0) {
        carrusel.contador = carrusel.lista.length - 1;
    }
    carrusel.src = carrusel.lista[carrusel.contador]
}
function reset1() {
    let carrusel = document.getElementById('comidas');
    carrusel.lista = new Array(
        'img/comidas/carbonada.jpg',
        'img/comidas/empanadas-saltenas.jpg',
        'img/comidas/humita-en-chala.jpg',
        'img/comidas/locro-salteño.jpg',
        'img/comidas/tamales_salteños.jpg');
    carrusel.contador = 0;
    carrusel.tempor = null;
    parar1();
    carrusel.src = carrusel.lista[0]
}
function parar1(car) {
    let carrusel = document.getElementById('comidas');
    if (carrusel.tempor != null)
        clearTimeout(carrusel.tempor);
}
function automat1(tiempo, inc = 1) {
    let carrusel = document.getElementById('comidas');
    clearTimeout(carrusel.tempor);
    cambio1(inc);
    carrusel.tempor = setTimeout(automat1, tiempo, tiempo, inc)
}

/* Carrusel restaurantes */
function cambio2(sen) {
    let carrusel = document.getElementById('restos');
    carrusel.contador += sen;
    if (carrusel.contador == carrusel.lista.length) {
        carrusel.contador = 0;
    }
    else if (carrusel.contador < 0) {
        carrusel.contador = carrusel.lista.length - 1;
    }
    carrusel.src = carrusel.lista[carrusel.contador]
}
function reset2() {
    let carrusel = document.getElementById('restos');
    carrusel.lista = new Array(
        'img/restos/B_Balderrama3.jpg',
        'img/restos/Doña_Salta.jpg',
        'img/restos/la-vieja-estacion.jpg',
        'img/restos/LaCasonaDelMolino.jpg',
        'img/restos/LaPanDelChuña.jpg');
    carrusel.contador = 0;
    carrusel.tempor = null;
    parar2();
    carrusel.src = carrusel.lista[0]
}
function parar2(car) {
    let carrusel = document.getElementById('restos');
    if (carrusel.tempor != null)
        clearTimeout(carrusel.tempor);
}
function automat2(tiempo, inc = 1) {
    let carrusel = document.getElementById('restos');
    clearTimeout(carrusel.tempor);
    cambio2(inc);
    carrusel.tempor = setTimeout(automat2, tiempo, tiempo, inc)
}
