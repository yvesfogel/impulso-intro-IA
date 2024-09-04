// rapidez
// estas variables son las globales
let speed = 3;
let velX = speed;
let velY = 0;
let x = 0;
let y;

let dead = false;

let linkANuestroModelo = 'https://teachablemachine.withgoogle.com/models/xPFL4UqWW/'

function preload(){
    classificador = ml5.soundClassifier(linkANuestroModelo + 'model.json');

}

function setup() {
  createCanvas(500, 500);
  y=height/2;
  //classifier.classify(gotResult);

}

function draw() {
  background(220);
  fill(255, 0, 0);
  ellipse(x, y, 50, 50)
  x+=velX;
  y+=velY;
  
  speed += 0.01;
  
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
  speed = 3;
  velX = speed;
  velY = 0;
  x = 0;
  y=height/2;

}

function keyPressed() {
  if (keyCode === LEFT_ARROW && velX == 0) {
    velX = -speed;
    velY = 0;
  } else if (keyCode === RIGHT_ARROW && velX == 0) {
    velX = speed;
    velY = 0;
  } else if (keyCode === UP_ARROW && velY == 0) {
    velY = -speed;
    velX = 0;
  } else if (keyCode === DOWN_ARROW && velY == 0) {
    velY = speed;
    velX = 0;
  } else if (key == "r" && dead){
    reset()
  }
}