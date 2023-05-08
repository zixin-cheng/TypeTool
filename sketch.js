let inp, inpText, letter_select, slider1, slider2,slider3,slider4,button1, colorLow, colorHigh, flipColor, shapeChoice, fillSet;
let inpWidth = 100;
let charWidth = 100;
let lineNum = 0;
let lineLength = 0;
let chatacters = [];
let charXposition = 0;
let lineXposition = 0;
let charYposition = 0;
let sw = 0;
let charSize = 50;
let spacing = 50;
let spd = 10;
let res = 0;
let layers = 0;
let colorSet2State = false;
let colorSet3State = false;
let spikesOn = true;

let x1 = 0;
let y1 = 0;
let x2ran = 0;
let y2ran = 0;
let x2 = 0;
let y2 = 0;

let pts;
let font;
let ticker = 0;

function preload(){
  font = loadFont('RobotoMono-Thin.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth*0.8, windowHeight);
  canvas.parent('canvasForHTML');
  
  inp = select("#textinput");
  slider1 = select('#slider1');
  slider2 = select('#slider2');
  slider3 = select('#slider3');
  slider4 = select('#slider4');
  slider5 = select('#slider5');
  slider6 = select('#slider6');
  slider7 = select('#slider7');
  slider8 = select('#slider8');
  slider9 = select('.range.color');
  slider9.hide();


  checkbox1 = select('#checkfill');
  checkbox1.changed(checkFill);
  buttonC1 = select('#buttonC1');
  buttonC1.mousePressed(colorSet1);
  buttonC2 = select('#buttonC2');
  buttonC2.mousePressed(colorSet2);
  buttonC3 = select('#buttonC3');
  buttonC3.mousePressed(colorSet3);

  checkbox2 = select('#checkspike');
  checkbox2.changed(spikes);
  buttonS1 = select('#buttonS1');
  buttonS1.mousePressed(shapeSet1);
  buttonS2 = select('#buttonS2');
  // buttonS2.mousePressed(shapeSet2);
  // buttonS3 = select('#buttonS3');
  // buttonS3.mousePressed(shapeSet3);
  buttonS4 = select('#buttonS4');
  buttonS4.mousePressed(shapeSet4);
  buttonS5 = select('#buttonS5');
  buttonS5.mousePressed(shapeSet5);

  button1 = select('#button1');
  button1.mousePressed(preset1);
  button2 = select('#button2');
  button2.mousePressed(preset2);
  button3 = select('#button3');
  button3.mousePressed(preset3);
  button4 = select('#button4');
  button4.mousePressed(preset4);

  buttonRan = select('#button-random');
  buttonRan.mousePressed(randomize);

  buttonSave = select('#button-save');
  buttonSave.mousePressed(saveImage);

  colorMode(HSB);
  colorLow = 0;
  colorHigh = 360;
  angleMode(DEGREES);
  textFont(font);
  textAlign(CENTER, CENTER);
  shapeChoice = TESS;
  fillSet = 0;
}

function windowResized() {
  resizeCanvas(windowWidth*0.8, windowHeight);
  background(0,0,0);
}

function draw() {
  charSizeSlider = slider1.value();
  // charSizeAni = charSize*abs((10*sin(frameCount*0.1)))
  spacingSlider = slider2.value();
  sw = slider3.value();
  spd = slider4.value();
  resSlider = slider5.value();
  layers = slider6.value();
  offset = slider7.value();
  wave = slider8.value();
  col = slider9.value();
  inpText = String(inp.value());

  if (colorSet2State || colorSet3State){
    slider9.show();
  } else{
    slider9.hide();
  }
  

  if (ticker%spd == 0){
    background(0,0,0);
  }
  // stroke(0,0,100)
  // line(width/2,0,width/2,height)

  for(let i = 0; i < inpText.length; i++) {
    
    spacing = spacingSlider;
    
    letter_select = inpText.charAt(i);
    charWidth = textWidth(inpText.charAt(i));
    lineChars = int((width)/((charWidth+spacing)))-1;
    charSize = charSizeSlider*(1+(sin(frameCount*0.8 + (i%lineChars)*20))*wave/3);
    offsetSize = charSize/10*offset;
    // offsetSize = (abs(sin(frameCount*0.5 + (i%5)*10))*(charSize/4));
    res = resSlider * map(charSize,50,300,2,1); 
    inpWidth = charWidth * ((inpText.length-1)%(lineChars)) + spacing * (((inpText.length-1)%lineChars)-1);
    inpHeight = int((inpText.length-1)/lineChars);
    inpWidthMax = charWidth * (lineChars-1) + spacing * (lineChars-2);

    lineNum = int(i/(lineChars));
    if (lineNum != int(inpText.length/(lineChars))){
      lineXposition = width/2-inpWidthMax/2-(charWidth+spacing)/2;      
    } else{
      lineXposition = width/2-inpWidth/2-(charWidth+spacing)/2;
    }
    let lineYposition = height/2+charSize/3-charSize*inpHeight/2;
      
    charXposition = (charWidth+spacing)*(i%(lineChars));
    charYposition = charSize*lineNum + ((sin(frameCount*0.8 + (i%lineChars)*20))*100)*wave;
   
    if (ticker%spd == 0){
      drawText(letter_select, font, 0 , 0.48 ,charSize, sw,res,layers, lineXposition+charXposition, lineYposition+charYposition, offsetSize, col);
    }  

  }
  ticker++;
  

}


function drawText(char,fontChoice,Lpoint,Hpoint,charSize,sw,res,layers,x,y, offsetSize, col){
  
  push();
  translate(-charSize/4,0);

  flipColor = random(1);
  for(let i = 0; i < layers; i++){
  // fill(random(360),100,100);
  if (colorSet2State){
    colorLow = col;
    colorHigh = col+60;
  }
  
  
  if (colorSet3State){
    if (flipColor > 0.5){
      colorLow = col;
      colorHigh = (col+50)%360;
    } else {
      colorLow = (col+180)%360;
      colorHigh = (col+230)%360;
    }
  }

  let currentColor = random(colorLow,colorHigh);
  fill(currentColor,100,100,fillSet)
  stroke(currentColor,100,100);
  strokeWeight(sw)
  
  
  let x1s = [];
  let y1s = [];
  let x1rans = [];
  let y1rans = [];
  let x1s2 = [];
  let y1s2 = [];
  let x1rans2 = [];
  let y1rans2 = [];
  let minDimension = min(width, height);
  let mid = textWidth(char);
  
  pts = fontChoice.textToPoints(char, x, y, charSize,{
    sampleFactor: random(0.01,0.02)*res,
    simplifyThreshold: 0
  });  
  
  //  let wtv = POINTS;
  //  console.log(shapeChoice[shapeSet])
beginShape(shapeChoice);
  for(let i = 0; i < pts.length; i++){
    if (i === 0) {
    x1 = pts[i].x;
    y1 = pts[i].y;
    x2 = pts[i+1].x;
    y2 = pts[i+1].y;
    }
  
    if (i < pts.length-1){
    x2ran = random(offsetSize);
    y2ran = random(offsetSize);

      if (x1rans[i-1] > 0){
        x2ran = random(offsetSize*-1, 0);
      } else {
        x2ran = random(offsetSize);
      }
      if (y1rans[i-1] > 0){
        y2ran = random(offsetSize*-1, 0);
      } else {
        y2ran = random(offsetSize);
      }

      // let d = dist(x1, y1, x2, y2);
      // // let d = ((x2 - x1)**2 + (y2 - y1)**2);
      // let maxd = (charSize/(res/500));
      // // console.log(maxd);
      // if (d > 20) {
      //   // stroke(currentColor,100,100,0);
      //   endShape(CLOSE);
      //   beginShape();
      // }
      if (spikesOn){
        line(x1+random(-5,0),y1+random(-5,0),x1+random(5),y1+random(5));
        line(x1+random(-5,0),y1+random(5),x1+random(5),y1+random(-5,0));
      }
        vertex(x1,y1);
      
      x1s.push(x2);
      y1s.push(y2);
      x1rans.push(x2ran);
      y1rans.push(y2ran);
         
      x1 = x1s[i];
      y1 = y1s[i];
      
      x2 = pts[i+1].x+x2ran;
      y2 = pts[i+1].y+y2ran;   
      }
     
  }
    endShape();
  
}
 pop();

}

function checkFill(){
  if (checkbox1.checked()) {
    fillSet = 1;
  } else {
    fillSet = 0;
  }
}

function spikes(){
  if (checkbox2.checked()) {
    spikesOn = true;
  } else {
    spikesOn = false;
  }
}

function colorSet1(){
  colorSet2State = false;
  colorSet3State = false;
  colorLow = 0;
  colorHigh = 360;
  slider9.hide();
  console.log("color1")
}

function colorSet2(){
  colorSet2State = true;
  colorSet3State = false;
  console.log("color2");
  slider9.show();
}

function colorSet3(){
  colorSet2State = false;
  colorSet3State = true;
  console.log("color3");
  slider9.show();
}

function shapeSet1(){
  shapeChoice = TESS;
}

// function shapeSet2(){
//   shapeChoice = POINTS;
// }

// function shapeSet3(){
//   shapeChoice = LINES;
// }

function shapeSet4(){
  shapeChoice = TRIANGLES;
}

function shapeSet5(){
  shapeChoice = QUAD_STRIP;
}


function preset1(){
  shapeChoice = TESS;
  colorSet1();
  fillSet = 0;
  charSize = slider1.value(100);
  spacing = slider2.value(70);
  sw = slider3.value(1);
  spd = slider4.value(10);
  res = slider5.value(5);
  layers = slider6.value(2);
  offset = slider7.value(1);
  wave = slider8.value(1);
  col = slider9.value(1);
  spikesOn = true;
}

function preset2(){
  shapeChoice = TRIANGLES;
  colorSet2();
  fillSet = 0;
  charSize = slider1.value(200);
  spacing = slider2.value(180);
  sw = slider3.value(0.5);
  spd = slider4.value(25);
  res = slider5.value(1);
  layers = slider6.value(2);
  offset = slider7.value(1);
  wave = slider8.value(1);
  col = slider9.value(180);
  spikesOn = false;
}

function preset3(){
  shapeChoice = QUAD_STRIP;
  colorSet3();
  fillSet = 0;
  charSize = slider1.value(250);
  spacing = slider2.value(200);
  sw = slider3.value(2.5);
  spd = slider4.value(40);
  res = slider5.value(2);
  layers = slider6.value(1);
  offset = slider7.value(1.5);
  wave = slider8.value(0);
  col = slider9.value(360);
  spikesOn = false;
}

function preset4(){
  shapeChoice = TRIANGLES;
  colorSet1();
  fillSet = 1;
  charSize = slider1.value(300);
  spacing = slider2.value(200);
  sw = slider3.value(0.5);
  spd = slider4.value(5);
  res = slider5.value(1);
  layers = slider6.value(2);
  offset = slider7.value(0.7);
  wave = slider8.value(0);
  col = slider9.value(random(0,300));
  spikesOn = false;
}

function randomize(){
  charSize = slider1.value(random(50,300));
  spacing = slider2.value(random(50,200));
  sw = slider3.value(random(0.5,5));
  spd = slider4.value(random(1,40));
  res = slider5.value(random(1,10));
  layers = slider6.value(random(1,10));
  offset = slider7.value(random(0.1,1.5));
  wave = slider8.value(random(1,2));
  col = slider9.value(random(0,300));
}



function saveImage(){
  saveCanvas('savedImage', 'jpg')
}

function myFunction() {
  let x = document.getElementById("UI");
  let btn = document.getElementById("button-hide");
  // btn.textContent = "O";
  if (x.style.display === "none") {
    x.style.display = "block";
    resizeCanvas(windowWidth*0.8, windowHeight);
    btn.textContent = "-";
    background(0,0,0);
  } else {
    x.style.display = "none";
    resizeCanvas(windowWidth, windowHeight);
    background(0,0,0);
    btn.textContent = "+";
  }
  
}