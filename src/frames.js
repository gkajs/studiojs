import Event from  './event.js'
import loadImage from  './loadImage.js'
import { isArray } from  './utils.js'

class Frames extends Event {
    constructor(data, type, fps) {
        super();

        var {
            imgPrefix,
            images,
            animations,
            frames,
        } = data;

        this.animations = animations;
        this.animation = (animations && animations[type]) || [`0-${images.length - 1}`];
        this.fps = fps;

        this.listeners = [];

        if (typeof images[0] === "string") {
            loadImage(images, (type, sources) => {
                if (type === 'complete') {
                    this.sources = this.formate(sources, frames);
                    this.isReady = true;
                }
            }, imgPrefix);
        } else {
            this.sources = this.formate(images, frames);
            this.isReady = true;
        }

    }

    formate(images, frames = {}) {

        var sources = [];

        if (isArray(frames)) {

            for (var i = 0, f; i < frames.length; i++) {
                f = frames[i];
                sources.push({
                    source: images[f[6] || 0],
                    loc: {
                        x: f[0] || 0,
                        y: f[1] || 0,
                        offX: f[4] || 0,
                        offY: f[5] || 0,
                    },
                    width: f[2],
                    height: f[3],
                });
            }

        } else {

            // 单图，或 设置 frame: {width: height:} 的元素大小一致的合图

            var f_w = frames.width,
                f_h = frames.height;

            for (var i = 0, s; i < images.length; i++) {
                s = images[i];

                var s_w = s.width,
                    s_h = s.height;

                var w = f_w? f_w: s_w,
                    h = f_h? f_h: s_h;

                var xSize = s_w / w,
                    ySize = s_h / h;

                for (var k = 0; k < ySize; k++) {
                    for (var j = 0; j < xSize; j++) {
                       sources.push({
                            source: s,
                            loc: {
                                x: j * w,
                                y: k * h,
                                offX: frames.offX || 0,
                                offY: frames.offY || 0,
                            },
                            width: w,
                            height: h,
                        });
                    }
                }

            }
        }

        return sources;
    }
}

export default Frames
