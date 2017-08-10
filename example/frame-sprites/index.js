var Frame = studiojs.Frame;
var canvas = document.getElementById('myCanvas');

var img = new Image();

img.onload = () => {

    var data = {
        images: [img],
        frames: [
            // x, y, width, height, offX, offY ,imageIndex
            [355, 0, 86, 282, 34, 9],
            [853, 276, 79, 276, 37, 9],
            [853, 552, 79, 276, 35, 7],
            [0, 569, 81, 274, 31, 7],
            [771, 275, 82, 273, 29, 6],
            [771, 0, 82, 275, 30, 5],
            [526, 283, 82, 280, 34, 4],
            [932, 0, 77, 281, 39, 5],
            [691, 0, 80, 283, 41, 5],
            [526, 0, 82, 283, 43, 6],
            [441, 280, 83, 283, 44, 7],
            [355, 282, 85, 282, 41, 8],
            [441, 0, 85, 280, 39, 9 ],
            [608, 276, 82, 277, 38, 11],
            [691, 283, 80, 277, 37, 11],
            [932, 281, 76, 277, 37, 10],
            [932, 558, 74, 277, 38, 9],
            [853, 0, 79, 276, 40, 8],
            [608, 0, 83, 276, 41, 7],
            [252, 274, 93, 276, 35, 6],
            [252, 0, 103, 274, 29, 5],
            [127, 279, 117, 277, 20, 5],
            [127, 0, 125, 279, 16, 5],
            [0, 0, 127, 283, 15, 5],
            [0, 283, 123, 286, 17, 5]
        ],
        animations: {
            forward: ["0-24"]
        }
    };

    // data, animation, count, canvas
    var material = new Frame(data, "forward", 3, canvas);

    material
        .onFrame(function(i){
            console.log("frame");
        })
        .onEnd(function(){
            console.log("end");
        });

    setInterval(()=> {
        material.update();
    }, 16);

};

img.src = "img/sprites.png";