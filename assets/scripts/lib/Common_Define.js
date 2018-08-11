var o = function() {
    function t() {}
    return t.GetShareCode = "share/getShareCode", t.GetAcvitityStatus = "share/getAcvitityStatus",
        t.JoinShare = "share/joinShare", t.UpdateShareStatus = "share/updateShareStatus",
        t.GetRedpacketList = "share/getRedpacketList", t.GetHelperRedpacketList = "share/getHelperRedpacketList",
        t.GetRedpacketBalance = "share/getRedpacketBalance", t.GetWorldRankingList = "commonRank/getCommonRank",
        t.UpdateCommonRank = "commonRank/updateCommonRank", t;
}();
t.Common_Http = o;
t.Commom_Obj_HelpJoinRed = function() {
    this.channelCode = 0, this.shareCode = 0, this.shareId = null, this.ruleText = "",
        this.redState = !1, this.callback = null, this.activityRuleText = "";
}