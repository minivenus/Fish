function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var r = o(require("./dataStatistics.js")),
    l = o(require("./game.js")),
    n = o(require("./coinsdk.js")),
    a = o(require("./config")),
    s = o(require("./track.js"));
export default new function t() {
    (function(o, e) {
        if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
    })(this, t), this.dataStatistics = r.default, this.game = l.default, this.coin = n.default,
        this.config = a.default, this.track = s.default;
}();