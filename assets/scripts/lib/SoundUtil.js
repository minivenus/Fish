var SoundUtil = function() {
    function SoundUtil() {}
    return SoundUtil.LoadAudio = function() {
        var urlRaw = cc.url.raw("resources/Fish/sounds/button.mp3");
        cc.loader.load(urlRaw, function(err, assets) {
            return err ? (cc.log("load playing audio <ding> failed"), void cc.error(err.message || err)) : void(cc.log("load playing audio success"),
                this.clickAudio[1] = assets);
        }.bind(this));
    }, SoundUtil.SetSound = function(bSound) {
        this.isSound = bSound;
    }, SoundUtil.GetSound = function() {
        return this.isSound;
    }, SoundUtil.PlayEffectByKey = function(key) {
        this.isSound && null != this.clickAudio[key.toString()] && cc.audioEngine.play(this.clickAudio[key.toString()], !1, 1);
    }, SoundUtil.clickAudio = [], SoundUtil.isSound = !0, SoundUtil;
}();
exports.SoundUtil = SoundUtil;