let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let spawnLineY = 0;
let spawnRate = 1500;
let spawnRateOfDescent = 0.50;
let lastSpawn = -1;
let objects = [];
let startTime = Date.now();

animate();

function spawnRandomObject() {
    let t;
    if (Math.random() < 0.50) {
        t = 'rgb(255,0,0)';
    } else {
        t = 'rgb(0,255,0)';
    }


    let object = {
        type: t,
        x: Math.random() * (canvas.width - 30) + 15,
        y: spawnLineY

    };

    objects.push(object);

    console.log('object', object);

}


let objLeft = canvas.offsetLeft;
let  objTop = canvas.offsetTop;

canvas.addEventListener('click', function(event) {
    let x = event.pageX - objLeft,
        y = event.pageY - objTop;

    objects.forEach(function(element) {

        console.log('element.top', element.top);
        console.log('element.left', element.left);

        if (y > element.top && y < (element.top + element.height) && x > element.left && x < (element.left + element.width)) {
            alert('ya!');
        }
    });
}, false);

function animate() {
    let time = Date.now();
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);



    //move each object down
    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        object.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.rect(object.x, object.y, 20, 20);

        object.top = object.y;
        object.left = object.x;
        object.width = 20;
        object.height = 20;


        ctx.fillStyle = object.type;
        ctx.fill();


    }
}


//})


//document.body.onload = animate;



