import Event from  './event.js'
import { isArray, createCanvas } from  './utils.js'

class Stage extends Event {
    constructor(canvas) {
        super()

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.tracks = [];
    }

    add(track){
        var tracks = isArray(track)? track: [track];
        tracks.map(item => {
            // 为 track 重置一个 canvas，不会具体画出来
            item.canvas = createCanvas(this.canvas.width, this.canvas.height);
            item.stage = this;
            this.tracks.push(item);
        })
    }

    draw(type, isIgnoreFps){
        var tracks = this.tracks;

        for (var i = 0, tracksUpdated = [], len = tracks.length; i < len; i++) {
            // 是否暂停
            if (tracks[i].isEnable) {

                var newTrack = null;

                // 无调用 draw 则返回 0，有 draw 则返回新 track
                if (type === "next") {
                    newTrack = tracks[i].update(isIgnoreFps);
                } else if (type === "prev") {
                    newTrack = tracks[i].prev(isIgnoreFps);
                } else {
                    // draw 制定帧 type为数字
                    newTrack = tracks[i].to(type);
                }

                if (newTrack) {
                    tracksUpdated.push(newTrack);
                }
            }
        }

        if (tracksUpdated.length > 0) {
            this.isEnd = false;
            tracksUpdated = tracksUpdated.sort(function(a, b){
                return a.zIndex - b.zIndex > 0;
            })
            // 清空 stage 画布
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var j = 0; j < tracksUpdated.length; j++) {
                this.ctx.drawImage(tracksUpdated[j].canvas,0,0);
            }
            this.trigger("frame")
        } else {
            // TODO 无任何draw时触发 加入空白元素时，应区分开
            this.trigger("end");
            this.isEnd = true;
        }
    }

    update(isIgnoreFps){
        this.draw("next", isIgnoreFps);
    }
    
    prev(isIgnoreFps){
        this.draw("prev", isIgnoreFps);
    }

    get(type) {
        var tracks = this.tracks;
        for (var i = 0, _i = 0, len = tracks.length; i < len; i++) {
            if (type === "curIndex") {
                _i = tracks[i].getCurIndex();
            } else if (type === "fLen") {
                _i = tracks[i].getLen("frames");
            } else if (type === "mLen") {
                _i = tracks[i].getLen("materials");
            }
            _i = i > _i? i: _i;
        }
        return _i;
    }

    getCurIndex() {
        return this.get("curIndex");
    }

    getLen(type) {
        return type === "frames"? this.get("fLen"): (type === "materials"? this.get("mLen"): 0)
    }
}

export default Stage
