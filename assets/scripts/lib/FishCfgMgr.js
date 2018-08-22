var o, s = require("./utils/Util"),
    d = require("./Fish_UserData");
(o = exports.emTargetType || (exports.emTargetType = {}))[o.T_BeEaten = 0] = "T_BeEaten", o[o.T_FishMax = 1] = "T_FishMax",
    o[o.T_FishTypeMax = 2] = "T_FishTypeMax", o[o.T_EatFishTotal = 3] = "T_EatFishTotal",
    o[o.T_BigFishNum = 4] = "T_BigFishNum", o[o.T_FishFeedTotal = 5] = "T_FishFeedTotal",
    o[o.T_BigFishFeedTotal = 6] = "T_BigFishFeedTotal", o[o.T_ContinuousFeed_1 = 7] = "T_ContinuousFeed_1",
    o[o.T_ContinuousFeed_2 = 8] = "T_ContinuousFeed_2", o[o.T_Survival = 9] = "T_Survival",
    o[o.T_SharkNum = 10] = "T_SharkNum", o[o.T_GoldTotal = 11] = "T_GoldTotal", o[o.T_ContinuousGold_1 = 12] = "T_ContinuousGold_1",
    o[o.T_ContinuousGold_2 = 13] = "T_ContinuousGold_2", o[o.T_OpenBoxNum = 14] = "T_OpenBoxNum";
var n = function() {
    function t() {}
    return t.CfgLoadComplete = function() {
            return 6 <= this.loadNum;
        }, t.LoadCfg = function() {
            if (!(7 <= this.loadNum)) {
                console.log("初始化json存储数据");
                var t = cc.url.raw("resources/fishPop/config/FishCfg.json");
                cc.loader.load(t, function(o, e) {
                    return (this.loadNum++, o) ? (console.error("load FishCfg failed"), void console.error(o.message || o)) : void(console.log("load FishCfg success"),
                        this.analysisFishCfg(e, "targetType", this.FishTargetDatas));
                }.bind(this)), t = cc.url.raw("resources/fishPop/config/FishSkinCfg.json"), cc.loader.load(t, function(o, e) {
                    return (this.loadNum++, o) ? (console.error("load FishSkinCfg failed"), void console.error(o.message || o)) : void(console.log("load FishSkinCfg success"),
                        this.FishSkinDatas = e);
                }.bind(this)), t = cc.url.raw("resources/fishPop/config/FishSignCfg.json"), cc.loader.load(t, function(o, e) {
                    return (this.loadNum++, o) ? (console.error("load FishSignCfg failed"), void console.error(o.message || o)) : void(console.log("load FishSignCfg success"),
                        this.analysisFishCfg(e, "key", this.FishSignList, 1));
                }.bind(this)), cc.loader.loadRes("atlas/fishSkin", cc.SpriteAtlas, function(o, e) {
                    this.loadNum++, o ? cc.error("no loadRes fishSkin") : (cc.log("fishSkin ok"), this.FishSkinSpriteFrames = e._spriteFrames);
                }.bind(this)), cc.loader.loadRes("fishPop/Texture/public_icon_gold", cc.SpriteFrame, function(o, e) {
                    this.loadNum++, o ? cc.error("no loadRes public_icon_gold") : (cc.log("public_icon_gold ok"),
                        this.RewardSpriteFrames[0] = e);
                }.bind(this)), cc.loader.loadRes("fishPop/Texture/public_icon_protect", cc.SpriteFrame, function(o, e) {
                    this.loadNum++, o ? cc.error("no loadRes public_icon_protect") : (cc.log("public_icon_protect ok"),
                        this.RewardSpriteFrames[1] = e);
                }.bind(this)), cc.loader.loadRes("fishPop/Texture/public_icon_magnet", cc.SpriteFrame, function(o, e) {
                    this.loadNum++, o ? cc.error("no loadRes public_icon_magnet") : (cc.log("public_icon_magnet ok"),
                        this.RewardSpriteFrames[2] = e);
                }.bind(this));
            }
        }, t.pushObj = function(a, e, t, o) {
            void 0 === o && (o = 0), e.rewardNum = JSON.parse(e.rewardNum), e.rewardType = "" == e.rewardType ? [] : JSON.parse(e.rewardType),
                void 0 === t[a] && (t[a] = []), 0 == o ? t[a].push(e) : t[a] = e;
        }, t.analysisFishCfg = function(r, e, t, o) {
            void 0 === o && (o = 0);
            for (var s, d = 0; r;) {
                if (s = r[(++d).toString()], !s) return;
                this.pushObj(s[e], s, t, o);
            }
            console.log(t);
        }, t.getSignRewardByDay = function(t) {
            return this.FishSignList[t] || null;
        }, t.getTargetsByType = function(t) {
            return this.FishTargetDatas[t] ? this.FishTargetDatas[t] : (console.error("不存在该类型目标_1" + t),
                null);
        }, t.getTargetValidByType = function(r, e, t) {
            var o = this.FishTargetDatas[r];
            this.FishCompleteList = d.Fish_UserData.getCompleteList();
            var l = this.FishCompleteList[t],
                n = [];
            if (!o) return console.error("不存在该类型目标_2" + r), n;
            for (var a = 0; a < o.length; a++) {
                if (!(o[a].num <= e)) return n;
                l < o[a].level && n.push(o[a]);
            }
            return n;
        }, t.getAllTargetValidByArryType = function(r) {
            for (var e, s = [], t = 0; t < r.length; t++) {
                e = this.FishTargetDatas[t], this.FishCompleteList = d.Fish_UserData.getCompleteList();
                var o = this.FishCompleteList[t];
                if (e)
                    for (var n = 0; n < e.length && e[n].num <= r[t]; n++) o < e[n].level && (s.push(e[n]),
                        this.FishCompleteList[t] = e[n].level, console.log("完成目标保存：" + t + ":" + this.FishCompleteList[t]));
                else console.log("不存在该类型目标_3" + t);
            }
            return d.Fish_UserData.setCompleteList(this.FishCompleteList), s;
        }, t.getNoCompleteByType = function(a, e) {
            var t = this.FishTargetDatas[a];
            this.FishCompleteList = d.Fish_UserData.getCompleteList();
            var o = this.FishCompleteList[a];
            if (t) {
                for (var r = 0; r < t.length; r++)
                    if (t[r].num > e && (console.log("完成等级：" + o),
                            o < t[r].level)) return t[r];
                return console.log("该类型不存在未完成目标"), null;
            }
            return console.log("不存在该类型目标_3" + a), null;
        }, t.getSkinList = function() {
            return this.FishSkinDatas;
        }, t.getSkinSpriteFrameByKey = function(t) {
            return this.FishSkinSpriteFrames[t];
        }, t.saveComplete = function(o) {
            var e = JSON.stringify(o);
            console.log("本地保存完成记录：" + e), s.Util.SaveDataByKey("fristComplete", e);
        }, t.getRewardFrameByKey = function(t) {
            return this.RewardSpriteFrames[t];
        }, t.loadNum = 0, t.FishTargetDatas = {}, t.FishSkinDatas = {}, t.FishSkinSpriteFrames = {},
        t.FishCompleteList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t.FishSignList = {},
        t.RewardSpriteFrames = [null, null, null], t;
}();
exports.FishCfgMgr = n;