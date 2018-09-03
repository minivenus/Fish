function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var dataStatistics = o(require("./dataStatistics.js")),
    game = o(require("./game.js")),
    coinsdk = o(require("./coinsdk.js")),
    config = o(require("./config")),
    track = o(require("./track.js"));
export default new function t() {
    (function(o, e) {
        if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
    })(this, t), this.dataStatistics = dataStatistics.default, this.game = game.default, this.coin = coinsdk.default,
        this.config = config.default, this.track = track.default;
}();