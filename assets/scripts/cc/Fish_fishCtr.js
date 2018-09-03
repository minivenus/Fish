//var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

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
            var effect_1 = cc.scaleTo(.4, 1.1, .95),
                effect_2 = cc.scaleTo(.4, .95, 1.1);
            this.node.runAction(cc.sequence(effect_1, effect_2));
        }, 1), this.myFish || (this.node.rotation = 90, cc.director.getCollisionManager().enabled = !0);
    },
    onCollisionEnter: function(other) {
        this.myFish = !!this._startFish || this.myFish;
        var nodeName = other.node.name;
        if (nodeName && other && other.node && !this._isdestroy)
            if (!("plane" != nodeName || this.myFish || !other.node.getComponent("Fish_fishCtr").myFish || other.node.getComponent("Fish_fishCtr")._isdestroy)) {
                this.myFish = !0;
                var pos = this.node.getPosition();
                this.node.fishID = this.gameCrtl._fishPosEvent.length, cc.director.getScene().getChildByName("Canvas").emit("fish_push", {
                    other: other,
                    target: this.node
                });
                for (var s = 0; s < this.gameCrtl._fishPosEvent.length; s++) "" == this.gameCrtl._fishPosEvent[s] && this.node.fishID == this.gameCrtl._fishPosEvent.length && (this.node.fishID = s);
                50 <= this.gameCrtl._fishPosEvent.length && 50 <= this.node.fishID ? (pos = this.node.getPosition(),
                pos = this.node.parent.convertToWorldSpaceAR(pos), pos = this._heroNode.convertToNodeSpaceAR(cc.p(pos.x, pos.y))) : (this.gameCrtl._fishPosEvent[this.node.fishID] = this.node,
                        pos = this.gameCrtl._fishPos[this.node.fishID]), this.node.parent = this._heroNode,
                        this.node.setPosition(pos), this.add_label && this.add_label.setPosition(pos), 1 == window.worktype && "mainpt" != window.cur_scence && (window.gameCrtl._achievementList[1] = window.gameCrtl._achievementList[1] < this.node.fishID + 1 ? this.node.fishID + 1 : window.gameCrtl._achievementList[1],
                        window.Achievement.checkWork(1)), 3 == window.worktype && "mainpt" != window.cur_scence && (window.gameCrtl._achievementList[3] += 1,
                        window.Achievement.checkWork(3)), other.node.getComponent("Fish_fishCtr").wudiState && this.onWuDi();
            } else if ("Missile" == nodeName) {
            if (this.wudiState) return void other.node.destroy();
            if (this._startFish) return cc.director.getScene().getChildByName("Canvas").emit("fish_die_push", {
                other: other,
                target: this.node
            }), void this.onCloseNode();
            if (this.myFish && !this._isdestroy) {
                var emptyFunc = function() {};
                this.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(emptyFunc, this))),
                    cc.audioEngine.play(this.blastSound, !1, 1);
            }
            this.node.fishID && (this.gameCrtl._fishPosEvent[this.node.fishID] = ""), 0 == window.worktype && this.myFish && "mainpt" != window.cur_scence && (window.gameCrtl._achievementList[0] += 1,
                window.Achievement.checkWork(0)), this.onBlast();
        } else if ("puffer" == nodeName || "point5" == nodeName || "stone01" == nodeName || "point4" == nodeName || "point3" == nodeName || "point2" == nodeName || "point1" == nodeName || "pufferMod" == nodeName) {
            if (this.wudiState) return;
            if (this._startFish) return emptyFunc = function() {}, this.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(emptyFunc, this))),
                cc.audioEngine.play(this.blastSound, !1, 1), void this.onCloseNode();
            this.myFish && !this._isdestroy && (emptyFunc = function() {}, this.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(emptyFunc, this))),
                    cc.audioEngine.play(this.blastSound, !1, 1)), this.node.fishID && (this.gameCrtl._fishPosEvent[this.node.fishID] = ""),
                this.onBlast();
        } else if ("BigBoss" == nodeName) {
            if (this.wudiState) return;
            if (this._startFish) return cc.director.getScene().getChildByName("Canvas").emit("fish_die_push", {
                other: other,
                target: this.node
            }), void this.onCloseNode();
            this.myFish && !this._isdestroy && (emptyFunc = function() {}, this.redNode.runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(emptyFunc, this))),
                    cc.audioEngine.play(this.blastSound, !1, 1)), this.node.fishID && (this.gameCrtl._fishPosEvent[this.node.fishID] = ""),
                this.onBlast();
        } else "fishfood" == nodeName && this.myFish ? (cc.director.getScene().getChildByName("Canvas").emit("Gold_push", {
            other: other,
            target: this.node
        }), other.node.active = !1) : "gold" == nodeName && this.myFish ? (cc.director.getScene().getChildByName("Canvas").emit("Gold_push", {
            other: other,
            target: this.node
        }), other.node.active = !1, console.log("window.worktype===", window.worktype), 5 == window.worktype && "mainpt" != window.cur_scence && (window.gameCrtl._achievementList[5] += 1,
            window.Achievement.checkWork(5))) : "biggold" == nodeName && this.myFish ? (cc.director.getScene().getChildByName("Canvas").emit("Gold_push", {
            other: other,
            target: this.node
        }), console.log("window.worktype===", window.worktype), 5 == window.worktype && "mainpt" != window.cur_scence && (window.gameCrtl._achievementList[5] += 1,
            window.Achievement.checkWork(5)), other.node.active = !1) : "citie" == nodeName && this.myFish ? (window.gameCrtl.onCiTie(),
            other.node.active = !1) : "newgold" == nodeName && this.myFish && (cc.director.getScene().getChildByName("Canvas").emit("New_Gold_push", {
            other: other,
            target: this.node
        }), other.node.active = !1);
    },
    onCloseNode: function() {
        this.node.getChildByName("A1").active = !1, this.node.getChildByName("A2").active = !1;
        var blastNode = this.node.getChildByName("blast");
        blastNode.active = !0, this._isdestroy = !0, this.node.active = !1, this.scheduleOnce(function() {
            this.node.getChildByName("A1").active = !0, blastNode.active = !1, this._startFish || this.node.destroy();
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
    update: function(dt) {
        if (this._startFish) return this.updateFrame -= dt, void(0 >= this.updateFrame && (this.sp1.active = !this.sp1.active,
            this.sp2.active = !this.sp1.active, this.updateFrame = 1));
        if (!this._isdestroy) {
            if (this.myFish) return this.updateFrame -= dt, 0 >= this.updateFrame && (this.sp1.active = !this.sp1.active,
                this.sp2.active = !this.sp1.active, this.updateFrame = 1), void(this.node.rotation = this._hero.rotation + 90);
            if (!this._isdestroy) {
                this.updateFrame -= dt, 0 >= this.updateFrame && (this.sp1.active = !this.sp1.active,
                    this.sp2.active = !this.sp1.active, this.updateFrame = 1), window.isGameOver && this.onBlast();
                var heroPos = this._heroNode.getPosition();
                heroPos = this._heroNode.parent.convertToWorldSpaceAR(heroPos);
                var nodePos = this.node.getPosition();
                nodePos = this.node.parent.convertToWorldSpaceAR(nodePos);
                var dist = Math.sqrt(Math.pow(heroPos.x - nodePos.x, 2) + Math.pow(heroPos.y - nodePos.y, 2)),
                    speed = 100 * (1 * dt);
                this.node.rotation += Math.floor(2 * Math.random()) - 1;
                var radius = -Math.PI / 180 * this.node.rotation,
                    x = nodePos.x - Math.cos(radius) * speed,
                    y = nodePos.y - Math.sin(radius) * speed;
                return nodePos = this.node.parent.convertToNodeSpaceAR(cc.p(x, y)), this.node.setPosition(nodePos),
                    this._time -= dt, 2500 < dist ? (this._isdestroy = !0, void this.node.destroy()) : void 0;
            }
            this.node.destroy();
        }
    }
});