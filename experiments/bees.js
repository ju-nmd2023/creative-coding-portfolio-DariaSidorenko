function setup(){
    createCanvas(innerWidth, innerHeight);
    frameRate(15); //to make the bees slower
    }

const size = 50;
const layers = 10;

function getRandomValue(pos, variance){
    return pos + random(-variance, variance);
}

function drawLayers(x, y, size, layers){
    noFill();
    const variance = size / 20;

    for (let i = 0; i < layers; i++){
        const s = (size / layers) * i;
        const half = s / 2;

        //alters the black and yellow, had to ask ChatGPT how to do it
        if (i % 2 === 0) {
            stroke(0); 
        } else {
            stroke(255, 255, 0); 
        }

        beginShape();
        for (let j = 0; j < 10; j++) {
            let angle = random(TWO_PI); //randomising the angle
            let radius = random(half - variance, half); 
            let xOffset = cos(angle) * radius;
            let yOffset = sin(angle) * radius;

            vertex(x + xOffset, y + yOffset);
        }
        endShape(CLOSE);
    }
}

function draw(){
    background(173, 216, 230);  

    const numSquares = 10; //dram 10 bees

    for (let i = 0; i < numSquares; i++) {
        let x = random(0, width);
        let y = random(0, height);

        drawLayers(x, y, size, layers);
    } 
}
