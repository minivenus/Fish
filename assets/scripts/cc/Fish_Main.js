function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function u(o, e) {
    return d(Math.random() * (e - o + 1) + o);
}
var a = t(require("../lib/Common_RankList")),
    s = require("../lib/FishCfgMgr"),
    r = require("../lib/Fish_UserData"),
    l = t(require("../lib/ReadyGo"));
cc.Class({
    extends: cc.Component,
    properties: {
        MissilePrefab: cc.Prefab,
        starPrefab: cc.Prefab,
        boxPrefab: cc.Prefab,
        pufferPrefab: cc.Prefab,
        fishPrefab: cc.Prefab,
        bigBossPrefab: cc.Prefab,
        MissileModPrefab: cc.Prefab,
        shareViewCtl: cc.Node,
        glodSound: cc.AudioClip,
        glod2Sound: cc.AudioClip,
        blastSound: cc.AudioClip,
        bgBmg: cc.AudioClip,
        _hero: null,
        _stickPos: null,
        _stickPos_py: null,
        _hero_Pos: null,
        _hero_rotate: 0,
        _stick: null,
        _cloundNode: null,
        _cloundNode_bg: null,
        _gameOverNode: null,
        _bossNode: null,
        _starNode: null,
        _fishNode: null,
        _pufferNode: null,
        _bigbossNode: null,
        _currFishPrefab: null,
        _missileModNode: null,
        _gold: 0,
        _gold2: 0,
        _fishNumber: 0,
        _cloudSpriteFrames: null,
        _loadcount: 0,
        _hero_speed: 1,
        _missileNodes: null,
        _hero_isRotate: !1,
        _createMissileTime: 0,
        _isreset: !1,
        _isafetime: 5,
        _imissilecount: 0,
        _imissilecountlbl: null,
        _imissilecountlbl1: null,
        guide_tips: cc.Node,
        IsCanRelive: !0,
        TipsView: cc.Node,
        maxScore: cc.Label,
        curScore: cc.Label,
        redNode: cc.Node,
        isShowSaveImg: !1,
        saveImg: cc.Node,
        saveBtn: cc.Node,
        isPause: !1,
        goldNum: 0,
        reliveNeedGold: 100,
        isShowShareBtn1: !0,
        build_enemy: 0,
        has_fish: 1,
        speed_all: 15,
        timergo: 0,
        fishSpriteFrames: [],
        fishSpriteFrames2: [],
        adive: cc.Node,
        wudiNode: cc.Node,
        wudiTimer: 0,
        useWudiState: 0,
        wudiCISHU: 3,
        ProgressBar: cc.Node,
        bar: cc.Node,
        guanggaoTemp: 10,
        videoNode: cc.Node,
        sceneNode: cc.Node,
        sceneLoad: 60,
        Max_hp: 300,
        _hp: 300,
        hpProgress: cc.Node,
        _bigModTemp: 1,
        _MissileModTemp: 1,
        _fishPos: null,
        _fishPosEvent: [],
        goldscene: cc.Node,
        _oceanLevel: 1,
        hpzz: cc.Node,
        hpzzLale: cc.Node,
        hpzzLale2: cc.Node,
        _citeTemp: 10,
        sceneLevelSP: [],
        golds: 0,
        qiehuan: [cc.Node],
        noOpenlable: cc.Node,
        _buid_MissleTemp: .3,
        _getBox: 3,
        _openBox: 0,
        _BoxBuildState: !0,
        protect: [cc.Node],
        freeshare: cc.Node,
        _achievementList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        _FishAchievementList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        _goldBuild: !0,
        _goldbuildTimer: 180,
        chuansongNode: cc.Node,
        _chuansongNodeActive: !1,
        goldSceneNode: cc.Node,
        _onGoldScene: 15,
        ongoldtimer: cc.Node,
        goldLable: cc.Node
    },
    start: function() {
        this._onGoldScene = 30, l.default.setVisible(2), this._achievementList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            this._FishAchievementList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], window.worktype = 0,
            r.Fish_UserData.setProtect(0), this.guide_tips.active = !0, cc.audioEngine.playMusic(this.bgBmg, !0),
            this.golds = r.Fish_UserData.getGold(), this.goldLable.getComponent(cc.Label).string = this.golds,
            window.buildsceneNum = 0, this._fishPosEvent = [], window.OpenCiTie = !1, window.gameCrtl = this,
            window._goldScene = !1, this.sceneLoad = 10, this._BoxBuildTemp = 60, window.cur_scence = "main",
            window.ReliveTimer || (window.ReliveTimer = 5), this.wudiCISHU = 1, this.wudiNode.active = !1,
            this.reliveNeedGold = 100, this.ProgressBar.active = !1, this.speed_all = 1, this.target = 1;
        var d = r.Fish_UserData.getOpenGameBoxTimer();
        this._getBox = 9 >= d + 3 ? 3 : 9 - d, console.log("openCount===", d), window.isGameOver = !0,
            this.isShowShareBtn1 = !!window.lifeType && window.lifeType, this.is_game_start = !1;
        var p = this;
        this._hero_speed = 3, this.shareBtn1 = cc.find("ShareView/shareBtn1", this.node),
            this.shareBtn1.active = this.isShowShareBtn1, window.cloudSpriteFrames ? (p._cloudSpriteFrames = window.cloudSpriteFrames,
                p._loadcount++) : cc.loader.loadResDir("Fish/Texture/main/cloud", cc.SpriteFrame, function(o, e) {
                o && (console.log("Loading resource fail."), cc.director.loadScene("Fish_Main")),
                    p._cloudSpriteFrames = e, p._loadcount++, 2 <= p._loadcount && p.begin();
            }), this.initHandler();
        var i = r.Fish_UserData.getCurSkin();
        console.log("设置使用的小鱼=设置使用的小鱼", i), cc.loader.loadRes("Fish/prefab/fish", function(a, e) {
            a && (console.log("Loading resource fail."), cc.director.loadScene("Fish_Main")),
                console.log("Loading resource cuss."), p._currFishPrefab = e;
            var t = cc.instantiate(e);
            t.getComponent("Fish_fishCtr")._startFish = !0, t.getComponent("Fish_fishCtr").myFish = !0,
                t.getComponent("Fish_fishCtr").redNode = p.redNode, t.getChildByName("A1").getComponent(cc.Sprite).spriteFrame = s.FishCfgMgr.getSkinSpriteFrameByKey(i + "_1"),
                t.getChildByName("A2").getComponent(cc.Sprite).spriteFrame = s.FishCfgMgr.getSkinSpriteFrameByKey(i + "_2"),
                t.fishID = 0, (p._fishPosEvent[0] = t).parent = cc.find("Canvas/plane"), p._hero = t,
                p._hero.active = !1, p._loadcount++;
        });
        var e = r.Fish_UserData.getHaveSkins();
        console.log("skinList===", e, e[0]);
        for (var t = 0; t < e.length; t++) p.fishSpriteFrames[p.fishSpriteFrames.length] = s.FishCfgMgr.getSkinSpriteFrameByKey(e[t] + "_1"),
            p.fishSpriteFrames2[p.fishSpriteFrames2.length] = s.FishCfgMgr.getSkinSpriteFrameByKey(e[t] + "_2");
        var o = cc.url.raw("resources/fishPop/config/FishLineCfg.json");
        cc.loader.load(o, function(o, e) {
            return o ? (console.error("load FishLineCfg failed"), void console.error(o.message || o)) : void(console.log("load FishLineCfg success"),
                p._fishPos = e);
        }.bind(this)), cc.director.getCollisionManager().enabled = !0;
        for (var a = function(a) {
                cc.loader.loadRes("Fish/Texture/main/bg" + (a + 1), function(o, e) {
                    o && console.log("Loading resource fail."), p.sceneLevelSP[a] = e;
                });
            }, n = 0; 3 > n; n++) a(n);
        console.log("self.sceneLevelSP", p.sceneLevelSP), this.checkOpenProtect();
    },
    begin: function() {
        var e = this;
        cc.find("Canvas/l_loading").active = !1, e._cloundNode = cc.find("Canvas/cloud"),
            e._cloundNode_bg = cc.find("Canvas/cloud_bg"), e._cloundNode_bg.active = !0, e._fishNode = cc.find("Canvas/fish"),
            e._starNode = cc.find("Canvas/star"), e._pufferNode = cc.find("Canvas/puffer"),
            e._bigbossNode = cc.find("Canvas/bigboss"), e._missileModNode = cc.find("Canvas/missileModNode"),
            e._imissilecountlbl = cc.find("Canvas/gold2/l_missile2"), e._imissilecountlbl1 = cc.find("Canvas/gold2/l_missile1"),
            e.add_fishnum = cc.find("Canvas/add_fishnum"), e._missileNode = cc.find("Canvas/Missile"),
            e._bossNode = cc.find("Canvas/boss"), e._hero.active = !0, e._hero_Pos = e.node.convertToWorldSpaceAR(cc.p(0, 0)),
            e._stickPos = e.node.convertToWorldSpaceAR(cc.p(0, 35)), e._stickPos_py = cc.p(0, 0),
            e._stick = cc.find("stick"), e._stick.active = !1, e._stick.setPosition(e._stickPos),
            e.createCloud(), this.node.on("Gold_push", function() {
                e._hp += 60, e._hp > e.Max_hp && (e._hp = e.Max_hp), .3 < e._hp / e.Max_hp && e.onshowHpEffet(.3 < e._hp / e.Max_hp),
                    e.hpzz.opacity = 255 * (1 - e._hp / e.Max_hp), e.hpProgress._components[1].progress = e._hp / e.Max_hp,
                    cc.audioEngine.play(e.glodSound, !1, 1);
            }), this.node.on("New_Gold_push", function() {
                e.golds++, r.Fish_UserData.addGold(1), e.goldLable.getComponent(cc.Label).string = e.golds,
                    cc.audioEngine.play(e.glodSound, !1, 1);
                var a = cc.scaleTo(.2, 1.2, 1.2),
                    t = cc.scaleTo(.2, 1, 1);
                e.goldLable.runAction(cc.sequence(a, t));
            }), this.node.on("Collision_push", function() {
                window.isGameOver || (e.videoNode.active = !1, console.log("Collision_push"), e.IsCanRelive ? (e.IsCanRelive = !1,
                        e.shareViewCtl.getComponent("ShareViewCtrl").ShowView(!0), e.shareViewCtl.getComponent("ShareViewCtrl").SetScoreLabel(e._imissilecount)) : e.RealGameOver(),
                    window.isGameOver = !0, e._gameOver = !0, e._hero.active = !1, e._stick.active = !1,
                    window.missilecount < parseInt(e._imissilecount) && (window.missilecount = parseInt(e._imissilecount),
                        cc.sys.localStorage.setItem("missilecount", e._imissilecount)));
            }), this.node.on("Missile_push", function() {}), this.node.on("fish_die_push", function() {
                e._gameOver || (e.has_fish--, e.has_fish, e.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(function() {}, e))),
                    cc.audioEngine.play(this.blastSound, !1, 1));
            }), this.node.on("fish_push", function() {
                if (!e._gameOver) {
                    for (var a = !0, t = 0; t < e._hero.parent.childrenCount; t++) a = e._hero.parent.children[t].getComponent("Fish_fishCtr")._isdestroy ? a : a + 1;
                    e._fishNumber += a, e._imissilecountlbl.getComponent(cc.Label).string = e._fishNumber,
                        e._imissilecountlbl1.x = e._imissilecountlbl.x - e._imissilecountlbl._contentSize.width - 20,
                        e.add_fishnum.getComponent(cc.Label).string = "+" + a, e._imissilecount = e._fishNumber,
                        e.add_fishnum.runAction(cc.sequence(cc.fadeIn(.2), cc.fadeIn(.2), cc.fadeOut(.4), cc.callFunc(function() {}, e))),
                        cc.audioEngine.play(e.glod2Sound, !1, 1);
                }
            }), window.isGameOver = !1;
    },
    checkOpenProtect: function() {
        var t = r.Fish_UserData.getProtect();
        this.protect[0].active = 0 >= t, this.protect[1].active = 0 < t;
    },
    ReliveGame: function(a, e, t) {
        this._hero.getChildByName("A1").active = !0, this._hero.getComponent("Fish_fishCtr")._isdestroy = !1,
            window.isGameOver = !1, this._gameOver = !1, this._hero.active = !0, this._stick.active = !1;
        var o = this;
        this.pauseGame(!0), this._missileNode.removeAllChildren(), this._pufferNode.removeAllChildren(),
            this._bigbossNode.removeAllChildren();
        for (var i = 0; i < this.sceneNode.childrenCount; i++) this.sceneNode.children[i].active = !1;
        (window.buildsceneNum = 0, this._hp = this.Max_hp, this.hpzz.opacity = 255 * (1 - this._hp / this.Max_hp),
            this.hpProgress._components[1].progress = this._hp / this.Max_hp, o.onshowHpEffet(.3 < o._hp / o.Max_hp),
            1 == e) ? (this.golds -= parseInt(t), r.Fish_UserData.addGold(-parseInt(t)), cc.sys.localStorage.setItem("golds", this.golds),
            this.goldLable.getComponent(cc.Label).string = this.golds) : 2 == e && (o.freeshare.active = !0,
            o.scheduleOnce(function() {
                o.freeshare.active = !1;
            }, 1.5)), this.hideTipsView();
    },
    hideTipsView: function() {
        this.TipsView.getChildByName("TipsTex").getComponent(cc.Label).string = "", this.TipsView.active = !1,
            this.pauseGame(!1);
    },
    showTipsView: function(t) {
        this.TipsView.getChildByName("TipsTex").getComponent(cc.Label).string = t, this.TipsView.active = !0;
    },
    pauseGame: function(t) {
        (this.isPause = t) ? cc.audioEngine.pauseMusic(): cc.audioEngine.resumeMusic();
    },
    test: function(r) {
        console.log("test===========================");
        var e = cc.instantiate(this.MissilePrefab);
        e.parent = this._missileNode, e.active = !0, r = 270 - r;
        var t = C / 180 * r,
            o = this._hero.parent.getPosition(),
            i = (o = this._hero.parent.parent.convertToWorldSpaceAR(o)).x + 88 * y(t),
            n = o.y + 88 * f(t);
        o = this._missileNode.convertToNodeSpaceAR(cc.p(i, n)), e.setPosition(o);
    },
    RealGameOver: function() {
        var t = r.Fish_UserData.getHeightScore();
        console.log("this._fishNumber", this._fishNumber, this._FishAchievementList), r.Fish_UserData.setTempList(this._FishAchievementList),
            this._fishNumber > t && (r.Fish_UserData.setHeightScore(this._fishNumber), a.default.setScore(this._fishNumber)),
            r.Fish_UserData.setFristGame(!1), r.Fish_UserData.setCurScore(this._fishNumber),
            this.scheduleOnce(function() {
                cc.audioEngine.pauseMusic(), window.gameCrtl = null, cc.director.loadScene("ResultScene");
            }, .2);
    },
    openMusiceBG: function() {
        cc.audioEngine.playMusic(this.bgBmg, !0);
    },
    onBackClick: function() {
        cc.director.loadScene("Fish_Main");
    },
    onChoosePlane: function() {
        window.chooseplane = !0, this.onBackClick();
    },
    createMissile: function(r) {
        if ("Mod" != r) {
            if (!r || "build" != r) {
                if (this._gameOver || window._goldScene) return;
                if (this._missileNode.childrenCount > 2 + d(this.timergo / 40) || 8 < this._missileNode.childrenCount) return;
            }
            this._createMissileTime = u(10, 20) / 10;
            var l = cc.instantiate(this.MissilePrefab);
            l.parent = this._missileNode, l.active = !0, l.rotation = this._hero.rotation, u(this._hero.rotation - 30, this._hero.rotation + 30);
            var t = -C / 180 * (u(0, 359) + 90),
                o = this._hero.parent.getPosition();
            o = this._hero.parent.parent.convertToWorldSpaceAR(o), u(600, 700);
            var i = o.x + y(t) * u(1080, 1180),
                n = o.y + f(t) * u(1920, 2120);
            o = this._missileNode.convertToNodeSpaceAR(cc.p(i, n)), l.setPosition(o);
            var a = l.getComponent("Fish_missileControl");
            a._heroNode = this._hero.parent, a._hero_speed = this._hero_speed, a.build_enemy = this.build_enemy,
                a.gameCtl = this, a._add_speed = .016 * d(this.timergo / 10), this.build_enemy++;
        } else
            for (var s = 0; 4 > s; s++) this.createMissile("build");
    },
    createBigBoss: function() {
        if (!(0 < this._bigbossNode.childrenCount || this._gameOver || window._goldScene)) {
            var a = cc.instantiate(this.bigBossPrefab);
            a.parent = this._bigbossNode, a.active = !0, a.rotation = this._hero.rotation;
            var e = this._hero.parent.getPosition(),
                t = (e = this._hero.parent.parent.convertToWorldSpaceAR(e)).x,
                o = e.y;
            e = this._bigbossNode.convertToNodeSpaceAR(cc.p(t, o));
            var i = 1 <= u(0, 1) ? 0 : 180;
            this._bigbossNode.rotation += i, a.setPosition(e);
        }
    },
    createBox: function() {
        if (!this._gameOver && !window._goldScene) {
            var a = cc.instantiate(this.boxPrefab);
            a.parent = this._starNode, a.active = !0;
            var e = -C / 180 * (u(0, 359) + 90),
                t = this._hero.parent.getPosition(),
                o = (t = this._hero.parent.parent.convertToWorldSpaceAR(t)).x + y(e) * u(200, 300),
                i = t.y + f(e) * u(500, 800);
            t = this.node.convertToNodeSpaceAR(cc.p(o, i)), a.setPosition(t);
        }
    },
    createMissileMod: function() {
        if (!this._gameOver && !window._goldScene) {
            var r = cc.instantiate(this.MissileModPrefab);
            r.parent = this._fishNode, r.active = !0;
            var e = u(0, 360);
            r.rotation = e;
            var t = -C / 180 * (u(0, 359) + 90),
                o = this._hero.parent.getPosition(),
                i = (o = this._hero.parent.parent.convertToWorldSpaceAR(o)).x + y(t) * u(-100, 100),
                n = o.y + f(t) * u(-200, 200);
            o = this.node.convertToNodeSpaceAR(cc.p(i, n)), r.setPosition(o);
        }
    },
    createStar: function() {
        if (!this._gameOver && !window._goldScene && !(10 < this._starNode.childrenCount || this._gameOver)) {
            var r = cc.instantiate(this.starPrefab);
            r.parent = this._starNode, r.active = !0;
            var e = -C / 180 * (u(0, 359) + 90),
                t = this._hero.parent.getPosition(),
                o = (t = this._hero.parent.parent.convertToWorldSpaceAR(t)).x + y(e) * u(1080, 1180),
                i = t.y + f(e) * u(1920, 2120);
            if (t = this.node.convertToNodeSpaceAR(cc.p(o, i)), r.setPosition(t), r.getComponent("Fish_star")._heroNode = this._hero.parent,
                2 > 40 * Math.random())
                for (var n, s = 1; 7 > s; s++) n = cc.instantiate(this.starPrefab),
                    n.parent = this._starNode, n.active = !0, 3 > s ? t = this.node.convertToNodeSpaceAR(cc.p(o + 35 * s, i)) : 2 < s && 5 > s ? t = this.node.convertToNodeSpaceAR(cc.p(o + 35 * (s - 3) + 18, i + 35)) : 5 <= s && (t = this.node.convertToNodeSpaceAR(cc.p(o + 35 * (s - 5) + 18, i - 35))),
                    n.setPosition(t), n.getComponent("Fish_star")._heroNode = this._hero.parent;
        }
    },
    createPuffer: function() {
        if (!this._gameOver && !window._goldScene)
            if (this._pufferNode.childrenCount > 2 + d(this.timergo / 15) || 11 < this._pufferNode.childrenCount);
            else {
                var r = cc.instantiate(this.pufferPrefab);
                r.parent = this._pufferNode, r.active = !0, r.target = this.target, this.target++;
                var e = -C / 180 * (u(0, 359) + 90),
                    t = this._hero.parent.getPosition(),
                    o = (t = this._hero.parent.parent.convertToWorldSpaceAR(t)).x + y(e) * u(1080, 1180),
                    i = t.y + f(e) * u(1920, 2120);
                t = this.node.convertToNodeSpaceAR(cc.p(o, i)), r.setPosition(t);
                var n = r.getComponent("Fish_puffer");
                n._heroNode = this._hero.parent, n._scale = .04 * d(this.timergo / 10);
            }
    },
    createCloud: function() {
        console.log("初始化云层节点"), this._cloundNode.width = 10800, this._cloundNode.height = 12800,
            this._cloundNode.setPosition(cc.p(0, 0));
    },
    createFish: function() {
        if (!this._gameOver && !window._goldScene && !(8 < this._fishNode.childrenCount || this._gameOver)) {
            var l = cc.instantiate(this._currFishPrefab);
            l.parent = this._fishNode, l.active = !0;
            var e = d(Math.random() * this.fishSpriteFrames.length),
                t = this.fishSpriteFrames[e],
                o = this.fishSpriteFrames2[e];
            l.getChildByName("A1").getComponent(cc.Sprite).spriteFrame = t, l.getChildByName("A2").getComponent(cc.Sprite).spriteFrame = o;
            var i = -C / 180 * (u(0, 359) + 90),
                n = this._hero.parent.getPosition(),
                a = (n = this._hero.parent.parent.convertToWorldSpaceAR(n)).x + y(i) * u(1080, 1180),
                s = n.y + f(i) * u(1920, 2120);
            n = this.node.convertToNodeSpaceAR(cc.p(a, s)), l.setPosition(n), l.getChildByName("A1").rotation -= 90,
                l.getChildByName("A2").rotation -= 90;
            var p = l.getComponent("Fish_fishCtr");
            p._heroNode = this._hero.parent, p._hero = this._hero, p.add_label = this.add_fishnum,
                p.redNode = this.redNode, p.gameCrtl = this;
        }
    },
    initHandler: function() {
        this.node.on("touchstart", this.onTouchStart, this), this.node.on("touchmove", this.onTouchMove, this);
    },
    onTouchStart: function(o) {
        if (this.is_game_start) {
            var e = o.getLocation();
            this._stickPos_py.x = e.x - this._stickPos.x, this._stickPos_py.y = e.y - this._stickPos.y;
        }
    },
    onStartGame: function() {
        2 <= this._loadcount && (this.guide_tips.active = !1, this.is_game_start = !0, this.begin());
    },
    onTouchMove: function(o) {
        if (this.is_game_start) {
            var e = o.getLocation();
            e.x -= this._stickPos_py.x, e.y -= this._stickPos_py.y, 60 < this.getDistance(e, this._hero_Pos) && (e.x = this._hero_Pos.x + 60 * y(this._getRadian(e)),
                    e.y = this._hero_Pos.y + 60 * f(this._getRadian(e))), this._stickPos = e, this._stick.setPosition(this._stickPos),
                this._hero_rotate = 90 - this._getAngle(this._hero_Pos, e), this._stick.rotation = this._hero_rotate,
                this._hero_rotate, this._hero.rotation;
        }
    },
    getDistance: function(o, e) {
        return g(_(o.x - e.x, 2) + _(o.y - e.y, 2));
    },
    _getRadian: function(t) {
        return C / 180 * this._getAngle(this._hero_Pos, t);
    },
    _getAngle: function(o, e) {
        return m(e.y - o.y, e.x - o.x) * (180 / C);
    },
    moveCloud: function() {
        var e = -C / 180 * (this._hero.rotation + 90),
            t = this._cloundNode_bg.getPosition();
        t.x, y(e), this._hero_speed, t.y, f(e), this._hero_speed;
    },
    updateScene: function() {
        this._gameOver || window._goldScene || this.sceneNode.getComponent("Fish_scene").updateBuild();
    },
    update: function(m) {
        var g = this;
        if (!window.isGameOver && !this.isPause) {
            if (0 < this.wudiTimer && 2 == this.useWudiState) this.wudiTimer -= m, this.ProgressBar.active = !0,
                this.ProgressBar._components[1].progress = this.wudiTimer / window.ReliveTimer,
                this.bar.color = .4 < this.wudiTimer / window.ReliveTimer ? cc.Color.GREEN : cc.Color.RED;
            else if (0 >= this.wudiTimer && 2 == this.useWudiState) {
                this.useWudiState = 3;
                for (var e = 0; e < this._hero.parent.childrenCount; e++) this._hero.parent.children[e].getComponent("Fish_fishCtr").removeWuDi();
                this.ProgressBar.active = !1;
            }
            this._createMissileTime -= m, this._isafetime -= m;
            var t = this._hero_rotate - this._hero.rotation,
                o = this._hero_speed;
            3 < p(t) && 360 != p(t) ? (180 < p(t) && (t = -p(t) / t * (360 - p(t))), 310 < p(t) ? this._hero.rotation = this._hero_rotate : this._hero.rotation += 15 < p(t) ? 15 * (p(t) / t) : t,
                    0 == this._hero_isRotate && (this._hero_isRotate = !0)) : this._hero_isRotate && (this._hero_isRotate = !1),
                o = 100 * (o * m);
            var n = this._hero.parent.getPosition(),
                a = -C / 180 * (this._hero.rotation + 90),
                i = n.x - y(a) * o,
                s = n.y - f(a) * o;
            n = cc.p(i, s), this._hero.parent.setPosition(n);
            var r = n;
            !this._isreset && (1300 < r.x || -1300 > r.x || 2300 < r.y || -2300 > r.y) && (this._isreset = !0,
                    this._cloundNode.runAction(cc.sequence(cc.fadeTo(1.5, 0), cc.callFunc(function() {
                        var o = g._hero.parent.getPosition();
                        g._cloundNode.setPosition(o);
                        var e = g._cloundNode_bg.convertToNodeSpaceAR(g._hero.parent.parent.convertToWorldSpaceAR(o));
                        g._cloundNode_bg.setPosition(cc.p(o.x - e.x % 1080, o.y - e.y % 1920)), g._cloundNode.runAction(cc.fadeTo(.1, 255)),
                            g._isreset = !1, 0 >= g.sceneLoad && (g.sceneLoad = 10);
                    })))), this.moveCloud(), 0 >= this._isafetime && (this._buid_MissleTemp -= m, 0 > this._buid_MissleTemp && (this._buid_MissleTemp = .3,
                    this.createMissile(), this._isafetime = 0)), this.createFish(), this.speed_all -= m,
                this.timergo += m;
            var l = !0;
            for (e = 0; e < this._hero.parent.childrenCount; e++) l = !!this._hero.parent.children[e].getComponent("Fish_fishCtr")._isdestroy && l;
            if (!(0 > this.speed_all && (6 > this._hero_speed && (this._hero_speed += .05),
                    this.speed_all = 1), this.sceneLoad -= m, window._goldScene)) this._hp -= 5 * m,
                .3 >= this._hp / this.Max_hp && this.onshowHpEffet(.3 < this._hp / this.Max_hp),
                .1 >= this._hp / this.Max_hp && .08 <= this._hp / this.Max_hp && this.onshowHp2(),
                (0 >= this._hp / this.Max_hp || l) && cc.director.getScene().getChildByName("Canvas").emit("Collision_push", {}),
                this.hpProgress._components[1].progress = this._hp / this.Max_hp;
            else if (this._onGoldScene -= m,
                0 >= this._onGoldScene) this.ongoldtimer.stopAllActions(), this.goldSceneNode.destroy(),
                window._goldScene = !1, this.ongoldtimer.parent.destroy(), window.gameCrtl.sceneNode.active = !0;
            else {
                this.ongoldtimer.parent.active = !0;
                var c = d(this._onGoldScene);
                this.ongoldtimer.getComponent(cc.Label).string = c;
            }
            this._bigModTemp -= m, 0 >= this._bigModTemp && (this._bigModTemp = 30), this._MissileModTemp -= m,
                0 >= this._MissileModTemp && (this._MissileModTemp = .2), this._BoxBuildState && (this._BoxBuildTemp -= m,
                    0 >= this._BoxBuildTemp && 0 < this._getBox && (this.createBox(), this._BoxBuildState = !1,
                        --this._getBox)), window.OpenCiTie && (this._citeTemp -= m, 0 >= this._citeTemp && (window.OpenCiTie = !1,
                    this._citeTemp = 10)), 180 <= this.timergo && 360 > this.timergo ? (this.showOceanLevel(2),
                    this._oceanLevel = 2) : 360 < this.timergo && (this.showOceanLevel(3), this._oceanLevel = 3),
                this._goldBuild && (this._goldbuildTimer -= m, 0 >= this._goldbuildTimer && !this._chuansongNodeActive && (this._chuansongNodeActive = !0,
                    this.updateGoldScene()));
        }
    },
    updateGoldScene: function() {
        this.chuansongNode.active = !0;
    },
    showOceanLevel: function(a) {
        if (this._oceanLevel != a) {
            this.qiehuan[a - 3] && (this.qiehuan[a - 3].active = !1), console.log("levellevel====", a),
                this.qiehuan[a - 2].active = !0;
            var n = this.sceneLevelSP[a - 1];
            if (n) {
                var t = this;
                t._cloundNode_bg.runAction(cc.sequence(cc.fadeTo(1, 0), cc.callFunc(function() {
                    for (var o = 0; o < t._cloundNode_bg.childrenCount; o++) "c1" == t._cloundNode_bg.children[o]._name && (t._cloundNode_bg.children[o].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(n));
                    t._cloundNode_bg.runAction(cc.fadeTo(1, 255));
                }, t)));
            }
        }
    },
    onshowHpEffet: function(a) {
        var e = this;
        if (this.Hpfalg != a) {
            if (a) console.log("falg===", a), this.hpzz.stopAllActions();
            else {
                var t = cc.fadeTo(.5, 0),
                    o = cc.fadeTo(.5, 180);
                this.hpzz.runAction(cc.repeatForever(cc.sequence(t, o)));
            }
            (this.Hpfalg = a) ? this.hpzz.opacity = 0: (this.hpzzLale.active = !0, this.scheduleOnce(function() {
                e.hpzzLale.active = !1;
            }, 2));
        }
    },
    onshowHp2: function() {
        var t = this;
        this.hpzzLale2.active = !0, this.scheduleOnce(function() {
            t.hpzzLale2.active = !1;
        }, 2);
    },
    onEnableOpen: function() {
        var t = this;
        this.noOpenlable.active = !0, this.scheduleOnce(function() {
            t.noOpenlable.active = !1;
        }, 1);
    },
    onWuDi: function() {
        this.wudiTimer = window.ReliveTimer, this.useWudiState = 2, this.wudiNode.active = !1,
            r.Fish_UserData.addProtect(-1), this.checkOpenProtect();
        for (var t = 0; t < this._hero.parent.childrenCount; t++) this._hero.parent.children[t].getComponent("Fish_fishCtr").onWuDi();
    },
    onCiTie: function() {
        console.log("window.OpenCiTie===", window.OpenCiTie), window.OpenCiTie = !0;
    },
    onJXgame: function() {
        this.pauseGame(!1);
    },
    closeImgBtn: function() {
        this.ShowSaveImg(!1);
    }
});