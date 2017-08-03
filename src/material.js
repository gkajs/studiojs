import Event from  './event.js'

class Material extends Event {
    constructor(track, id, material) {
        super()

        this.id = id;
        this.track = track;
        this.actIndex = -1;
        this.material = material || {};
        this.fps = this.material.fps || 60;

        this.animations = Material.formateAni(this.material.animations || []);
        this.animationsOrigin = Material.formateAniObj(this.material.animationsOrigin || {});

        this.times = 0;
    }

    static formateAni(anis) {
        var res = [], arr, start, end;
        for (var i = 0; i < anis.length; i++) {
            arr = String(anis[i]).split("-"),
            start = arr[0],
            end = arr[1] === undefined? arr[0]: arr[1];

            if (isNaN(start)) {
                res.push(start);
            } else {
                for (var j = Number(start); j <= Number(end); j++) {
                    res.push(j);
                }
            }
        }
        return res
    }

    static formateAniObj(obj) {
        var res = {};
        for(var key in obj) {
            res[key] = Material.formateAni(obj[key]);
        }
        return res
    }

    clear(type, callback){
        this.trigger("clear", this);
        this.animations = []; // 制空则跳过
        return this;
    }
}
export default Material
