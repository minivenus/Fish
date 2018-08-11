var r = require("./Common_LogUtil"),
    o = function() {
        function t() {}
        return t.on = function(a, e, n) {
            void 0 === this._eventMap[a] && (this._eventMap[a] = []), this._eventMap[a].push({
                callback: e,
                target: n
            });
        }, t.emit = function(a, e) {
            var t = this._eventMap[a];
            if (void 0 !== t)
                for (var o, n = 0; n < t.length; n++) o = t[n], o && o.callback.call(o.target, e);
            else r.LogUtil.ErroLog("没有找到需要发送的全局事件：" + a);
        }, t.off = function(a, e) {
            var t = this._eventMap[a];
            if (void 0 !== t)
                for (var o, n = 0; n < t.length; n++)
                    if (o = t[n], o && o.target === e) {
                        t[n] = void 0;
                        break;
                    }
        }, t.offType = function(t) {
            this._eventMap[t] = void 0;
        }, t._eventMap = [], t;
    }();
exports.GlobalEventUtil = o;