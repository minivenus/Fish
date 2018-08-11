cc.Class({
    extends: cc.Component,
    properties: {
        _heroNode: null,
        _hero_speed: 3,
        _hero: null,
        _time: 0,
        _isdestroy: !1,
        build_enemy: 0,
        myFish: !1,
        _startFish: !1,
        add_label: null,
        blastSound: cc.AudioClip,
        redNode: null,
        wudiState: !1,
        gameCrtl: null,
        sp1: cc.Node,
        sp2: cc.Node
    },
    start: function() {
        this.updateFrame = 1, this.sp1.active = !0, this.sp2.active = !1, this.schedule(function() {
            var o = cc.scaleTo(.4, 1.1, .95),
                e = cc.scaleTo(.4, .95, 1.1);
            this.node.runAction(cc.sequence(o, e));
        }, 1), this._startFish || (this.node.rotation = 90, this.myFish = !1, cc.director.getCollisionManager().enabled = !0);
    },
    onCollisionEnter: function(a) {
        this.myFish = !!this._startFish || this.myFish;
        var r = a.node.name;
        if (r && a && a.node && !this._isdestroy)
            if (!("plane" != r || this.myFish || !a.node.getComponent("Fish_fishCtr").myFish || a.node.getComponent("Fish_fishCtr")._isdestroy)) {
                this.myFish = !0;
                var t = this.node.getPosition();
                this.node.fishID = this.gameCrtl._fishPosEvent.length, cc.director.getScene().getChildByName("Canvas").emit("fish_push", {
                    other: a,
                    target: this.node
                });
                for (var i = 0; i < this.gameCrtl._fishPosEvent.length; i++) "" == this.gameCrtl._fishPosEvent[i] && this.node.fishID == this.gameCrtl._fishPosEvent.length && (this.node.fishID = i);
                50 <= this.gameCrtl._fishPosEvent.length && 50 <= this.node.fishID ? (t = this.node.getPosition(),
                        t = this.node.parent.convertToWorldSpaceAR(t), t = this._heroNode.convertToNodeSpaceAR(cc.p(t.x, t.y))) : (this.gameCrtl._fishPosEvent[this.node.fishID] = this.node,
                        t = this.gameCrtl._fishPos[this.node.fishID]), this.node.parent = this._heroNode,
                    this.node.setPosition(t), this.add_label && this.add_label.setPosition(t), 1 == window.worktype && (window.gameCrtl._achievementList[1] = window.gameCrtl._achievementList[1] < this.node.fishID + 1 ? this.node.fishID + 1 : window.gameCrtl._achievementList[1],
                        window.Achievement.checkWork(1)), 3 == window.worktype && (window.gameCrtl._achievementList[3] += 1,
                        window.Achievement.checkWork(3)), a.node.getComponent("Fish_fishCtr").wudiState && this.onWuDi();
            } else if ("Missile" == r) {
            if (this.wudiState) return void a.node.destroy();
            if (this._startFish) return cc.director.getScene().getChildByName("Canvas").emit("fish_die_push", {
                other: a,
                target: this.node
            }), void this.onCloseNode();
            if (this.myFish && !this._isdestroy) {
                var n = function() {};
                this.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(n, this))),
                    cc.audioEngine.play(this.blastSound, !1, 1);
            }
            this.node.fishID && (this.gameCrtl._fishPosEvent[this.node.fishID] = ""), 0 == window.worktype && this.myFish && (window.gameCrtl._achievementList[0] += 1,
                window.Achievement.checkWork(0)), this.onBlast();
        } else if ("puffer" == r || "point5" == r || "stone01" == r || "point4" == r || "point3" == r || "point2" == r || "point1" == r || "pufferMod" == r) {
            if (this.wudiState) return;
            if (this._startFish) return n = function() {}, this.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(n, this))),
                cc.audioEngine.play(this.blastSound, !1, 1), void this.onCloseNode();
            this.myFish && !this._isdestroy && (n = function() {}, this.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(n, this))),
                    cc.audioEngine.play(this.blastSound, !1, 1)), this.node.fishID && (this.gameCrtl._fishPosEvent[this.node.fishID] = ""),
                this.onBlast();
        } else if ("BigBoss" == r) {
            if (this.wudiState) return;
            if (this._startFish) return cc.director.getScene().getChildByName("Canvas").emit("fish_die_push", {
                other: a,
                target: this.node
            }), void this.onCloseNode();
            this.myFish && !this._isdestroy && (n = function() {}, this.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(n, this))),
                    cc.audioEngine.play(this.blastSound, !1, 1)), this.node.fishID && (this.gameCrtl._fishPosEvent[this.node.fishID] = ""),
                this.onBlast();
        } else "fishfood" == r && this.myFish ? (cc.director.getScene().getChildByName("Canvas").emit("Gold_push", {
            other: a,
            target: this.node
        }), a.node.active = !1) : "gold" == r && this.myFish ? (cc.director.getScene().getChildByName("Canvas").emit("Gold_push", {
            other: a,
            target: this.node
        }), a.node.active = !1, console.log("window.worktype===", window.worktype), 5 == window.worktype && (window.gameCrtl._achievementList[5] += 1,
            window.Achievement.checkWork(5))) : "biggold" == r && this.myFish ? (cc.director.getScene().getChildByName("Canvas").emit("Gold_push", {
            other: a,
            target: this.node
        }), console.log("window.worktype===", window.worktype), 5 == window.worktype && (window.gameCrtl._achievementList[5] += 1,
            window.Achievement.checkWork(5)), a.node.active = !1) : "citie" == r && this.myFish ? (window.gameCrtl.onCiTie(),
            a.node.active = !1) : "newgold" == r && this.myFish && (cc.director.getScene().getChildByName("Canvas").emit("New_Gold_push", {
            other: a,
            target: this.node
        }), a.node.active = !1);
    },
    onCloseNode: function() {
        this.node.getChildByName("A1").active = !1, this.node.getChildByName("A2").active = !1;
        var t = this.node.getChildByName("blast");
        t.active = !0, this._isdestroy = !0, this.node.active = !1, this.scheduleOnce(function() {
            this.node.getChildByName("A1").active = !0, t.active = !1, this._startFish || this.node.destroy();
        }, 1);
    },
    onWuDi: function() {
        this.wudiState = !0, this.node.getChildByName("particle_fish").active = !0;
    },
    removeWuDi: function() {
        this.wudiState = !1, this.node.getChildByName("particle_fish").active = !1, console.log("removeWuDi0------------------");
    },
    onBlast: function() {
        this._startFish || this._isdestroy || (this._isdestroy = !0, this.node.getChildByName("A1").active = !1,
            this.node.getChildByName("A2").active = !1, this.node.getChildByName("blast").active = !0,
            this.scheduleOnce(function() {
                this._startFish ? this.node.active = !1 : this.node.destroy();
            }, 2));
    },
    update: function(r) {
        if (this._startFish) return this.updateFrame -= r, void(0 >= this.updateFrame && (this.sp1.active = !this.sp1.active,
            this.sp2.active = !this.sp1.active, this.updateFrame = 1));
        if (!this._isdestroy) {
            if (this.myFish) return this.updateFrame -= r, 0 >= this.updateFrame && (this.sp1.active = !this.sp1.active,
                this.sp2.active = !this.sp1.active, this.updateFrame = 1), void(this.node.rotation = this._hero.rotation + 90);
            if (!this._isdestroy) {
                this.updateFrame -= r, 0 >= this.updateFrame && (this.sp1.active = !this.sp1.active,
                    this.sp2.active = !this.sp1.active, this.updateFrame = 1), window.isGameOver && this.onBlast();
                var e = this._heroNode.getPosition();
                e = this._heroNode.parent.convertToWorldSpaceAR(e);
                var t = this.node.getPosition();
                t = this.node.parent.convertToWorldSpaceAR(t);
                var o = g(_(e.x - t.x, 2) + _(e.y - t.y, 2)),
                    i = 100 * (1 * r);
                this.node.rotation += d(2 * Math.random()) - 1;
                var n = -C / 180 * this.node.rotation,
                    a = t.x - y(n) * i,
                    s = t.y - f(n) * i;
                return t = this.node.parent.convertToNodeSpaceAR(cc.p(a, s)), this.node.setPosition(t),
                    this._time -= r, 2500 < o ? (this._isdestroy = !0, void this.node.destroy()) : void 0;
            }
            this.node.destroy();
        }
    }
});