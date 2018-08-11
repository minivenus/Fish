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
        for (var n, i = 0; 4 > i; i++) n = cc.instantiate(this.point3List[0]), n.parent = this.point3List[0].parent,
            this.point3List[this.point3List.length] = n;
        for (var a, r = 0; 4 > r; r++) a = cc.instantiate(this.point4List[0]), a.parent = this.point4List[0].parent,
            this.point4List[this.point4List.length] = a;
        for (var s, d = 0; 4 > d; d++) s = cc.instantiate(this.point5List[0]), s.parent = this.point5List[0].parent,
            this.point5List[this.point5List.length] = s;
        for (var l, c = 0; 15 > c; c++) l = cc.instantiate(this.goldList[0]), l.parent = this.goldList[0].parent,
            this.goldList[this.goldList.length] = l;
        for (var u, m = 0; 6 > m; m++) u = cc.instantiate(this.pufferModList[0]), u.parent = this.pufferModList[0].parent,
            this.pufferModList[this.pufferModList.length] = u;
        for (var p, g = 0; 2 > g; g++) p = cc.instantiate(this.citieList[0]), p.parent = this.citieList[0].parent,
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
        for (var h = this, _ = function(a) {
                var o = "Fishscene" + (a + 1) + "Cfg.json",
                    t = cc.url.raw("resources/fishPop/config/" + o);
                cc.loader.load(t, function(n, e) {
                    return n ? (console.error("load FishLineCfg failed"), void console.error(n.message || n)) : void(console.log("load FishLineCfg success", o),
                        h.scene[a] = e);
                }.bind(S));
            }, f = 0; 12 > f; f++) _(f);
    },
    updateBuild: function() {
        this.buildCount++;
        var r, e, t = (r = 1, e = 12, d(Math.random() * (e - r + 1) + r)),
            o = this.scene[t],
            i = 0;
        if (o && o.length)
            for (var n, s = 0; s < o.length - 1; s++)
                if (n = o[s], 21 != n.type || "21" != n.type) {
                    var a = this.build[n.type];
                    o[s - 1] && o[s - 1].type == o[s].type || (i = 0), a[i] && (a[i].active = !0, a[i].x = n.x,
                        a[i].y = n.y), i++;
                }
    }
});