const els = {
    'points': document.querySelector('#points'),
    'aproxValue': document.querySelector('#aprox-value'),
    'checkboxes': {
        'slides': document.querySelector('#sliders-checkbox'),
    },
};
let points = [];
let boxSize;
let radius;
let center;

function setup(){
    createCanvas(windowWidth, windowHeight);
    center = createVector(0, 0);
    rectMode(CENTER);
    noFill();
    noLoop();
    reset();
}

function draw(){
    background(0);
    translate(windowWidth / 2, windowHeight / 2);
    stroke(255);
    rect(center.x, center.y, boxSize);
    circle(center.x, center.y, radius * 2);
    stroke(200);
    for(let p of points) {
        point(p.x, p.y);
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    reset();
}

function setBoxSize(size){
    boxSize = size;
    radius = boxSize / 2;
}

function reset(){
    setBoxSize(0.95 * min(windowWidth, windowHeight));
    updatePoints();
    els.aproxValue.innerHTML = calculatePi();
    redraw();
}

function updatePoints(){
    let size = els.points.valueAsNumber;
    points.length = size;
    for(let i = 0; i < size; i++){
        points[i] = new randomPoint();
    }
}

function randomPoint(){
    return createVector(
        random(-boxSize / 2, boxSize / 2) + center.x,
        random(-boxSize / 2, boxSize / 2) + center.y,
    );
}

function calculatePi(){
    let count = 0;
    for(let p of points){
        if(center.dist(p) < radius)
            count++;
    }
    return 4 * (count / els.points.valueAsNumber);
}

function setSliders(sliders){
    if(sliders){
        els.points.type = 'range';
    } else {
        els.points.type = 'number';
    }
}
