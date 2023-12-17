function pickGrain(x, y, word) {
  translate(
    width / 2 - floor(currentTextWidth / 1.73),
    height / 2 + fontSize / 3
  );
  let spaces = 0;
  sampling = 0.2;
  for (let t = 0; t < word.length; t++) {
    if (word[t] == " ") {
      spaces += fontSize / 2;
      continue;
    }
    push();
    fill("black");
    translate(t * fontSize - spaces, 0);
    text(word[t], x, y, 150, 150);
    pop();
  }
  runGrainFilter();
  spaces = 0;

  for (let t = 0; t < word.length; t++) {
    if (word[t] == " ") {
      spaces += fontSize / 2;
      continue;
    }
  }
}
function drawOverlay() {
  push();
  noFill();
  strokeWeight(2);
  stroke("white");
  translate(t * fontSize - spaces, 0);
  text(word[t], x, y, 150, 150);
  pop();
}
function runGrainFilter() {
  var wavinessX = 5;
  var wavinessY = 20;
  var periodX = 1;
  var periodY = 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let tempX = x + wavinessX * sin(x / periodX);
      let tempY = y + wavinessY * sin(y / periodY);
      let px = get(tempX, tempY);
      set(x, y, px);
    }
  }
  updatePixels();
}
