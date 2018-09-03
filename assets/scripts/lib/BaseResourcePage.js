var commonSharedUtils = require("./Common_ShareUtils"),
    d = cc._decorator,
    n = d.ccclass,
    BaseResourcePage = (d.property, function(__super) {
        function BaseResourcePage() {
            var BaseResourcePage = null !== __super && __super.apply(this, arguments) || this;
            return BaseResourcePage._pageData = null, BaseResourcePage.propDataList = [], BaseResourcePage;
        }
        return __extends(BaseResourcePage, __super), Object.defineProperty(BaseResourcePage.prototype, "pageData", {
            get: function() {
                return this._pageData;
            },
            set: function(t) {
                t != this._pageData && (this._pageData = t, this.getData());
            },
            enumerable: !0,
            configurable: !0
        }), BaseResourcePage.prototype.start = function() {}, BaseResourcePage.prototype.getData = function() {
            var self = this;
            commonSharedUtils.default.getShareRewardList(this.pageData.pageType, function(t) {
                console.log("BaseResourcePage.getData() 获取到数据：", t), self.refresh(t);
            });
        }, BaseResourcePage.prototype.refresh = function() {}, BaseResourcePage = __decorate([n], BaseResourcePage);
    }(cc.Component));
exports.default = BaseResourcePage;