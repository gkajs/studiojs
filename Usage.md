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