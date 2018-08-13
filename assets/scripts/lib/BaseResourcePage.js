var o = require("./Common_ShareUtils"),
    d = cc._decorator,
    n = d.ccclass,
    a = (d.property, function(a) {
        function t() {
            var t = null !== a && a.apply(this, arguments) || this;
            return t._pageData = null, t.propDataList = [], t;
        }
        return __extends(t, a), Object.defineProperty(t.prototype, "pageData", {
            get: function() {
                return this._pageData;
            },
            set: function(t) {
                t != this._pageData && (this._pageData = t, this.getData());
            },
            enumerable: !0,
            configurable: !0
        }), exports.prototype.start = function() {}, exports.prototype.getData = function() {
            var a = this;
            o.default.getShareRewardList(this.pageData.pageType, function(t) {
                console.log("BaseResourcePage.getData() 获取到数据：", t), a.refresh(t);
            });
        }, exports.prototype.refresh = function() {}, t = __decorate([n], t);
    }(cc.Component));
exports.default = a;