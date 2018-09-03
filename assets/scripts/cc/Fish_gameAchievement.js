var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

var fishCfgMgr = require("../lib/FishCfgMgr"),
    fishUserData = require("../lib/Fish_UserData");
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
        var start, end, randomId = (start = 0, end = this.workList.length - 1, Math.floor(Math.random() * (end - start + 1) + start));
        window.worktype = this.workList[randomId], console.log("指引目标=====", randomId, this.workList[randomId], window.gameCrtl._FishAchievementList[this.workList[randomId]], this.workList);
        var data = fishCfgMgr.FishCfgMgr.getNoCompleteByType(window.worktype, window.gameCrtl._FishAchievementList[window.worktype]);
        if (!data) return this.workList.splice(randomId, 1), void(0 >= this.workList.length ? (this.node.active = !1,
            this.achieLabel.string = "已完成所有任务！") : (this.updateWork(), this.node.active = !0));
        if (this.node.active = !0, this.achieLabel.string = data.target_content, window.fishWork = data,
            this.achieLabel.string = data.target_content + "(" + window.gameCrtl._achievementList[randomId] + "/" + window.fishWork.num + ")",
            2 == window.worktype) {
            var skins = fishUserData.Fish_UserData.getHaveSkins();
            window.gameCrtl._achievementList[2] = skins.length, this.checkWork(2);
        } else 6 == window.worktype && (window.gameCrtl._achievementList[6] = window.gameCrtl._fishNumber,
            this.checkWork(6));
    },
    checkWork: function(id) {
        0 >= this.workList.length || (this.achieLabel.string = window.fishWork.target_content + "(" + window.gameCrtl._achievementList[id] + "/" + window.fishWork.num + ")",
            window.gameCrtl._achievementList[id] && window.gameCrtl._achievementList[id] >= window.fishWork.num && (window.gameCrtl._FishAchievementList[id] += window.gameCrtl._achievementList[id],
                7 != id && 6 != id || (window.gameCrtl._FishAchievementList[id], window.gameCrtl._achievementList[id]),
                14 == id && 7 == id && 6 == id || (window.gameCrtl._achievementList[id] = 0), this.node.getComponent(cc.Animation).play(),
                this.updateWork()));
    }
});