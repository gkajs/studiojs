# Use

```js
var Stage = studiojs.Stage,
    Track = studiojs.Track,
    Frames = studiojs.Frames;

var canvas = document.getElementById('myCanvas'),
    stage = new Stage(canvas),
    track = new Track();

stage.add(track);

function handleComplete(images) {
    var data = {
        images: images,
        frames: [
            // x, y, width, height, offX*, offY*, imageIndex*
            [355, 0, 86, 282, 34, 9],
            [853, 27, 79, 76, 37, 9],
            // etc.
        ],
        animations: {
            stand:0,
            run:[1,5],
            walk: ["0-19", "walk"]
        }
    };

    // data, animation, framerate
    var material = new Frames(data, "walk", 20);

    track.add(material);

    function tick(){
        stage.update();
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

// image loader
var loader = new PreLoad();
loader.on("fileload", function(image, i) {
});

loader.on("complete", handleComplete);

var images = ["sprites.png"];
loader.load(images, "img/");

```

# PreLoad

```js

function handleComplete(images) {
    var data = {
        images: images,
        frames: [
            // x, y, width, height, offX*, offY*, imageIndex*
            [355, 0, 86, 282, 34, 9],
            [853, 27, 79, 76, 37, 9],
            // etc.
        ],
        animations: {
            stand:0,
            run:[1,5],
            walk: ["0-19", "walk"]
        }
    };

    // data, animation, framerate
    var material = new Frames(data, "walk", 20);
}

// image loader
var loader = new PreLoad();
loader.on("fileload", function(image, i) {
});

loader.on("complete", handleComplete);

var images = ["sprites.png"];
loader.load(images, "img/");

```

# Sprite

**images**
**frames**
**animations**

```js
var data = {
    images: ["sprites.png"],
    frames: [
        // x, y, width, height, offX*, offY*, imageIndex*
        [355, 0, 86, 282, 34, 9],
        [853, 27, 79, 76, 37, 9],
        // etc.
    ],
    animations: {
        stand:0,
        run:[1,5],
        walk: ["0-19", "walk"]
    }
};

// data, animation, framerate
var material = new Frames(data, "walk", 20);
```


```js

```


```js

```

```js

```