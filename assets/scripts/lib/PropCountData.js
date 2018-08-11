var o = function() {
    function r() {
        this.currentCount = 0, this.limitCount = 0, this.propId = 0, this.propIcon = "";
    }
    return r.get = function(a, e, t, o) {
        void 0 === o && (o = "");
        var i = new r();
        return i.propId = a, i.currentCount = e, i.limitCount = t, i.propIcon = o, i;
    }, r;
}();
exports.default = o;