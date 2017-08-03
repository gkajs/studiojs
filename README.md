<img src="./studiojs-logo.png"/>
---

studiojs 是一款简单的、可控的帧素材播放工具.

[![NPM version](https://img.shields.io/npm/v/studiojs.svg?style=flat)](https://www.npmjs.org/package/studiojs)  [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/joeyguo/studiojs#license) 

## Fetures

* 性能佳
  - 体积小 (4kb gzipped)
  - 支持合图
  - 同帧复用
  - 帧共享
* 动画控制能力强
  - 支持动画暂停、重启、回放
  - 支持动画排队、插队、并行
* 动画事件
  - 帧动画开始前回调
  - 指定帧触发回调
  - 帧动画结束前回调
* Dom事件
  - 支持在画布上的dom事件

[开始使用 studiojs.]()

## Examples

* [lady catwalk]()
* [google 404 恐龙游戏]()
* [排队PK和插队反超动画]()
* [IMAGE SEQUENCE VIEWER & PLAYER]()

## Install

```bash
$ npm install studiojs
```

或使用 CDN

```html
<script src="https://unpkg.com/studiojs@0.0.1/dist/studiojs.min.js"></script>
```

## Usage

```js
import { Stage, Track, Frames } from 'studiojs'

var canvas = document.getElementById('myCanvas'),
    stage = new Stage(canvas),
    track = new Track()

stage.add(track)

var data = {
    images: ["tick.png", "tock.png"],
    animations: {
        run: [0, 1, "run"],
    }
};

var material = new Frames(data, "run", 10)

track.add(material)

function tick(){
    stage.update()
    requestAnimationFrame(tick)
}

tick()
```

了解更多：[开始使用 studiojs.]()
<br/>
加入QQ群： xxxx

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 - present, joeyguo