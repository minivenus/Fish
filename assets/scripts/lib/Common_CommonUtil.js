var commonData = require("./Common_Data"),
    Common_CommonUtil = function() {
        function Common_CommonUtil() {}
        return Common_CommonUtil.isWeChat = function() {
            return cc.sys.platform == cc.sys.WECHAT_GAME;
        }, Common_CommonUtil.showTips = function(e, a) {
            cc.loader.loadRes("resources/prefab/h5game_Tips", function(n, r) {
                if (n) cc.error(n);
                else {
                    var t = cc.instantiate(r);
                    t.getComponent("h5game_Tips").setText(e, a), t.parent = cc.director.getScene();
                }
            });
        }, Common_CommonUtil.shakeScreen = function(a) {
            var e = .02,
                t = a;
            t.stopAllActions(), t.runAction(cc.sequence(cc.moveBy(e, cc.p(20, 0)), cc.moveBy(.04, cc.p(-40)), cc.moveBy(e, cc.p(20)), cc.moveBy(e, cc.p(0, 20)), cc.moveBy(.04, cc.p(0, -40)), cc.moveBy(e, cc.p(0, 20)), cc.moveBy(e, cc.p(10, 0)), cc.moveBy(.04, cc.p(-20, 0)), cc.moveBy(e, cc.p(10, 0)), cc.moveBy(e, cc.p(0, 10)), cc.moveBy(.04, cc.p(0, -20)), cc.moveBy(e, cc.p(0, 10))));
        }, Common_CommonUtil.fitScreen = function() {
            var o = cc.director.getScene().getComponentInChildren(cc.Canvas),
                e = cc.view.getVisibleSize();
            e.width / e.height < 9 / 16 ? (o.fitWidth = !0, o.fitHeight = !1) : (o.fitWidth = !1,
                o.fitHeight = !0);
        }, Common_CommonUtil.resetScale = function(o) {
            var e = cc.view.getVisibleSize();
            o.scale = e.width / e.height < 9 / 16 ? e.width / 1080 : e.height / 1920;
        }, Common_CommonUtil.imgStr = function(t) {
            return t;
        }, Common_CommonUtil.txtStr = function(t) {
            return t;
        }, Common_CommonUtil.getLaunchParams = function() {
            if (cc.sys.isNative) return null;
            if (Common_CommonUtil.isWeChat()) {
                var n = wx.getLaunchOptionsSync().query;
                return n.token && n.userId && n.gameId && n.serverHost ? n : null;
            }
            var e = window.location.href,
                t = null,
                o = e.lastIndexOf("?");
            return 0 <= o && (t = e.substring(o)),
                function(a) {
                    if (!a) return null;
                    for (var r, n = {}, t = (a = a.substr(1)).split("&"), o = 0; o < t.length; o++) r = t[o].split("="),
                        n[r[0]] = r[1];
                    return n.token && n.userId && n.gameId && n.serverHost ? n : null;
                }(t);
        }, Common_CommonUtil.preview = function() {
            Common_CommonUtil.isWeChat() && wx.previewImage({
                urls: ["https://h5gameres.kuaiyugo.com/chatgame/cocos_games_res/images/codeImage.jpg"]
            });
        }, Common_CommonUtil.setSprite = function(r, s, d) {
            if (void 0 === s && (s = ""), void 0 === d && (d = null), !r) throw new Error("请传入正确的节点名称");
            if (!s) throw new Error("请传入正确的资源路径");
            var o;
            if (r instanceof cc.Sprite) o = r;
            else if (r instanceof cc.Node) o = r.getComponent(cc.Sprite);
            else {
                if ("[object String]" !== Object.prototype.toString.call(r)) throw new Error("传入节点资源类型不正确");
                o = cc.find(r).getComponent(cc.Sprite);
            }
            if (!o) throw new Error("未找到正确的Sprite");
            if (o && o.spriteFrame) {
                var l = o.node.opacity,
                    n = "load";
                (o.node.opacity = 0) != s.indexOf("http") && (n += "Res"), cc.loader[n](s, function(a, e) {
                    a ? cc.error(a.message || a) : (o.spriteFrame = new cc.SpriteFrame(e), o.node.opacity = l,
                        d && d());
                });
            }
        }, Common_CommonUtil.getPrefab = function(t, a) {
            cc.loader.loadRes(t, function(o, e) {
                if (o) throw o;
                a(cc.instantiate(e));
            });
        }, Common_CommonUtil.toPlatform = function(n, t, o) {
            void 0 === n && (n = null), void 0 === t && (t = null), void 0 === o && (o = null),
            Common_CommonUtil.isWeChat() && (wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appId: "wxce8556babd23a6b3",
                    path: "pages/index/index?channelCode=gametoplatform&openid=" + commonData.default.getOpenId() + "&appid=" + commonData.default.getAppId(),
                    success: function(t) {
                        n && n(t);
                    },
                    fail: function(o) {
                        console.log("跳转失败：", o), t && t(o);
                    },
                    complete: function(t) {
                        o && o(t);
                    }
                }) : commonData.default.createPFCode(function() {
                    console.log("小程序码 显示成功");
                }, function(o) {
                    console.log("小程序码 获取失败", o), t && t(o);
                }));
        }, Common_CommonUtil;
    }();
exports.default = Common_CommonUtil;