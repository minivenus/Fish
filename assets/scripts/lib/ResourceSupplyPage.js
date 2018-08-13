var o = require("./BaseResourcePage"),
    p = require("./ResourceItem"),
    s = require("./ResourceConfig"),
    i = cc._decorator,
    n = i.ccclass,
    a = i.property,
    r = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.desc = null, t.subTitle = null, t.itemRoot = null, t;
        }
        return __extends(t, o), exports.prototype.start = function() {
                this.desc.string = this.pageData.desc, this.subTitle.string = this.pageData.subTitle;
            }, exports.prototype.refresh = function(o) {
                var r = this;
                console.log("refresh data", o), cc.loader.loadRes("common/resourceSupply/prefabs/ResourceItem", function(t, a) {
                    if (t) throw t;
                    o.data.forEach(function(n) {
                        var e = cc.instantiate(a);
                        e.parent = r.itemRoot;
                        var t = e.getComponent(p.default),
                            o = s.default.get(n);
                        t.propData = r.propDataList.filter(function(t) {
                            return t.propId == o.id;
                        })[0] || null, t.refresh(o);
                    });
                });
            }, expports.prototype.onClickHome = function() {
                this.pageData && this.pageData.clickHomeCallback && this.pageData.clickHomeCallback();
            }, __decorate([a(cc.Label)], exports.prototype, "desc", void 0), __decorate([a(cc.RichText)], exports.prototype, "subTitle", void 0),
            __decorate([a(cc.Node)], exports.prototype, "itemRoot", void 0), exports = __decorate([n], exports);
    }(o.default);
exports.default = r;