// Codigo de Yves Fogel para el liceo impulso en el curso de introduccion a Inteligencia Artificial
// Modifiquen este codigo como quieran, animense a romperlo
// Cualquier cosa me escriben a yvesfogel@gmail.com

let clasificador;
let mic;
let label = "cargando...";

// sustituir este link por su modelo entrenado con Teachable Machine. Opcional - pueden cargar su modelo local
let linkANuestroModelo = 'https://teachablemachine.withgoogle.com/models/Ga50pD9EL/'

// esta funcion corre primero que nada cuando apretamos play. Aca ponemos todo lo que sea cargar imagenes, sonidos, videos, modelos
function preload(){
    clasificador = ml5.soundClassifier(linkANuestroModelo + 'model.json', modelReady);

}

//cuando nuestro modelo esta cargado esta funcion nos avis. Solo para checkear
function modelReady() {
  console.log("Modelo cargado");
}

// despues de preload() el programa corre esta funcion una vez
function setup() {
  createCanvas(600, 600);
  
  // empezamos a grabar audio del microfono
  mic = new p5.AudioIn();
  mic.start();  
 
  // y le decimos al modelo que empiece a reconocer el sonido
  clasificador.classifyStart(clasficicarAudio);

}

// el modelo determina el sonido y pone las predicciones en results en esta funcion
function clasficicarAudio(results) {
  label = results[0].label;
  console.log(label)
}

// despues de setup, esta funcion empieza a correr en loop, una vez por cuadro. Cuando termina de procesarse vuelve al principio
function draw() {
  // cubrimos todo lo que habia anteriormente con gris
  background(220);
  
  let emoji = "🎧";
  // Elegimos un emoji depende de lo que reconocio el modelo
  if (label == "derecha") {
    emoji = "🚂";
  } else if (label == "arriba") {
    emoji = "🛎";
  } else if (label == "abajo") {
    emoji = "🎸";
  }
  
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  textSize(256);
  text(emoji, width / 2, height / 2);
  
}