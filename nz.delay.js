/*
 * NZDelay是延时类,用于链式延时执行函数.
 * 示例:
 * (new nzdelay).w(1000).f(fn).w(1500).f(fn2);
 */
var NZDelay = (function () {
    var delay = function () {
        this.state = 0;
        this.queue = [];
        return this;
    }
    delay.prototype.__next = function () {
        if (this.state == 1)return this;
        this.state = 1;
        if (this.queue.length)this.queue.shift().bind(this)();
        return this;
    }
    delay.prototype.w = (function () {
        var endTime = 0;
        return function (ms) {
            if (typeof(ms) != "number")throw "delay - ms is not number.";
            this.queue.push(function () {
                endtime = +new Date() + ms;
                window.requestAnimationFrame(function () {
                    if (+new Date() >= endtime) {
                        this.state = 0;
                        return this.__next();
                    }
                    window.requestAnimationFrame(arguments.callee.bind(this));
                }.bind(this));
            });
            return this.__next();
        }
    })();
    delay.prototype.f = function (fn) {
        if (typeof(fn) != "function")throw "delay - fn is not function.";
        this.queue.push(function () {
            fn.bind(this)();
            this.state = 0;
            this.__next();
        });
        return this.__next();
    }
    return {
        w: function (ms) {
            new delay.w(ms);
        },
        f: function (fn) {
            new delay.f(fn);
        }
    };
})();