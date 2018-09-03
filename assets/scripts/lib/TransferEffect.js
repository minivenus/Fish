var transferFrag = require("./TransferFrag"),
    d = cc._decorator,
    n = d.ccclass,
    a = d.property,
    TransferEffect = function(__super) {
        function TransferEffect() {
            this.isAllChildrenUse = 0;
            var TransferEffect = null !== __super && __super.apply(this, arguments) || this;
            return TransferEffect.isAllChildrenUse = !1, TransferEffect.time = 0, TransferEffect;
        }
        return __extends(TransferEffect, __super), TransferEffect.prototype.start = function() {
            this.enabled = !1;
        }, TransferEffect.prototype.testShaderB = function() {
            if (this.program = new cc.GLProgram(), cc.sys.isNative ? this.program.initWithString(transferFrag.default.vert, transferFrag.default.frag) : (this.program.initWithVertexShaderByteArray(transferFrag.default.vert, transferFrag.default.frag),
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
        }, TransferEffect.prototype.setProgram = function(a, e) {
            if (cc.sys.isNative) {
                var t = cc.GLProgramState.getOrCreateWithGLProgram(e);
                a.setGLProgramState(t);
            } else a.setShaderProgram(e);
            var o = a.children;
            if (o)
                for (var r = 0; r < o.length; r++) this.setProgram(o[r], e);
        }, TransferEffect.prototype.update = function() {
            if (this.time += .02, console.log("渲染-------------", this.program), this.program)
                if (this.program.use(),
                    cc.sys.isNative) cc.GLProgramState.getOrCreateWithGLProgram(this.program).setUniformFloat("time", this.time);
                else {
                    var e = this.program.getUniformLocationForName("time");
                    this.program.setUniformLocationWith1f(e, this.time);
                }
        }, /*__decorate([a], t.prototype, "isAllChildrenUse", void 0),*/ TransferEffect = __decorate([n], TransferEffect);
    }(cc.Component);
exports.default = TransferEffect;