import React from "react";
import Sketch from "react-p5";

export default function RoseSketch() {
  // p5 will be passed in as `p5`
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(700, 700).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.translate(p5.width / 2, p5.height / 2);

    drawStar(p5);
    drawRose(p5);
  };

  function drawStar(p5) {
    const flicker = p5.random(240, 255);
    const transparency = p5.random(100, 200);
    const gradient = p5.map(p5.mouseX, 0, p5.width, 0, 255);

    const a = p5.constrain(p5.mouseX, 50, 480);
    const n = p5.constrain(p5.mouseX, 50, 480);

    p5.push();
    p5.rotate(p5.mouseY / 300);

    if (a !== 480) {
      p5.fill(0);
      p5.strokeWeight(0.7);
      p5.stroke(200, 255 - gradient, 255 - gradient);
    } else {
      p5.fill(flicker, 200, 200, transparency);
      p5.strokeWeight(2);
      p5.stroke(255);
    }

    p5.beginShape();
    for (let t = 0; t <= 2 * p5.PI; t += p5.PI / 100) {
      const x = 0.5 * a * p5.cos(n * t);
      const y = 0.5 * a * p5.sin(n * t);
      p5.vertex(x, y);
    }
    p5.endShape();
    p5.pop();
  }

  function drawRose(p5) {
    const a = p5.map(p5.mouseX, 0, p5.width, 0, 40);
    const n = p5.map(p5.constrain(p5.mouseX, 0, p5.width), 0, p5.width, 0, 6);

    p5.noFill();
    p5.strokeWeight(1);
    p5.stroke(255);

    p5.push();
    p5.rotate(p5.mouseY / 300);

    p5.beginShape();
    for (let t = 0; t <= 2 * p5.PI; t += p5.PI / 100) {
      const r = a * p5.sin(n * t);
      const x = r * p5.cos(t);
      const y = r * p5.sin(t);
      p5.vertex(x, y);
    }
    p5.endShape();

    p5.pop();
  }

  return <Sketch setup={setup} draw={draw} />;
}