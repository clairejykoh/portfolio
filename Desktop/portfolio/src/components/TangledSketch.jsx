import React, { useCallback, useRef } from "react";
import Sketch from "react-p5";

export default function TangledSketch() {
  const sRef = useRef({
    castleImage: null,
    buildings: [],
    stars: [],
    clouds: [],
    balls: [],
  });

  const preload = useCallback((p5) => {
    // Keep it in ref so it persists across draws
    sRef.current.castleImage = p5.loadImage("https://i.imgur.com/enlJeCX.png");
  }, []);

  const setup = useCallback((p5, canvasParentRef) => {
    p5.createCanvas(700, 526).parent(canvasParentRef);
    p5.frameRate(10);

    const s = sRef.current;
    s.buildings = Array.from({ length: 3 }, () => makeBuilding(p5, p5.random(p5.width)));
    s.stars = Array.from({ length: 150 }, () => makeStar(p5, p5.random(p5.width)));
    s.clouds = Array.from({ length: 5 }, () => makeCloud(p5, p5.random(p5.width)));
    s.balls = [];
  }, []);

  const draw = useCallback((p5) => {
    const s = sRef.current;
    p5.background(255);

    drawSkyGradient(p5);

    if (s.castleImage) {
      p5.image(s.castleImage, 20, 70, 120, 120);
    }

    // Stars
    updateAndDisplayStars(p5, s.stars);
    s.stars = s.stars.filter((st) => st.x > 0);
    if (p5.random(0, 1) < 0.5) s.stars.push(makeStar(p5, p5.width));

    // Hills / ground
    createHill(p5);
    drawWaterGradientRect(p5);
    createHillShadow(p5);

    // Buildings
    updateAndDisplayBuildings(p5, s.buildings);
    s.buildings = s.buildings.filter((b) => b.x + b.breadth + 30 > 0);
    if (p5.random(0, 1) < 0.009) s.buildings.push(makeBuilding(p5, p5.width));

    // Clouds
    updateAndDisplayClouds(p5, s.clouds);
    s.clouds = s.clouds.filter((c) => c.x + c.breadth + 30 > 0);
    if (p5.random(0, 1) < 0.02) s.clouds.push(makeCloud(p5, p5.width));

    // Balls (mouse trail)
    const nextBalls = [];
    for (const b of s.balls) {
      b.y += b.dy;
      b.display(p5);
      if (b.y > -80 && b.y < p5.height + 80) nextBalls.push(b);
    }
    s.balls = nextBalls;
  }, []);

  const mouseMoved = useCallback((p5) => {
    const s = sRef.current;
    s.balls.push(makeBall(p5, p5.mouseX, p5.mouseY, p5.random(-20, 20)));
  }, []);

  return <Sketch preload={preload} setup={setup} draw={draw} mouseMoved={mouseMoved} />;
}

/* ----------------------------
   SKY (fixed scoping)
---------------------------- */
function drawSkyGradient(p5) {
  const sky1 = p5.color(33, 25, 64);
  const sky2 = p5.color(6, 41, 100);
  const sky4 = p5.color(201, 159, 161);

  let yOffset = 0;

  const band1H = p5.height / 3.5;
  for (let y = 0; y <= band1H; y++) {
    const amt = p5.map(y, 0, band1H, 0, 1);
    p5.noStroke();
    p5.fill(p5.lerpColor(sky1, sky2, amt));
    p5.rect(0, yOffset + y, p5.width, 1);
  }
  yOffset += band1H;

  const band2H = p5.height / 2.5;
  for (let y = 0; y <= band2H; y++) {
    const amt = p5.map(y, 0, band2H, 0, 1);
    p5.noStroke();
    p5.fill(p5.lerpColor(sky2, sky4, amt));
    p5.rect(0, yOffset + y, p5.width, 1);
  }
  yOffset += band2H;

  const band3H = p5.height / 5;
  for (let y = 0; y <= band3H; y++) {
    const amt = p5.map(y, 0, band3H, 0, 1);
    p5.noStroke();
    p5.fill(p5.lerpColor(sky4, sky2, amt));
    p5.rect(0, yOffset + y, p5.width, 1);
  }
}

/* ----------------------------
   STARS
---------------------------- */
function updateAndDisplayStars(p5, stars) {
  for (const st of stars) {
    st.x -= st.speed;
    st.display(p5);
  }
}

function makeStar(p5, birthX) {
  return {
    x: birthX,
    breadth: p5.random(p5.width),
    speed: p5.random(0.1, 4),
    size: p5.random(2, 7),
    display(p) {
      p.fill(250, 254, 149);
      p.noStroke();
      // Keeping your original axis usage: rect(breadth, x, ...)
      p.rect(this.breadth, this.x, this.size, this.size * 1.5);
    },
  };
}

/* ----------------------------
   HILLS / WATER
---------------------------- */
function createHill(p5) {
  const forestDetail = 0.0005;
  const forestSpeed = 0.0005;

  for (let g = 0; g < p5.width; g++) {
    const h = g * forestDetail * 8 + (p5.millis() * forestSpeed) / 8;
    const i = p5.map(p5.noise(h), 0, 1, 40, 100);
    p5.stroke(30);
    p5.line(g, i + 100, g, p5.height - 80);
  }
}

function drawWaterGradientRect(p5) {
  const sky1 = p5.color(33, 25, 64);
  const sky6 = p5.color(246, 179, 124);

  const startY = 240;
  const gradH = p5.height / 5;

  for (let e = 0; e <= gradH; e++) {
    const amt = p5.map(e, 0, gradH, 0, 1);
    p5.noStroke();
    p5.fill(p5.lerpColor(sky6, sky1, amt));
    p5.rect(0, startY + e, p5.width, 1);
  }

  p5.noStroke();
  p5.fill(sky1);
  p5.rect(0, startY + gradH, p5.width, p5.height - (startY + gradH));
}

function createHillShadow(p5) {
  const forestDetail = 0.0005;
  const forestSpeed = 0.0005;

  p5.push();
  p5.translate(0, 480);
  p5.scale(1, -1);

  for (let g = 0; g < p5.width; g++) {
    const h = g * forestDetail * 8 + (p5.millis() * forestSpeed) / 8;
    const i = p5.map(p5.noise(h), 0, 1, 40, 100);
    p5.stroke(30, 70);
    p5.line(g, i + 150, g, p5.height - 80);
  }

  p5.pop();
}

/* ----------------------------
   BUILDINGS
---------------------------- */
function updateAndDisplayBuildings(p5, buildings) {
  for (const b of buildings) {
    b.x -= b.speed;
    b.display(p5);
  }
}

function makeBuilding(p5, birthX) {
  return {
    x: birthX,
    y: p5.random(10, 70),
    breadth: p5.random(60, 90),
    speed: p5.random(2, 3),
    R: p5.random(70, 90),
    G: p5.random(50, 70),
    B: p5.random(10, 40),
    nFloors: p5.round(p5.random(1, 1.5)),
    display(p) {
      const floorHeight = 20;
      const bHeight = this.nFloors * floorHeight;

      // body
      p.fill(this.R, this.G, this.B);
      p.noStroke();
      p.push();
      p.translate(this.x, p.height - this.y);
      p.rect(0, -bHeight, this.breadth, bHeight);
      p.triangle(-30, -bHeight, 0, -bHeight, 0, 0);
      p.triangle(this.breadth + 30, -bHeight, this.breadth, -bHeight, this.breadth, 0);
      p.pop();

      // reflection
      p.push();
      p.fill(this.R, this.G, this.B, 80);
      p.noStroke();
      p.translate(this.x, p.height - this.y);
      p.scale(1, -1);
      p.rect(0, -bHeight / 2, this.breadth, bHeight);
      p.triangle(-30, -bHeight / 2, 0, -bHeight / 2, 0, 0);
      p.triangle(
        this.breadth + 30,
        -bHeight / 2,
        this.breadth,
        -bHeight / 2,
        this.breadth,
        0
      );
      p.pop();
    },
  };
}

/* ----------------------------
   CLOUDS
---------------------------- */
function updateAndDisplayClouds(p5, clouds) {
  for (const c of clouds) {
    c.x -= c.speed;
    c.display(p5);
  }
}

function makeCloud(p5, birthX) {
  return {
    x: birthX,
    y: p5.random(10, 70),
    breadth: p5.random(60, 90),
    speed: p5.random(0.5, 1),
    transparency: p5.random(100, 200),
    display(p) {
      p.push();
      p.fill(255, this.transparency);
      p.noStroke();
      p.translate(this.x + 50, 100 + this.y);
      p.ellipse(0, 0, this.y, this.y * 0.5);
      p.pop();
    },
  };
}

/* ----------------------------
   BALLS (fixed: no this.xx/yy)
---------------------------- */
function makeBall(p5, x, y, dy) {
  return {
    x,
    y,
    dy,
    size: p5.random(4, 10),
    display(p) {
      p.fill(250, 254, 149);
      p.noStroke();
      p.rect(this.x, this.y, this.size, this.size * 1.5);
    },
  };
}