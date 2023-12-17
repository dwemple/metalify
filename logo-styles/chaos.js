let chaos;
let isSet;
function pickChaos(PosX, PosY, word) {
  translate(
    width / 2 - floor((currentTextWidth - fontSize) / 2),
    height / 2 + fontSize / 3
  );
  sampling = 0.15;
  if (!isSet) {
    chaos = new Chaos();
  }
  for (let t = 0; t < word.length; t++) {
    fill("black");
    push();
    translate(t * (fontSize / 1.3), floor(random(-3, 3) * 5));
    if (!isSet) {
      rndAmount = [];
      rndPoints = [];
      randomPoints = [];
      textInPoints = currentFont.textToPoints(word[t], 0, 0, fontSize, {
        sampleFactor: sampling,
      });
      for (let n = 0; n < textInPoints.length; n++) {
        rndAmount.push(floor(random(8, 15)));
        for (let r = 0; r < rndAmount[t]; r++) {
          randomPoints.push(random(-5, 5));
        }
        rndPoints.push(randomPoints);
        randomPoints = [];
      }
      chaos.addLetter(textInPoints, rndAmount, rndPoints);
    }
    text(word[t], PosX, PosY, 150, 150);
    drawChaos(
      chaos.letters[t],
      chaos.letters_number[t],
      chaos.letter_randomPoints[t],
      PosX,
      PosY
    );

    pop();
  }
  if (!isSet) isSet = true;
}

function drawChaos(points, amount, randomPoints, PosX, PosY) {
  for (let i = 0; i < points.length; i++) {
    if (random() < 0.5) {
      noStroke();
      push();
      fill("white");
      circle(points[i].x, points[i].y, floor(random(5, 10)));
      pop();
    }
    push();
    noFill();
    strokeWeight(3);
    stroke("black");
    translate(points[i].x + PosX, points[i].y + PosY);
    beginShape();
    for (let v = 0; v < amount[i]; v++) {
      x = points[i].x > fontSize / 2 ? 1 : -1;
      y = points[i].y > -1 * (fontSize / 2 - 10) ? 1 : -1;
      vertex(v * x + randomPoints[i][v], v * y * 3);
    }
    endShape();
    pop();
  }
  randomPoints = [];
}

class Chaos {
  constructor() {
    this.letters = [];
    this.letters_number = [];
    this.letter_randomPoints = [];
  }
  addLetter(letter, number, randomPoints) {
    this.letters.push(letter);
    this.letters_number.push(number);
    this.letter_randomPoints.push(randomPoints);
  }
}
