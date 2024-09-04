// Codigo de Yves Fogel para el liceo impulso en el curso de introduccion a Inteligencia Artificial
// Modifiquen este codigo como quieran, animense a romperlo
// Cualquier cosa me escriben a yvesfogel@gmail.com

let clasificador;

// Modificar este link por el de su modelo entrenado en Teachable Machine
let linkANuestroModelo = 'https://teachablemachine.withgoogle.com/models/Ga50pD9EL/'

// La funcion preload corre primero que nada cuando apretamos play. Aca cargamos todo lo que sea imagen, sonido, modelos
function preload(){
    clasificador = ml5.imageClassifier(linkANuestroModelo + 'model.json', modelReady);
}

// esta funcion nos va a avisar que el modelo esta cargado. Es opcional 
function modelReady() {
  console.log("Model Loaded!");
}

// Despues de correr preload() corre esta funcion una vez
function setup() {
  //
  createCanvas(600, 600);
  y=height/2;
  
  mic = new p5.AudioIn();
  mic.start();  
  clasificador.classifyStart(gotResult);


}

function draw() {
  background(220);
  fill(255, 0, 0);
  ellipse(x, y, 50, 50)
  x+=velX;
  y+=velY;
  
  if(detectarMuerte()){
    dead = true;
    mostrarMuerte()
  }
  
}

function mostrarMuerte(){
  background(0);
  textAlign(CENTER);
  fill(255)
  text("Perdiste. Presione R para reiniciar", width/2, height/2)
}

function detectarMuerte(){
  if(x > width || x < 0 || y > height || y < 0){
    return true
  } else{
    return false
  }
}

function reset(){
  dead = false;
  velX = speed;
  velY = 0;
  x = 0;
  y=height/2;

}

function gotResult(results) {
  console.log(results)
  label = results[0].label;
  console.log(label)
  //aca cambiamos tambien
  if(label != "Background Noise"){
    cambiarRumbo(label);
  }
}

// Aca esta el cambio grande
function cambiarRumbo(label) {
  if (label === "izquierda" && velX == 0) {
    velX = -speed;
    velY = 0;
  } else if (label === "derecha" && velX == 0) {
    velX = speed;
    velY = 0;
  } else if (label === "arriba" && velY == 0) {
    velY = -speed;
    velX = 0;
  } else if (label === "abajo" && velY == 0) {
    velY = speed;
    velX = 0;
  }
}

function keyPressed(){
  if (key == "r" && dead){
    console.log("R")
    reset()
  }
}