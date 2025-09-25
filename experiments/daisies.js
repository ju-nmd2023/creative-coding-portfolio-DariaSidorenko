function setup(){
    createCanvas(innerWidth, innerHeight);
    background(20, 40, 20);
}

let flowerSize = 20;
let amount = 3;
let gap = 110;

function flower(){
    noStroke();
    let petals = 9;
    for (let y = 0; y < petals; y++){
        for (let x = 0; x < petals; x++){
            //petals
            fill(random(220, 255));
            rect(x,y, 15, 50, 15);

            //yellow centre
            fill(205, 180, 20);
            ellipse(0, 0, 20);

            //darker spots to show some depth
            fill(150, 120, 10);
            for (spots = 0; spots < 6; spots++) {
                let spotsx = random(-5, 5);
                let spotsy = random(-5, 5);
                ellipse(spotsx, spotsy, 3);
            }

            rotate(PI/5);
        }
    }
}

function draw(){
    let y = (height - flowerSize * amount - gap *(amount - 1))/2;
    for (let i = 0; i < amount; i++){
        let x = (width - flowerSize * amount - gap * (amount-1))/2;
        for (let j = 0; j < amount; j++){
            push();
            translate(x, y);
            flower();
            pop();
            x += flowerSize + gap;
        }
        y += flowerSize + gap;
    }
    noLoop();
}
