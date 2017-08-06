(function (argument) {
    var Stage = studiojs.Stage,
        Trackjs = studiojs.Track,
        Framesjs = studiojs.Frames,
        loadImage = studiojs.loadImage;

    var canvas = document.getElementById('myCanvas');
    var canvas2 = document.getElementById('myCanvas2');
    var canvas3 = document.getElementById('myCanvas3');
    var stage = new Stage(canvas);
    var track = new Trackjs(0,canvas3);
    // var track2 = new Trackjs();

    stage.add(track);
    // stage.add(track2);
    
    function handleComplete(images) {
        // var animationData = {
        //     images: images,
        //     frames: data.frames,
        //     animations: {
        //         walk: ["0-" + (data.frames.length - 1), "walk"]
        //     }
        // };

        var animationData = {
            images: images,
            frames: data.frames,
            animations: {
                walk: ["0-" + (data.frames.length - 1)]
            }
        };

        var animationData2 = {
            images: images,
            frames: data.frames,
            animations: {
                walk: ["0-8"]
            }
        };

        var material = new Framesjs(animationData, "walk", 20, canvas2);
        var material2 = new Framesjs(animationData, "walk", 20, canvas2);
        var material3 = new Framesjs(animationData2, "walk", 20, canvas2);

        // track.add(material);
        track.add(material2);
        track.add(material3);

        // material.x = 20;
        // track2.add(material);

        var isEnd = false;
        function tick(){
            // material.update();
            // track.update();
            stage.update();

            if (!isEnd) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
        setTimeout(function(){
            isEnd = true;
            function tickPrev(){
                stage.prev();
                requestAnimationFrame(tickPrev);
            }
            requestAnimationFrame(tickPrev);
        }, 3000)
    }

    loadImage([data.file].map(name => "img/" + name), (type, images) => {
        if (type === 'complete') {
            handleComplete(images);
        }
    });
    
})()