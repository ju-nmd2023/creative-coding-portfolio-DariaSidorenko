function setup() {
    createCanvas(600, 600);
}

const size = 10;
const divider = 60;
const numRows = 60;
const numCols = 60;

function draw() {
    background(255, 255, 255);
    noStroke();
    fill(0, 0, 0);

    for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
            ellipse(x * size, y * size, size);
        }
    }
    noLoop();
}