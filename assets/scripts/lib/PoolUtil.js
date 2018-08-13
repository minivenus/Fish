var o = function() {
    function t() {}
    return t.Init = function(a, e, t) {
        this.brickPool[a] = new cc.NodePool(a);
        for (var o, n = 0; n < e; ++n) o = cc.instantiate(t), this.brickPool[a].put(o);
    }, t.CreateElement = function(a, e, t, o) {
        if (void 0 === o && (o = ""), this.brickPool[a]) {
            var r = null;
            return (r = 0 < this.brickPool[a].size() ? this.brickPool[a].get() : cc.instantiate(t)).parent = e,
                r.getComponent(r.name) && r.getComponent(r.name).Init(o), r;
        }
    }, t.ReturnEnemy = function(o, e) {
        this.brickPool[o] && (console.log("对象池名字--", e), this.brickPool[o].put(e));
    }, t.Clear = function(t) {
        this.brickPool[t] && this.brickPool[t].clear();
    }, t.brickPool = [], t;
}();
exports.PoolUtil = o;