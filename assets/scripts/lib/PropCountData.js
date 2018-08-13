var o = function() {
    function r() {
        this.currentCount = 0, this.limitCount = 0, this.propId = 0, this.propIcon = "";
    }
    return r.get = function(a, e, t, o) {
        void 0 === o && (o = "");
        var s = new r();
        return s.propId = a, s.currentCount = e, s.limitCount = t, s.propIcon = o, s;
    }, r;
}();
exports.default = o;