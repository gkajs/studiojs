frames
frames 单个帧动画，能够独立播放

update();
prev();
on();

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








