var o = function() {
    function d() {
        this.score = 0, this.bestScore = 0, this.coin = 0, this.surpassRatio = 0, this.homeCallback = null,
            this.restartCallback = null, this.tips = "", this.props = [], this.titleList = [];
    }
    return d.getInstance = function(p, e, t, o, m, n, a, s, c) {
        void 0 === c && (c = null);
        var r = new d();
        return r.score = p, r.bestScore = e, r.coin = t, r.surpassRatio = o, r.tips = m,
            r.homeCallback = n, r.restartCallback = a, r.props = s, r.titleList = c, r;
    }, d;
}();
exports.default = o;