var o = cc._decorator,
    d = o.ccclass,
    n = o.property,
    ComListView = function(__super) {
        function ComListView() {
            var ComListView = null !== __super && __super.apply(this, arguments) || this;
            return ComListView.scrollView = null, ComListView.itemTemplate = null, ComListView.spawnCount = 5, ComListView.spacing = 0,
            ComListView.bufferZone = 0, ComListView.content = null, ComListView.updateTimer = 0, ComListView.updateInterval = 0, ComListView.lastContentPosY = 0,
            ComListView.totalCount = 0, ComListView.items = [], ComListView.data = [], ComListView;
        }
        return __extends(ComListView, __super), ComListView.prototype.start = function() {}, ComListView.prototype.init = function(t) {
                t && (this.data = t, this.totalCount = this.data.length, this.content = this.scrollView.content,
                    this.items = [], 0 < this.totalCount && this.initialize(), this.updateTimer = 0,
                    this.updateInterval = .2, this.lastContentPosY = 0);
            }, ComListView.prototype.initialize = function() {
                this.spawnCount = 5;
                this.spacing = 0;
                this.bufferZone = 0;
                this.scrollView.node.getChildByName("view").height, this.itemTemplate.height, this.spawnCount = parseInt((this.scrollView.node.getChildByName("view").height / this.itemTemplate.height).toString()) + 3,
                    this.spawnCount = this.spawnCount > this.totalCount ? this.totalCount : this.spawnCount,
                    this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing,
                    console.log("初始加载数量：" + this.spawnCount), console.log("总长度：" + this.totalCount),
                    console.log("this.content.height:" + this.content.height);
                for (var a, t = 0; t < this.spawnCount; t++) {
                    a = cc.instantiate(this.itemTemplate), this.content.addChild(a), a.active = !0;
                    var e = -a.height * (.5 + t) - this.spacing * (t + 1);
                    a.setPosition(0, e), a.getComponent(a.name).updateItem(this.data[t], t), this.items.push(a);
                }
            }, ComListView.prototype.getPositionInView = function(o) {
                var e = o.parent.convertToWorldSpaceAR(o.position);
                return this.scrollView.node.convertToNodeSpaceAR(e);
            }, ComListView.prototype.update = function(d) {
                if (this.updateTimer += d, !(this.updateTimer < this.updateInterval)) {
                    this.updateTimer = 0;
                    for (var e, s = this.items, t = this.bufferZone, p = this.scrollView.content.y < this.lastContentPosY, m = (this.itemTemplate.height + this.spacing) * s.length, n = 0; n < s.length; ++n)
                        if (e = this.getPositionInView(s[n]), !p) {
                            var a = s[n].y - m;
                            if (e.y > t && a > -this.content.height) {
                                s[n].setPositionY(a);
                                var r;
                                l = (r = s[n].getComponent(s[n].name)).itemID + s.length, r.updateItem(this.data[l], l);
                            }
                        } else if (e.y < -t && 0 > s[n].y + m) {
                        s[n].setPositionY(s[n].y + m);
                        var l = (r = s[n].getComponent(s[n].name)).itemID - s.length;
                        r.updateItem(this.data[l], l);
                    }
                    this.lastContentPosY = this.scrollView.content.y;
                }
            }, __decorate([n(cc.ScrollView)], ComListView.prototype, "scrollView", void 0), __decorate([n(cc.Node)], ComListView.prototype, "itemTemplate", void 0),
            /*__decorate([n()], ComListView.prototype, "spawnCount", void 0), __decorate([n()], ComListView.prototype, "spacing", void 0),
            __decorate([n()], ComListView.prototype, "bufferZone", void 0), */ComListView = __decorate([d], ComListView);
    }(cc.Component);
exports.default = ComListView;