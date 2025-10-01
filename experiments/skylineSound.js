let particles = [];
let rockets = [];
let buildings = [];
let notes = ["C3", "G3", "E3", "B3", "G3", "D4","C4", "G4", "E4", "B4", "G4", "D5","C#2", "G#3", "Eb2", "Bb2", "G#2", "D#3"];
let noteStart = 0;
let synth;

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = random(TAU);
    const v = random(1.5, 4.5);
    this.velocity = createVector(cos(a) * v, sin(a) * v);
    this.lifespan = 80 + random(60);
    this.size = random(3, 6);
  }
  update() {
    this.lifespan--;
    this.velocity.mult(0.99);
    this.velocity.y += 0.06; 
    this.position.add(this.velocity);
  }
  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(255, 240, 120, 180);
    ellipse(0, 0, this.size);
    fill(255, 220, 80, 40);
    ellipse(0, 0, this.size * 3.5);
    pop();
  }
  isDead() {
    return this.lifespan <= 0;
  }
}

class Rocket {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.6, 0.6), random(-7.5, -9.5));
    this.dead = false;
    this.trail = [];
  }
  update() {
    this.vel.y += 0.06; 
    this.vel.mult(0.995);
    this.pos.add(this.vel);
    this.trail.push(this.pos.copy());
    if (this.trail.length > 10) this.trail.shift(); 
    if (this.vel.y > 0 || this.pos.y < height * 0.2) {
      this.explode();
      fireworkSound();
      this.dead = true; 
    }
  }
  draw() {
    noStroke();
    fill(255, 200, 120, 180);
    ellipse(this.pos.x, this.pos.y, 6);
    stroke(255, 180, 100, 120);
    noFill();
    beginShape();
    for (let p of this.trail) vertex(p.x, p.y);
    endShape();
  }
  explode() {
    for (let i = 0; i < 220; i++) {
      const p = new Particle(this.pos.x, this.pos.y);
      p.velocity.add(this.vel.copy().mult(0.2));
      particles.push(p);
    }
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  generateSkyline();
  synth = new Tone.Synth().toDestination();
}

function fireworkSound() {
  if (noteStart < notes.length) {
    synth.triggerAttackRelease(notes[noteStart], "8n");
    noteStart++;
  } else if (noteStart === notes.length) {
    noteStart = 0;
  }
}

function draw() {
  blendMode(BLEND);
  drawGradientSky();
  drawSkyline();

  blendMode(ADD); 

  for (let i = rockets.length - 1; i >= 0; i--) {
    rockets[i].update();
    rockets[i].draw();
    if (rockets[i].dead) {
      rockets.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.isDead()) particles.splice(i, 1);
  }
}

function mousePressed() {
  Tone.start().then(() => {
    fireworkSound();

    rockets.push(new Rocket(mouseX, height * 0.82));
  });
}

function drawGradientSky() {
  for (let y = 0; y < height; y++) {
    const t = y / height;
    const r = lerp(10, 0, t); 
    const g = lerp(10, 10, t);
    const b = lerp(25, 60, t);
    stroke(r, g, b);
    line(0, y, width, y);
  }
}

function generateSkyline() {
  buildings = [];
  const base = height * 0.82;
  let x = 0;
  while (x < width) {
    const w = random(25, 60);
    const h = random(40, 180);
    const b = { x, w, h, windows: [] }; 
    const cols = max(1, floor(w / 18));
    const rows = max(1, floor(h / 22)); 
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = b.x + 6 + c * (w / cols);
        const wy = base - b.h + 8 + r * 18;
        const a = random(80, 140);
        b.windows.push({ x: wx, y: wy, a });
      }
    }

    buildings.push(b);
    x += w + random(5, 15); 
  }
}

function drawSkyline() {
  const base = height * 0.82;
  noStroke();
  fill(10, 10, 20);
  rect(0, base, width, height - base);

  for (const b of buildings) {
    fill(12, 12, 24);
    rect(b.x, base - b.h, b.w, b.h);
    for (const w of b.windows) {
      fill(255, 230, 150, w.a);
      rect(w.x, w.y, 3, 5);
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  generateSkyline();
}
