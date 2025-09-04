function setup() {
    createCanvas(600, 600);
    frameRate(5);
}

const size = 15;
const divider = 30;
const numRows = 60;
const numCols = 60;

let counter = 0;

function draw() {
    background(0);
    //noStroke();
    //fill(0, 0, 0);

    for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
            const r = noise(x / divider, y / divider, counter) * 255;
            const g = noise(x / divider + 100, y / divider + 100, counter) * 255;
            const b = noise(x / divider + 200, y / divider + 200, counter) * 255;

            fill(r, g, b);
            noStroke();

            const value = noise(x / divider, y / divider, counter) * size;
            ellipse(size / 2 + x * size, size / 2 + y * size, value);
        }
    }

    counter += 0.1;
}