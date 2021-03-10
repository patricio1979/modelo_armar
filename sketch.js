/*
En un cuadrado presentaremos un pentagrama.
A un lado habran 5 imagenes que hay que organizar.
Una vez que el usuario determine que estan organizadas, un boton enviara las posiciones x,y de cada uno.
De esta forma se podra evaluar la legibilidad, mediante el algoritmo matemmatico que fue definido en el marco teorico.
*/

//pantalla
let s_height = 400, s_width = 400, size_w = (s_width/12), size_h = (s_height/20), size = 0.35;

//notacion
let acento, clave_sol, cuarto, fff, sostenido;
//genera imagenes
let im_clave, im_cuarto, im_acento, im_fff, im_sostenido;
//coordenadas de la notacion
let clave_sol_x = 0, clave_sol_y = 0, cuarto_x = 0, cuarto_y = (clave_sol_y + size_h + (341 * size)), acento_x = 0, acento_y = (cuarto_y + size_h + (197 * size)), fff_x = 0, fff_y = (acento_y + size_h + (54 * size)), sostenido_x = 0, sostenido_y = (fff_y + size_h + (113 * size));

//botones
let botonito, botonitoDos;
let cambio = false;

//comentario
var cuerda = 'evaluar';

//Huffman 2 bits
let aCount = 0, bCount = 0, cCount = 0, dCount = 0;

//delay
let startT, delayTime = 100;

//posicion relativa del mouse
let actX, actY;
// esta el mouse presionado sobre la notacion?
let over_clave=false, over_cuarto=false, over_acento=false, over_fff=false, over_sostenido=false;

//teclas
let desplazamiento = 1;

function preload() {
    acento = loadImage('notacion/acento.png'); //dims 79, 54
    clave_sol = loadImage('notacion/clave_sol.png'); // 126, 341
    cuarto = loadImage('notacion/cuarto.png'); // 62, 197
    fff = loadImage('notacion/fff.png'); // 192, 113
    sostenido = loadImage('notacion/sostenido.png'); // 45, 154
}

function setup() {
  pixelDensity(1);
  cnv = createCanvas(s_width, s_height);
  cnv.position(10, 10);
  startT=millis();
  resetSketch();

  //--- boton comienzo
  botonitoDos = createButton('comenzar');
  botonitoDos.position(s_width + 20, 10);
  botonitoDos.mousePressed(resetSketch);
}

function draw() {
  background(255);

  //marco
  fill(255);
  stroke(2);
  rect(0, 0, s_width, s_height);

  //--- lineas de compas
  line( size_w*2, size_h*7, size_w*10, size_h*7 );
  line( size_w*2, size_h*8, size_w*10, size_h*8 );
  line( size_w*2, size_h*9, size_w*10, size_h*9 );
  line( size_w*2, size_h*10, size_w*10, size_h*10 );
  line( size_w*2, size_h*11, size_w*10, size_h*11 );
  stroke(0);
  strokeWeight(2);

  //--- notacion
  im_clave = image(clave_sol, clave_sol_x, clave_sol_y, (126 * size), (341 * size));
  im_cuarto = image(cuarto, cuarto_x, cuarto_y, (62 * size), (197 * size));
  im_acento = image(acento, acento_x, acento_y, (79 * size), (54 * size));
  im_fff = image(fff, fff_x, fff_y, (192 * size), (113 * size));
  im_sostenido = image(sostenido, sostenido_x, sostenido_y, (45 * size), (154 * size));
  im_clave;
  im_cuarto;
  im_acento:
  im_fff;
  im_sostenido;

  //--- boton evaluacion
  botonito = createButton(cuerda);
  botonito.position(s_width + 20, s_height - 15);
  botonito.mousePressed(posiciones);

  //--- teclas presionadas
  if (keyIsDown(UP_ARROW)) {
    //mover notacion arriba
    if (over_clave) {
      clave_sol_y -= desplazamiento;
    } else if (over_cuarto) {
      cuarto_y -= desplazamiento;
    } else if (over_acento) {
      acento_y -= desplazamiento;
    } else if (over_fff) {
      fff_y -= desplazamiento;
    } else if (over_sostenido) {
      sostenido_y -= desplazamiento;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    //mover notacion abajo
    if (over_clave) {
      clave_sol_y += desplazamiento;
    } else if (over_cuarto) {
      cuarto_y += desplazamiento;
    } else if (over_acento) {
      acento_y += desplazamiento;
    } else if (over_fff) {
      fff_y += desplazamiento;
    } else if (over_sostenido) {
      sostenido_y += desplazamiento;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    //mover notacion izquierda
    if (over_clave) {
      clave_sol_x -= desplazamiento;
    } else if (over_cuarto) {
      cuarto_x -= desplazamiento;
    } else if (over_acento) {
      acento_x -= desplazamiento;
    } else if (over_fff) {
      fff_x -= desplazamiento;
    } else if (over_sostenido) {
      sostenido_x -= desplazamiento;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    //mover notacion derecha
    if (over_clave) {
      clave_sol_x += desplazamiento;
    } else if (over_cuarto) {
      cuarto_x += desplazamiento;
    } else if (over_acento) {
      acento_x += desplazamiento;
    } else if (over_fff) {
      fff_x += desplazamiento;
    } else if (over_sostenido) {
      sostenido_x += desplazamiento;
    }
  }
  //tecla shift
  if (keyIsDown(SHIFT)) {
    desplazamiento = 10;
  } else {
    desplazamiento = 1;
  }
}

function resetSketch(){
  clave_sol_x = 0, clave_sol_y = 0, cuarto_x = 0, cuarto_y = (clave_sol_y + size_h + (341 * size)), acento_x = 0, acento_y = (cuarto_y + size_h + (197 * size)), fff_x = 0, fff_y = (acento_y + size_h + (54 * size)), sostenido_x = 0, sostenido_y = (fff_y + size_h + (113 * size));
  cuerda = 'evaluar';
  startT = millis();
  cambio = true;
}

function posiciones(){
  cuerda = 'procesando, no cierres';
  noLoop();
  loadPixels();

  //orden para barrer imagen y buscar pares comunes
  setTimeout(barrer, 500);

  //tomamos el delta
  if (cambio == true) {
    startT = millis() - startT;
  }
  cambio = false;
}

function barrer(){
  var lista = [];

  //barremos imagen y comparamos por pares
  for (i = 0; i < (s_height); i++){
    for (j = 0; j < (s_width*4); j+=8){

      if (pixels[i+j] != 255){ //si es negro
        if (pixels[i+j+4] != 255) { //y si el que sigue (+4) tambien es negro
          aCount++; //0 0
        } else { //si el que sigue no es negro
          bCount++; //0 255
        }
      } else { //si es blanco
        if (pixels[i+j+4] == 255) { //si el que sigue tambien es blanco
          dCount++; //255 255
        } else { //si el que sigue no es blanco
          cCount++; //255 0
        }
      }
    }
  }

  //copiamos al clipboard las variables XY
  lista.push(clave_sol_x,clave_sol_y,cuarto_x,cuarto_y,acento_x,acento_y,fff_x,fff_y,sostenido_x,sostenido_y, aCount, bCount, cCount, dCount, startT);
  setTimeout(copyToClipboard(lista), 1000);

  //mensaje para terminar
  cuerda = 'Listo, pega el texto en el chat';

  print(aCount,bCount,cCount,dCount);
  loop();
}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function mousePressed(){
  //print(actX,actY);
  if ((mouseX>clave_sol_x)&&(mouseX<(clave_sol_x+(126 * size)))&&(mouseY>clave_sol_y)&&(mouseY<(clave_sol_y+(341 * size)))){
    //print("tocaste clave de sol")
    actX = mouseX - clave_sol_x;
    actY = mouseY - clave_sol_y;
    over_clave = true;
    over_cuarto = false;
    over_acento = false;
    over_fff = false;
    over_sostenido = false;
  } else if((mouseX>cuarto_x)&&(mouseX<(cuarto_x+(62 * size)))&&(mouseY>cuarto_y)&&(mouseY<(cuarto_y + (197 * size)))) {
    //print("tocaste cuarto")
    actX = mouseX - cuarto_x;
    actY = mouseY - cuarto_y;
    over_clave = false;
    over_cuarto = true;
    over_acento = false;
    over_fff = false;
    over_sostenido = false;
  } else if((mouseX > acento_x)&&(mouseX < (acento_x + (79 * size)))&&(mouseY > acento_y)&&(mouseY<(acento_y + (54 * size)))) {
    //print("tocaste acento")
    actX = mouseX - acento_x;
    actY = mouseY - acento_y;
    over_clave = false;
    over_cuarto = false;
    over_acento = true;
    over_fff = false;
    over_sostenido = false;
  } else if((mouseX > fff_x)&&(mouseX < (fff_x + (192 * size)))&&(mouseY > fff_y)&&(mouseY < (fff_y + (113 * size)))) {
    //print("tocaste fff")
    actX = mouseX - fff_x;
    actY = mouseY - fff_y;
    over_clave = false;
    over_cuarto = false;
    over_acento = false;
    over_fff = true;
    over_sostenido = false;
  } else if((mouseX>sostenido_x)&&(mouseX<(sostenido_x + (45 * size)))&&(mouseY > sostenido_y)&&(mouseY < (sostenido_y + (154 * size)))) {
    //print("sostenido")
    actX = mouseX - sostenido_x;
    actY = mouseY - sostenido_y;
    over_clave = false;
    over_cuarto = false;
    over_acento = false;
    over_fff = false;
    over_sostenido = true;
  } else {
    over_clave = false;
    over_cuarto = false;
    over_acento = false;
    over_fff = false;
    over_sostenido = false;
  }
}

function mouseDragged(){
  if (over_clave){
    clave_sol_x = mouseX - actX;
    clave_sol_y = mouseY - actY;
  } else if (over_cuarto){
    cuarto_x = mouseX - actX;
    cuarto_y = mouseY - actY;
  } else if (over_acento){
    acento_x = mouseX - actX;
    acento_y = mouseY - actY;
  } else if (over_fff){
    fff_x = mouseX - actX;
    fff_y = mouseY - actY;
  } else if (over_sostenido){
    sostenido_x = mouseX - actX;
    sostenido_y = mouseY - actY;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowWidth = s_width;
  windowHeight = s_height;
}
