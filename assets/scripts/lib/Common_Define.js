var o = function() {
    function t() {}
    return exports.GetShareCode = "share/getShareCode", exports.GetAcvitityStatus = "share/getAcvitityStatus",
        exports.JoinShare = "share/joinShare", exports.UpdateShareStatus = "share/updateShareStatus",
        exports.GetRedpacketList = "share/getRedpacketList", exports.GetHelperRedpacketList = "share/getHelperRedpacketList",
        exports.GetRedpacketBalance = "share/getRedpacketBalance", exports.GetWorldRankingList = "commonRank/getCommonRank",
        exports.UpdateCommonRank = "commonRank/updateCommonRank", exports;
}();
exports.Common_Http = o;
exports.Commom_Obj_HelpJoinRed = function() {
    this.channelCode = 0, this.shareCode = 0, this.shareId = null, this.ruleText = "",
        this.redState = !1, this.callback = null, this.activityRuleText = "";
}