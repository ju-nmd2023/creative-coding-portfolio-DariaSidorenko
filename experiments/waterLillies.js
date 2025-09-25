function setup(){
    createCanvas(innerWidth, innerHeight);
    background(20, 40, 20);
}

let flowerSize = 20;
let amount = 3;
let gap = 110;

function flower(){
    noStroke();

    //leaves
    fill(50, 150, 70);
    ellipse(-30, 20, 50, 25);
    ellipse (30, 20, 50, 25);

    let petals = 9;
    for (let y = 0; y < petals; y++){
        for (let x = 0; x < petals; x++){
            //petals
            fill(random(220, 255), random(220, 240), random(220, 255));
            triangle(x,y, x+17, y+50, x-2, y+35);

            //yellow centre
            fill(210, 200, 50);
            ellipse(0, 0, 24);
            fill(235, 200, 20);
            ellipse(0, 0, 16);
            fill(255, 230, 60);
            ellipse(0, 0, 8);
            

            //darker spots to show some depth
            fill(225);
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
