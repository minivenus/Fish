var o = function() {
    function t() {}
    return t.vert = "\n    attribute vec4 a_position;\n    attribute vec2 a_texCoord;\n    attribute vec4 a_color;\n    varying vec2 v_texCoord; \n    varying vec4 v_fragmentColor; \n    void main() \n    { \n        gl_Position = CC_PMatrix * a_position;\n        v_fragmentColor = a_color; \n        v_texCoord = a_texCoord; \n    }\n    ",
        t.frag = "\n    #ifdef GL_ES\n    precision lowp float;\n    #endif\n    \n    uniform float time;\n\n    varying vec4 v_fragmentColor;\n    varying vec2 v_texCoord;\n    void main()\n    {\n        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n        gl_FragColor = c;\n\n        float temp = v_texCoord.x - time;\n        if (temp <= 0.0) {\n            float temp2 = abs(temp);\n            if (temp2 <= 0.2) {\n                gl_FragColor.w = 1.0 - temp2/0.2;\n            } else {\n                gl_FragColor.w = 0.0;\n            }\n        } else {\n            gl_FragColor.w = 1.0;\n        }\n    }\n    ",
        t;
}();
exports.default = o;