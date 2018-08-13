cc.Class({
    extends: cc.Component,
    properties: {
        point1List: [cc.Node],
        point2List: [cc.Node],
        point3List: [cc.Node],
        point4List: [cc.Node],
        point5List: [cc.Node],
        goldList: [cc.Node],
        pufferModList: [cc.Node],
        citieList: [cc.Node],
        scene: [],
        buildCount: 0
    },
    start: function() {
        for (var C, S = this, t = (cc.instantiate(this.point1List[0]), 0); 4 > t; t++) C = cc.instantiate(this.point1List[0]),
            C.parent = this.point1List[0].parent, this.point1List[this.point1List.length] = C;
        for (var e, o = 0; 4 > o; o++) e = cc.instantiate(this.point2List[0]), e.parent = this.point2List[0].parent,
            this.point2List[this.point2List.length] = e;
        for (var n, s = 0; 4 > s; s++) n = cc.instantiate(this.point3List[0]), n.parent = this.point3List[0].parent,
            this.point3List[this.point3List.length] = n;
        for (var a, r = 0; 4 > r; r++) a = cc.instantiate(this.point4List[0]), a.parent = this.point4List[0].parent,
            this.point4List[this.point4List.length] = a;
        for (var c, h = 0; 4 > h; h++) c = cc.instantiate(this.point5List[0]), c.parent = this.point5List[0].parent,
            this.point5List[this.point5List.length] = c;
        for (var l, u = 0; 15 > u; u++) l = cc.instantiate(this.goldList[0]), l.parent = this.goldList[0].parent,
            this.goldList[this.goldList.length] = l;
        for (var d, m = 0; 6 > m; m++) d = cc.instantiate(this.pufferModList[0]), d.parent = this.pufferModList[0].parent,
            this.pufferModList[this.pufferModList.length] = d;
        for (var p, f = 0; 2 > f; f++) p = cc.instantiate(this.citieList[0]), p.parent = this.citieList[0].parent,
            p.active = !1, this.citieList[this.citieList.length] = p;
        this.build = {
            1: this.goldList,
            11: this.point4List,
            12: this.point2List,
            13: this.point3List,
            14: this.point4List,
            15: this.point5List,
            21: this.citieList,
            31: this.pufferModList
        };
        for (var g = this, _ = function(a) {
                var o = "Fishscene" + (a + 1) + "Cfg.json",
                    t = cc.url.raw("resources/fishPop/config/" + o);
                cc.loader.load(t, function(n, e) {
                    return n ? (console.error("load FishLineCfg failed"), void console.error(n.message || n)) : void(console.log("load FishLineCfg success", o),
                        g.scene[a] = e);
                }.bind(S));
            }, y = 0; 12 > y; y++) _(y);
    },
    updateBuild: function() {
        this.buildCount++;
        var r, e, t = (r = 1, e = 12, C(Math.random() * (e - r + 1) + r)),
            o = this.scene[t],
            d = 0;
        if (o && o.length)
            for (var n, s = 0; s < o.length - 1; s++)
                if (n = o[s], 21 != n.type || "21" != n.type) {
                    var a = this.build[n.type];
                    o[s - 1] && o[s - 1].type == o[s].type || (d = 0), a[d] && (a[d].active = !0, a[d].x = n.x,
                        a[d].y = n.y), d++;
                }
    }
});