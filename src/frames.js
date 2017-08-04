import Event from  './event.js'
import loadImage from  './loadImage.js'

function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}

class Frames extends Event {
    constructor(data, animations_type, fps) {
        super()

        this.images_prefix = data.images_prefix;
        this.images = data.images;

        this.listeners = [];
        
        this.animationsOrigin = data.animations;

        this.animations = (data['animations'] && data['animations'][animations_type]) || [`0-${this.images.length - 1}`];
        
        this.fps = fps;

        this.frames = data.frames;

        if (typeof data.images[0] === "string") {
            loadImage(this.images, (type, sources) => {
                if (type === 'complete') {
                    this.sources = this.formate(sources);
                    this.isReady = true;
                }
            }, data.images_prefix);
        } else {
            this.sources = this.formate(data.images);
            this.isReady = true;
        }
        
    }

    formate(sources) {
        var _sources = [], frames = this.frames;

        if (isArray(frames)) {
            // 合图，每帧宽高不一样

            for (var i = 0, _f; i < frames.length; i++) {
                _f = frames[i];
                
                if (isArray(_f)) {
                    _sources.push({
                        source: sources[_f[6] || 0],
                        loc: {
                            x: _f[0] || 0,
                            y: _f[1] || 0,
                            offX: _f[4] || 0,
                            offY: _f[5] || 0,
                        },
                        width: _f[2],
                        height: _f[3],
                    });
                } else {
                    _sources.push({
                        source: sources[_f.index || 0],
                        loc: {
                            x: _f.x || 0,
                            y: _f.y || 0,
                            offX: _f.offX || 0,
                            offY: _f.offY || 0,
                        },
                        width: _f.width,
                        height: _f.height,
                    });
                }
            }
        } else {

            // 单图，或 设置 frame: {width: height:} 的元素大小一致的合图

            var f_w = frames && frames.width,
                f_h = frames && frames.height;

            for (var i = 0, source; i < sources.length; i++) {
                source = sources[i];

                var s_w = source.width,
                    s_h = source.height;

                var w = f_w? f_w: s_w,
                    h =  f_h? f_h: s_h;

                var xSize = s_w / w,
                    ySize = s_h / h;

                for (var k = 0; k < ySize; k++) {
                    for (var j = 0; j < xSize; j++) {
                       _sources.push({
                            source: source,
                            loc: {
                                x: j * w,
                                y: k * h,
                                offX: frames && frames.offX || 0,
                                offY: frames && frames.offY || 0,
                            },
                            width: w,
                            height: h,
                        });
                    }
                }
            }
        }

        return _sources;
    }
}

export default Frames
