/*Fuente: https://www.youtube.com/watch?v=g60iaQXW70Q */
//evento que esta a la escucha
document.addEventListener("keydown", function(evento) {
  if (evento.keyCode == "32") {
    console.log("salta");
    if (nivel.muerto == false) saltar();
    else {
      nivel.velocidad = 9;
      nube.velocidad = 1;
      cactus.x = ancho + 100;
      nube.x = ancho + 100;
      nivel.puntuacion = 0;
      nivel.muerto = false;
    }
  }
});

var imgRex, imgNube, imgCactus, imgSuelo, imgFondo;

function cargaImagenes() {
  imgRex = new Image();
  imgNube = new Image();
  imgCactus = new Image();
  imgSuelo = new Image();
  imgFondo = new Image();

  imgRex.src = "img/trex.png";
  imgNube.src = "img/nube.png";
  imgCactus.src = "img/cactus.png";
  imgSuelo.src = "img/suelo3.jpg";
  imgFondo.src = "img/cielo.jpg";
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
var nivel = { velocidad: 9, marcador: 0, muerto: false };
var cactus = { x: ancho + 100, y: suelo - 34 };
var nube = { x: 400, y: 100, velocidad: 1 };
var suelog = { x: 0, y: suelo + 30 };
var fondo = { x: 0, y: 0 };

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
    nivel.marcador++;
  } else {
    cactus.x -= nivel.velocidad;
  }
}
//-------------------------------------------------------
function dibujaSuelo() {
  ctx.drawImage(imgSuelo, suelog.x, 0, 1024, 1024, 0, suelog.y, 1000, 100);
}

function logicaSuelo() {
  if (suelog.x > 300) {
    suelog.x = 0;
  } else {
    suelog.x += nivel.velocidad;
  }
}
//-------------------------------------------------------
function dibujaFondo() {
  ctx.drawImage(imgFondo, fondo.x, 0, 758, 442, 0, fondo.y, 700, 260);
}

function logicaFondo() {
  if ((fondo.x = 0)) {
    fondo.x = 0;
  } else {
    fondo.x += nivel.velocidad;
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
    nube.x -= nube.velocidad;
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

function colision() {
  if (cactus.x >= 100 && cactus.x <= 150) {
    if (trex.y >= suelo - 25) {
      nivel.muerto = true;
      nivel.velocidad = 0;
      nube.velocidad = 0;
    }
  }
}

function puntuacion() {
  ctx.font = "30 impact";
  ctx.fillstyle = "#555555";
  ctx.fillText(`${nivel.marcador}`, 600, 50);

  if (nivel.muerto == true) {
    ctx.font = "60px impact";
    ctx.fillText("PERDISTE BOLUDO", 150, 150);
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
  colision();
  logicaFondo();
  logicaSuelo();
  logicaCactus();
  logicaNube();
  dibujaFondo();
  dibujaSuelo();
  dibujaCactus();
  dibujaNube();
  dibujaRex();
  puntuacion();
}
