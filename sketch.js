
//trombetta ICONE
let sciarpaIcon, sciarpaBIcon, tut1Icon, tut2Icon, logor, freccia, sAlta, sBassa;; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione
let contBonus = 0; //conta quando p_coord arriva a 100

let feed_piattaforma = 0; //var piattaforma: quando alt!=1 viene incrementata
let input_utente = 200 //var utente usa la trobetta, preme bottone

let opacità = 210 //opacità rettangolo tutorial
let pronto //coordinzaione tutorial
/////////////////////////////////////////////////////////////////////////

function preload() {
  sciarpaBIcon = loadImage("./assets/immagini/sciarpa.png"); //sciarpa vuota bianca
  sciarpaIcon = loadImage("./assets/immagini/sciarpaViola.png"); //sciarpa scura
  tut1Icon = loadImage("./assets/immagini/Tutorial_Down.gif");
  tut2Icon = loadImage("./assets/immagini/Tutorial_Up.gif");
  logor = loadImage("./assets/immagini/logopiccolo.png"); //logo ridotto
  freccia = loadImage("./assets/immagini/freccia.png");
  sAlta = loadImage("./assets/immagini/Sciarpa_su.png");
  sBassa = loadImage("./assets/immagini/Sciarpa_giù.png");
  mdl = loadFromFiles("./assets/json/model.json"),
	wgh = loadFromFiles ("./assets/json/weights.bin")
	meta = loadFromFiles ("./assets/json/metadata.json")
}

/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta

}

/////////////////////////////////////////////////////////////////////////
function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

  w = width / 20;
  h = height / 50;

  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(16);
  fill('#877B85'); //4° colore PALETTE
  text('PARTITA COOD O1', w * 10, h * 5);
  fill('#B7AEB5'); //3° PALETTE
  textSize(13);
  text('SQUADRA1-SQUADRA2', w * 10, h * 6.5);

  //testo sotto
  textSize(14);
  textAlign(CORNER);
  text('BONUS', w * 1.2, h * 43);

  //logo a destra
  image(logor, w * 18.5, h * 6, logor.width / 4.5, logor.height / 4.5);
  //freccia
  image(freccia, w, h * 6, freccia.width / 6, freccia.height / 6);

  //BARRA COORDINAZIONE
  fill('#D5D0D3'); //barra grigia
  rectMode(CENTER);
  rect(w * 10, h * 45.5, width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  push();
  rectMode(CORNER);
  fill('#877B85'); //barra viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w * 10 - width / 7, h * 45.5 - 7.5, xBarra, 15, 20);
  pop();

  ///////////////BONUS//////////////////////////////////////////////////////////////

  if (p_coord === 80) {
    contBonus++;
  } //console.log('BONUS CONTATOR:' + contBonus);

  //pallini BONUS
  for (let i = 0; i < 6; i++) {
    if (contBonus === 3 || contBonus === 4 || contBonus === 5) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      pop();
    } else if (contBonus === 6 || contBonus === 7 || contBonus === 8) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      pop();
    } else if (contBonus === 9 || contBonus === 10 || contBonus === 11 || contBonus === 12 || contBonus === 13) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      pop();
    } else if (contBonus === 14 || contBonus === 15 || contBonus === 16 || contBonus === 17 || contBonus === 18) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      ellipse(w + 75, h * 45.5, 15);
      pop();
    }
    ellipse(w + s, h * 45.5, 15);
    s = 25 * i;
  }
  ///////////////////////////////////////////////////////////////

  //CONTATORE i DEL TEMPO
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++
  }

  //PER LA BARRA DELLA PERCENTUALE
  if (keyIsDown(ENTER) && i % 2 == 0) {
    p_coord = round((feed_piattaforma * input_utente) / 100);
  } else {
    p_coord = 0;
  }

  //PERCENTUALE
  push();
  textAlign(CORNER);
  fill('#B7AEB5'); //3° PALETTE
  text('COORDINAZIONE  ' + p_coord + ' %', w * 10, h * 43);
  pop();




  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
  //ICONA FEEDBACK DA SEGUIRE
  if (i % 2 != 0 && i > 3) {
    image(sciarpaBIcon, w * 10, h * 25, sciarpaBIcon.width / 6, sciarpaBIcon.height / 6); //chiara
    feed_piattaforma = 0;
  } else if (i % 2 == 0 && i > 3) { //cambio colore delle bottone centrale: feedback utente
    image(sciarpaIcon, w * 10, h * 25, sciarpaIcon.width / 6, sciarpaIcon.height / 6); // scura
    feed_piattaforma++;
  }

  //rettangolo in opacità
  push();
  rectMode(CORNER)
  fill(255, 255, 255, opacità);
  rect(0, 0, width, height);
  //rettangolo diventta trasparente alla fine del tutorial
  if (i > 3) {
    opacità = 0
  }
  pop();

  //TUTORIAL sciarpa

  if (i == 0 || i == 2) {
    image(tut2Icon, w * 10, h * 24.5, tut2Icon.width / 4, tut2Icon.height / 4);
    text('PORTA IN ALTO', w * 10, h * 31.5);
    text('Unisciti al ritmo degli altri', w * 10, h * 29.5);
    if (keyIsDown(ENTER)) {
      text('COORDINATO', w * 10, h * 33);
      p_coord = 70;
    }
  } else if (i == 1 || i == 3) {
    image(tut1Icon, w * 10, h * 24.5, tut1Icon.width / 4, tut1Icon.height / 4);
    text('PORTA IN BASSO', w * 10, h * 31.5);
    text('Unisciti al ritmo degli altri', w * 10, h * 29.5);

    if (keyIsDown(ENTER)) {
      text('NON COORDINATO', w * 10, h * 33);
      p_coord = 70;
    }
  }


  // FEED UTENTE (PALLINI COLORATI)
  if (keyIsDown(ENTER) && i % 2 == 0) { //alza la sciarpa
    input_utente = 200;
    push();
    tint(255, p_coord * 3.5); // Display at half opacity
    image(sAlta, width / 2, height / 2, sAlta.width / 3, sAlta.height / 3);
    pop();
  } else if (keyIsDown(ENTER) && i % 2 != 0) { //abbassa la sciarpa
    input_utente = 0;
    image(sBassa, width / 2, height / 2, sBassa.width / 3, sBassa.height / 3);
  } else {
    input_utente = 0;
    image(sBassa, width / 2, height / 2, sBassa.width / 3, sBassa.height / 3);
  }

}
///////FINE DRAW/////////////////////////////////////////////////////

//funzione trombetta
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
