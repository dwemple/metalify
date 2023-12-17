let crunch;
let isCrunchSet = false;
function pickCrunch(x, y, word) {
  translate(
    width / 2 - floor((currentTextWidth - fontSize) / 2),
    height / 2 + fontSize / 3
  );
  sampling = 0.3;
  let spaces = 0;

  for (let t = 0; t < word.length; t++) {
    if (word[t] == " ") {
      spaces += fontSize / 2;
      continue;
    }
    push();
    fill("black");
    translate(t * (fontSize / 1.3) - spaces, floor(random(-3, 3) * 5));
    text(word[t], x, y, 150, 150);
    vertices = convertLetterToVertices(word[t]);
    createCrunch(vertices);
    pop();
  }
}
function createCrunch(letter) {
  for (let vertex = 0; vertex < letter.length; vertex++) {
    createDustEffect(letter[vertex]);
    cutOutFromCleanLines(letter[vertex]);
  }
}

function createDustEffect(point) {
  fill("black");
  if (random() < 0.1) {
    push();
    rect(point.x + random(-3, 3), point.y + random(-3, 3), 3);
    pop();
  }
}
function cutOutFromCleanLines(point) {
  fill("white");
  if (random() < 0.5) {
    push();
    noStroke();
    circle(point.x, point.y, floor(random(1, 10)));
    pop();
  }
}
function convertLetterToVertices(letter) {
  return currentFont.textToPoints(letter, 0, 0, fontSize, {
    sampleFactor: sampling,
  });
}
class Crunch {
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
