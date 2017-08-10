import Event from  './event.js'
import loadImage from  '../loadImage.js'
import { isArray, formateAni, formateAniObj } from  './utils.js'

class Frame extends Event {
    constructor(data, type, fps, canvas) {
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

        this.animation = formateAni(this.animation || []);
        this.animations = formateAniObj(this.animations || {});

        this.listeners = [];
        this.actIndex = -1;

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

        if (canvas) {
            this.canvas = canvas;
            this.canvas.ctx = canvas.getContext('2d');
        }
        
        this.times = 0;
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

    update(isIgnoreFps) {
        if (!this.isReady) { return; }
        
        if (!isIgnoreFps) {
            ++this.times;

            if (this.times < (60 / this.fps)) {
                return this;
            } else {
                this.times = 0;
            }
        }
        
        if (this.actIndex + 1 > this.animation.length - 1) {
            this.isEnd = true;
            return this;
        }

        ++this.actIndex;
        
        return this.draw(this);
    }

    prev(isIgnoreFps){
        if (!this.isReady) { return; }

        if (!isIgnoreFps) {
            ++this.times;

            if (this.times < (60 / this.fps)) {
                return this;
            } else {
                this.times = 0;
            }
        }

        var actIndex = --this.actIndex;
        
        if (actIndex < 0) {
            return this;
        }

        return this.draw(this);
    }

    draw(m, i){
        var curM = m;
        var actIndex = i !== undefined? i: curM.actIndex;

        var animation = curM.animation;
        var acitveOne = animation[actIndex];

        if (isNaN(acitveOne)) {
            var arr = curM.animations[acitveOne];
            arr && animation.splice(actIndex, 1, ...arr);
            acitveOne = animation[actIndex];
        }

        if (acitveOne === undefined) { return; }

        var curMM = m;

        var obj = curMM.sources[acitveOne];
        var source = obj.source,
            loc = obj.loc;

        var ctx = this.canvas.ctx,
            canvas = this.canvas;

        canvas._rect = {
            x: (curM.x || 0),
            y: (curM.y || 0),
            width: (obj.width * (curM.scale || 1)),
            height: (obj.height * (curM.scale || 1)),
        };

        ctx.clearRect(0, 0, canvas.width, canvas.height);
       
        if (curM.flip === "horizintal") {
            canvas._rect.x = canvas.width - (curM.x || 0) - (obj.width * (curM.scale || 1));
            
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        
        var _offX = (curM.x || 0) + (loc.offX || 0);
        var _offY = (curM.y || 0) + (loc.offY || 0);

        ctx.drawImage(source, (loc.x || 0), (loc.y || 0), obj.width, obj.height, _offX, _offY, (obj.width * (curM.scale || 1)), (obj.height * (curM.scale || 1)));
        
        if (curM.flip === "horizintal") {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }

        this.curM = curM;

        if (actIndex === 0) {
            curM.trigger("start", curM);
        }

        curM.trigger("frame", actIndex, curM);
        
        if (actIndex === curM.animation.length - 1){
            curM.trigger("end", curM);
        }
        
        return this;
    }

    clear(type, callback){
        this.trigger("clear", this);
        this.animation = []; 
        return this;
    }

}

export default Frame
