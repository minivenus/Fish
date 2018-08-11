var o = function() {
    function p() {
        this.score = 0, this.bestScore = 0, this.coin = 0, this.surpassRatio = 0, this.homeCallback = null,
            this.restartCallback = null, this.tips = "", this.props = [], this.titleList = [];
    }
    return p.getInstance = function(d, e, t, o, i, n, a, s, c) {
        void 0 === c && (c = null);
        var r = new p();
        return r.score = d, r.bestScore = e, r.coin = t, r.surpassRatio = o, r.tips = i,
            r.homeCallback = n, r.restartCallback = a, r.props = s, r.titleList = c, r;
    }, p;
}();
exports.default = o;