import { isArray, createCanvas } from  './utils.js'

class Track {
    constructor(canvas, zIndex) {
        this._id = 0;
        this.zIndex = zIndex || 0;
        this.isEnable = true;
        this.materials = [];
        this.curM = null;

        if (canvas) {
            this.canvas = canvas;
            this.canvas.ctx = canvas.getContext('2d');
        }
    }

    // index 基于未播放的内容队列
    add(material, index){
        var materials = isArray(material)? material: [material];
        materials.map(item => {
            item.id = this._id++;
            item.track = this;

            // 为 material 重置 canvas，使其不会具体画出来
            item.canvas = createCanvas(this.canvas.width, this.canvas.height);

            var i = (index !== undefined)? (this.getMIndex(this.curM) + index + 1): this.materials.length;
            // console.log(i)
            this.materials.splice(i, 0, item);
        })
        
        return material;
    }

    update(isIgnoreTimes) {
        var curM = this.curM = this.curM || this.materials[0];

        if (!curM) { return };
        if (curM.isEnd) {
            var next = this.getNext();
            if (next && next.isReady) {
                this.curM = next;
                this.curM.actIndex = -1;
                return this.update(true);
            }
            return;
        }

        var m = curM.update(isIgnoreTimes);
        return this.draw(m.canvas);
    }

    prev(isIgnoreTimes){
        var curM = this.curM = this.curM || this.materials[0];

        if (curM.actIndex <= 0) {
            var prev = this.getPrev();
            if (prev && prev.isReady) {
                this.curM = prev;
                this.curM.actIndex = this.curM.animation.length - 1;
                return this.prev();
            }
            return;
        }

        var m = curM.prev();

        return this.draw(m.canvas);
    }

    draw(canvas){
        this.canvas.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.canvas.ctx.drawImage(canvas, 0,0);

        return this;
    }

    // to(index) {
    //     var _index = 0;
    //     for (var i = 0, materials = this.materials, material, len = materials.length; i < len; i++) {
    //         material = materials[i];
    //         var l = material.animation.length;
    //         _index += l;

    //         if (index <= _index - 1) {
    //             this.curM = material;
    //             this.curM.actIndex = index - (_index - l);
    //         }
    //     }

    //     return this.draw(this.curM);
    // }

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
                return (_index += materials[i].actIndex);
            }
        }
    }

}

export default Track