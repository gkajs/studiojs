(function (argument) {
    var Stage = studiojs.Stage,
        Track = studiojs.Track,
        Frames = studiojs.Frames,
        loadImage = studiojs.loadImage;

    var canvas = document.getElementById('myCanvas');
    var stage = new Stage(canvas);
    var track = new Track();

    stage.add(track);
    
    function handleComplete(images) {
        var animationData = {
            images: images,
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
    }

    loadImage([data.file].map(name => "img/" + name), (type, images) => {
        if (type === 'complete') {
            handleComplete(images);
        }
    });
    
})()