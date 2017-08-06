export function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}

export function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
        canvas.width  = width;
        canvas.height = height;

    canvas.ctx = canvas.getContext('2d');
    return canvas;
}

export function formateAni(anis) {

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

export function formateAniObj(obj) {

    var res = {};

    for(var key in obj) {
        res[key] = formateAni(obj[key]);
    }

    return res;
}