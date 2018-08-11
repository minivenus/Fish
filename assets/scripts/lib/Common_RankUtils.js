var o = function() {
    function t() {}
    return t.nameCheck = function(o) {
        var e = o;
        return o.length > this.maxNameNum && (e = o.substr(0, this.maxNameNum) + "..."),
            e;
    }, t.scoreCheck = function(a) {
        var e = a.toString(),
            t = e;
        return e.length > this.maxScoreNum && (t = "9999999+"), t;
    }, t.getTitle = function(o) {
        if (this.titleLists && 0 < this.titleLists.length) {
            for (var e = 0; e < this.titleLists.length; e++)
                if (this.titleLists[e].score >= o) return 0 <= e - 1 ? this.titleLists[e - 1].title : "";
            return 0 <= this.titleLists.length - 1 ? this.titleLists[this.titleLists.length - 1].title : "";
        }
        return "";
    }, t.maxNameNum = 6, t.maxScoreNum = 7, t.titleLists = [], t;
}();
exports.Common_RankUtils = o;