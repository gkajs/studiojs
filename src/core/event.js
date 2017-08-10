class Event {
    constructor() {
        this.listeners = [];
    }

    trigger(type, ...opt) {
        return this.listeners.filter(function(l){
            var isMatch = type === l.type? 1: 0;
            isMatch && l.callback(...opt);
            return isMatch;
        }).reduce(function(a, b){
            return a + b;
        },0)
    }
    
    on(type, callback){
        this.listeners.push({
            type: type,
            callback: callback,
        });
        return this;
    }
}

var eventMap = {
    onClear: "clear",
    onReady: "ready",
    onStart: "start",
    onFrame: "frame",
    onEnd: "end",
}

for(var i in eventMap) {
    Event.prototype[i] = (function(i) {
        return function(callback) {
            this.on(eventMap[i], callback);
            return this;
        }
    })(i);
}

export default Event
