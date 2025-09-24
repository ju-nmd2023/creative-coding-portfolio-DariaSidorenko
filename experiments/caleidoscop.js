let pos;
let vel;

let center;

let maxSpeed = 2; //maximum speed

let sceneIndex = 0;
let sceneChangeMs = 6000;
let lastSceneSwitch = 0;

let attract = true; //Mouse being attracted to draw
let symmetry = 8;
let lfoHz = 0.2; //pulse frequency, this code was written in reference with ChatGPT
let blend = "ADD";       

let palettes = [];
palettes[0] = [[15, 180, 100], [80, 220, 200], [180, 120, 255]]; //blues-greens
palettes[1] = [[255, 120, 80], [255, 220, 120], [120, 200, 255]]; //orange-yellow
palettes[2] = [[100, 255, 180], [100, 160, 255], [255, 100, 200]]; //mint & pink
palettes[3] = [[255, 255, 255], [170, 200, 255], [255, 170, 220]]; //pastel & white

function setup() {
  createCanvas(innerWidth, innerHeight);
  center = createVector(width / 2, height / 2);

  pos = createVector(random(width), random(height));
  vel = createVector(random(-3, 3), random(-3, 3)); //randomised for more fun
  
  background(0);
  lastSceneSwitch = millis();
  applyScene(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.set(width / 2, height / 2);
  background(0);
}

function draw() {
  background(0, 10); //fading trails

  if (millis() - lastSceneSwitch > sceneChangeMs) {
    sceneIndex = (sceneIndex + 1) % palettes.length;
    applyScene(sceneIndex);
    lastSceneSwitch = millis();
  }

  const t = millis() / 1000;
  const lfo = (sin(TWO_PI * lfoHz * t) + 1) * 0.5; //breathing effect for colours, achieved with help of chatgpt

  // Mouse attraction
  const mouse = createVector(mouseX, mouseY);
  let dir = p5.Vector.sub(mouse, pos).normalize();
  let distSq = max(1, p5.Vector.sub(mouse, pos).magSq());
  let accelStrength = map(lfo, 0, 1, 0.15, 0.65);
  if (!attract) accelStrength *= -1;
  accelStrength *= 300 / (300 + distSq * 0.002);
  
  //apply velocity(acceleration)
  vel.add(dir.mult(accelStrength));
  vel.limit(maxSpeed); 
  pos.add(vel);

  //effect to not allow it go beyond canva edges but bounce off them instead
  if (pos.x < 0 || pos.x > width) { 
    vel.x *= -1; pos.x = constrain(pos.x, 0, width); 
}
  if (pos.y < 0 || pos.y > height) { 
    vel.y *= -1; pos.y = constrain(pos.y, 0, height); 
}

  
  const pal = palettes[sceneIndex];
  const n = noise(pos.x * 0.005, pos.y * 0.005, t * 0.4);
  const sz = 4 + pow(n, 2) * 22; //particle size
  const a = 120 + n * 135;
  const col = lerpColorArr(lerpColorArr(pal[0], pal[1], lfo), pal[2], n); //colours blending

  
  push();
  blendMode(blend === "ADD" ? ADD : BLEND);
  translate(center.x, center.y);
  const rel = p5.Vector.sub(pos, center);

  for (let i = 0; i < symmetry; i++) {
    push();
    rotate((TWO_PI / symmetry) * i);

    fill(col[0], col[1], col[2], a);
    noStroke();
    ellipse(rel.x, rel.y, sz);

    scale(1, -1);
    ellipse(rel.x, rel.y, sz * 0.9);

    pop();
  }
  pop();
}

//switching between speed and pulse etc
function applyScene(i) {
  const presets = [];
  presets[0] = { symmetry: 8, lfoHz: 0.18, maxSpeed: 9, blend: "ADD" };
  presets[1] = { symmetry: 10, lfoHz: 0.27, maxSpeed: 12, blend: "ADD" };
  presets[2] = { symmetry: 12, lfoHz: 0.12, maxSpeed: 8, blend: "NORMAL" };
  presets[3] = { symmetry: 16, lfoHz: 0.22, maxSpeed: 11, blend: "ADD" };

  const p = presets[i % presets.length];
  symmetry = p.symmetry;
  lfoHz = p.lfoHz;
  maxSpeed = p.maxSpeed;
  blend = p.blend;
}

function lerpColorArr(a, b, t) {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t)
  ];
}

function keyPressed() {
  if (key === 'S' || key === 's') saveCanvas('kaleido', 'png');
}
