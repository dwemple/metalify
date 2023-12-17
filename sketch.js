let scl = 1;
let fontSize = 96;
let fontWeight = 500;
let SpeedX = 80;
let SpeedY = 30;
let PosX, PosY;
let fonts = [];
let currentFont;
let currentTextWidth;
let currentLogoStyle;
function preload() {
  let font = loadFont("../fonts/RubikMonoOne-Regular.otf");
  fonts.push(font);
  font = loadFont("../fonts/ShareTechMono-Regular.otf");
  fonts.push(font);
  font = loadFont("./assets/BobbiTheHippie.otf");
  fonts.push(font);
}
function setup() {
  createCanvas(1280, 340);
  textSize(fontSize);
  textFont(fonts[0]);
  textStyle(BOLD);
  noLoop();
}
function draw() {
  calculateTextSize();
  background("white");
  push();
  setMovement(false);
  pickStyle();
  pop();
}
function pickStyle() {
  switch (currentLogoStyle) {
    case "crunch":
      textFont(fonts[0]);
      currentFont = fonts[0];
      pickCrunch(PosX, PosY, textInput);
      break;
    case "spiky":
      textFont(fonts[0]);
      currentFont = fonts[0];
      pickSpiky(PosX, PosY, textInput);
      break;
    case "chaos":
      textFont(fonts[0]);
      currentFont = fonts[0];
      pickChaos(PosX, PosY, textInput);
      break;
    case "sticky":
      textFont(fonts[0]);
      currentFont = fonts[0];
      pickSticky(PosX, PosY, textInput);
      break;
    case "grain":
      textFont(fonts[0]);
      currentFont = fonts[0];
      pickGrain(PosX, PosY, textInput);
      break;
    default:
      textFont(fonts[0]);
      currentFont = fonts[0];
      pickChaos(PosX, PosY, textInput);
  }
}
function changeStyle(style) {
  if (style == "random") {
    chooseRandom = random(["crunch", "spiky", "chaos", "sticky"]);
    if (currentLogoStyle == chooseRandom) changeStyle(style);
    else {
      currentLogoStyle = chooseRandom;
    }
  } else {
    currentLogoStyle = style;
  }
  isSet = false;
  redraw();
}
function setMovement(isMoving) {
  PosX = isMoving ? map(sin(frameCount / SpeedX), -1, 1, -70, 70) : 0;
  PosY = isMoving ? map(sin(frameCount / SpeedY), -1, 1, -10, 10) : 0;
}
function calculateTextSize() {
  currentTextWidth = 0;
  for (let i = 0; i < textInput.length; i++) {
    currentTextWidth += textWidth(textInput[i]);
  }
}
function textChanged() {
  isSet = false;
  textInput = document.getElementById("user_input").value;
  redraw();
}
