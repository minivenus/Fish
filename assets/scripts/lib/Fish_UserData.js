var d = require("./Common_Data"),
    o = require("./Util"),
    l = require("./ComPage"),
    n = function() {
        function t() {}
        return t.setShareOpen = function(t) {
                this.shareOpen = t;
            }, t.getShareOpen = function() {
                return this.shareOpen;
            }, t.getCompleteList = function() {
                return this.fishCompleteList;
            }, t.setCompleteList = function(t) {
                console.log("设置完成成就列表"), this.fishCompleteList = t;
            }, t.setTempList = function(t) {
                this.fishTempList = t;
            }, t.getTempList = function() {
                return this.fishTempList;
            }, t.setGold = function(t) {
                this.gold = t;
            }, t.addGold = function(t) {
                this.gold += t;
            }, t.getGold = function() {
                return this.gold;
            }, t.setCurSkin = function(t) {
                this.curSkin = t;
            }, t.getCurSkin = function() {
                return this.curSkin;
            }, t.setHaveSkins = function(t) {
                this.haveSkins = t;
            }, t.getHaveSkins = function() {
                return this.haveSkins;
            }, t.getBoxState = function() {
                return this.boxState;
            }, t.setBoxState = function(t) {
                this.boxState = t;
            }, t.setProtect = function(t) {
                this.protect = t;
            }, t.addProtect = function(t) {
                this.protect += t;
            }, t.getProtect = function() {
                return this.protect;
            }, t.setSign = function(t) {
                this.sign = t;
            }, t.getSign = function() {
                return console.log("获取服务器签到：" + this.sign), "" == this.sign ? "0-0-0" : this.sign;
            }, t.getSignByLocal = function() {
                return console.log("获取本地签到：" + this.signLocal), "" == this.signLocal ? "0-0-0" : this.signLocal;
            }, t.setSignReward = function(o, e) {
                console.log("设置签到礼物"), console.log(o), this.signTip = e, this.signReward = o;
            }, t.getSignReward = function() {
                return console.log("获取签到礼物"), console.log(this.signReward), this.signReward;
            }, t.checkSignValid = function() {
                if (0 < this.signReward.length) {
                    var r = this.getSignByLocal(),
                        e = this.getSign(),
                        t = r.substr(0, 3),
                        o = e.substr(0, 3);
                    if (console.log("本地截取：" + t), console.log("服务器数据截取：" + o), t == o) {
                        console.log("签到效验通过，发放奖励"), this.addReward(this.signReward);
                        var d = e.split("-"),
                            n = parseInt(d[0]),
                            a = 0 == n ? 1 : n + 1,
                            s = (a = 7 < a ? 1 : a) + "-1-" + new Date().getTime().toString();
                        this.setSign(s), l.ComPage.ShowTip(this.signTip), this.setSignReward([], "");
                    } else console.log("签到效验不通过");
                }
            }, t.addReward = function(o) {
                if (o)
                    for (var e = 0; e < o.length; e++) 0 == o[e].type ? (this.addGold(o[e].num),
                        console.log("奖励：金币+" + o[e].num)) : 1 == o[e].type && (this.addProtect(o[e].num),
                        console.log("奖励：护盾+" + o[e].num));
                else console.log("添加奖励失败：" + o);
            }, t.setNickName = function(t) {
                console.log("设置昵称：" + t), this.nickName = t;
            }, t.getNickName = function() {
                return console.log("获取昵称：" + this.nickName), this.nickName;
            }, t.setCurScore = function(t) {
                this.curScore = t;
            }, t.getCurScore = function() {
                return this.curScore;
            }, t.getServerNewGift = function() {
                return console.log("新手礼包服务器状态：" + this.newgift), this.newgift;
            }, t.setServerNewGift = function(t) {
                console.log("新手礼包设置服务器状态：" + t), this.newgift = t;
            }, t.setHeightScore = function(t) {
                this.heightScore = t;
            }, t.getHeightScore = function() {
                return console.log("新手引导：" + this.heightScore), this.heightScore;
            }, t.setFristGame = function(t) {
                console.log("新手引导设置：" + t), this.fristgame = t;
            }, t.getFristGame = function() {
                return this.fristgame;
            }, t.setOpenGameBoxTimer = function(t) {
                console.log("设置打开游戏内宝箱次数" + t), this.openGameBoxTimer += t, 1 == this.openGameBoxTimer && this.setOpenGameBoxtemp();
            }, t.setOpenGameBoxtemp = function() {
                this.openGameBoxTemp = new Date();
            }, t.getOpenGameBoxtemp = function() {
                var t = !0;
                return t = this.openGameBoxTemp ? o.Util.isToday(this.openGameBoxTemp) : t;
            }, t.getOpenGameBoxTimer = function() {
                return this.getOpenGameBoxtemp() || (this.openGameBoxTimer = 0), this.openGameBoxTimer;
            }, t.setAgainGame = function(t) {
                this.settleAgain = t;
            }, t.getAgainGame = function() {
                return this.settleAgain;
            }, t.userdataArryToStr = function() {
                var o = [this.gold, this.curSkin, this.haveSkins, this.protect, this.heightScore, this.newgift, this.fristgame, this.sign, this.openGameBoxTimer, this.openGameBoxTemp, this.fishCompleteList],
                    e = JSON.stringify(o);
                return console.log("数据字符串：" + e), e;
            }, t.userdataStrToArry = function(o) {
                var e = [];
                return o && (e = JSON.parse(o)), console.log("数据数组："), console.log(e), e;
            }, t.updateUserData = function(t) {
                t && 10 <= t.length ? (console.log("更新用户数据"), this.gold = t[0], this.curSkin = t[1],
                    this.haveSkins = t[2], this.protect = t[3], this.heightScore = t[4], this.newgift = t[5],
                    this.fristgame = t[6], this.sign = t[7], this.openGameBoxTimer = t[8] || 0, this.openGameBoxTemp = t[9] || null,
                    this.fishCompleteList = t[10] || this.fishCompleteList, console.log("服务器数据:"), console.log("金币：" + this.gold),
                    console.log("当前使用皮肤：" + this.curSkin), console.log("拥有皮肤："), console.log(this.haveSkins),
                    console.log("拥有护盾数：" + this.protect), console.log("最高分数：" + this.heightScore), console.log("是否有新手礼包：" + this.newgift),
                    console.log("新手引导：" + this.fristgame), console.log("签到：" + this.sign), console.log("开启宝箱次数：" + this.openGameBoxTimer),
                    console.log("开启宝箱时间戳：" + this.openGameBoxTemp), console.log("成就完成量："), console.log(this.fishCompleteList)) : (console.log("更新用户数据失败"),
                    console.log(t));
            }, t.saveUserDataToLocal = function() {
                console.log("存储数据到本地");
                var t = this.userdataArryToStr();
                o.Util.SaveDataByKey("UserData", t);
            }, t.saveUserDataToServer = function() {
                console.log("存储数据到服务器");
                var t = this.userdataArryToStr();
                console.log(t), d.default.setData(t, function() {
                    console.log("上传服务器成功");
                }, function() {
                    console.log("上传服务器失败");
                });
            }, t.initUserDataByServer = function(a) {
                console.log("加载服务器数据"), d.default.getData(function(o) {
                    console.log(o);
                    try {
                        if ("" == o.data.data) console.log("服务器不存在数据"), a(!1);
                        else {
                            console.log("收到服务器数据" + o.data.data);
                            var e = this.userdataStrToArry(o.data.data);
                            this.updateUserData(e), a(!0);
                        }
                    } catch (t) {
                        console.log("服务器数据获取失败 1"), a(!1);
                    }
                }.bind(this), function() {
                    console.log("服务器数据获取失败 2"), a(!1);
                }.bind(this));
            }, t.initUserDataByLocal = function() {
                console.log("加载本地数据");
                try {
                    var a = o.Util.GetByKey("UserData");
                    if ("string" == typeof a && "" != a) {
                        var n = this.userdataStrToArry(a);
                        this.updateUserData(n), this.signLocal = this.sign;
                    } else console.log("本地没有数据");
                } catch (t) {
                    console.log("加载本地数据出错"), console.log(t);
                }
            }, t.gold = 0, t.curSkin = 0, t.haveSkins = [0], t.boxState = 0, t.protect = 0,
            t.sign = "", t.signLocal = "", t.curScore = 0, t.heightScore = 0, t.newgift = !0,
            t.fristgame = !0, t.openGameBoxTimer = 0, t.openGameBoxTemp = null, t.fishCompleteList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            t.fishTempList = [], t.nickName = "", t.Init = !1, t.shareOpen = !1, t.signReward = [],
            t.signTip = "", t.challRoomScore = 0, t.challRoomID = "", t.challRoomIntervalTime = 0,
            t.settleAgain = !1, t;
    }();
exports.Fish_UserData = n;