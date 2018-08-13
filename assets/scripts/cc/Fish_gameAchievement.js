var r = require("../lib/FishCfgMgr"),
    t = require("../lib/Fish_UserData");
cc.Class({
    extends: cc.Component,
    properties: {
        achieLabel: cc.Label
    },
    start: function() {
        (window.Achievement = this).node.active = !1, this.workList = [0, 1, 2, 3, 5, 6, 7, 14],
            this.updateWork();
    },
    updateWork: function() {
        window.gameCrtl._achievementList[1] = 0 >= window.gameCrtl._achievementList[1] ? 1 : window.gameCrtl._achievementList[1];
        var a, e, s = (a = 0, e = this.workList.length - 1, C(Math.random() * (e - a + 1) + a));
        window.worktype = this.workList[s], console.log("指引目标=====", s, this.workList[s], window.gameCrtl._FishAchievementList[this.workList[s]], this.workList);
        var o = r.FishCfgMgr.getNoCompleteByType(window.worktype, window.gameCrtl._FishAchievementList[window.worktype]);
        if (!o) return this.workList.splice(s, 1), void(0 >= this.workList.length ? (this.node.active = !1,
            this.achieLabel.string = "已完成所有任务！") : (this.updateWork(), this.node.active = !0));
        if (this.node.active = !0, this.achieLabel.string = o.target_content, window.fishWork = o,
            this.achieLabel.string = o.target_content + "(" + window.gameCrtl._achievementList[s] + "/" + window.fishWork.num + ")",
            2 == window.worktype) {
            var d = t.Fish_UserData.getHaveSkins();
            window.gameCrtl._achievementList[2] = d.length, this.checkWork(2);
        } else 6 == window.worktype && (window.gameCrtl._achievementList[6] = window.gameCrtl._fishNumber,
            this.checkWork(6));
    },
    checkWork: function(t) {
        0 >= this.workList.length || (this.achieLabel.string = window.fishWork.target_content + "(" + window.gameCrtl._achievementList[t] + "/" + window.fishWork.num + ")",
            window.gameCrtl._achievementList[t] && window.gameCrtl._achievementList[t] >= window.fishWork.num && (window.gameCrtl._FishAchievementList[t] += window.gameCrtl._achievementList[t],
                7 != t && 6 != t || (window.gameCrtl._FishAchievementList[t], window.gameCrtl._achievementList[t]),
                14 == t && 7 == t && 6 == t || (window.gameCrtl._achievementList[t] = 0), this.node.getComponent(cc.Animation).play(),
                this.updateWork()));
    }
});