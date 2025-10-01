function setup() {
    createCanvas(innerWidth, innerHeight);
}

function draw() {
    background(0);
    strokeWeight(3);
    noFill();

    const originalY = 300; //centre of the canvas
    const divider = 45;
    noiseSeed(5); //keep the same curve
    beginShape();
    for (let x = 0; x < innerWidth; x++) {
       let r = noise(x * 0.1, frameCount * 0.01) * 255;  //multiplied by 255 bc of RGB (scales the range to 0 to 255)
       let g = noise(x * 0.2, frameCount * 0.01) * 255;  //frameCount makes is what makes it change w time
       let b = noise(x * 0.3, frameCount * 0.01) * 255;  //colour transition was achieved w help of ChatGPT https://chatgpt.com/share/68dd86c7-d278-8011-b833-a22f2d22b759 
       stroke(r, g, b);

        
        const y = originalY + noise(x / divider) * 100;
        vertex (x, y);
    }
    endShape();

    noiseSeed(10);
    beginShape();
    for (let x = 0; x < innerWidth; x++) {
        let r = noise(x * 0.4, frameCount * 0.01 + 100) * 255;  
        let g = noise(x * 0.5, frameCount * 0.01 + 100) * 255;
        let b = noise(x * 0.6, frameCount * 0.01 + 100) * 255;   
        stroke(r, g, b);

        const y = originalY + noise(x / divider) * 100;
        vertex(x, y);
}
endShape();
}
