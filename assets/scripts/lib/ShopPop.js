var fishUserData = require("./Fish_UserData"),
    nodeUtil = require("./NodeUtil"),
    comPage = require("./ComPage"),
    fishCfgMgr = require("./FishCfgMgr"),
    globalEventUtil = require("./Common_GlobalEventUtil"),
    soundUtil = require("./SoundUtil"),
    r = cc._decorator,
    l = r.ccclass,
    g = r.property,
    ShopPop = function(__super) {
        function ShopPop() {
            var ShopPop = null !== __super && __super.apply(this, arguments) || this;
            return ShopPop.labName = null, ShopPop.labGold = null, ShopPop.btnSelect = null, ShopPop.fbShopItem = null,
            ShopPop.pageView = null, ShopPop.curSkin = 0, ShopPop.skinDatas = [], ShopPop.skinUserData = null, ShopPop.curType = 0,
            ShopPop.myGold = 0, ShopPop.nextPage = 0, ShopPop;
        }
        return __extends(ShopPop, __super), ShopPop.prototype.start = function() {
                this.myGold = fishUserData.Fish_UserData.getGold(), this.labGold.string = this.myGold.toString(),
                    this.pageView = this.GetComponentByNodeName("content/pageview", cc.PageView), this.AddButtonEventStart(this, this.GetNodeByName("content/btnLeft"), this.onRight),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnRight"), this.onLeft),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnClose"), this.onClose),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnSelect"), this.onSelect),
                    this.initFishSkin();
            }, ShopPop.prototype.initFishSkin = function() {
                var n = fishCfgMgr.FishCfgMgr.getSkinList();
                this.curSkin = fishUserData.Fish_UserData.getCurSkin(), this.skinUserData = fishUserData.Fish_UserData.getHaveSkins();
                for (var e = 0; n[e];) {
                    this.skinDatas.push(n[e]);
                    var t = cc.instantiate(this.fbShopItem);
                    this.pageView.addPage(t), t.getChildByName("spIcon").getComponent(cc.Sprite).spriteFrame = fishCfgMgr.FishCfgMgr.getSkinSpriteFrameByKey(n[e].icon),
                        e++;
                }
                this.labName.string = this.skinDatas[this.curSkin].name, this.pageView.scrollToPage(this.curSkin, 0),
                    this.setState(0), this.nextPage = this.pageView.getCurrentPageIndex();
            }, ShopPop.prototype.onTurningEvent = function(o, e) {
                if (e == cc.PageView.EventType.PAGE_TURNING) {
                    var t = this.pageView.getCurrentPageIndex();
                    t == this.curSkin ? this.setState(0) : -1 == this.skinUserData.indexOf(t) ? this.setState(2, this.skinDatas[t].gold) : this.setState(1),
                        this.labName.string = this.skinDatas[t].name;
                }
            }, ShopPop.prototype.onLeft = function() {
                if (soundUtil.SoundUtil.PlayEffectByKey(1), !(this.pageView.getCurrentPageIndex() + 1 >= this.pageView.getPages().length)) {
                    var t = this.pageView.getCurrentPageIndex() + 1;
                    this.pageView.scrollToPage(t, .3);
                }
            }, ShopPop.prototype.onRight = function() {
                if (soundUtil.SoundUtil.PlayEffectByKey(1), !(0 > this.pageView.getCurrentPageIndex() - 1)) {
                    var t = this.pageView.getCurrentPageIndex() - 1;
                    this.pageView.scrollToPage(t, .3);
                }
            }, ShopPop.prototype.setState = function(o, e) {
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
            }, ShopPop.prototype.onSelect = function() {
                switch (soundUtil.SoundUtil.PlayEffectByKey(1), this.curType) {
                    case 0:
                        break;

                    case 1:
                        this.curSkin = this.pageView.getCurrentPageIndex(), this.setState(0), fishUserData.Fish_UserData.setCurSkin(this.curSkin),
                        globalEventUtil.GlobalEventUtil.emit("UpdateSkin");
                        break;

                    case 2:
                        var a = this.pageView.getCurrentPageIndex(),
                            e = this.skinDatas[a].gold,
                            t = this.myGold - e;
                        0 <= t ? (this.setState(1), this.skinUserData.push(a), this.myGold = t, this.labGold.string = this.myGold.toString(),
                        comPage.ComPage.ShowTip("购买" + this.skinDatas[a].name + "成功", 1, 1), fishUserData.Fish_UserData.setHaveSkins(this.skinUserData),
                            fishUserData.Fish_UserData.setGold(this.myGold), globalEventUtil.GlobalEventUtil.emit("UpdateGold")) : comPage.ComPage.ShowTip("金币不足，无法购买");
                }
            }, ShopPop.prototype.onClose = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), this.node.destroy();
            }, __decorate([g(cc.Label)], ShopPop.prototype, "labName", void 0), __decorate([g(cc.Label)], ShopPop.prototype, "labGold", void 0),
            __decorate([g(cc.Node)], ShopPop.prototype, "btnSelect", void 0), __decorate([g(cc.Prefab)], ShopPop.prototype, "fbShopItem", void 0),
            ShopPop = __decorate([l], ShopPop);
    }(nodeUtil.NodeUtil);
exports.default = ShopPop;