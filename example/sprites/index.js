(function (argument) {
    var Stage = studiojs.Stage,
        Track = studiojs.Track,
        Frames = studiojs.Frames;

    var canvas = document.getElementById('myCanvas');
    var stage = new Stage(canvas);
    var track = new Track();

    stage.add(track);
    
    var animationData = {
        images_prefix: "img/",
        images: [data.file],
        frames: data.frames,
        animations: {
            walk: ["0-" + (data.frames.length - 1), "walk"]
        }
    };

    var material = new Frames(animationData, "walk", 20);

    track.add(material);

    function tick(){
        stage.update();
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
})()