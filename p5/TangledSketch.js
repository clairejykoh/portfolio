window.TangledSketch = function (p) {
  var buildings = [];
  var stars = [];
  var balls = [];
  var clouds = [];
  var castleImage;

  p.preload = function () {
    castleImage = p.loadImage("https://i.imgur.com/enlJeCX.png");
  };

  p.setup = function () {
    p.createCanvas(600, 426);
    p.frameRate(10);

    for (var i = 0; i < 3; i++) buildings[i] = makeBuilding(p.random(p.width));
    for (var g = 0; g < 150; g++) stars[g] = makeStar(p.random(p.width));
    for (var h = 0; h < 5; h++) clouds[h] = makeCloud(p.random(p.width));
  };

  p.draw = function () {
    p.background(255);

    var sky1 = p.color(33, 25, 64);
    var sky2 = p.color(6, 41, 100);
    var sky4 = p.color(201, 159, 161);
    var sky6 = p.color(246, 179, 124);

    // gradient bands (fixed scoping)
    var yOffset = 0;
    var band1H = p.height / 3.5;
    for (var y1 = 0; y1 <= band1H; y1++) {
      var amt1 = p.map(y1, 0, band1H, 0, 1);
      var col1 = p.lerpColor(sky1, sky2, amt1);
      p.noStroke();
      p.fill(col1);
      p.rect(0, yOffset + y1, p.width, 1);
    }
    yOffset += band1H;

    var band2H = p.height / 2.5;
    for (var y2 = 0; y2 <= band2H; y2++) {
      var amt2 = p.map(y2, 0, band2H, 0, 1);
      var col2 = p.lerpColor(sky2, sky4, amt2);
      p.noStroke();
      p.fill(col2);
      p.rect(0, yOffset + y2, p.width, 1);
    }
    yOffset += band2H;

    var band3H = p.height / 5;
    for (var y3 = 0; y3 <= band3H; y3++) {
      var amt3 = p.map(y3, 0, band3H, 0, 1);
      var col3 = p.lerpColor(sky4, sky2, amt3);
      p.noStroke();
      p.fill(col3);
      p.rect(0, yOffset + y3, p.width, 1);
    }

    if (castleImage) p.image(castleImage, 20, 70, 120, 120);

    updateAndDisplayStars();
    stars = stars.filter(function (st) { return st.x > 0; });
    if (p.random(0, 1) < 0.5) stars.push(makeStar(p.width));

    createHill();
    drawRectangle();
    createHillShadow();

    updateAndDisplayBuildings();
    buildings = buildings.filter(function (b) { return b.x + b.breadth + 30 > 0; });
    if (p.random(0, 1) < 0.009) buildings.push(makeBuilding(p.width));

    updateAndDisplayClouds();
    clouds = clouds.filter(function (c) { return c.x + c.breadth + 30 > 0; });
    if (p.random(0, 1) < 0.02) clouds.push(makeCloud(p.width));

    // balls update (prevent infinite growth)
    var next = [];
    for (var i2 = 0; i2 < balls.length; i2++) {
      var b2 = balls[i2];
      b2.y += b2.dy;
      b2.display();
      if (b2.y > -80 && b2.y < p.height + 80) next.push(b2);
    }
    balls = next;
  };

  p.mouseMoved = function () {
    balls.push(makeBall(p.mouseX, p.mouseY, p.random(-20, 20)));
  };

  // ---------- helpers ----------
  function updateAndDisplayStars() {
    for (var i = 0; i < stars.length; i++) {
      stars[i].x -= stars[i].speed;
      stars[i].display();
    }
  }

  function makeStar(birthX) {
    return {
      x: birthX,
      breadth: p.random(p.width),
      speed: p.random(0.1, 4),
      size: p.random(2, 7),
      display: function () {
        p.fill(250, 254, 149);
        p.noStroke();
        // keeping your original axis choice: rect(breadth, x, ...)
        p.rect(this.breadth, this.x, this.size, this.size * 1.5);
      },
    };
  }

  function createHill() {
    var forestDetail = 0.0005;
    var forestSpeed = 0.0005;

    for (var g = 0; g < p.width; g++) {
      var h = g * forestDetail * 8 + (p.millis() * forestSpeed) / 8;
      var i = p.map(p.noise(h), 0, 1, 40, 100);
      p.stroke(30);
      p.line(g, i + 100, g, p.height - 80);
    }
  }

  function drawRectangle() {
    var sky1 = p.color(33, 25, 64);
    var sky6 = p.color(246, 179, 124);

    var rectStartY = 240;
    var gradH = p.height / 5;

    for (var e = 0; e <= gradH; e++) {
      var amt = p.map(e, 0, gradH, 0, 1);
      var col = p.lerpColor(sky6, sky1, amt);
      p.noStroke();
      p.fill(col);
      p.rect(0, rectStartY + e, p.width, 1);
    }

    p.fill(sky1);
    p.noStroke();
    p.rect(0, rectStartY + gradH, p.width, p.height - (rectStartY + gradH));
  }

  function createHillShadow() {
    var forestDetail = 0.0005;
    var forestSpeed = 0.0005;

    p.push();
    p.translate(0, 480);
    p.scale(1, -1);
    for (var g = 0; g < p.width; g++) {
      var h = g * forestDetail * 8 + (p.millis() * forestSpeed) / 8;
      var i = p.map(p.noise(h), 0, 1, 40, 100);
      p.stroke(30, 70);
      p.line(g, i + 150, g, p.height - 80);
    }
    p.pop();
  }

  function updateAndDisplayBuildings() {
    for (var i = 0; i < buildings.length; i++) {
      buildings[i].x -= buildings[i].speed;
      buildings[i].display();
    }
  }

  function makeBuilding(birthX) {
    return {
      x: birthX,
      y: p.random(10, 70),
      breadth: p.random(60, 90),
      speed: p.random(2, 3),
      R: p.random(70, 90),
      G: p.random(50, 70),
      B: p.random(10, 40),
      nFloors: p.round(p.random(1, 1.5)),
      display: function () {
        var floorHeight = 20;
        var bHeight = this.nFloors * floorHeight;

        p.fill(this.R, this.G, this.B);
        p.noStroke();
        p.push();
        p.translate(this.x, p.height - this.y);
        p.rect(0, -bHeight, this.breadth, bHeight);
        p.triangle(-30, -bHeight, 0, -bHeight, 0, 0);
        p.triangle(this.breadth + 30, -bHeight, this.breadth, -bHeight, this.breadth, 0);
        p.pop();

        p.push();
        p.fill(this.R, this.G, this.B, 80);
        p.noStroke();
        p.translate(this.x, p.height - this.y);
        p.scale(1, -1);
        p.rect(0, -bHeight / 2, this.breadth, bHeight);
        p.triangle(-30, -bHeight / 2, 0, -bHeight / 2, 0, 0);
        p.triangle(this.breadth + 30, -bHeight / 2, this.breadth, -bHeight / 2, this.breadth, 0);
        p.pop();
      },
    };
  }

  function updateAndDisplayClouds() {
    for (var i = 0; i < clouds.length; i++) {
      clouds[i].x -= clouds[i].speed;
      clouds[i].display();
    }
  }

  function makeCloud(birthX) {
    return {
      x: birthX,
      y: p.random(10, 70),
      breadth: p.random(60, 90),
      speed: p.random(0.5, 1),
      transparency: p.random(100, 200),
      display: function () {
        p.push();
        p.fill(255, this.transparency);
        p.noStroke();
        p.translate(this.x + 50, 100 + this.y);
        p.ellipse(0, 0, this.y, this.y * 0.5);
        p.pop();
      },
    };
  }

  function makeBall(x, y, dy) {
    return {
      x: x,
      y: y,
      dy: dy,
      size: p.random(4, 10),
      display: function () {
        p.fill(250, 254, 149);
        p.noStroke();
        p.rect(this.x, this.y, this.size, this.size * 1.5);
      },
    };
  }
};