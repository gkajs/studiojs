frames
frames 单个帧动画，能够独立播放

# Function
update();
prev();

# Event
on();

onClear: "clear",
onReady: "ready",
onStart: "start",
onFrame: "frame",
onEnd: "end",

----------------

# Ticker (raf)

``` js

var ticker = new Ticker(60); // 默认 60 fps

ticker.add(frames);

ticker.play();
ticker.pause();
ticker.reset();
```


### framerate

material 默认执行1次，才执行一次next，把时间控制交给 ticker或setInterval
如有多个material需要差异化，material1 是 20fps，material2 是 10 fps，
那么 material1 设置为 3， material 设置为 6；
计时器为 60 fps

setInterval(function(){
    material.next(); // material 为1，执行1次，才执行一次next 60fps
}, 1000 / 60) // 60 fps

setInterval(function(){
    material.next(); // material 为 2，执行1次，才执行一次next 30fps
}, 1000 / 60) // 60 fps

setInterval(function(){
    material.next(); // 执行10次，才执行一次next 6fps
}, 1000 / 60) // 60 fps

//// maybe end here

fps 10
1s 执行 10 次

fps2 60
1s 执行 60 次

// 帧播放率，每一帧时间为 1000 / framerate
// var material = new Frames(data, "run", 10)
// material 中的 10，表示执行10次才执行一次next,并非fps
// ticker 的 fps 20 / material 10  = 实际fps 2

ticketFPS 20 = 1000 / 20 * 10 ms 执行一次 next;
frames 的fps = 1000 / (1000 / 20 * 10) = 20 / 10 = 2;

setInterval(function(){
    material.next(); // 执行10次，才执行一次next 2fps 1000 / 20 * 10
}, 1000 / 20) // 20 fps

setInterval(function(){
    setInterval(function(){
        material.next();
    }, 1000 / fps2)
}, 1000 / fps1)

ticketFPS 60 = 1000 / 60 执行一次 next; 
ticketFPS 20 = 1000 / 20 ms 执行一次 next; 

ticketFPS 60 = 1000 / 60 * 10 执行一次 next; 6fps

ticketFPS 20 = 1000 / 20 * 10 ms 执行一次 next;
frames 的fps = 1000 / (1000 / 20 * 10) = 20 / 10 = 2;

每 1000 / 10 ms 播放一帧
每 1000 / 60 ms 播放一帧 

-----

track 轨道，可以包含多个 frames，顺序播放

stage 能够包含多条track，并将其合并渲染


studiojs
播放器

Stage

Track
frames.next();


var material = new Frames(data, "run", 10)
track1.add(material);
track2.add(material);


# Frames

this.animations
this.animation
this.sources
this.isReady
this.fps
this.listeners

## animations

为传入的data的 animations 值

data 不带 animations，或传入 type 不存在时，则默认

animation 是 0-{this.images.length - 1} 即默认按顺序播放一次 images

animation 是当前 frame 的播放动画

## images

images 支持传入 url 或 image object，
当传入为url（字符串）时，则会进行加载

## imgPrefix

用于设置cdn

## frames

frames 支持传入对象或数组

对象(一致)，合图不支持图片边距
```js
frames: {
	width: px, // 默认 image width
	height: px,
	offX: px,
	offY: px,
}
```

数组
```js
frames: [
    // x, y, width, height, offX*, offY*, imageIndex*
    [355, 0, 86, 282, 34, 9],
    [853, 27, 79, 76, 37, 9],
    // etc.
]
```

## fps








