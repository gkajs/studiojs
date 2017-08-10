<p align="center">
<a href ="https://github.com/joeyguo/studiojs"><img alt="studiojs" src="./studiojs.png"></a>
</p>
<p align="center">
简单的、渐进式的 2D 渲染引擎(专注于帧动画)
</p>
<p align="center">
<a href="https://www.npmjs.org/package/studiojs"><img src="https://img.shields.io/npm/v/studiojs.svg?style=flat"></a>
<a href="https://github.com/joeyguo/studiojs#license"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

--- 

# studiojs

[studiojs](https://github.com/joeyguo/studiojs) 是一款专注于帧动画的、简单的、渐进式的 2D 渲染引擎。

主要包含类： Frame、Track、Stage。 可独立使用、组合使用。

# Frame

Frame 是帧动画的基础单位，声明帧动画的播放内容。

示例:

```js
var Frame = studiojs.Frame,
    canvas = document.getElementById('myCanvas');

var data = {
    images: [img],
    frames: [
        // x, y, width, height, offX*, offY*, imageIndex*
        [355, 0, 86, 282, 34, 9],
        [853, 27, 79, 76, 37, 9],
        // etc.
    ],
    animations: {
        forward: ["0-24"],
        back: ["24-0"]
    }
};

var material = new Frame(data, "forward", 20, canvas);

setInterval(()=> {
    material.update();
}, 16);

```

# API 文档

## 实例化一个 Frame

```js
// data, animation, times, canvas

var material = new Frame(data, "forward", 20, canvas);
```

### 1. data

数据声明

```js
var data = {
    images: [img],
    frames: [
        // x, y, width, height, offX*, offY*, imageIndex*
        [355, 0, 86, 282, 34, 9],
        [853, 27, 79, 76, 37, 9],
        // etc.
    ],
    animations: {
        forward: ["0-24"]
    }
};
```

- **images**

    图片对象，以数组形式传入，如 [img]

- **frames**

    声明每一帧对应渲染参数

    - x,y 在原图中起始位置
    - width, height  为对应宽高
    - offX, offY  可选，表示渲染的起始位置，默认为 0, 0
    - imageIndex  可选，对应 images 的索引 index，默认为 0 

- **animations**

    可选，表示播放的队列，默认播放队列为 images 顺序播放

    自定义播放队列，{ 播放队列名: 播放队列的frames的索引数组 }，如下表示 forward 队列播放 frames 索引为 0，1，2 的帧。

    ```js
    animations: {
        forward: [0, 1, 2]
    }
    ```

    简写方式， ["0-24"] 表示 [0, 1, 2, 3 ... 24]

    ```js
    animations: {
        forward: ["0-24"]
    }
    ```

### 2. animation

表示使用播放队列，如上例子表示将用 walk 对应的播放队列。

### 3. times

可选，用于控制播放速率，默认为1。
times = 20 表示调用 20 次 update，才会有一次真正的更新

### 4. canvas

绘制位置，canvas DOM。

## Frame 实例使用方式

如下示例，material 为 Frame 的一个实例，具备以下属性、方法

```js
// data, animation, times, canvas

var material = new Frame(data, "forward", 20, canvas);
```

### 属性

- **x、y**   
    起始绘制坐标

### 方法

- **.update()**
    播放下一帧

- **.prev()**
    播放上一帧

- **.onFrame(function(){})**
    回调监听，每一帧更新渲染后回调

- **.onEnd(function(){})**
    回调监听，播放队列完成后回调

- **.onClear()**
    清空播放队列


```js
var material = new Frame(data, "forward", 20, canvas);

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
```


# Track

轨道，能够加入多个 Frame，使其排队顺序播放

示例：

```js
var track = new Track(canvas);

var material1 = new Frame(data, 'forward'),
    material2 = new Frame(data, 'back');

track.add([material1, material2]);

setInterval(()=> {
    track.update();
}, 16);

```

## 实例化一个 Track


```js
// canvas, zIndex

var track = new Track(canvas, zIndex);
```

### 1. canvas

绘制位置，canvas DOM。

### 2. zIndex

可选，层级(与 stage 结合使用)

## Track 实例使用方式

如下示例，track 为 Track 的一个实例，具备以下方法

```js
var track = new Track(canvas);
```
### 方法

- **.update()**
    播放下一帧

- **.prev()**
    播放上一帧

# Stage

舞台，能够包含多个 Track，各个 Track 并列播放, 合并展示

示例：

```js
var stage = new Stage(canvas)
var track1 = new Track(),
    track2 = new Track();

stage.add([track1, track2]);

//  ...

track1.add([material1, material2]);
track2.add([material3, material4]);

setInterval(()=> {
    stage.update();
}, 16);

```

## 实例化一个 Stage


```js
// canvas, zIndex

var stage = new Stage(canvas);
```

### 1. canvas

绘制位置，canvas DOM。

## Stage 实例使用方式

如下示例，stage 为 Stage 的一个实例，具备以下方法

```js
var stage = new Stage(canvas);
```
### 方法

- **.update()**
    播放下一帧

- **.prev()**
    播放上一帧
