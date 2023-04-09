let canv, inp, inpText, inpWidth, letter_select, slider1, slider2,slider3,slider4,button1;
let textS = 50;
let r = 0;
let s = 50;
let l = 50;
let h = 0;

function setup() {
  createCanvas(windowWidth*0.6, windowHeight);
  
  inp = select("#textinput");
  slider1 = select('#slider1');
  slider2 = select('#slider2');
  slider3 = select('#slider3');
  slider4 = select('#slider4');

  button1 = select('#button1');
  button1.mousePressed(preset1);
  button2 = select('#button2');
  button2.mousePressed(preset2);
  button3 = select('#button3');
  button3.mousePressed(preset3);
  button4 = select('#button4');
  button4.mousePressed(preset4);

  buttonSave = select('#button-save');
  buttonSave.mousePressed(saveImage);

  colorMode(HSB);
  angleMode(DEGREES);
  textFont('Courier');
  textAlign(CENTER, CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth*0.6, windowHeight);
  background(220);
}

function draw() {
  background(0,0,10);
  s = slider1.value();
  l = slider2.value();
  r = slider3.value();
  h = slider4.value();
  inpText = String(inp.value());

  for(let i = 0; i<inpText.length; i++) {
  letter_select = inpText.charAt(i);
  charWidth = textWidth(inpText.charAt(i));
  inpWidth = charWidth*inpText.length + (inpText.length-1)*l;
  textS = s;
  textSize(textS); 

  push();
  translate(width/2-inpWidth/2+charWidth/2,height/2);
  push();
  if (letter_select === " "){
    translate((l)*i, 0);
  } else { 
    translate((charWidth+l)*i, 0);
  }
  rotate(r);
  fill(h,100,100);
  text(letter_select,0,0);
  pop();
  pop();
  }

}

function preset1(){
  s = slider1.value(80);
  l = slider2.value(20);
  r = slider3.value(100);
  h = slider4.value(180);
}

function preset2(){
  s = slider1.value(20);
  l = slider2.value(40);
  r = slider3.value(150);
  h = slider4.value(10);
}

function preset3(){
  s = slider1.value(60);
  l = slider2.value(10);
  r = slider3.value(90);
  h = slider4.value(30);
}

function preset4(){
  s = slider1.value(40);
  l = slider2.value(80);
  r = slider3.value(290);
  h = slider4.value(800);
}

function saveImage(){
  saveCanvas('savedImage', 'jpg')
}

