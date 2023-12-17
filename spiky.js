let spiky;
let isSpikySet = false;

function pickSpiky(x, y, word) {
  translate(
    width / 2 - floor(currentTextWidth / 1.7),
    height / 2 + fontSize / 3
  );
  let spaces = 0;
  sampling = 0.45;
  for (let t = 0; t < word.length; t++) {
    if (word[t] == " ") {
      spaces += fontSize / 2;
      continue;
    }
    push();
    fill("black");
    translate(t * fontSize - spaces, 0);
    text(word[t], x, y, 150, 150);
    textInPoints = fonts[0].textToPoints(word[t], 0, 0, fontSize, {
      sampleFactor: sampling,
    });
    drawSpiky(textInPoints, x, y);
    pop();
  }
}

function drawSpiky(points, x, y) {
  strokeWeight(3);
  stroke("black");
  beginShape();
  for (let i = 0; i < points.length; i++) {
    push();
    if (i % 7 == 1) {
      if (i + 3 >= points.length) {
        console.log(i);
        pop();
        vertex(points[0].x + x, points[0].y + y);
        endShape(CLOSE);
        return;
      }
      vecx = points[i + 3].x + x - fontSize / 2;
      vecy = points[i + 3].y + y + fontSize / 3;
      lenght = sqrt(vecx * vecx + vecy * vecy);
      inc = floor(random(2, 5));
      xoff = 4 * inc * (vecx / lenght);
      yoff = 4 * inc * (vecy / lenght);
      for (let j = -3; j < 3; j++) {
        if (i + 3 >= points.length) {
          pop();
          vertex(points[0].x + x, points[0].y + y);
          endShape(CLOSE);
          return;
        }
        vertex(
          points[++i].x + x + xoff / (abs(j) + 1),
          points[i].y + y + yoff / (abs(j) + 1)
        );
      }
    } else {
      vertex(points[i].x + x, points[i].y + y);
    }
    pop();
  }
  vertex(points[0].x, points[0].y);
  endShape(CLOSE);
}
