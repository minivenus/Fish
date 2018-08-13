function d(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function l(o, e) {
    return C(Math.random() * (e - o + 1) + o);
}

var h, S, n, b = require("../lib/FishCfgMgr"),
    c = require("../lib/Define"),
    v = require("../lib/Fish_UserData");

cc.Class({
    extends: cc.Component,
    properties: (h = {
        fishPrefab: cc.Prefab,
        MissileModPrefab: cc.Prefab,
        MissilePrefab: cc.Prefab,
        bigBossPrefab: cc.Prefab,
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
        _fishNode: null,
        _bigbossNode: null,
        _currFishPrefab: null,
        _missileModNode: null,
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
        IsCanRelive: !0,
        TipsView: cc.Node,
        curScore: cc.Label,
        redNode: cc.Node,
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
        _bigModTemp: 1,
        _MissileModTemp: 1,
        _fishPos: null,
        _fishPosEvent: [],
        goldscene: cc.Node,
        _oceanLevel: 1,
        sceneLevelSP: [],
        golds: 0,
        qiehuan: [cc.Node],
        _buid_MissleTemp: .3,
        _BoxBuildState: !0,
        freeshare: cc.Node,
        PTtimer: cc.Label,
        hpzz: cc.Node,
        hpzzLale: cc.Node,
        hpzzLale2: cc.Node,
        hpProgress: cc.Node,
        sceneNode: cc.Node,
        Max_hp: 300,
        _hp: 300
    }, S = "hpProgress", n = cc.Node, S in h ? Object.defineProperty(h, S, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : h[S] = n, h),
    start: function() {
        this._bigModTemp = 10, this.PT_time = v.Fish_UserData.challRoomIntervalTime - 3,
            this._goldbuildTimer = 10, this._onGoldScene = 30, v.Fish_UserData.setProtect(0),
            cc.audioEngine.playMusic(this.bgBmg, !0), window.buildsceneNum = 0, this._fishPosEvent = [],
            (window.gameCrtl = this).sceneLoad = 10, this._BoxBuildTemp = 60, window.cur_scence = "mainpt",
            window.ReliveTimer || (window.ReliveTimer = 5), this.reliveNeedGold = 100, this.speed_all = 1,
            this.target = 1, window.isGameOver = !0, this.isShowShareBtn1 = !!window.lifeType && window.lifeType;
        var r = this;
        this._hero_speed = 3, this.shareBtn1 = cc.find("ShareView/shareBtn1", this.node),
            this.shareBtn1.active = this.isShowShareBtn1, this.initHandler();
        var d = v.Fish_UserData.getCurSkin();
        console.log("设置使用的小鱼=设置使用的小鱼", d), cc.loader.loadRes("Fish/prefab/fish", function(a, e) {
            a && (console.log("Loading resource fail."), cc.director.loadScene("Fish_MainTZ")),
                console.log("Loading resource cuss."), r._currFishPrefab = e;
            var t = cc.instantiate(e);
            t.getComponent("Fish_fishCtr")._startFish = !0, t.getComponent("Fish_fishCtr").myFish = !0,
                t.getComponent("Fish_fishCtr").redNode = r.redNode, t.getChildByName("A1").getComponent(cc.Sprite).spriteFrame = b.FishCfgMgr.getSkinSpriteFrameByKey(d + "_1"),
                t.getChildByName("A2").getComponent(cc.Sprite).spriteFrame = b.FishCfgMgr.getSkinSpriteFrameByKey(d + "_2"),
                t.fishID = 0, (r._fishPosEvent[0] = t).parent = cc.find("Canvas/plane"), r._hero = t,
                r._hero.active = !1, r._loadcount++, r.begin();
        });
        var n = v.Fish_UserData.getHaveSkins();
        console.log("skinList===", n, n[0]);
        for (var e = 0; e < n.length; e++) r.fishSpriteFrames[r.fishSpriteFrames.length] = b.FishCfgMgr.getSkinSpriteFrameByKey(n[e] + "_1"),
            r.fishSpriteFrames2[r.fishSpriteFrames2.length] = b.FishCfgMgr.getSkinSpriteFrameByKey(n[e] + "_2");
        var t = cc.url.raw("resources/fishPop/config/FishLineCfg.json");
        cc.loader.load(t, function(o, e) {
            return o ? (console.error("load FishLineCfg failed"), void console.error(o.message || o)) : void(console.log("load FishLineCfg success"),
                r._fishPos = e);
        }.bind(this)), cc.director.getCollisionManager().enabled = !0;
        for (var o = function(a) {
                cc.loader.loadRes("Fish/Texture/main/bg" + (a + 1), function(o, e) {
                    o && console.log("Loading resource fail."), r.sceneLevelSP[a] = e;
                });
            }, a = 0; 3 > a; a++) o(a);
        console.log("self.sceneLevelSP", r.sceneLevelSP);
    },
    begin: function() {
        var o = this,
            e = this;
        cc.find("Canvas/l_loading").active = !1, e._cloundNode = cc.find("Canvas/cloud"),
            e._cloundNode_bg = cc.find("Canvas/cloud_bg"), e._cloundNode_bg.active = !0, e._fishNode = cc.find("Canvas/fish"),
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
            }), this.node.on("Collision_push", function() {
                window.isGameOver || (console.log("Collision_push"), e.IsCanRelive ? (e.IsCanRelive = !1,
                        e.shareViewCtl.getComponent("ShareViewCtrl").ShowView(!0), e.shareViewCtl.getComponent("ShareViewCtrl").SetScoreLabel(e._imissilecount)) : e.RealGameOver(),
                    window.isGameOver = !0, e._gameOver = !0, e._hero.active = !1, e._stick.active = !1,
                    window.missilecount < parseInt(e._imissilecount) && (window.missilecount = parseInt(e._imissilecount)));
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
            }), window.isGameOver = !1, this.is_game_start = !0, this.schedule(function() {
                o.PT_time--, o.PTtimer.string = "剩余时间：" + t(o.PT_time), 0 >= o.PT_time && o.RealGameOver();
            }, 1);
    },
    ReliveGame: function(a, e, t) {
        this._hero.getChildByName("A1").active = !0, this._hero.getComponent("Fish_fishCtr")._isdestroy = !1,
            window.isGameOver = !1, this._gameOver = !1, this._hero.active = !0, this._stick.active = !1;
        var o = this;
        this.pauseGame(!0), this._missileNode.removeAllChildren(), this._bigbossNode.removeAllChildren();
        for (var r = 0; r < this.sceneNode.childrenCount; r++) this.sceneNode.children[r].active = !1;
        (window.buildsceneNum = 0, this._hp = this.Max_hp, this.hpzz.opacity = 255 * (1 - this._hp / this.Max_hp),
            this.hpProgress._components[1].progress = this._hp / this.Max_hp, o.onshowHpEffet(.3 < o._hp / o.Max_hp),
            1 == e) ? (this.golds -= parseInt(t), v.Fish_UserData.addGold(-parseInt(t))) : 2 == e && (o.freeshare.active = !0,
            o.scheduleOnce(function() {
                o.freeshare.active = !1;
            }, 1.5)), this.hideTipsView();
    },
    updateScene: function() {
        this._gameOver || window._goldScene || this.sceneNode.getComponent("Fish_scene").updateBuild();
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
        var t = y / 180 * r,
            o = this._hero.parent.getPosition(),
            s = (o = this._hero.parent.parent.convertToWorldSpaceAR(o)).x + 88 * f(t),
            n = o.y + 88 * _(t);
        o = this._missileNode.convertToNodeSpaceAR(cc.p(s, n)), e.setPosition(o);
    },
    RealGameOver: function() {
        v.Fish_UserData.challRoomScore = this._fishNumber, c.Define.sendChallScore(this._fishNumber),
            this.scheduleOnce(function() {
                cc.audioEngine.pauseMusic(), window.gameCrtl = null, cc.director.loadScene("ChallengeScene");
            }, .2);
    },
    openMusiceBG: function() {
        cc.audioEngine.playMusic(this.bgBmg, !0);
    },
    onBackClick: function() {
        cc.director.loadScene("Fish_MainTZ");
    },
    onChoosePlane: function() {
        window.chooseplane = !0, this.onBackClick();
    },
    createMissile: function(r) {
        if ("Mod" != r) {
            if (!r || "build" != r) {
                if (this._gameOver || window._goldScene) return;
                if (this._missileNode.childrenCount > 2 + C(this.timergo / 40) || 8 < this._missileNode.childrenCount) return;
            }
            this._createMissileTime = l(10, 20) / 10;
            var d = cc.instantiate(this.MissilePrefab);
            d.parent = this._missileNode, d.active = !0, d.rotation = this._hero.rotation, l(this._hero.rotation - 30, this._hero.rotation + 30);
            var t = -y / 180 * (l(0, 359) + 90),
                o = this._hero.parent.getPosition();
            o = this._hero.parent.parent.convertToWorldSpaceAR(o), l(600, 700);
            var p = o.x + f(t) * l(1080, 1180),
                n = o.y + _(t) * l(1920, 2120);
            o = this._missileNode.convertToNodeSpaceAR(cc.p(p, n)), d.setPosition(o);
            var a = d.getComponent("Fish_missileControl");
            a._heroNode = this._hero.parent, a._hero_speed = this._hero_speed, a.build_enemy = this.build_enemy,
                a.gameCtl = this, a._add_speed = .016 * C(this.timergo / 10), this.build_enemy++;
        } else
            for (var s = 0; 4 > s; s++) this.createMissile("build");
    },
    createMissileMod: function() {
        if (!this._gameOver && !window._goldScene) {
            var r = cc.instantiate(this.MissileModPrefab);
            r.parent = this._fishNode, r.active = !0;
            var e = l(0, 360);
            r.rotation = e;
            var t = -y / 180 * (l(0, 359) + 90),
                o = this._hero.parent.getPosition(),
                s = (o = this._hero.parent.parent.convertToWorldSpaceAR(o)).x + f(t) * l(-100, 100),
                n = o.y + _(t) * l(-200, 200);
            o = this.node.convertToNodeSpaceAR(cc.p(s, n)), r.setPosition(o);
        }
    },
    createCloud: function() {
        console.log("初始化云层节点"), this._cloundNode.width = 10800, this._cloundNode.height = 12800,
            this._cloundNode.setPosition(cc.p(0, 0));
    },
    createFish: function() {
        if (!this._gameOver && !window._goldScene && !(8 < this._fishNode.childrenCount || this._gameOver)) {
            var d = cc.instantiate(this._currFishPrefab);
            d.parent = this._fishNode, d.active = !0;
            var e = C(Math.random() * this.fishSpriteFrames.length),
                t = this.fishSpriteFrames[e],
                o = this.fishSpriteFrames2[e];
            d.getChildByName("A1").getComponent(cc.Sprite).spriteFrame = t, d.getChildByName("A2").getComponent(cc.Sprite).spriteFrame = o;
            var p = -y / 180 * (l(0, 359) + 90),
                n = this._hero.parent.getPosition(),
                a = (n = this._hero.parent.parent.convertToWorldSpaceAR(n)).x + f(p) * l(1080, 1180),
                s = n.y + _(p) * l(1920, 2120);
            n = this.node.convertToNodeSpaceAR(cc.p(a, s)), d.setPosition(n), d.getChildByName("A1").rotation -= 90,
                d.getChildByName("A2").rotation -= 90;
            var c = d.getComponent("Fish_fishCtr");
            c._heroNode = this._hero.parent, c._hero = this._hero, c.add_label = this.add_fishnum,
                c.redNode = this.redNode, c.gameCrtl = this;
        }
    },
    initHandler: function() {
        this.node.on("touchstart", this.onTouchStart, this), this.node.on("touchmove", this.onTouchMove, this);
    },
    onTouchStart: function(o) {
        if (this.is_game_start) {
            var e = o.getLocation();
            console.log("this._stickPos_py==", this._stickPos_py, e), this._stickPos_py.x = e.x - this._stickPos.x,
                this._stickPos_py.y = e.y - this._stickPos.y;
        }
    },
    onStartGame: function() {
        2 <= this._loadcount && (this.guide_tips.active = !1, this.is_game_start = !0, this.begin());
    },
    onTouchMove: function(o) {
        if (this.is_game_start) {
            var e = o.getLocation();
            e.x -= this._stickPos_py.x, e.y -= this._stickPos_py.y, 60 < this.getDistance(e, this._hero_Pos) && (e.x = this._hero_Pos.x + 60 * f(this._getRadian(e)),
                    e.y = this._hero_Pos.y + 60 * _(this._getRadian(e))), this._stickPos = e, this._stick.setPosition(this._stickPos),
                this._hero_rotate = 90 - this._getAngle(this._hero_Pos, e), this._stick.rotation = this._hero_rotate,
                this._hero_rotate, this._hero.rotation;
        }
    },
    getDistance: function(o, e) {
        return g(u(o.x - e.x, 2) + u(o.y - e.y, 2));
    },
    _getRadian: function(t) {
        return y / 180 * this._getAngle(this._hero_Pos, t);
    },
    _getAngle: function(o, e) {
        return m(e.y - o.y, e.x - o.x) * (180 / y);
    },
    moveCloud: function() {
        var e = -y / 180 * (this._hero.rotation + 90),
            t = this._cloundNode_bg.getPosition();
        t.x, f(e), this._hero_speed, t.y, _(e), this._hero_speed;
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
                a = -y / 180 * (this._hero.rotation + 90),
                s = n.x - f(a) * o,
                c = n.y - _(a) * o;
            n = cc.p(s, c), this._hero.parent.setPosition(n);
            var r = n;
            !this._isreset && (1300 < r.x || -1300 > r.x || 2300 < r.y || -2300 > r.y) && (this._isreset = !0,
                    this._cloundNode.runAction(cc.sequence(cc.fadeTo(1.5, 0), cc.callFunc(function() {
                        var o = g._hero.parent.getPosition();
                        g._cloundNode.setPosition(o);
                        var e = g._cloundNode_bg.convertToNodeSpaceAR(g._hero.parent.parent.convertToWorldSpaceAR(o));
                        g._cloundNode_bg.setPosition(cc.p(o.x - e.x % 1080, o.y - e.y % 1920)), g._cloundNode.runAction(cc.fadeTo(.1, 255)),
                            g._isreset = !1;
                    })))), this.moveCloud(), this._hp -= 5 * m, .3 >= this._hp / this.Max_hp && this.onshowHpEffet(.3 < this._hp / this.Max_hp),
                .1 >= this._hp / this.Max_hp && .08 <= this._hp / this.Max_hp && this.onshowHp2(),
                (0 >= this._hp / this.Max_hp || l) && cc.director.getScene().getChildByName("Canvas").emit("Collision_push", {}),
                this.hpProgress._components[1].progress = this._hp / this.Max_hp, 0 >= this._isafetime && (this._buid_MissleTemp -= m,
                    0 > this._buid_MissleTemp && (this._buid_MissleTemp = .3, this.createMissile(),
                        this._isafetime = 0)), this.createFish(), this.speed_all -= m, this.timergo += m;
            var l = !0;
            for (e = 0; e < this._hero.parent.childrenCount; e++) l = !!this._hero.parent.children[e].getComponent("Fish_fishCtr")._isdestroy && l;
            if (l && cc.director.getScene().getChildByName("Canvas").emit("Collision_push", {}),
                0 > this.speed_all && (6 > this._hero_speed && (this._hero_speed += .05), this.speed_all = 1),
                this._bigModTemp -= m, 0 >= this._bigModTemp) {
                var u = 5 - C(this.timergo / 15);
                u = 1 > u ? 1 : u, this.createBigBoss(), this._bigModTemp = u;
            }
        }
    },
    createBigBoss: function() {
        if (!(0 < this._bigbossNode.childrenCount || this._gameOver || window._goldScene)) {
            var a = cc.instantiate(this.bigBossPrefab);
            a.parent = this._bigbossNode, a.active = !0, a.rotation = this._hero.rotation;
            var e = this._hero.parent.getPosition(),
                t = (e = this._hero.parent.parent.convertToWorldSpaceAR(e)).x,
                o = e.y;
            e = this._bigbossNode.convertToNodeSpaceAR(cc.p(t, o));
            var r = 1 <= l(0, 1) ? 0 : 180;
            this._bigbossNode.rotation += r, a.setPosition(e);
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
    }
});