function setup(){
    createCanvas(innerWidth, innerHeight);
}

const size = 80;
const layers = 8;

function getRandomValue(pos, variance){
    return pos + random(-variance, variance);
}

function drawLayers(x, y, size, layers){
    noFill();
    stroke(255, 182, 193); 
    const variance = size / 20;

    for (let i = 0; i < layers; i++){
        const s = (size / layers) * i;
        const half = s / 2;

        beginShape();
        curveVertex(getRandomValue(x - half, variance), getRandomValue(y - half, variance));
        curveVertex(getRandomValue(x + half, variance), getRandomValue(y - half, variance));
        curveVertex(getRandomValue(x + half, variance), getRandomValue(y + half, variance));
        curveVertex(getRandomValue(x - half, variance), getRandomValue(y + half, variance));
        endShape(CLOSE);
    }
}

function draw(){
    background(50, 0, 70);

    const cols = floor(width / size);
    const rows = floor(height / size);

    //offseting so that the grid is centered, achieved with help of ChatGPT
    const offsetX = (width - cols * size) / 2;
    const offsetY = (height - rows * size) / 2;

    for (let y = 0; y < rows; y++){
        for (let x = 0; x < cols; x++){
            drawLayers(offsetX + size/2 + x * size, 
                       offsetY + size/2 + y * size, 
                       size, layers);
        }
    } 

    noLoop();

}
