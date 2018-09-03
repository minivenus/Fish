var LogUtil = function() {
    function LogUtil() {}
    return LogUtil.Log = function(o, e) {
        this.logOpen && (e = null == e ? "" : e, console.log("[普通日志]" + o, e));
    }, LogUtil.ErroLog = function(o, e) {
        this.erroOpen && (e = null == e ? "" : e, console.log("[错误日志]" + o, "color: #f61606;", e));
    }, LogUtil.DebugLog = function(a, e, t) {
        this.debugOpen && (t = null == t ? "" : t, e = null == e ? "color: #ffcc00;" : "color:" + e + ";",
            console.log("[调试日志]" + a, e, t));
    }, LogUtil.SwitchLog = function(a, e, t) {
        void 0 === a && (a = !0), void 0 === e && (e = !0), void 0 === t && (t = !0), this.logOpen = a,
            this.erroOpen = e, this.debugOpen = t;
    }, LogUtil.logOpen = !0, LogUtil.erroOpen = !0, LogUtil.debugOpen = !0, LogUtil;
}();
exports.LogUtil = LogUtil;