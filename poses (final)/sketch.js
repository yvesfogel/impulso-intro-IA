// Codigo de Yves Fogel para el liceo impulso en el curso de introduccion a Inteligencia Artificial
// Modifiquen este codigo como quieran, animense a romperlo
// Cualquier cosa me escriben a yvesfogel@gmail.com

let video;
let bodyPose;
let poses = [];
let connections;

// La funcion preload corre primero que nada cuando apretamos play. Aca cargamos todo lo que sea imagen, sonido, modelos
function preload() {
  bodyPose = ml5.bodyPose();
}

// la funcion start() corre una vez cuando damos play, despues de preload()
function setup() {
  createCanvas(640, 480);

  // empezamos captura de la webcam
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // empezamos a detectar la imagen
  bodyPose.detectStart(video, gotPoses);
}

// cuando detecta una pose, se corre este modelo y enr esults esta la prediccion
function gotPoses(results) {
  poses = results;
}

// la funcion draw() corre en loop
function draw() {
  image(video, 0, 0, width, height);

  // elegimos la primer pose. Si queremos detectar mas de una persona prodemos
  let pose = poses[0];
  if (pose){
    // dibujamos un circulo para cada punto detectado
    for (let j = 0; j < pose.keypoints.length; j++){
      let keypoint = pose.keypoints[j];
      console.log(keypoint)
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}
