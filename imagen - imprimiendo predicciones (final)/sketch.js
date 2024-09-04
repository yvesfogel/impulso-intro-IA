// Codigo de Yves Fogel para el liceo impulso en el curso de introduccion a Inteligencia Artificial
// Modifiquen este codigo como quieran, animense a romperlo
// Cualquier cosa me escriben a yvesfogel@gmail.com


let clasificador;
let puntaje = 0;

// Modificar este link por el de su modelo entrenado en Teachable Machine
let linkANuestroModelo = 'https://teachablemachine.withgoogle.com/models/hIX8DtwRU/'

let label;

// La funcion preload corre primero que nada cuando apretamos play. Aca cargamos todo lo que sea imagen, sonido, modelos
function preload(){
    clasificador = ml5.imageClassifier(linkANuestroModelo + 'model.json', modelReady);

}
// esta funcion nos avisa que se cargo el modelo
function modelReady() {
  console.log("Modelo Cargado!");
}

// setup corre una vez cuando damos play, despues de preload
function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  // empezamos a clasificar video
  clasificador.classify(video, gotResult);
}

// cada vez que tenemos un resultado del modelo, se corre esta funcion y en results esta el resultado de la prediccion
function gotResult(results) {
  console.log(results);
  label = results[0].label;
  puntaje = results[0].confidence;
  
  // a este modelo hay que decirle que vuelva a correr despues que termina
  clasificador.classify(video, gotResult);
}

function draw() {
  background(0)
  textAlign(CENTER);
  fill(255)
  textSize(64)
  // imprimimos el resultado en la pantalla
  text(label, width/2, height/2);
    
}
