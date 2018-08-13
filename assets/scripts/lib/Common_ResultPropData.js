var o = cc._decorator,
    s = o.ccclass,
    n = (o.property, function() {
        function t() {
            this.id = 0, this.name = "", this.icon = "", this.count = 0, this.showMark = !1,
                this.callback = null;
        }
        return (r = t).get = function(d, e, t, o, l, n) {
            var a = new r();
            return a.id = d, a.name = e, a.icon = t, a.count = o, a.showMark = l, a.callback = n,
                a;
        }, t.getInstance = function(o) {
            var t = new r();
            try {
                t.id = o.id, t.name = o.name, t.icon = o.icon, t.count = o.number, t.showMark = o.if_mark,
                    t.callback = o.link;
            } catch (t) {
                throw new Error("ResultPropData.get() 参数类型错误 详细信息：" + o);
            }
            return t;
        }, t = r = __decorate([s], t);
        var r;
    }());
exports.default = n;