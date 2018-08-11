var m = require("./Fish_UserData"),
    o = require("./utils/NodeUtil"),
    n = require("./ComPage"),
    a = require("./FishCfgMgr"),
    i = require("./Common_GlobalEventUtil"),
    s = require("./SoundUtil"),
    r = cc._decorator,
    l = r.ccclass,
    d = r.property,
    c = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.labName = null, t.labGold = null, t.btnSelect = null, t.fbShopItem = null,
                t.pageView = null, t.curSkin = 0, t.skinDatas = [], t.skinUserData = null, t.curType = 0,
                t.myGold = 0, t.nextPage = 0, t;
        }
        return __extends(t, o), t.prototype.start = function() {
                this.myGold = m.Fish_UserData.getGold(), this.labGold.string = this.myGold.toString(),
                    this.pageView = this.GetComponentByNodeName("content/pageview", cc.PageView), this.AddButtonEventStart(this, this.GetNodeByName("content/btnLeft"), this.onRight),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnRight"), this.onLeft),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnClose"), this.onClose),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnSelect"), this.onSelect),
                    this.initFishSkin();
            }, t.prototype.initFishSkin = function() {
                var n = a.FishCfgMgr.getSkinList();
                this.curSkin = m.Fish_UserData.getCurSkin(), this.skinUserData = m.Fish_UserData.getHaveSkins();
                for (var e = 0; n[e];) {
                    this.skinDatas.push(n[e]);
                    var t = cc.instantiate(this.fbShopItem);
                    this.pageView.addPage(t), t.getChildByName("spIcon").getComponent(cc.Sprite).spriteFrame = a.FishCfgMgr.getSkinSpriteFrameByKey(n[e].icon),
                        e++;
                }
                this.labName.string = this.skinDatas[this.curSkin].name, this.pageView.scrollToPage(this.curSkin, 0),
                    this.setState(0), this.nextPage = this.pageView.getCurrentPageIndex();
            }, t.prototype.onTurningEvent = function(o, e) {
                if (e == cc.PageView.EventType.PAGE_TURNING) {
                    var t = this.pageView.getCurrentPageIndex();
                    t == this.curSkin ? this.setState(0) : -1 == this.skinUserData.indexOf(t) ? this.setState(2, this.skinDatas[t].gold) : this.setState(1),
                        this.labName.string = this.skinDatas[t].name;
                }
            }, t.prototype.onLeft = function() {
                if (s.SoundUtil.PlayEffectByKey(1), !(this.pageView.getCurrentPageIndex() + 1 >= this.pageView.getPages().length)) {
                    var t = this.pageView.getCurrentPageIndex() + 1;
                    this.pageView.scrollToPage(t, .3);
                }
            }, t.prototype.onRight = function() {
                if (s.SoundUtil.PlayEffectByKey(1), !(0 > this.pageView.getCurrentPageIndex() - 1)) {
                    var t = this.pageView.getCurrentPageIndex() - 1;
                    this.pageView.scrollToPage(t, .3);
                }
            }, t.prototype.setState = function(o, e) {
                switch (void 0 === e && (e = 0), o) {
                    case 0:
                        this.btnSelect.getChildByName("spBg1").active = !0, this.btnSelect.getChildByName("spBg2").active = !1,
                            this.btnSelect.getChildByName("spBg3").active = !1, this.btnSelect.getChildByName("labDec").active = !1;
                        break;

                    case 1:
                        this.btnSelect.getChildByName("spBg1").active = !1, this.btnSelect.getChildByName("spBg2").active = !0,
                            this.btnSelect.getChildByName("spBg3").active = !1, this.btnSelect.getChildByName("labDec").active = !0,
                            this.btnSelect.getChildByName("labDec").getComponent(cc.Label).string = "使  用";
                        break;

                    case 2:
                        this.btnSelect.getChildByName("spBg1").active = !1, this.btnSelect.getChildByName("spBg2").active = !1,
                            this.btnSelect.getChildByName("spBg3").active = !0, this.btnSelect.getChildByName("labDec").active = !0,
                            this.btnSelect.getChildByName("labDec").getComponent(cc.Label).string = "金币:" + e;
                }
                this.curType = o;
            }, t.prototype.onSelect = function() {
                switch (s.SoundUtil.PlayEffectByKey(1), this.curType) {
                    case 0:
                        break;

                    case 1:
                        this.curSkin = this.pageView.getCurrentPageIndex(), this.setState(0), m.Fish_UserData.setCurSkin(this.curSkin),
                            i.GlobalEventUtil.emit("UpdateSkin");
                        break;

                    case 2:
                        var a = this.pageView.getCurrentPageIndex(),
                            e = this.skinDatas[a].gold,
                            t = this.myGold - e;
                        0 <= t ? (this.setState(1), this.skinUserData.push(a), this.myGold = t, this.labGold.string = this.myGold.toString(),
                            n.ComPage.ShowTip("购买" + this.skinDatas[a].name + "成功", 1, 1), m.Fish_UserData.setHaveSkins(this.skinUserData),
                            m.Fish_UserData.setGold(this.myGold), i.GlobalEventUtil.emit("UpdateGold")) : n.ComPage.ShowTip("金币不足，无法购买");
                }
            }, t.prototype.onClose = function() {
                s.SoundUtil.PlayEffectByKey(1), this.node.destroy();
            }, __decorate([d(cc.Label)], t.prototype, "labName", void 0), __decorate([d(cc.Label)], t.prototype, "labGold", void 0),
            __decorate([d(cc.Node)], t.prototype, "btnSelect", void 0), __decorate([d(cc.Prefab)], t.prototype, "fbShopItem", void 0),
            t = __decorate([l], t);
    }(o.NodeUtil);
exports.default = c;