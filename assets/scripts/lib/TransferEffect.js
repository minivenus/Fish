var o = require("./TransferFrag"),
    i = cc._decorator,
    n = i.ccclass,
    a = i.property,
    s = function(i) {
        function t() {
            var t = null !== i && i.apply(this, arguments) || this;
            return t.bg = null, t.isAllChildrenUse = !1, t.time = 0, t;
        }
        return __extends(t, i), t.prototype.start = function() {
                this.enabled = !1;
            }, t.prototype.testShaderB = function() {
                if (this.program = new cc.GLProgram(), cc.sys.isNative ? this.program.initWithString(o.default.vert, o.default.frag) : (this.program.initWithVertexShaderByteArray(o.default.vert, o.default.frag),
                        this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION),
                        this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR),
                        this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS)),
                    this.program.link(), this.program.updateUniforms(), this.program.use(), cc.sys.isNative) cc.GLProgramState.getOrCreateWithGLProgram(this.program).setUniformFloat("time", this.time);
                else {
                    var t = this.program.getUniformLocationForName("time");
                    this.program.setUniformLocationWith1f(t, this.time);
                }
                this.isAllChildrenUse ? this.setProgram(this.node._sgNode, this.program) : this.setProgram(this.node.getComponent(cc.Sprite)._sgNode, this.program),
                    this.enabled = !0;
            }, t.prototype.setProgram = function(a, e) {
                if (cc.sys.isNative) {
                    var t = cc.GLProgramState.getOrCreateWithGLProgram(e);
                    a.setGLProgramState(t);
                } else a.setShaderProgram(e);
                var o = a.children;
                if (o)
                    for (var i = 0; i < o.length; i++) this.setProgram(o[i], e);
            }, t.prototype.update = function() {
                if (this.time += .02, this.program)
                    if (this.program.use(), cc.sys.isNative) cc.GLProgramState.getOrCreateWithGLProgram(this.program).setUniformFloat("time", this.time);
                    else {
                        var e = this.program.getUniformLocationForName("time");
                        this.program.setUniformLocationWith1f(e, this.time);
                    }
            }, __decorate([a(cc.Node)], t.prototype, "bg", void 0), __decorate([a], t.prototype, "isAllChildrenUse", void 0),
            t = __decorate([n], t);
    }(cc.Component);
exports.default = s;