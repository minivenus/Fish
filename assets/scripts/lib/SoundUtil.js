var o = function() {
    function t() {}
    return t.LoadAudio = function() {
        var t = cc.url.raw("resources/Fish/sounds/button.mp3");
        cc.loader.load(t, function(o, e) {
            return o ? (cc.log("load playing audio <ding> failed"), void cc.error(o.message || o)) : void(cc.log("load playing audio success"),
                this.clickAudio[1] = e);
        }.bind(this));
    }, t.SetSound = function(t) {
        this.isSound = t;
    }, t.GetSound = function() {
        return this.isSound;
    }, t.PlayEffectByKey = function(t) {
        this.isSound && null != this.clickAudio[t.toString()] && cc.audioEngine.play(this.clickAudio[t.toString()], !1, 1);
    }, t.clickAudio = [], t.isSound = !0, t;
}();
exports.SoundUtil = o;