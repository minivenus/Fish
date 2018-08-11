var o = function() {
    function t() {}
    return t.Log = function(o, e) {
        this.logOpen && (e = null == e ? "" : e, console.log("[普通日志]%c" + o, e));
    }, t.ErroLog = function(o, e) {
        this.erroOpen && (e = null == e ? "" : e, console.log("[错误日志]%c" + o, "color: #f61606;", e));
    }, t.DebugLog = function(a, e, t) {
        this.debugOpen && (t = null == t ? "" : t, e = null == e ? "color: #ffcc00;" : "color:" + e + ";",
            console.log("[调试日志]%c" + a, e, t));
    }, t.SwitchLog = function(a, e, t) {
        void 0 === a && (a = !0), void 0 === e && (e = !0), void 0 === t && (t = !0), this.logOpen = a,
            this.erroOpen = e, this.debugOpen = t;
    }, t.logOpen = !0, t.erroOpen = !0, t.debugOpen = !0, t;
}();
exports.LogUtil = o;