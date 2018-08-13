var o = function() {
    function r() {
        this._subTitle = "你想要的这里都有", this._desc = "赠送好友游戏道具，当有好友领取时，你与好友共同得到奖励\n资源补给每日0点刷新",
            this._clickHomeCallback = null, this._pageType = 0;
    }
    return Object.defineProperty(r.prototype, "subTitle", {
        get: function() {
            return this._subTitle;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(r.prototype, "desc", {
        get: function() {
            return this._desc;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(r.prototype, "clickHomeCallback", {
        get: function() {
            return this._clickHomeCallback;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(r.prototype, "pageType", {
        get: function() {
            return this._pageType;
        },
        enumerable: !0,
        configurable: !0
    }), r.prototype.init = function(a, e, t, o) {
        void 0 === e && (e = null), void 0 === t && (t = ""), void 0 === o && (o = ""),
            this._pageType = a, this._subTitle = t || this._subTitle, this._desc = o || this._desc,
            this._clickHomeCallback = e;
    }, r.get = function(a, e, t, o) {
        void 0 === e && (e = null), void 0 === t && (t = ""), void 0 === o && (o = "");
        var s = new r();
        return s._pageType = a, s._subTitle = t || s._subTitle, s._desc = o || s._desc,
            s._clickHomeCallback = e, s;
    }, r;
}();
exports.default = o;