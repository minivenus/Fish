var o = function() {
    function t() {}
    return t.SaveDataByKey = function(o, e) {
        cc.sys.localStorage.setItem(o, e);
    }, t.GetByKey = function(o) {
        var e = cc.sys.localStorage.getItem(o);
        return "string" == typeof e && "" != e ? e : null;
    }, t.closest = function(r, e) {
        for (var t, n, a = 0, o = r.length - 1; a <= o && (t = C((o + a) / 2), !(1 >= o - a));) {
            if (n = r[t], n === e) return t;
            e < n ? o = t : a = t;
        }
        var d = r[a],
            s = r[o];
        return e - d < s - e ? d : s;
    }, t.isToday = function(d) {
        var e = new Date(),
            t = e.getFullYear(),
            o = 10 < e.getMonth() + 1 ? e.getMonth() + 1 : "0" + (e.getMonth() + 1),
            l = 10 < e.getDate() ? e.getDate() : "0" + e.getDate(),
            n = new Date();
        n.setTime(d);
        var a = n.getFullYear(),
            s = 10 < n.getMonth() + 1 ? n.getMonth() + 1 : "0" + (n.getMonth() + 1),
            p = 10 < n.getDate() ? n.getDate() : "0" + n.getDate();
        return t == a && o == s && l == p ? (console.log("同一天"), !0) : (console.log("不是同一天"), !1);
    }, t.objToArray = function(a) {
        var e = [];
        for (var t in a) e.push(a[t]);
        return e;
    }, t.FindObjByArry = function(a, e, t) {
        for (var o = a.length; o--;)
            if (a[o][e] === t) return a[o];
        return null;
    }, t;
}();
exports.Util = o;