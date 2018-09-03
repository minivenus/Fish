var gamesdk = require("./gamesdk"),
wxShortcut = require("./wxShortcut"),
    o = function() {
        function t() {
            this.callbackId = 0;
        }
        return t.checkShowEntrance = function(o) {
            gamesdk.coin.checkSynchronized(function(t) {
                if (!t || !t.data) throw "返回数据不正常，请检查请求参数设置";
                console.log("checkSynchronized:", t), o && o(t.data.isSynchronized);
            });
        }, t.clickEntrance = function(a, r, e) {
            void 0 === r && (r = null), void 0 === e && (e = null), gamesdk.dataStatistics.mysteryCode(a, function(t) {
                console.log("获取神秘礼包二维码成功！", t), r && r(t);
            }, function(t) {
                console.log("获取神秘礼包二维码失败！,detail:", t), wxShortcut.default.showToast("获取二维码失败，请稍候再试！", 3);
            });
        }, t.onShowCallback = function(a, r, t) {
            if (void 0 === r && (r = null), void 0 === t && (t = null), a) {
                console.log("MysteryGiftUtil.onShowCallback()  res:", a);
                var e = null;
                a.query && a.query.noticeId ? e = a.query.noticeId : a.referrerInfo && a.referrerInfo.extraData && a.referrerInfo.extraData.noticeId && (e = a.referrerInfo.extraData.noticeId),
                    e && gamesdk.game.getMysteryGift(e, function(t) {
                        console.log("领取礼包完成，请求成功", t), r && r(t);
                    }, function(o) {
                        console.log(o), wxShortcut.default.showToast("请求失败", 2), t && t(o);
                    });
            }
        }, t;
    }();
exports.default = o;