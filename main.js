var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var spawnLineY = 0;
    var spawnRate = 1500;
    var spawnRateOfDescent = 0.50;
    var lastSpawn = -1;
    var objects = [];
    var startTime = Date.now();

    animate();

    function spawnRandomObject() {
        var t;
        if (Math.random() < 0.50) {
            t = "red";
        } else {
            t = "blue";
        }


        var object = {
            type: t,
            x: Math.random() * (canvas.width - 30) + 15,
            y: spawnLineY
        };

        objects.push(object);
    }

    function animate() {
        var time = Date.now();
        if (time > (lastSpawn + spawnRate)) {
            lastSpawn = time;
            spawnRandomObject();
        }
        requestAnimationFrame(animate);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, spawnLineY);
        ctx.lineTo(canvas.width, spawnLineY);
        ctx.stroke();

        //move each object down
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            object.y += spawnRateOfDescent;
            ctx.beginPath();
            ctx.rect(object.x, object.y, 20, 20);
            ctx.fillStyle = object.type;
            ctx.fill();

            canvas.onclick = function(e) {
                var x = objects.x;
                var y = objects.y;
                ctx.fillStyle = "yellow";
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                console.log('clicked');
            }
        }


}


//document.body.onload = animate;



