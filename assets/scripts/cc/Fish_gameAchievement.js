var r = require("../lib/FishCfgMgr"),
    t = require("../lib/Fish_UserData");
cc.Class({
    extends: cc.Component,
    properties: {
        achieLabel: cc.Label
    },
    start: function() {
        (window.Achievement = this).node.active = !1, this.workList = [0, 1, 3, 5], this.updateWork();
    },
    updateWork: function() {
        window.gameCrtl._achievementList[1] = 0 >= window.gameCrtl._achievementList[1] ? 1 : window.gameCrtl._achievementList[1];
        var a, e, s = (a = 0, e = this.workList.length - 1, d(Math.random() * (e - a + 1) + a));
        window.worktype = this.workList[s], console.log("指引目标=====", s, this.workList[s], window.gameCrtl._FishAchievementList[this.workList[s]], this.workList);
        var o = r.FishCfgMgr.getNoCompleteByType(window.worktype, window.gameCrtl._FishAchievementList[window.worktype]);
        if (!o) return this.workList.splice(s, 1), void(0 >= this.workList.length ? this.node.active = !1 : this.node.active = !0);
        if (this.node.active = !0, this.achieLabel.string = o.target_content, window.fishWork = o,
            this.achieLabel.string = o.target_content + "(" + window.gameCrtl._achievementList[s] + "/" + window.fishWork.num + ")",
            2 == window.worktype) {
            var l = t.Fish_UserData.getHaveSkins();
            window.gameCrtl._achievementList[2] = l.length, this.checkWork(2);
        }
    },
    checkWork: function(t) {
        0 >= this.workList.length || (this.achieLabel.string = fishWork.target_content + "(" + window.gameCrtl._achievementList[t] + "/" + window.fishWork.num + ")",
            window.gameCrtl._achievementList[t] && window.gameCrtl._achievementList[t] >= window.fishWork.num && (window.gameCrtl._FishAchievementList[t] += window.gameCrtl._achievementList[t],
                14 != t && (window.gameCrtl._achievementList[t] = 0), this.node.getComponent(cc.Animation).play(),
                this.updateWork()));
    }
});