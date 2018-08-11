var o = function() {
    function a() {
        this.id = 0, this.appId = "", this.host_gift = "", this.host_gift_name = "", this.host_gift_num = 0,
            this.open_status = !0, this.host_gift_num_limit = 0, this.hasReceivedCount = 0;
    }
    return a.get = function(o) {
        var e = new a();
        return e.id = o.id, e.appId = o.appId, e.host_gift = o.host_gift, e.host_gift_name = o.host_gift_name,
            e.host_gift_num = o.host_gift_num, e.open_status = o.open_status, e.host_gift_num_limit = o.host_gift_num_limit,
            e.hasReceivedCount = o.hasReceivedCount, e;
    }, a;
}();
exports.default = o;