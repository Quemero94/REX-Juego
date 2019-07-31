/*Fuente: https://www.youtube.com/watch?v=g60iaQXW70Q */
//evento que esta a la escucha
document.addEventListener("keydown", function(evento) {
  if (evento.keyCode == "32") {
    console.log("salta");
    saltar();
  }
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes() {
  imgRex = new Image();
  imgNube = new Image();
  imgCactus = new Image();
  imgSuelo = new Image();

  imgRex.src = "img/trex.png";
  imgNube.src = "img/nube.png";
  imgCactus.src = "img/cactus.png";
  imgSuelo.src = "img/piso.png";
}

var ancho = 700;
var alto = 300;

var canvas, ctx;

function inicializa() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  cargaImagenes();
}

function borraCanvas() {
  canvas.width = ancho;
  canvas.height = alto;
}

/* Objetos*/

var suelo = 200;
//Objeto: atributos "y"=posicion inicial vertical  || "vy"= velocidad vertical || "gravedad" = le resta de a 2 a 'salto' || "salto" = se mueve a 28 px por fotograma || "vymax" = velocidad maxima ||
var trex = {
  y: suelo,
  vy: 0,
  gravedad: 2,
  salto: 28,
  vymax: 9,
  saltando: false
};
var nivel = { velocidad: 9, puntuacion: 0 };
var cactus = { x: ancho + 100, y: suelo - 34 };
var nube = { x: 400, y: 100 };

/*FIN Objetos*/

//-------------------------------------------------------
function dibujaRex() {
  ctx.drawImage(imgRex, 0, 0, 540, 380, 100, trex.y, 54, 38);
}

//-------------------------------------------------------
function dibujaCactus() {
  ctx.drawImage(imgCactus, 0, 0, 128, 256, cactus.x, cactus.y, 38, 75);
}

function logicaCactus() {
  if (cactus.x < -100) {
    cactus.x = ancho + 100;
  } else {
    cactus.x -= nivel.velocidad;
  }
}
//-------------------------------------------------------
function dibujaCactus() {
  ctx.drawImage(imgCactus, 0, 0, 128, 256, cactus.x, cactus.y, 38, 75);
}

function logicaCactus() {
  if (cactus.x < -100) {
    cactus.x = ancho + 100;
  } else {
    cactus.x -= nivel.velocidad;
  }
}
//-------------------------------------------------------
function dibujaNube() {
  ctx.drawImage(imgNube, 0, 0, 660, 390, nube.x, nube.y, 82, 31);
}

function logicaNube() {
  if (nube.x < -100) {
    nube.x = ancho + 100;
  } else {
    nube.x -= 2;
  }
}
//-------------------------------------------------------
function saltar() {
  trex.saltando = true;
  trex.vy = trex.salto;
}

function gravedad() {
  if (trex.saltando == true) {
    if (trex.y - trex.vy - trex.gravedad > suelo) {
      trex.saltando = false;
      trex.vy = 0;
      trex.y = suelo;
    } else {
      trex.vy -= trex.gravedad;
      trex.y -= trex.vy;
    }
  }
}

//---------------------------------------------------------------------
//BUCLE PRINCIPAL

var FPS = 50;

setInterval(function() {
  principal();
}, 1000 / FPS);

function principal() {
  borraCanvas();
  gravedad();
  logicaCactus();
  logicaNube();
  dibujaCactus();
  dibujaNube();
  dibujaRex();
}
