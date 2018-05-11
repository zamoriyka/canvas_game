//primary code
var currentPos = 0;

//the refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//new spawned objects start at Y=0
var spawnLineY = 0;

// spawn a new object every 1500ms
var spawnRate = 1500;

// set how fast the objects will fall
var spawnRateOfDescent = 0.50;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time
var startTime = Date.now();

// start animating
animate();


function spawnRandomObject() {

    // select a random type for this new object
    var t;

    // About Math.random()
    // Math.random() generates a semi-random number
    // between 0-1. So to randomly decide if the next object
    // will be A or B, we say if the random# is 0-.49 we
    // create A and if the random# is .50-1.00 we create B
    if (Math.random() < 0.50) {
        t = "red";
    } else {
        t = "blue";
    }

    // create the new object
    var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned, the begining of falling objects
        y: spawnLineY
    };
    // add the new object to the objects[] array
    objects.push(object);
}


function animate() {
    // get the elapsed time
    var time = Date.now();
    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }
    // request another animation frame
    requestAnimationFrame(animate);


    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //single square falling as it was on primary code, 320 shows his coordinate; 20, 20 shows his size
    ctx.fillRect(320, currentPos, 20, 20);
    //primary code. When I change the currentPos value up it starts move faster
    currentPos += 1;
    if(currentPos >= canvas.clientHeight) {
        currentPos = 0;
    }


    //ctx.beginPath();
    //ctx.moveTo(0, spawnLineY);
    //ctx.lineTo(canvas.width, spawnLineY);
    //ctx.stroke();

    //move each object down
    for (var i = 0; i < objects.length; i++) {
       var object = objects[i];
        object.y += spawnRateOfDescent;
        ctx.beginPath();

        //determine object-balls
        ctx.arc(object.x, object.y, 8, 0, Math.PI * 4);

        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
    }

}
//primary code
document.body.onload = animate;



