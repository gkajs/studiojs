import Material from './material.js'

class Track {
    constructor(zIndex) {
        this._id = 0;
        this.zIndex = zIndex || 0;
        this.isEnable = true;
        this.materials = [];
        this.curM = null;
    }

    // index 基于未播放的内容队列
    add(material, index){
        var m = new Material(this, this._id++, material);
        var i = (index !== undefined)? (this.getMIndex(this.curM) + index + 1): this.materials.length;

        this.materials.splice(i, 0, m);
        return m;
    }

    update(isIgnoreFps) {
        var curM = this.curM = this.curM || this.materials[0];
        if (!curM || !(curM.material && curM.material.isReady)) { return; }
        
        if (!isIgnoreFps) {
            ++curM.times;

            if (curM.times < (60 / curM.fps)) {
                return this;
            } else {
                curM.times = 0;
            }
        }
        var actIndex = ++curM.actIndex;
        
        if (actIndex > curM.animation.length - 1) {

            var next = this.getNext();
            // console.log("next", this.curM, next)

            if (next && next.material.isReady) {
                this.curM = next;
                this.curM.actIndex = 0;

                return this.draw(this.curM);
            }else {
                // 到达最后 || 保留 下一个未 ready, 默认会清除
                --curM.actIndex;
                return;
            }
        }

        return this.draw(this.curM);
    }

    prev(isIgnoreFps){
        // 拿到当前 frameAnimation 的当前帧
        var curM = this.curM = this.curM || this.materials[0];
        if (!curM || !(curM.material && curM.material.isReady)) { return; }

        if (!isIgnoreFps) {
            ++curM.times;

            if (curM.times < (60 / curM.fps)) {
                return this;
            } else {
                curM.times = 0;
            }
        }

        var actIndex = --curM.actIndex;
        
        // 到最后了，判断下一个应该播放哪个 FrameAnimation
        if (actIndex < 0) {
            var prev = this.getPrev();

            if (prev && prev.material.isReady) {
                this.curM = prev;
                this.curM.actIndex = this.curM.animation.length - 1;
                return this.draw(this.curM);
            } else {
                ++curM.actIndex;
                return;
            }
           
        }

        return this.draw(this.curM);
    }

    to(index) {
        var _index = 0;
        for (var i = 0, materials = this.materials, material, len = materials.length; i < len; i++) {
            material = materials[i];
            var l = material.animation.length;
            _index += l;

            if (index <= _index - 1) {
                this.curM = material;
                this.curM.actIndex = index - (_index - l);
            }
        }

        return this.draw(this.curM);
    }

    draw(m, i){
        var curM = m;
        var actIndex = i !== undefined? i: curM.actIndex;

        var animation = curM.animation;
        var acitveOne = animation[actIndex];

        if (isNaN(acitveOne)) {
            var arr = curM.animations[acitveOne];
            // console.log(animation, arr)
            arr && animation.splice(actIndex, 1, ...arr);
            acitveOne = animation[actIndex];
        }

        if (acitveOne === undefined) { return; }

        var curMM = curM.material;
        if (actIndex === 0) {
            curM.trigger("start", curM) || curMM.trigger("start", curM);
        } else if (actIndex === curM.animation.length - 1){
            curM.trigger("end", curM) || curMM.trigger("end", curM);
        } else {
            curM.trigger("frame", actIndex, curM) || curMM.trigger("frame", curM);
        }

        var obj = curMM.sources[acitveOne];
        var source = obj.source,
            loc = obj.loc;

        this.canvas._rect = {
            x: (curM.x || 0),
            y: (curM.y || 0),
            width: (obj.width * (curM.scale || 1)),
            height: (obj.height * (curM.scale || 1)),
        }

        this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
        if (curM.flip === "horizintal") {
            this.canvas._rect.x = this.canvas.width - (curM.x || 0) - (obj.width * (curM.scale || 1));
            
            this.canvas.ctx.translate(this.canvas.width, 0);
            this.canvas.ctx.scale(-1, 1);
        }
        
        var _offX = (curM.x || 0) + (loc.offX || 0);
        var _offY = (curM.y || 0) + (loc.offY || 0);

        this.canvas.ctx.drawImage(source, (loc.x || 0), (loc.y || 0), obj.width, obj.height, _offX, _offY, (obj.width * (curM.scale || 1)), (obj.height * (curM.scale || 1)));
        // this.canvas.ctx.drawImage(source, loc.x, loc.y, obj.width, obj.height, (curM.x || 0), (curM.y || 0), (obj.width * (curM.scale || 1)), (obj.height * (curM.scale || 1)));
        
        if (curM.flip === "horizintal") {
            this.canvas.ctx.translate(this.canvas.width, 0);
            this.canvas.ctx.scale(-1, 1);
        }

        this.curM = curM;

        return this;
    }

    getMIndex(m) {
        for (var i = 0, materials = this.materials, len = materials.length; i < len; i++) {
            if (materials[i].id == m.id){
                return i;
            }
        }
        return 0;
    }

    getPrev() {
        var _i = this.getMIndex(this.curM);
        return this.materials[_i - 1];
    }

    getNext() {
        var _i = this.getMIndex(this.curM);
        return this.materials[_i + 1];
    }

    play() {
        this.isEnable = true;
        this.stage.trigger("ready");
    }

    pause() {
        this.isEnable = false;
    }

    getLen(type) {
        if (type === "frames") {
            return this.materials.reduce((a, b) => {
                return (a && a.animation.length || 0) +  (b && b.animation.length || 0);
            }, 0);
        } else if (type === "materials") {
            return this.materials.length;
        }
    }

    getCurIndex(type) {
        var _index = 0;
        var materials = this.materials;
        for (var i = 0, len = materials.length; i < len; i++) {
            if (materials[i].id == this.curM.id){
                for (var j = 0; j < i; j++) {
                    var l = materials[i].animation.length;
                    _index += l;
                }
                // console.log(j, i, _index, materials[i].actIndex, _index += materials[i].actIndex)
                return (_index += materials[i].actIndex);
            }
        }
    }

}

export default Track