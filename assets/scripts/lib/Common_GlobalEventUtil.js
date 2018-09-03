var commonLogUtil = require("./Common_LogUtil"),
    GlobalEventUtil = function() {
        function GlobalEventUtil() {}
        return GlobalEventUtil.on = function(a, e, n) {
            void 0 === this._eventMap[a] && (this._eventMap[a] = []), this._eventMap[a].push({
                callback: e,
                target: n
            });
        }, GlobalEventUtil.emit = function(a, e) {
            var t = this._eventMap[a];
            if (void 0 !== t)
                for (var o, n = 0; n < t.length; n++) o = t[n], o && o.callback.call(o.target, e);
            else commonLogUtil.LogUtil.ErroLog("没有找到需要发送的全局事件：" + a);
        }, GlobalEventUtil.off = function(a, e) {
            var t = this._eventMap[a];
            if (void 0 !== t)
                for (var o, n = 0; n < t.length; n++)
                    if (o = t[n], o && o.target === e) {
                        t[n] = void 0;
                        break;
                    }
        }, GlobalEventUtil.offType = function(t) {
            this._eventMap[t] = void 0;
        }, GlobalEventUtil._eventMap = [], GlobalEventUtil;
    }();
exports.GlobalEventUtil = GlobalEventUtil;