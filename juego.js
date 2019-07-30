/*Fuente: https://www.youtube.com/watch?v=g60iaQXW70Q */
//evento que esta a la escucha
document.addEventListener('keydown', function (evento) {
    if (evento.keyCode == "32") {
        console.log("salta");
    }
});


var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes() {
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src = 'img/trex.png'

}



var ancho = 700;
var alto = 300;

var canvas, ctx;

function inicializa() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}

function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}

function principal() {
    borraCanvas();
}


//---------------------------------------------------------------------
//BUCLE PRINCIPAL

var FPS = 10;

setInterval(function () {
    principal();
}, 1000 / 10);

function principal() {
    console.log("principal");
}


function principal() {

}