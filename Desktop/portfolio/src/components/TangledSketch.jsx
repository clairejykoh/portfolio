
import React, { useEffect, useRef } from "react";
import p5 from "p5";

export default function TangledSketch() {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) return;

    const sketch = (p) => {
      // --- sketch state (was global in your code) ---
      let terrainSpeed = 0.0005;
      let terrainDetail = 0.01;

      let buildings = [];
      let stars = [];
      let balls = [];
      let clouds = [];

      let castleImage;

      // ---------------- p5 lifecycle ----------------
      p.preload = () => {
        castleImage = p.loadImage("../assets/huguenot.png");
      };

      p.setup = () => {
        p.createCanvas(600, 426);
        p.frameRate(10);

        for (let i = 0; i < 3; i++) {
          const rx = p.random(p.width);
          buildings[i] = makeBuilding(rx);
        }

        for (let g = 0; g < 150; g++) {
          const ry = p.random(p.width);
          stars[g] = makeStar(ry);
        }

        for (let h = 0; h < 5; h++) {
          const rz = p.random(p.width);
          clouds[h] = makeCloud(rz);
        }
      };

      p.draw = () => {
        p.background(255);

        // --- sky gradient ---
        const sky1 = p.color(33, 25, 64);
        const sky2 = p.color(6, 41, 100);
        const sky4 = p.color(201, 159, 161);
        const sky6 = p.color(246, 179, 124);

        // 1) top band
        let yOffset = 0;
        const band1H = p.height / 3.5;
        for (let c = 0; c <= band1H; c += 1) {
          const amt = p.map(c, 0, band1H, 0, 1);
          const col = p.lerpColor(sky1, sky2, amt);
          p.noStroke();
          p.fill(col);
          p.rect(0, yOffset + c, p.width, 1);
        }
        yOffset += band1H;

        // 2) middle band
        const band2H = p.height / 2.5;
        for (let d = 0; d <= band2H; d += 1) {
          const amt = p.map(d, 0, band2H, 0, 1);
          const col = p.lerpColor(sky2, sky4, amt);
          p.noStroke();
          p.fill(col);
          p.rect(0, yOffset + d, p.width, 1);
        }
        yOffset += band2H;

        // 3) small band
        const band3H = p.height / 5;
        for (let e = 0; e <= band3H; e += 1) {
          const amt = p.map(e, 0, band3H, 0, 1);
          const col = p.lerpColor(sky4, sky2, amt);
          p.noStroke();
          p.fill(col);
          p.rect(0, yOffset + e, p.width, 1);
        }

        // --- foreground elements ---
        if (castleImage) p.image(castleImage, 20, 70, 120, 120);

        updateAndDisplayStars();
        removeStarsThatHaveSlippedOutOfView();
        addNewStarsWithSomeRandomProbability();

        createHill();
        drawRectangle();
        createHillShadow();

        updateAndDisplayBuildings();
        removeBuildingsThatHaveSlippedOutOfView();
        addNewBuildingsWithSomeRandomProbability();

        updateAndDisplayClouds();
        removeCloudsThatHaveSlippedOutOfView();
        addNewCloudsWithSomeRandomProbability();

        // --- balls (mouse trail) ---
        const newBalls = [];
        for (let i = 0; i < balls.length; i++) {
          const b = balls[i];
          b.speedy();
          b.display();
          // keep them if still visible (optional; otherwise array grows forever)
          if (b.y > -60 && b.y < p.height + 60) newBalls.push(b);
        }
        balls = newBalls;
      };

      p.mouseMoved = () => {
        const newBall = makeBall(p.mouseX, p.mouseY, p.random(-20, 20));
        balls.push(newBall);
      };

      // ---------------- Stars ----------------
      function updateAndDisplayStars() {
        for (let i = 0; i < stars.length; i++) {
          stars[i].move();
          stars[i].display();
        }
      }

      function removeStarsThatHaveSlippedOutOfView() {
        const keep = [];
        for (let i = 0; i < stars.length; i++) {
          if (stars[i].x > 0) keep.push(stars[i]);
        }
        stars = keep;
      }

      function addNewStarsWithSomeRandomProbability() {
        const newStarLikelihood = 0.5;
        if (p.random(0, 1) < newStarLikelihood) {
          stars.push(makeStar(p.width));
        }
      }

      function starMove() {
        this.x -= this.speed;
      }

      function starDisplay() {
        p.fill(250, 254, 149);
        // Your original draws: rect(breadth, x, size, size*1.5)
        // Keeping that (even though x/y naming is unusual)
        p.noStroke();
        p.rect(this.breadth, this.x, this.size, this.size * 1.5);
      }

      function makeStar(birthLocationX) {
        return {
          x: birthLocationX,
          y: p.random(10, 70),
          breadth: p.random(p.width),
          breadthy: p.random(p.height),
          speed: p.random(0.1, 4),
          move: starMove,
          display: starDisplay,
          size: p.random(2, 7),
        };
      }

      // ---------------- Terrain / Hills ----------------
      function createHill() {
        const forestDetail = 0.0005;
        const forestSpeed = 0.0005;

        for (let g = 0; g < p.width; g++) {
          const h = g * forestDetail * 8 + (p.millis() * forestSpeed) / 8;
          const i = p.map(p.noise(h), 0, 1, 40, 100);
          p.stroke(30);
          p.line(g, i + 100, g, p.height - 80);
        }
      }

      function drawRectangle() {
        const sky1 = p.color(33, 25, 64);
        const sky6 = p.color(246, 179, 124);

        const rectStartY = 240;
        const gradH = p.height / 5;

        for (let e = 0; e <= gradH; e += 1) {
          const amt = p.map(e, 0, gradH, 0, 1);
          const col = p.lerpColor(sky6, sky1, amt);
          p.noStroke();
          p.fill(col);
          p.rect(0, rectStartY + e, p.width, 1);
        }

        p.fill(sky1);
        p.rect(0, rectStartY + gradH, p.width, p.height - (rectStartY + gradH));
      }

      function createHillShadow() {
        const forestDetail = 0.0005;
        const forestSpeed = 0.0005;

        p.push();
        p.translate(0, 480);
        p.scale(1, -1);

        for (let g = 0; g < p.width; g++) {
          const h = g * forestDetail * 8 + (p.millis() * forestSpeed) / 8;
          const i = p.map(p.noise(h), 0, 1, 40, 100);
          p.stroke(30, 70);
          p.line(g, i + 150, g, p.height - 80);
        }

        p.pop();
      }

      // ---------------- Buildings ----------------
      function updateAndDisplayBuildings() {
        for (let i = 0; i < buildings.length; i++) {
          buildings[i].move();
          buildings[i].display();
        }
      }

      function removeBuildingsThatHaveSlippedOutOfView() {
        const keep = [];
        for (let i = 0; i < buildings.length; i++) {
          if (buildings[i].x + buildings[i].breadth + 30 > 0) keep.push(buildings[i]);
        }
        buildings = keep;
      }

      function addNewBuildingsWithSomeRandomProbability() {
        const newBuildingLikelihood = 0.009;
        if (p.random(0, 1) < newBuildingLikelihood) {
          buildings.push(makeBuilding(p.width));
        }
      }

      function buildingMove() {
        this.x -= this.speed;
      }

      function buildingDisplay() {
        const floorHeight = 20;
        const bHeight = this.nFloors * floorHeight;

        // main
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
      }

      function makeBuilding(birthLocationX) {
        return {
          x: birthLocationX,
          cloudx: p.random(p.width),
          y: p.random(10, 70),
          breadth: p.random(60, 90),
          speed: p.random(2, 3),
          cloudspeed: p.random(0.5, 1),
          R: p.random(70, 90),
          G: p.random(50, 70),
          B: p.random(10, 40),
          transparency: p.random(100, 200),
          nFloors: p.round(p.random(1, 1.5)),
          move: buildingMove,
          display: buildingDisplay,
        };
      }

      // ---------------- Clouds ----------------
      function updateAndDisplayClouds() {
        for (let i = 0; i < clouds.length; i++) {
          clouds[i].move();
          clouds[i].display();
        }
      }

      function removeCloudsThatHaveSlippedOutOfView() {
        const keep = [];
        for (let i = 0; i < clouds.length; i++) {
          if (clouds[i].x + clouds[i].breadth + 30 > 0) keep.push(clouds[i]);
        }
        clouds = keep;
      }

      function addNewCloudsWithSomeRandomProbability() {
        const newCloudLikelihood = 0.02;
        if (p.random(0, 1) < newCloudLikelihood) {
          clouds.push(makeCloud(p.width));
        }
      }

      function cloudMove() {
        this.x -= this.speed;
      }

      function cloudDisplay() {
        p.push();
        p.fill(255, this.transparency);
        p.noStroke();
        p.translate(this.x + 50, 100 + this.y);
        p.ellipse(0, 0, this.y, this.y * 0.5);
        p.pop();
      }

      function makeCloud(birthLocationX) {
        return {
          x: birthLocationX,
          y: p.random(10, 70),
          breadth: p.random(60, 90),
          speed: p.random(0.5, 1),
          transparency: p.random(100, 200),
          move: cloudMove,
          display: cloudDisplay,
        };
      }

      // ---------------- Balls (mouse trail) ----------------
      function ballSpeed() {
        this.y += this.dy;
      }

      function ballDisplay() {
        p.fill(250, 254, 149);
        p.noStroke();
        p.rect(this.x, this.y, this.size, this.size * 1.5);
      }

      function makeBall(x, y, dy) {
        return {
          x,
          y,
          dy,
          size: p.random(4, 10),
          speedy: ballSpeed,
          display: ballDisplay,
        };
      }
    };

    const instance = new p5(sketch, hostRef.current);

    return () => {
      instance.remove(); // prevents multiple canvases on route changes / HMR
    };
  }, []);

  return <div ref={hostRef} />;
}