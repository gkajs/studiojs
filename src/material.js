import Event from  './event.js'

class Material extends Event {
    constructor(track, id, material = {}) {
        super();

        this.track = track;
        this.id = id;
        this.material = material;

        this.actIndex = -1;
        this.fps = this.material.fps || 60;

        this.animation = Material.formateAni(this.material.animation || []);
        this.animations = Material.formateAniObj(this.material.animations || {});

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

        return res;
    }

    static formateAniObj(obj) {

        var res = {};

        for(var key in obj) {
            res[key] = Material.formateAni(obj[key]);
        }

        return res;
    }

    clear(type, callback){
        this.trigger("clear", this);
        this.animation = []; // 制空则跳过
        return this;
    }
}

export default Material
