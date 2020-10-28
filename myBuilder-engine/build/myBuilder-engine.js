"use strict";
/**
 * 静态工具类
 */
class Utils {
    /** 弧度制转角度制 */
    static toDegrees(angRad) {
        return 180 * angRad / Math.PI;
    }
    /** 角度制转弧度制 */
    static toRadians(angDeg) {
        return angDeg * Math.PI / 180;
    }
    /** 返回一个区间内的随机小数 */
    static randRange(min, max) {
        if (min > max)
            return Math.random() * (min - max) + max;
        return Math.random() * (max - min) + min;
    }
    /** 返回一个区间内的随机整数 */
    static randRangeInt(min, max) {
        if (min > max)
            return Math.floor(Math.random() * (min - max + 1) + max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /** 循环拼接一个相同字符串 */
    static loopStr(str, num) {
        let s = "";
        for (let i = 0; i < num; i++)
            s += str;
        return s;
    }
}
/**
 * 颜色类
 */
class Color {
    /**
     * 创建一个Color对象,参数为 Color 对象或者 number (r?,g?,b?,a?) 或者不填
     * @param arg Color 或者 number (r?,g?,b?,a?) 或者不填
     */
    constructor(...arg) {
        /** 红色通道值 */
        this._$r = 0;
        /** 绿色通道值 */
        this._$g = 0;
        /** 蓝色通道值 */
        this._$b = 0;
        /** 透明通道值 */
        this._$a = 1;
        let temp = arg[0];
        if (temp !== undefined)
            if (temp instanceof Color) {
                this.r = temp._$r;
                this.g = temp._$g;
                this.b = temp._$b;
                this.a = temp._$a;
            }
            else {
                this.r = temp;
                // @ts-ignore
                this.g = arg[1] || 0;
                // @ts-ignore
                this.b = arg[2] || 0;
                // @ts-ignore
                this.a = arg[3] || 1;
            }
    }
    /** 获取红色通道值,范围:0-255 */
    get r() {
        return this._$r;
    }
    /** 设置红色通道值,范围:0-255 */
    set r(value) {
        this._$r = value < 0 ? 0 : value > 255 ? 255 : value;
    }
    /** 获取绿色通道值,范围:0-255 */
    get g() {
        return this._$g;
    }
    /** 设置绿色通道值,范围:0-255 */
    set g(value) {
        this._$g = value < 0 ? 0 : value > 255 ? 255 : value;
    }
    /** 获取蓝色通道值,范围:0-255 */
    get b() {
        return this._$b;
    }
    /** 设置蓝色通道值,范围:0-255 */
    set b(value) {
        this._$b = value < 0 ? 0 : value > 255 ? 255 : value;
    }
    /** 获取透明通道值,范围:0-1.0 */
    get a() {
        return this._$a;
    }
    /** 设置透明通道值,范围:0-1.0 */
    set a(value) {
        this._$a = value < 0 ? 0 : value > 1 ? 1 : value;
    }
    /** 颜色相加 */
    add(color) {
        return new Color(this._$r + color._$r, this._$g + color._$g, this._$b + color._$b, this._$a + color._$a);
    }
    /** 颜色相减 */
    reduce(color) {
        return new Color(this._$r - color._$r, this._$g - color._$g, this._$b - color._$b, this._$a - color._$a);
    }
    /** 颜色相乘 */
    multiply(color) {
        if (color instanceof Color)
            return new Color(this._$r * color._$r, this._$g * color._$g, this._$b * color._$b, this._$a * color._$a);
        return new Color(this._$r * color, this._$g * color, this._$b * color, this._$a * color);
    }
    /** 颜色相除 */
    divide(color) {
        if (color instanceof Color)
            return new Color(this._$r / color._$r, this._$g / color._$g, this._$b / color._$b, this._$a / color._$a);
        return new Color(this._$r / color, this._$g / color, this._$b / color, this._$a / color);
    }
    /** 混合两种颜色 */
    blend(color) {
        let num = 1 - color._$a;
        let temp = new Color();
        temp._$a = this._$a * num + color._$a;
        if (temp._$a === 0)
            return temp;
        temp.r = (this._$r * this._$a * num + color._$r * color._$a) / temp._$a;
        temp.g = (this._$g * this._$a * num + color._$g * color._$a) / temp._$a;
        temp.b = (this._$b * this._$a * num + color._$b * color._$a) / temp._$a;
        return temp;
    }
    /** 根据amount (0-1)获取更暗的颜色 */
    darkened(amount) {
        return new Color(this._$r * (1 - amount), this._$g * (1 - amount), this._$b * (1 - amount), this._$a);
    }
    /** 根据amount (0-1)获取更亮的颜色 */
    brighter(amount) {
        let maxNum = this._$r > this._$g ? (this._$r > this._$b ? this._$r : this._$b) : (this._$g > this._$b ? this._$g : this._$b);
        let temp = maxNum / 255;
        return new Color(this._$r + (this._$r / temp) * ((1 - temp) * amount), this._$g + (this._$g / temp) * ((1 - temp) * amount), this._$b + (this._$b / temp) * ((1 - temp) * amount), this._$a);
    }
    /** 获取两个颜色的中间色 */
    middle(color) {
        return new Color((this._$r + color._$r) / 2, (this._$g + color._$g) / 2, (this._$b + color._$b) / 2, (this._$a + color._$a) / 2);
    }
    /** 获取两个颜色间的过渡颜色,amount (0-1)为过渡的量 */
    transition(color, amount) {
        return new Color(this._$r + (color._$r - this._$r) * amount, this._$g + (color._$g - this._$g) * amount, this._$b + (color._$b - this._$b) * amount, this._$a + (color._$a - this._$a) * amount);
    }
    /** 获取当前颜色的灰暗度值 */
    gray() {
        return (this._$r + this._$g + this._$b) / 3 / 255;
    }
    /** 获取该颜色的反色 */
    inverted() {
        return new Color(255 - this._$r, 255 - this._$g, 255 - this._$b, this._$a);
    }
    /** 获取该颜色向#ffffff颜色过渡,参数amount (0-1)为过渡的量 */
    lightened(amount) {
        return new Color(this._$r + (255 - this._$r) * amount, this._$g + (255 - this._$g) * amount, this._$b + (255 - this._$b) * amount, this._$a);
    }
    /** 线性插入颜色,delta值为:0-1 */
    linearInterpolate(color, delta) {
        return new Color(this._$r + delta * (color._$r - this._$r), this._$g + delta * (color._$g - this._$g), this._$b + delta * (color._$b - this._$b), this._$a + delta * (color._$a - this._$a));
    }
    /** 转换为十进制颜色,可能会丢失精度 */
    toDecimalism() {
        return ((this._$a * 255) >> 0) * 256 * 256 * 256 + this._$r * 256 * 256 + this._$g * 256 + this._$b;
    }
    /** 转换为十六进制字符串,可能会丢失精度 */
    toHexadecimal() {
        return "#" +
            (this._$r <= 16 ? "0" + this._$r.toString(16) : this._$r.toString(16)) +
            (this._$g <= 16 ? "0" + this._$g.toString(16) : this._$g.toString(16)) +
            (this._$b <= 16 ? "0" + this._$b.toString(16) : this._$b.toString(16)) +
            (this._$a === 1 ? "" : (this._$a * 255 >> 0 <= 16 ? "0" + (this._$a * 255 >> 0).toString(16) : (this._$a * 255 >> 0).toString(16)));
    }
    /** 转换为'rgba(r,g,b,a)'字符串 */
    toRgba() {
        return this._$a === 1 && "rgb(" + this._$r + "," + this._$g + "," + this._$b + ")" ||
            "rgba(" + this._$r + "," + this._$g + "," + this._$b + "," + this._$a + ")";
    }
    /** 转换为字符串 */
    toString() {
        return "color : {r : " + this._$r + ", g : " + this._$g + ", b : " + this._$b + ", a : " + this._$a + "}";
    }
    //***********************静态方法*****************************
    /** 从十六进制字符串获取颜色对象,可能会丢失精度 */
    static fromHexadecimal(numStr) {
        if (numStr[0] === '#')
            numStr = numStr.substring(1);
        switch (numStr.length) {
            case 3: //#fff  rgb
                return new Color(parseInt(numStr[0] + numStr[0], 16), parseInt(numStr[1] + numStr[1], 16), parseInt(numStr[2] + numStr[2], 16));
            case 6: //#ffffff   rgb
                return new Color(parseInt(numStr.substring(0, 2), 16), parseInt(numStr.substring(2, 4), 16), parseInt(numStr.substring(4), 16));
            case 8: //#ffffffff     rgba
                return new Color(parseInt(numStr.substring(0, 2), 16), parseInt(numStr.substring(2, 4), 16), parseInt(numStr.substring(4, 6), 16), parseInt(numStr.substring(6), 16) / 255);
            default:
                throw new Error("颜色格式不正确!");
        }
    }
    /** 从十进制数字获取颜色对象,可能会丢失精度 */
    static fromDecimalism(num) {
        return new Color(num >> 16 & 0xff, num >> 8 & 0xff, num & 0xff, (num >> 24 & 0xff) / 255);
    }
    /** 从rgba(r,g,b,a)格式字符串获取颜色对象 */
    static fromRgba(rgbaStr) {
        let startIndex = -1;
        let list;
        if ((startIndex = rgbaStr.indexOf('(')) !== -1) {
            rgbaStr = rgbaStr.substring(startIndex + 1);
            rgbaStr.substring(0, rgbaStr.length - 1);
        }
        list = rgbaStr.split(',');
        // @ts-ignore
        return new Color(list[0] !== undefined && parseInt(list[0]), list[1] !== undefined && parseInt(list[1]), list[2] !== undefined && parseInt(list[2]), list[3] !== undefined && parseFloat(list[3]));
    }
    //*****************提供的基本颜色*************************
    /** <p color='#000000'>黑色</p><br>十六进制 : #000000<br>RGB : (0,0,0) */
    static get black() {
        return new Color(0, 0, 0);
    }
    /** <p color='#666666'>象牙黑</p><br>十六进制 : #666666<br>RGB : (88,87,86) */
    static get ivoryBlack() {
        return new Color(88, 87, 86);
    }
    /** <p color='#808A87'>冷灰</p><br>十六进制 : #808A87<br>RGB : (128,138,135) */
    static get coolGray() {
        return new Color(128, 138, 135);
    }
    /** <p color='#808069'>暖灰</p><br>十六进制 : #808069<br>RGB : (128,118,105) */
    static get warmGray() {
        return new Color(128, 118, 105);
    }
    /** <p color='#E6E6E6'>石板灰</p><br>十六进制 : #E6E6E6<br>RGB : (118,128,105) */
    static get slateGrey() {
        return new Color(118, 128, 105);
    }
    /** <p color='#F5F5F5'>白烟灰</p><br>十六进制 : #F5F5F5<br>RGB : (245,245,245) */
    static get whiteSmokeGray() {
        return new Color(245, 245, 245);
    }
    /** <p color='#FCE6C9'>蛋壳灰</p><br>十六进制 : #FCE6C9<br>RGB : (252,230,202) */
    static get eggshellGrey() {
        return new Color(252, 230, 202);
    }
    /** <p color='#FF0000'>红色</p><br>十六进制 : #FF0000<br>RGB : (255,0,0) */
    static get red() {
        return new Color(255, 0, 0);
    }
    /** <p color='#E3170D'>镉红</p><br>十六进制 : #E3170D<br>RGB : (227,23,13) */
    static get cadmiumRed() {
        return new Color(227, 23, 13);
    }
    /** <p color='#9C661F'>棕红</p><br>十六进制 : #9C661F<br>RGB : (156,102,31) */
    static get brownishRed() {
        return new Color(156, 102, 31);
    }
    /** <p color='#FF7F50'>珊瑚红</p><br>十六进制 : #FF7F50<br>RGB : (255,127,80) */
    static get coralRed() {
        return new Color(255, 127, 80);
    }
    /** <p color='#FF6347'>番茄红</p><br>十六进制 : #FF6347<br>RGB : (255,99,71) */
    static get tomatoRed() {
        return new Color(255, 99, 71);
    }
    /** <p color='#FFC0CB'>粉红</p><br>十六进制 : #FFC0CB<br>RGB : (255,192,203) */
    static get pink() {
        return new Color(255, 192, 203);
    }
    /** <p color='#B0171F'>印度红</p><br>十六进制 : #B0171F<br>RGB : (176,23,31) */
    static get indianRed() {
        return new Color(176, 23, 31);
    }
    /** <p color='#FF00FF'>紫色</p><br>十六进制 : #FF00FF<br>RGB : (255,0,255) */
    static get purplish() {
        return new Color(255, 0, 255);
    }
    /** <p color='#990033'>黑红</p><br>十六进制 : #990033<br>RGB : (116,0,0) */
    static get blackRed() {
        return new Color(116, 0, 0);
    }
    /** <p color='#00FF00'>绿色</p><br>十六进制 : #00FF00<br>RGB : (0,255,0) */
    static get green() {
        return new Color(0, 255, 0);
    }
    /** <p color='#00FFFF'>青色</p><br>十六进制 : #00FFFF<br>RGB : (0,255,255) */
    static get cyan() {
        return new Color(0, 255, 255);
    }
    /** <p color='#7FFF00'>黄绿</p><br>十六进制 : #7FFF00<br>RGB : (127,255,0) */
    static get yellowGreen() {
        return new Color(127, 255, 0);
    }
    /** <p color='#40E0D0'>蓝绿</p><br>十六进制 : #40E0D0<br>RGB : (64,224,205) */
    static get turquoise() {
        return new Color(64, 224, 205);
    }
    /** <p color='#082E54'>靛蓝</p><br>十六进制 : #082E54<br>RGB : (8,46,84) */
    static get indigo() {
        return new Color(8, 46, 84);
    }
    /** <p color='#228B22'>森林绿</p><br>十六进制 : #228B22<br>RGB : (34,139,34) */
    static get forestGreen() {
        return new Color(34, 139, 34);
    }
    /** <p color='#6B8E23'>草绿</p><br>十六进制 : #6B8E23<br>RGB : (107,142,35) */
    static get grassGreen() {
        return new Color(107, 142, 35);
    }
    /** <p color='#0000FF'>蓝色</p><br>十六进制 : #0000FF<br>RGB : (0,0,255) */
    static get blue() {
        return new Color(0, 0, 255);
    }
    /** <p color='#03A89E'>锰蓝</p><br>十六进制 : #03A89E<br>RGB : (3,168,158) */
    static get manganeseBlue() {
        return new Color(3, 168, 158);
    }
    /** <p color='#191970'>深蓝</p><br>十六进制 : #191970<br>RGB : (25,25,112) */
    static get darkBlue() {
        return new Color(25, 25, 112);
    }
    /** <p color='#00C78C'>土耳其蓝</p><br>十六进制 : #191970<br>RGB : (0,199,140) */
    static get turkeyBlue() {
        return new Color(0, 199, 140);
    }
    /** <p color='#FFFFFF'>白色</p><br>十六进制 : #FFFFFF<br>RGB : (255,255,255) */
    static get white() {
        return new Color(255, 255, 255);
    }
    /** <p color='#F0FFFF'>天蓝灰</p><br>十六进制 : #F0FFFF<br>RGB : (202,235,216) */
    static get skyB1ueGrey() {
        return new Color(202, 235, 216);
    }
    /** <p color='#CCCCCC'>灰色</p><br>十六进制 : #CCCCCC<br>RGB : (192,192,192) */
    static get gray() {
        return new Color(192, 192, 192);
    }
    /** <p color='#FAFFF0'>象牙灰</p><br>十六进制 : #FAFFF0<br>RGB : (251,255,242) */
    static get ivoryGray() {
        return new Color(251, 255, 242);
    }
    /** <p color='#FAF0E6'>亚麻灰</p><br>十六进制 : #FAF0E6<br>RGB : (250,240,230) */
    static get gridelin() {
        return new Color(250, 240, 230);
    }
    /** <p color='#FFFFCD'>杏仁灰</p><br>十六进制 : #FFFFCD<br>RGB : (255,235,205) */
    static get almondGray() {
        return new Color(255, 235, 205);
    }
    /** <p color='#FFF5EE'>贝壳灰</p><br>十六进制 : #FFF5EE<br>RGB : (255,245,238) */
    static get greyShells() {
        return new Color(255, 245, 238);
    }
    /** <p color='#FFFF00'>黄色</p><br>十六进制 : #FFFF00<br>RGB : (255,255,0) */
    static get yellow() {
        return new Color(255, 255, 0);
    }
    /** <p color='#FF9912'>镉黄</p><br>十六进制 : #FF9912<br>RGB : (255,153,18) */
    static get cadmiumYellow() {
        return new Color(255, 153, 18);
    }
    /** <p color='#E3CF57'>香蕉黄</p><br>十六进制 : #E3CF57<br>RGB : (227,207,87) */
    static get bananaYellow() {
        return new Color(227, 207, 87);
    }
    /** <p color='#FF7D40'>肉黄</p><br>十六进制 : #FF7D40<br>RGB : (255,125,64) */
    static get meatYellow() {
        return new Color(255, 125, 64);
    }
    /** <p color='#ED9121'>萝卜黄</p><br>十六进制 : #ED9121<br>RGB : (237,145,33) */
    static get radishYellow() {
        return new Color(237, 145, 33);
    }
    /** <p color='#8B864E'>黑黄</p><br>十六进制 : #8B864E<br>RGB : (85,102,0) */
    static get blackYellow() {
        return new Color(85, 102, 0);
    }
    /** <p color='#C76114'>土色</p><br>十六进制 : #C76114<br>RGB : (199,97,20) */
    static get soil() {
        return new Color(199, 97, 20);
    }
    /** <p color='#F4A460'>沙棕色</p><br>十六进制 : #F4A460<br>RGB : (244,164,95) */
    static get sandyBrown() {
        return new Color(244, 164, 95);
    }
    /** <p color='#D2B48C'>棕褐色</p><br>十六进制 : #D2B48C<br>RGB : (210,180,140) */
    static get sepia() {
        return new Color(210, 180, 140);
    }
    /** <p color='#BC8F8F'>赫色</p><br>十六进制 : #BC8F8F<br>RGB : (188,143,143) */
    static get ocher() {
        return new Color(188, 143, 143);
    }
    /** <p color='#DA70D6'>淡紫色</p><br>十六进制 : #DA70D6<br>RGB : (218,112,214) */
    static get lavender() {
        return new Color(218, 112, 214);
    }
    /** <p color='#8A2BE2'>紫罗兰</p><br>十六进制 : #8A2BE2<br>RGB : (138,43,226) */
    static get violet() {
        return new Color(138, 43, 226);
    }
    /** <p color='#9933FA'>胡紫色</p><br>十六进制 : #9933FA<br>RGB : (153,51,250) */
    static get huPurple() {
        return new Color(153, 51, 250);
    }
}
/**
 * 掩码类
 */
class Mask {
    constructor(maskNum = 0) {
        /** 掩码的十进制值 */
        this._$maskNum = 0;
        this._$maskNum = maskNum;
    }
    /** 获取掩码的十进制值 */
    get maskNum() {
        return this._$maskNum;
    }
    /** 设置掩码的十进制值 */
    set maskNum(value) {
        this._$maskNum = value;
    }
    /** 设置掩码 */
    setMask(list) {
        this._$maskNum = 0;
        for (let i = 0; i < list.length; i++)
            this._$maskNum += list[i] << i;
    }
    /** 获取掩码下标值组 */
    getMask() {
        let index = 0, list = [], num = this._$maskNum;
        while (num > 0) {
            num & 1 && list.push(index);
            num >>= 1;
            index++;
        }
        return list;
    }
}
/**
 * 点对象
 * 相比于Vector对象更加轻量级,没有过多的函数
 */
class Point {
    /**
     * 创建一个Point对象,参数为 Point 或 Vector 或 number 或 不填
     * @param arg Point 或 Vector 或 number 或 不填
     */
    constructor(...arg) {
        /** 点的x坐标 */
        this.x = 0;
        /** 点的y坐标 */
        this.y = 0;
        let temp = arg[0];
        if (temp !== undefined)
            if (temp instanceof Point || temp instanceof Vector) {
                this.x = temp.x;
                this.y = temp.y;
            }
            else {
                this.x = temp;
                // @ts-ignore
                this.y = (temp = arg[1]) !== undefined ? temp : this.x;
            }
    }
    /** 比较两个点的值是否相等 */
    equals(point) {
        return point !== undefined && this.x === point.x && this.y === point.y;
    }
    /** 转换为字符串 */
    toString() {
        return "point : {x : " + this.x + ", y : " + this.y + "}";
    }
}
/**
 * 二维向量
 */
class Vector {
    /**
     * 创建一个Vector对象,参数为 Vector 或 Point 或 number 或 不填
     * @param arg Vector 或 Point 或 number 或 不填
     */
    constructor(...arg) {
        /** x坐标 */
        this.x = 0;
        /** y坐标 */
        this.y = 0;
        let temp = arg[0];
        if (temp !== undefined)
            if (temp instanceof Vector || temp instanceof Point) {
                this.x = temp.x;
                this.y = temp.y;
            }
            else {
                this.x = temp;
                // @ts-ignore
                this.y = (temp = arg[1]) !== undefined ? temp : this.x;
            }
    }
    /** 向量值为(0,0) */
    static get zero() {
        return new Vector(0, 0);
    }
    /** 向量值为(1,0) */
    static get right() {
        return new Vector(1, 0);
    }
    /** 向量值为(-1,0) */
    static get left() {
        return new Vector(-1, 0);
    }
    /** 向量值为(0,-1) */
    static get up() {
        return new Vector(0, -1);
    }
    /** 向量值为(0,1) */
    static get down() {
        return new Vector(0, 1);
    }
    /** 向量值为(1,1) */
    static get one() {
        return new Vector(1, 1);
    }
    /** 向量值为(-1,-1) */
    static get negOne() {
        return new Vector(-1, -1);
    }
    /** 获取向量长度 */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /** 获取向量角度(弧度制),返回向量相对于X轴的弧度角,即(1,0)向量 */
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    /** 向量相加 */
    add(vector) {
        if (vector instanceof Vector)
            return new Vector(this.x + vector.x, this.y + vector.y);
        return new Vector(this.x + vector, this.y + vector);
    }
    /** 向量相减 */
    reduce(vector) {
        if (vector instanceof Vector)
            return new Vector(this.x - vector.x, this.y - vector.y);
        return new Vector(this.x - vector, this.y - vector);
    }
    /** 向量相乘 */
    multiply(vector) {
        if (vector instanceof Vector)
            return new Vector(this.x * vector.x, this.y * vector.y);
        return new Vector(this.x * vector, this.y * vector);
    }
    /** 向量相除 */
    divide(vector) {
        if (vector instanceof Vector)
            return new Vector(this.x / vector.x, this.y / vector.y);
        return new Vector(this.x / vector, this.y / vector);
    }
    /** 向量取模 */
    mod(vector) {
        if (vector instanceof Vector)
            return new Vector(this.x % vector.x, this.y % vector.y);
        return new Vector(this.x % vector, this.y % vector);
    }
    /** 向量整除 */
    div(vector) {
        if (vector instanceof Vector)
            return new Vector((this.x / vector.x) >> 0, (this.y / vector.y) >> 0);
        return new Vector((this.x / vector) >> 0, (this.y / vector) >> 0);
    }
    /** 返回与vector的点积 */
    dot(vector) {
        return this.x * vector.x + this.y + vector.y;
    }
    /** 返回与vector的叉积 */
    cross(vector) {
        return this.x * vector.x + this.y + vector.y;
    }
    /** 向量归一化,返回缩放到单位长度的向量,归一化的向量不能为(0,0) */
    normalization() {
        let vector = new Vector(this);
        let s = vector.x * vector.x + vector.y * vector.y;
        if (s === 0)
            vector.x = vector.y = 0;
        else {
            let num = Math.sqrt(s);
            vector.x /= num;
            vector.y /= num;
        }
        return vector;
    }
    /** 返回两个向量间的弧度角 */
    angleTo(vector) {
        return Math.atan2(this.cross(vector), this.dot(vector));
    }
    /** 返回连接两个点的线和X坐标之间的弧度角. */
    angleToPoint(vector) {
        return Math.atan2(this.y - vector.y, this.x - vector.x);
    }
    /** 根据角度旋转向量 */
    rotated(angle) {
        let s = this.angle + angle;
        return new Vector(Math.cos(s), Math.sin(s)).multiply(this.length);
    }
    /** 返回绝对值向量 */
    abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }
    /** 返回向量,其中所有分量都向下取整*/
    floor() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }
    /** 返回向量,其中所有分量都向上取整*/
    ceil() {
        return new Vector(Math.ceil(this.x), Math.ceil(this.y));
    }
    /** 返回向量,其中所有分量都四舍五入到最接近的整数 */
    round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }
    /** 返回向量,其中每个分量设置为一个或一个负数,具体取决于分量的符号 */
    sign() {
        return new Vector(this.x == 0 ? 0 : (this.x < 0 ? -1 : 1), this.y == 0 ? 0 : (this.y < 0 ? -1 : 1));
    }
    /** 返回到vector向量的距离 */
    distanceTo(vector) {
        return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
    }
    /** 返回一个角度相同,长度为length的向量 */
    clamped(length) {
        let vector = new Vector(this);
        let num = this.length;
        if (num > 0 && length < num)
            vector = vector.divide(num * length);
        return vector;
    }
    /** 将向量朝vector移动固定的delta数量 */
    moveToward(vector, delta) {
        let self = new Vector(this);
        let other = vector.reduce(self);
        let num = other.length;
        return num <= delta || num < 9.99999997475243E-07 ? vector : self.add(other.divide(num).multiply(delta));
    }
    /** 比较两个向量值是否相等 */
    equals(vector) {
        return vector !== undefined && this.x === vector.x && this.y === vector.y;
    }
    /** 转换为字符串 */
    toString() {
        return "vector : {x : " + this.x + ", y : " + this.y + "}";
    }
}
/**
 * 圆类
 */
class Circle {
    /**
     * 创建一个圆形,参数为 Circle 或 (Point,radius) 或 (Vector,radius) 或 number(x,y,r) 或 不填
     * @param arg Circle 或 (Point,radius) 或 (Vector,radius) 或 number(x,y,r) 或 不填
     */
    constructor(...arg) {
        /** 坐标点:x */
        this.x = 0;
        /** 坐标点:y */
        this.y = 0;
        /** 圆的半径 */
        this.r = 0;
        let temp = arg[0];
        if (temp !== undefined)
            if (temp instanceof Circle) {
                this.x = temp.x;
                this.y = temp.y;
                this.r = temp.r;
            }
            else if (temp instanceof Point || temp instanceof Vector) {
                this.x = temp.x;
                this.y = temp.y;
                // @ts-ignore
                this.r = (temp = arg[1]) !== undefined ? temp : 0;
            }
            else {
                this.x = temp;
                // @ts-ignore
                this.y = (temp = arg[1]) !== undefined ? temp : 0;
                // @ts-ignore
                this.r = (temp = arg[2]) !== undefined ? temp : 0;
            }
    }
    /** 比较两个圆形的值是否相等 */
    equals(circle) {
        return circle !== undefined && this.x === circle.x && this.y === circle.y && this.r === circle.r;
    }
    /** 转换为字符串 */
    toString() {
        return "point : {x : " + this.x + ", y : " + this.y + ", r : " + this.r + "}";
    }
}
/**
 * 矩形类
 */
class Rectangle {
    /**
     * 创建一个矩形,参数为 Rectangle 或 (Point1,Point2) 或 (Vector1,Vector2) 或 number(x,y,w,h) 或 不填
     * @param arg Rectangle 或 (Point1,Point2) 或 (Vector1,Vector2) 或 number(x,y,w,h) 或 不填
     */
    constructor(...arg) {
        /** 坐标点:x */
        this.x = 0;
        /** 坐标点:y */
        this.y = 0;
        /** 矩形宽度 */
        this.w = 0;
        /** 矩形高度 */
        this.h = 0;
        let temp = arg[0];
        if (temp !== undefined)
            if (temp instanceof Rectangle) {
                this.x = temp.x;
                this.y = temp.y;
                this.w = temp.w;
                this.h = temp.h;
            }
            else if (temp instanceof Point || temp instanceof Vector) {
                this.x = temp.x;
                this.y = temp.y;
                if ((temp = arg[1]) === undefined)
                    return;
                // @ts-ignore
                this.w = temp.x;
                // @ts-ignore
                this.h = temp.y;
            }
            else {
                this.x = temp;
                // @ts-ignore
                this.y = (temp = arg[1]) !== undefined ? temp : 0;
                // @ts-ignore
                this.w = (temp = arg[2]) !== undefined ? temp : 0;
                // @ts-ignore
                this.h = (temp = arg[3]) !== undefined ? temp : 0;
            }
    }
    /** 比较两个矩形的值是否相等 */
    equals(rectangle) {
        return rectangle !== undefined && this.x === rectangle.x && this.y === rectangle.y &&
            this.w === rectangle.w && this.h === rectangle.h;
    }
    /** 转换为字符串 */
    toString() {
        return "rectangle : {x : " + this.x + ", y : " + this.y + ", w : " + this.w + ", h : " + this.h + "}";
    }
}
/**
 * 鼠标按键映射值
 */
var buttonList;
(function (buttonList) {
    buttonList[buttonList["Left"] = 0] = "Left";
    buttonList[buttonList["Middle"] = 1] = "Middle";
    buttonList[buttonList["Right"] = 2] = "Right";
})(buttonList || (buttonList = {}));
/**
 * 鼠标指针样式
 */
var cursorStyle;
(function (cursorStyle) {
    /** 默认光标（通常是一个箭头） */
    cursorStyle["Default"] = "default";
    /** 默认浏览器设置的光标 */
    cursorStyle["Auto"] = "auto";
    /** 光标呈现为十字线 */
    cursorStyle["Crosshair"] = "crosshair";
    /** 光标呈现为指示链接的指针（一只手） */
    cursorStyle["Pointer"] = "pointer";
    /** 此光标指示某对象可被移动 */
    cursorStyle["Move"] = "move";
    /** 此光标指示矩形框的边缘可被向右（东）移动 */
    cursorStyle["E_resize"] = "e-resize";
    /** 此光标指示矩形框的边缘可被向上及向右移动（北/东） */
    cursorStyle["Ne_resize"] = "ne-resize";
    /** 此光标指示矩形框的边缘可被向上及向左移动（北/西） */
    cursorStyle["Nw_resize"] = "nw-resize";
    /** 此光标指示矩形框的边缘可被向上（北）移动 */
    cursorStyle["N_resize"] = "n-resize";
    /** 此光标指示矩形框的边缘可被向下及向右移动（南/东） */
    cursorStyle["Se_resize"] = "se-resize";
    /** 此光标指示矩形框的边缘可被向下及向左移动（南/西） */
    cursorStyle["Sw_resize"] = "sw-resize";
    /** 此光标指示矩形框的边缘可被向下移动（北/西） */
    cursorStyle["S_resize"] = "s-resize";
    /** 此光标指示矩形框的边缘可被向左移动（西） */
    cursorStyle["W_resize"] = "w-resize";
    /** 此光标指示文本 */
    cursorStyle["Text"] = "text";
    /** 此光标指示程序正忙（通常是一只表或沙漏） */
    cursorStyle["Wait"] = "wait";
    /** 此光标指示可用的帮助（通常是一个问号） */
    cursorStyle["Help"] = "help";
})(cursorStyle || (cursorStyle = {}));
/**
 * 输入类
 */
class Input {
    /** 每帧更新方法,由系统调用 */
    _$beforeUpdate() {
        Input._$keyDown = [...Input._$keyDownTemp];
        Input._$keyAction = [...Input._$keyActionTemp];
        Input._$keyUp = [...Input._$keyUpTemp];
        Input._$mousePos = new Vector(Input._$mousePosTemp);
        Input._$mouseGlobalPos = new Vector(Input._$mouseGlobalPosTemp);
        Input._$buttonDown = [...Input._$buttonDownTemp];
        Input._$buttonAction = [...Input._$buttonActionTemp];
        Input._$buttonUp = [...Input._$buttonUpTemp];
        Input._$mouseWheel = Input._$mouseWheelTemp;
    }
    /** 每帧更新方法,由系统调用 */
    _$afterUpdate() {
        Input._$keyDownTemp = [];
        Input._$keyUpTemp = [];
        Input._$buttonDownTemp = [];
        Input._$buttonUpTemp = [];
        Input._$mouseWheelTemp = 0;
    }
    /** 监听鼠标的位置,并设置值,系统调用 */
    static _$setMousePos(x, y) {
        Input._$mousePosTemp.x = x;
        Input._$mousePosTemp.y = y;
    }
    /** 监听鼠标在页面的位置,并设置值,系统调用 */
    static _$setMouseGlobalPos(x, y) {
        Input._$mouseGlobalPosTemp.x = x;
        Input._$mouseGlobalPosTemp.y = y;
    }
    /** 监听鼠标滚轮状态,并设置值,系统调用 */
    static _$setMouseWheel(type) {
        Input._$mouseWheelTemp = type;
    }
    /** 激活键盘上的某个按键,下一帧生效 */
    static keyDown(keyCode) {
        if (!Input._$keyActionTemp[keyCode]) {
            Input._$keyActionTemp[keyCode] = true;
            Input._$keyDownTemp[keyCode] = true;
        }
    }
    /** 取消激活键盘上的某个按键,下一帧生效 */
    static keyUp(keyCode) {
        Input._$keyActionTemp[keyCode] = false;
        //Input._$keyDownTemp[keyCode] = undefined;
        Input._$keyUpTemp[keyCode] = true;
    }
    /** 激活键鼠标的某个按键,下一帧生效 */
    static buttonDown(button) {
        if (!Input._$buttonActionTemp[button]) {
            Input._$buttonActionTemp[button] = true;
            Input._$buttonDownTemp[button] = true;
        }
    }
    /** 取消激活鼠标上的某个按键,下一帧生效 */
    static buttonUp(button) {
        Input._$buttonActionTemp[button] = false;
        //Input._$buttonDownTemp[button] = undefined;
        Input._$buttonUpTemp[button] = true;
    }
    /** 清除按键状态,立即生效 */
    static clearKey() {
        Input._$keyAction = [];
        Input._$keyDown = [];
        Input._$keyUp = [];
        Input._$buttonAction = [];
        Input._$buttonDown = [];
        Input._$buttonUp = [];
    }
    /** 当定的按键被用户按住时返回1*/
    static getKey(...key) {
        if (key) {
            for (let i = 0; i < key.length; i++)
                if (!Input._$keyAction[key[i]])
                    return 0;
            return 1;
        }
        return 0;
    }
    /** 当指定的按键被用户按下的那一帧返回1 */
    static getKeyDown(...key) {
        if (key) {
            for (let i = 0; i < key.length; i++)
                if (!Input._$keyDown[key[i]])
                    return 0;
            return 1;
        }
        return 0;
    }
    /** 当指定的按键被用户松开的那一帧返回1 */
    static getKeyUp(...key) {
        if (key) {
            for (let i = 0; i < key.length; i++)
                if (!Input._$keyUp[key[i]])
                    return 0;
            return 1;
        }
        return 0;
    }
    /** 获取鼠标坐标 */
    static getMousePosition() {
        return Input._$mousePos;
    }
    /** 获取鼠标全局坐标,也就是鼠标在页面的坐标 */
    static getMouseGlobalPosition() {
        return Input._$mouseGlobalPos;
    }
    /** 当指定的鼠标按键被用户按住时返回1 */
    static getButton(...button) {
        if (button) {
            for (let i = 0; i < button.length; i++)
                if (!Input._$buttonAction[button[i]])
                    return 0;
            return 1;
        }
        return 0;
    }
    /** 当指定的鼠标按键被用户按下的那一帧返回1 */
    static getButtonDown(...button) {
        if (button) {
            for (let i = 0; i < button.length; i++)
                if (!Input._$buttonDown[button[i]])
                    return 0;
            return 1;
        }
        return 0;
    }
    /** 当指定的鼠标按键被用户松开的那一帧返回1 */
    static getButtonUp(...button) {
        if (button) {
            for (let i = 0; i < button.length; i++)
                if (!Input._$buttonUp[button[i]])
                    return 0;
            return 1;
        }
        return 0;
    }
    /** 获取鼠标滚轮状态,1向上滚动,-1向下滚动,0未滚动 */
    static getMouseWheel() {
        return Input._$mouseWheel;
    }
    /** 获取鼠标指针样式 */
    static get cursorStyle() {
        return Input._$cursorStyle;
    }
    /** 设置鼠标指针样式 */
    static set cursorStyle(style) {
        Input._$cursorStyle = style;
        World.divNode.style.cursor = style;
    }
    /** 获取鼠标指针点击时样式 */
    static get cursorCheckStyle() {
        return Input._$cursorCheckStyle;
    }
    /** 设置鼠标指针点击时样式 */
    static set cursorCheckStyle(style) {
        Input._$cursorCheckStyle = style;
    }
    /** 设置鼠标指针图片 */
    static setCursorImage(url, xOffset = 0, yOffset = 0) {
        Input._$cursorStyle = "url(" + url + ") " + xOffset + " " + yOffset + ",auto";
        World.divNode.style.cursor = Input._$cursorStyle;
    }
    /** 设置鼠标指针点击时图片 */
    static setCursorCheckImage(url, xOffset = 0, yOffset = 0) {
        Input._$cursorCheckStyle = "url(" + url + ") " + xOffset + " " + yOffset + ",auto";
    }
}
/** 一直在按下的key,临时储存 */
Input._$keyActionTemp = [];
/** 第一次按下的key,临时储存 */
Input._$keyDownTemp = [];
/** 松开的key,临时储存 */
Input._$keyUpTemp = [];
/** 鼠标的位置,临时储存 */
Input._$mousePosTemp = Vector.zero;
/** 鼠标的全局位置,临时储存 */
Input._$mouseGlobalPosTemp = Vector.zero;
/** 一直在按下的mouseButton,临时储存 */
Input._$buttonActionTemp = [];
/** 第一次按下的mouseButton,临时储存 */
Input._$buttonDownTemp = [];
/** 松开的mouseButton,临时储存 */
Input._$buttonUpTemp = [];
/** 鼠标滚轮的滚动,临时储存 */
Input._$mouseWheelTemp = 0;
/** 一直在按下的key */
Input._$keyAction = [];
/** 第一次按下的key */
Input._$keyDown = [];
/** 松开的key */
Input._$keyUp = [];
/** 鼠标的位置 */
Input._$mousePos = Vector.zero;
/** 鼠标的全局位置 */
Input._$mouseGlobalPos = Vector.zero;
/** 一直在按下的mouseButton */
Input._$buttonAction = [];
/** 第一次按下的mouseButton */
Input._$buttonDown = [];
/** 松开的mouseButton */
Input._$buttonUp = [];
/** 鼠标滚轮的滚动 */
Input._$mouseWheel = 0;
/** 鼠标指针样式 */
Input._$cursorStyle = "default";
/** 鼠标指针点击时样式 */
Input._$cursorCheckStyle = "default";
/**
 * 键盘映射值
 */
var keyList;
(function (keyList) {
    keyList[keyList["BackSpace"] = 8] = "BackSpace";
    keyList[keyList["Tab"] = 9] = "Tab";
    keyList[keyList["Clear"] = 12] = "Clear";
    keyList[keyList["Enter"] = 13] = "Enter";
    keyList[keyList["Shift"] = 16] = "Shift";
    keyList[keyList["Control"] = 17] = "Control";
    keyList[keyList["Alt"] = 18] = "Alt";
    keyList[keyList["Pause"] = 19] = "Pause";
    keyList[keyList["Caps_Lock"] = 20] = "Caps_Lock";
    keyList[keyList["Escape"] = 27] = "Escape";
    keyList[keyList["space"] = 33] = "space";
    keyList[keyList["Prior"] = 32] = "Prior";
    keyList[keyList["Next"] = 34] = "Next";
    keyList[keyList["End"] = 35] = "End";
    keyList[keyList["Home"] = 36] = "Home";
    keyList[keyList["Left"] = 37] = "Left";
    keyList[keyList["Up"] = 38] = "Up";
    keyList[keyList["Right"] = 39] = "Right";
    keyList[keyList["Down"] = 40] = "Down";
    keyList[keyList["Select"] = 41] = "Select";
    keyList[keyList["Print"] = 42] = "Print";
    keyList[keyList["Execute"] = 43] = "Execute";
    keyList[keyList["Insert"] = 45] = "Insert";
    keyList[keyList["Delete"] = 46] = "Delete";
    keyList[keyList["Help"] = 47] = "Help";
    keyList[keyList["Num_0"] = 48] = "Num_0";
    keyList[keyList["Num_1"] = 49] = "Num_1";
    keyList[keyList["Num_2"] = 50] = "Num_2";
    keyList[keyList["Num_3"] = 51] = "Num_3";
    keyList[keyList["Num_4"] = 52] = "Num_4";
    keyList[keyList["Num_5"] = 53] = "Num_5";
    keyList[keyList["Num_6"] = 54] = "Num_6";
    keyList[keyList["Num_7"] = 55] = "Num_7";
    keyList[keyList["Num_8"] = 56] = "Num_8";
    keyList[keyList["Num_9"] = 57] = "Num_9";
    keyList[keyList["A"] = 65] = "A";
    keyList[keyList["B"] = 66] = "B";
    keyList[keyList["C"] = 67] = "C";
    keyList[keyList["D"] = 68] = "D";
    keyList[keyList["E"] = 69] = "E";
    keyList[keyList["F"] = 70] = "F";
    keyList[keyList["G"] = 71] = "G";
    keyList[keyList["H"] = 72] = "H";
    keyList[keyList["I"] = 73] = "I";
    keyList[keyList["J"] = 74] = "J";
    keyList[keyList["K"] = 75] = "K";
    keyList[keyList["L"] = 76] = "L";
    keyList[keyList["M"] = 77] = "M";
    keyList[keyList["N"] = 78] = "N";
    keyList[keyList["O"] = 79] = "O";
    keyList[keyList["P"] = 80] = "P";
    keyList[keyList["Q"] = 81] = "Q";
    keyList[keyList["R"] = 82] = "R";
    keyList[keyList["S"] = 83] = "S";
    keyList[keyList["T"] = 84] = "T";
    keyList[keyList["U"] = 85] = "U";
    keyList[keyList["V"] = 86] = "V";
    keyList[keyList["W"] = 87] = "W";
    keyList[keyList["X"] = 88] = "X";
    keyList[keyList["Y"] = 89] = "Y";
    keyList[keyList["Z"] = 90] = "Z";
    keyList[keyList["KP_0"] = 96] = "KP_0";
    keyList[keyList["KP_1"] = 97] = "KP_1";
    keyList[keyList["KP_2"] = 98] = "KP_2";
    keyList[keyList["KP_3"] = 99] = "KP_3";
    keyList[keyList["KP_4"] = 100] = "KP_4";
    keyList[keyList["KP_5"] = 101] = "KP_5";
    keyList[keyList["KP_6"] = 102] = "KP_6";
    keyList[keyList["KP_7"] = 103] = "KP_7";
    keyList[keyList["KP_8"] = 104] = "KP_8";
    keyList[keyList["KP_9"] = 105] = "KP_9";
    keyList[keyList["KP_Multiply"] = 106] = "KP_Multiply";
    keyList[keyList["KP_Add"] = 107] = "KP_Add";
    keyList[keyList["KP_Separator"] = 108] = "KP_Separator";
    keyList[keyList["KP_Subtract"] = 109] = "KP_Subtract";
    keyList[keyList["KP_Decimal"] = 110] = "KP_Decimal";
    keyList[keyList["KP_Divide"] = 111] = "KP_Divide";
    keyList[keyList["F1"] = 112] = "F1";
    keyList[keyList["F2"] = 113] = "F2";
    keyList[keyList["F3"] = 114] = "F3";
    keyList[keyList["F4"] = 115] = "F4";
    keyList[keyList["F5"] = 116] = "F5";
    keyList[keyList["F6"] = 117] = "F6";
    keyList[keyList["F7"] = 118] = "F7";
    keyList[keyList["F8"] = 119] = "F8";
    keyList[keyList["F9"] = 120] = "F9";
    keyList[keyList["F10"] = 121] = "F10";
    keyList[keyList["F11"] = 122] = "F11";
    keyList[keyList["F12"] = 123] = "F12";
    keyList[keyList["F13"] = 124] = "F13";
    keyList[keyList["F14"] = 125] = "F14";
    keyList[keyList["F15"] = 126] = "F15";
    keyList[keyList["F16"] = 127] = "F16";
    keyList[keyList["F17"] = 128] = "F17";
    keyList[keyList["F18"] = 129] = "F18";
    keyList[keyList["F19"] = 130] = "F19";
    keyList[keyList["F20"] = 131] = "F20";
    keyList[keyList["F21"] = 132] = "F21";
    keyList[keyList["F22"] = 133] = "F22";
    keyList[keyList["F23"] = 134] = "F23";
    keyList[keyList["F24"] = 135] = "F24";
    keyList[keyList["Num_Lock"] = 136] = "Num_Lock";
    keyList[keyList["Scroll_Lock"] = 137] = "Scroll_Lock";
    keyList[keyList["Mode_switch"] = 254] = "Mode_switch";
})(keyList || (keyList = {}));
/**
 * 线程类
 */
class Thread {
    constructor(speed = 60) {
        /** 游戏每秒运行的帧数 */
        this._$speed = 60;
        /** 游戏上一帧运行所用的时间 */
        this._$delta = 0;
        /** 记录上一帧的时间戳 */
        this._$prevTime = 0;
        /** 游戏运行的fps */
        this._$fps = this._$speed;
        /** 游戏已运行的帧数 */
        this._$timeIndex = 0;
        /** 线程暂停毫秒数 */
        this._$sleepTime = 0;
        /** 上一帧逻辑代码帧运行运行时间 */
        this._$prevUseTime = 0;
        this.speed = speed;
        this._$delta = 1000 / this._$speed;
        this._$useTime();
    }
    /** 获取游戏上一帧运行所用的时间 */
    get delta() {
        return this._$delta;
    }
    /** 获取游戏每秒运行的帧数 */
    get speed() {
        return this._$speed;
    }
    /** 设置游戏每秒运行的帧数,默认60 */
    set speed(speed) {
        this._$speed = speed < 0 ? 0 : speed;
    }
    /** 获取游戏Fps */
    get fps() {
        return this._$fps;
    }
    /** 获取游戏已运行的帧数 */
    get timeIndex() {
        return this._$timeIndex;
    }
    /** 获取上一帧逻辑代码帧运行运行时间 */
    get prevUseTime() {
        return this._$prevUseTime;
    }
    /**
     * 开始执行线程,如果方法func返回false,线程结束
     * @param func 执行方法
     * @param useTime 上一帧方法执行时间,选填
     */
    run(func, useTime = 0) {
        //理想暂停时间
        let stm = 1000 / this._$speed;
        //实际暂停时间
        let stopTime = stm - (useTime ? useTime : 0);
        stopTime = (stopTime < 0 ? 0 : stopTime) + this._$sleepTime;
        this._$prevUseTime = useTime;
        this._$sleepTime = 0;
        setTimeout(() => {
            let time = Date.now();
            let time2 = this._$useTime();
            if (useTime < stm) {
                this._$delta = stm / 1000;
                this._$fps = 1000 / stm;
            }
            else {
                this._$delta = useTime / 1000;
                this._$fps = 1000 / useTime;
            }
            this._$timeIndex++;
            func(this._$delta) !== false && this.run(func, stopTime > 0 ? (Date.now() - time) : time2);
        }, stopTime);
    }
    /** 返回上一次调用与这一次调用的时间差 */
    _$useTime() {
        let timeTemp = 0;
        let timeNew = Date.now();
        timeTemp = timeNew - this._$prevTime;
        this._$prevTime = timeNew;
        return timeTemp;
    }
    /** 线程暂停毫秒 */
    sleep(timer) {
        this._$sleepTime = timer;
    }
}
/**
 * 画布类
 */
class Canvas {
    //**********************记得填坑:画布缩放
    //*********************************************************
    constructor(rectangle) {
        /** 画布z轴索引 */
        this._$zIndex = 1000;
        /** 启用图像平滑显示 */
        this._$imageSmoothing = true;
        /** 画布背景颜色 */
        this._$color = "#000";
        this._$rectangle = rectangle;
        this._$canvasElement = document.createElement("canvas");
        this._$canvasElement.innerHTML = "您的浏览器不支持canvas! 请更换浏览器!";
        this._$canvasElement.style.marginLeft = rectangle.x + "px";
        this._$canvasElement.style.marginTop = rectangle.y + "px";
        this._$canvasElement.width = rectangle.w;
        this._$canvasElement.height = rectangle.h;
        this._$canvasElement.style.position = "absolute";
        // @ts-ignore
        this._$brush = new Brush(this._$canvasElement.getContext("2d"));
    }
    /** 获得笔刷 */
    get brush() {
        return this._$brush;
    }
    /** 获取画布原dom对象 */
    get canvasElement() {
        return this._$canvasElement;
    }
    /** 获取z轴索引,不会小于0! */
    get zIndex() {
        if (this._$zIndex < 0)
            this._$zIndex = 0;
        return this._$zIndex;
    }
    /** 设置z轴索引,不能小于0! */
    set zIndex(value) {
        this._$zIndex = value >= 0 && value || 0;
        this._$canvasElement.style.zIndex = this._$zIndex.toString();
    }
    /** 清空画布 */
    clear(rectangle) {
        if (rectangle)
            this._$brush.context.clearRect(0, 0, rectangle.w, rectangle.h);
        else
            this._$brush.context.clearRect(0, 0, this._$rectangle.w, this._$rectangle.h);
    }
    /** 获取是否启用图像平滑显示 */
    get imageSmoothing() {
        return this._$imageSmoothing;
    }
    /** 设置是否启用图像平滑显示 */
    set imageSmoothing(value) {
        this._$imageSmoothing = value;
        this.brush.context.imageSmoothingEnabled = value;
    }
    /** 获取画布背景颜色 */
    get color() {
        return this._$color;
    }
    /** 设置画布背景颜色 */
    set color(value) {
        this._$color = value;
        this._$canvasElement.style.backgroundColor = value;
    }
}
/**
 * 游戏世界
 */
class World {
    constructor() {
    }
    /**
     * 初始化游戏世界,并创建游戏世界
     * @param divNode 要嵌入的标签对象
     * @param x x坐标
     * @param y y坐标
     * @param width 画布宽度
     * @param height 画布高度
     * @param zIndex 画布z轴索引,不能小于0
     */
    static Init(divNode, x, y, width, height, zIndex) {
        //如果调用过就不执行了
        if (World._$isInit)
            return;
        World._$isInit = true;
        World._$canvas = new Canvas(new Rectangle(y, y, width, height));
        zIndex && (World._$canvas.zIndex = zIndex);
        divNode.appendChild(World._$canvas.canvasElement);
        World._$divNode = divNode;
        //禁用右键菜单
        divNode.oncontextmenu = () => {
            return false;
        };
        //鼠标悬停时禁用页面滚动事件
        divNode.addEventListener("mouseover", function () {
            document.body.style.overflow = 'hidden';
        });
        divNode.addEventListener("mouseleave", function () {
            document.body.style.overflow = 'auto';
        });
        World._$input = new Input();
        World._$worldTree = new WorldTree();
        //创建主线程
        World._$thread = new Thread(60);
        //执行线程方法
        World._$thread.run((delta) => {
            //每帧调用方法
            World.updateFunc(delta);
        });
        /** 当用户键盘按下调用 */
        document.onkeydown = (e) => {
            Input.keyDown(e.keyCode);
        };
        /** 当用户键盘按松开调用 */
        document.onkeyup = (e) => {
            Input.keyUp(e.keyCode);
        };
        /** 当用户鼠标移动时调用,局部坐标 */
        divNode.onmousemove = (e) => {
            Input._$setMousePos(e.offsetX, e.offsetY);
        };
        /** 当用户鼠标移动时调用,全局坐标坐标 */
        document.onmousemove = (e) => {
            Input._$setMouseGlobalPos(e.screenX, e.screenY);
        };
        /** 当用户鼠标按钮按下时调用 */
        divNode.onmousedown = (e) => {
            World.divNode.style.cursor = Input.cursorCheckStyle;
            Input.buttonDown(e.button);
        };
        /** 当用户鼠标按钮松开时调用 */
        divNode.onmouseup = (e) => {
            World.divNode.style.cursor = Input.cursorStyle;
            Input.buttonUp(e.button);
        };
        /** 单用户鼠标滚轮滚动时调用 */
        // @ts-ignore
        divNode.onmousewheel = (e) => {
            Input._$setMouseWheel(e.wheelDelta > 0 ? 1 : -1);
        };
    }
    /** 获取画布 */
    static get canvas() {
        return World._$canvas;
    }
    /** 获取节点树 */
    static get worldTree() {
        return World._$worldTree;
    }
    /** 获取线程对象 */
    static get thread() {
        return World._$thread;
    }
    /** 获取画布的父节点 */
    static get divNode() {
        return World._$divNode;
    }
    /** 每帧调用方法 */
    static updateFunc(delta) {
        //更新按键
        World._$input._$beforeUpdate();
        //遍历节点树,调用update方法
        World._$worldTree.currentNode && this._$worldTree.currentNode.childTree.each((tree) => {
            tree.node._$nodeUpdate(delta);
        });
        //清理画布
        World._$canvas.clear();
        //遍历节点树,排序draw方法
        let nodeDrawList = [];
        World._$worldTree.currentNode && this._$worldTree.currentNode.childTree.each((tree) => {
            let node = tree.node;
            //不可见的
            if (!node.visible)
                return false;
            //没有实现绘制方法
            if (!node.draw)
                return;
            let list = nodeDrawList[node.zIndex + 1000];
            if (!list)
                nodeDrawList[node.zIndex + 1000] = [node];
            else
                list.push(node);
        });
        //调用节点的draw方法
        nodeDrawList.forEach((nodes) => {
            for (let i = 0; i < nodes.length; i++)
                nodes[i]._$nodeDraw(World._$canvas.brush);
        });
        //调用移除子节点方法
        Tree._$callRemoveNode();
        //调用移除索引子节点方法
        Tree._$callRemoveAllNode();
        //调用离开方法
        Tree._$callLeaveNode();
        //初始化节点
        Tree._$callInitNode();
        //更新按键
        World._$input._$afterUpdate();
    }
}
/** 是否调用过初始化方法,init方法只能调用一次 */
World._$isInit = false;
/**
 * 世界的节点树
 */
class WorldTree {
    /** 节点树 */
    //private _$nodeTree: Tree = undefined;
    constructor() {
        /** 当前活动的节点,根节点 */
        this._$currentNode = new Node2D("root");
    }
    /** 获取当前活动的节点 */
    get currentNode() {
        // @ts-ignore
        let child = this._$currentNode.childTree.child[0];
        // @ts-ignore
        return child ? child.node : undefined;
    }
    /** 设置当前活动的节点 */
    set currentNode(node) {
        //移除之前的节点,并加入新的节点
        this._$currentNode.removeAllChild();
        this._$currentNode.addChild(node);
    }
}
/**
 * 画笔类
 */
class Brush {
    /**
     * 创建画笔类
     * @param context 当前层的画布的上下文对象
     */
    constructor(context) {
        /** 记录当前对象的全局alpha值,系统内部变量 */
        this._$tempGlobalAlpha = 1;
        this._$context2D = context;
    }
    /**
     * 获取画布的上下文对象,<br>
     */
    get context() {
        return this._$context2D;
    }
    /** 重置画布坐标,缩放,旋转,让画布transform属性回到默认值 */
    resetTransform() {
        /*
         a	水平缩放
         b	水平倾斜
         c	垂直倾斜
         d	垂直缩放
         e	水平偏移
         f	垂直偏移
         */
        this._$context2D.setTransform(1, 0, 0, 1, 0, 0);
    }
    /** 改变画布的初始坐标 */
    translate(position) {
        this._$context2D.translate(position.x, position.y);
    }
    /** 旋转画布 */
    rotate(angle) {
        this._$context2D.rotate(angle);
    }
    /** 缩放画布 */
    scale(vector) {
        this._$context2D.scale(vector.x, vector.y);
    }
    /** 设置绘制的alpha值,(0-1) */
    alpha(alpha) {
        this._$context2D.globalAlpha = this._$tempGlobalAlpha * (alpha < 0 ? 0 : alpha > 1 ? 1 : alpha);
    }
    /** 设置画笔颜色 */
    setColor(color) {
        if (color instanceof Color)
            color = color.toRgba();
        // @ts-ignore
        this._$context2D.strokeStyle = color;
        // @ts-ignore
        this._$context2D.fillStyle = color;
    }
    /** 获取画笔颜色 */
    getColor() {
        return this._$context2D.strokeStyle.toString();
    }
    /** 画一个圆 */
    drawCircle(position, radius) {
        this._$context2D.beginPath();
        this._$context2D.arc(position.x, position.y, radius, 0, Utils.toRadians(360));
        this._$context2D.closePath();
        this._$context2D.stroke();
    }
    /** 画一个填充圆 */
    drawFillCircle(position, radius) {
        this._$context2D.beginPath();
        this._$context2D.arc(position.x, position.y, radius, 0, Utils.toRadians(360));
        this._$context2D.closePath();
        this._$context2D.fill();
    }
    /** 画一个矩形 */
    drawRect(position, size) {
        this._$context2D.beginPath();
        this._$context2D.rect(position.x, position.y, size.x, size.y);
        this._$context2D.closePath();
        this._$context2D.stroke();
    }
    /** 画一个填充矩形 */
    drawFillRect(position, size) {
        this._$context2D.fillRect(position.x, position.y, size.x, size.y);
    }
    /** 画一个路径 */
    drawPath(...point) {
    }
    /** 画一个填充路径 */
    drawFillPath(...point) {
    }
    /** 画一条线 */
    drawLine(start, end) {
        this._$context2D.beginPath();
        this._$context2D.moveTo(start.x, start.y);
        this._$context2D.lineTo(end.x, end.y);
        this._$context2D.closePath();
        this._$context2D.stroke();
    }
    /** 绘制文字 */
    drawText(position, str) {
        this._$context2D.fillText(str, position.x, position.y);
    }
}
Brush.vector = new Point();
/**
 * 节点基类
 */
class NodeBase {
    /** 实例化节点 */
    constructor(name) {
        /**
         * 绘制方法,每帧调用,通过brush来画图,
         * 该方法会在update方法之后调用,zindex越小调用就越早
         * @param brush 画笔
         */
        //public abstract draw(brush: Brush): void;
        this.draw = undefined;
        //************ 节点属性 *************
        /** 节点名称 */
        this._$name = "";
        /** 节点相对于父节点的坐标 */
        this._$position = Vector.zero;
        /** 节点相对于父节点的旋转角度 */
        this._$rotation = 0;
        /** 节点相对于父节点的缩放比 */
        this._$scale = Vector.one;
        /** 节点相对于父节点的绘制透明度 */
        this._$alpha = 1;
        /** 节点相对于场景根节点的坐标 */
        this._$globalPosition = Vector.zero;
        /** 节点相对于场景根节点的旋转角度 */
        this._$globalRotation = 0;
        /** 节点相对于场景根节点的缩放比 */
        this._$globalScale = Vector.one;
        /** 节点相对于场景根节点的绘制透明度 */
        this._$globalAlpha = 1;
        /** 节点绘制的z轴坐标 */
        this._$zIndex = 0;
        /** 节点是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
        this._$visible = true;
        /** 是否继承父节点的transform */
        this._$inheritTransform = true;
        /** 子节点树,内部变量 */
        this._$childTree = new Tree(this, []);
        this.name = name && name || "";
        this._$nodeInit();
    }
    /**
     * 初始化方法,系统内部调用
     * @private
     */
    _$nodeInit() {
        this.init();
    }
    /**
     * 开始方法,系统内部调用
     */
    _$nodeStart() {
        this.start();
    }
    /**
     * 每帧执行方法,系统调用
     * @param delta
     */
    _$nodeUpdate(delta) {
        this.update(delta);
    }
    /**
     * 绘制方法,系统调用
     * @param brush 笔刷
     * @param drawFunc 重写_$nodeDraw方法时执行的绘制方法
     */
    _$nodeDraw(brush, drawFunc) {
        let context = brush.context;
        brush._$tempGlobalAlpha = context.globalAlpha;
        let alpha = this.alpha;
        let pos = this.position;
        let nodeList = [];
        this.eachParentUp((node) => {
            if (!node._$inheritTransform)
                return false;
            nodeList.push(node);
        });
        for (let i = nodeList.length - 1; i >= 0; i--) {
            let node = nodeList[i];
            context.translate(node.position.x, node.position.y);
            context.rotate(node.rotation);
            let tempScale = node.scale;
            context.scale(tempScale.x, tempScale.y);
            alpha *= node.alpha;
        }
        //如果该节点不继承父节点transform,那么重置transform
        if (!this._$inheritTransform)
            brush.resetTransform();
        context.translate(pos.x, pos.y);
        context.rotate(this.rotation);
        context.scale(this.scale.x, this.scale.y);
        context.globalAlpha = alpha;
        brush._$tempGlobalAlpha = alpha;
        if (drawFunc)
            drawFunc();
        // @ts-ignore
        else
            this.draw(brush);
        //重置画布Transform
        brush.resetTransform();
    }
    /**
     * 离开节点方法,系统调用
     */
    _$nodeLeave() {
        this.leave();
    }
    get name() {
        return this._$name;
    }
    set name(name) {
        this._$name = name;
    }
    get position() {
        return this._$position;
    }
    set position(value) {
        this._$position = value;
    }
    get rotation() {
        return this._$rotation;
    }
    set rotation(value) {
        this._$rotation = value;
    }
    get scale() {
        return this._$scale;
    }
    set scale(value) {
        this._$scale = value;
    }
    /** 获取节点相对于父节点的绘制透明度,值范围0-1 */
    get alpha() {
        return this._$alpha;
    }
    /** 设置节点相对于父节点的绘制透明度,值范围0-1 */
    set alpha(value) {
        this._$alpha = value < 0 ? 0 : value > 1 ? 1 : value;
    }
    /** 获取节点相对于场景根节点的坐标 */
    get globalPosition() {
        let pos = Vector.zero;
        let rotation = 0;
        this.eachParentDown((node) => {
            rotation += node.rotation;
            pos.x += node.position.x + Math.cos(rotation) * node.position.x;
            pos.y += node.position.y + Math.sin(rotation) * node.position.y;
        });
        pos.x += this.position.x + Math.cos(rotation + this.rotation) * this.position.x;
        pos.y += this.position.y + Math.sin(rotation + this.rotation) * this.position.y;
        return pos;
    }
    set globalPosition(value) {
        this._$globalPosition = value;
    }
    /** 获取节点相对于场景根节点的旋转角度 */
    get globalRotation() {
        let rotation = this._$rotation;
        this.eachParentUp((node) => {
            rotation += node._$rotation;
        });
        return rotation;
    }
    set globalRotation(value) {
        this._$globalRotation = value;
    }
    get globalScale() {
        return this._$globalScale;
    }
    set globalScale(value) {
        this._$globalScale = value;
    }
    /** 获取节点相对于场景根节点的绘制透明度 */
    get globalAlpha() {
        let globalAlpha = this._$alpha;
        this.eachParentUp((node) => {
            globalAlpha *= node._$alpha;
        });
        return globalAlpha;
    }
    set globalAlpha(value) {
        this._$globalAlpha = value;
    }
    /** 获取节点是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
    get visible() {
        return this._$visible;
    }
    /** 设置是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
    set visible(visible) {
        this._$visible = visible;
    }
    /** 获取是否继承父节点的transform */
    get inheritTransform() {
        return this._$inheritTransform;
    }
    /**
     * 设置是否继承父节点的transform
     */
    set inheritTransform(value) {
        this._$inheritTransform = value;
    }
    /** 获取z轴索引,值越小表示越深,不会小于-1000! */
    get zIndex() {
        if (this._$zIndex < -1000)
            this._$zIndex = -1000;
        return this._$zIndex;
    }
    /** 设置z轴索引,值越小表示越深,不能小于-1000! */
    set zIndex(value) {
        this._$zIndex = value >= -1000 ? value : -1000;
    }
    /** 获取子节点树 */
    get childTree() {
        return this._$childTree;
    }
    /** 获取父节点 */
    get parent() {
        return this._$parentTree && this._$parentTree.node;
    }
    /** 获取父节点树 */
    get parentTree() {
        return this._$parentTree;
    }
    //************ 节点方法 *************
    /** 将该对象从节点树中脱离,子节点也会被调用free()方法 */
    free() {
        //调用子节点的free()方法
        let child;
        // @ts-ignore
        while ((child = this._$childTree.child[0]))
            // @ts-ignore
            child.node.free();
        // @ts-ignore
        this._$parentTree.removeChild(this._$childTree);
        this._$parentTree = undefined;
        Tree._$addLeaveNode(this);
        return this;
    }
    /**
     * 根据索引获取子节点
     * @param index
     */
    getChild(index) {
        let tree;
        // @ts-ignore
        return (tree = this._$childTree.child[index]) && tree.node || undefined;
    }
    /**
     * 获取子节点个数
     */
    getChildCount() {
        // @ts-ignore
        return this._$childTree.child.length;
    }
    /**
     * 获取所有子节点对象
     */
    getChildren() {
        let children = [];
        let child = this._$childTree.child;
        // @ts-ignore
        for (let i = 0; i < child.length; i++)
            // @ts-ignore
            children.push(child[i].node);
        return children;
    }
    /**
     * 获取所有父级节点对象,按层级排列
     */
    getParents() {
        let nodeList = [];
        this.eachParentUp((node) => {
            nodeList.push(node);
        });
        return nodeList.reverse();
    }
    /**
     * 向下遍历所有子节点
     * @param func 调用方法,如果返回false那么将终止该条线路的循环
     * @param index 当前子节点索引,不需要手动传该参数
     * @param layer 当前层级,不需要手动传该参数
     */
    eachChildren(func, index = 0, layer = 1) {
        this._$childTree.each((tree, index, layer) => {
            return func(tree.node, index, layer);
        });
    }
    /**
     * 向上遍历父节点,到场景根节点为止<br>
     * func函数返回false则会终止遍历
     */
    eachParentUp(func) {
        if (!this._$parentTree || this._$parentTree.node._$name === 'root' || func(this._$parentTree.node) === false)
            return;
        this._$parentTree.node.eachParentUp(func);
    }
    /**
     * 向下遍历父节点,从场景根节点开始<br>
     * func函数返回false则会终止遍历
     */
    eachParentDown(func) {
        let nodeList = this.getParents();
        for (let i = 0; i < nodeList.length; i++)
            if (func(nodeList[i]) === false)
                break;
    }
    /**
     * 添加子节点,注意:调用该方法添加的子节点不会立刻添加到节点树中,而是要等该帧结束才会加入!
     * @param node 子节点
     */
    addChild(node) {
        this._$childTree.addChild(node._$childTree);
        //设置父级节点树
        node._$parentTree = this._$childTree;
    }
    /**
     * 移除一个子节点
     * @param node 子节点
     */
    removeChild(node) {
        Tree._$addRemoveNode(this._$childTree, node._$childTree);
    }
    /**
     * 移除所有子节点
     */
    removeAllChild() {
        Tree._$addRemoveAllNode(this);
    }
}
/**
 * 2d节点
 */
class Node2D extends NodeBase {
    constructor(name) {
        super(name);
    }
    init() {
    }
    start() {
    }
    update(delta) {
    }
    /* draw(brush: Brush): void {
    } */
    leave() {
    }
}
/**
 * 精灵节点
 */
class Sprite extends Node2D {
    constructor() {
        super(...arguments);
        /** 混合的颜色 */
        this._$blend = new Color();
        /** 精灵是否居中显示,默认false */
        this._$centered = false;
        /** 精灵x轴偏移 */
        this._$xOffset = 0;
        /** 精灵y轴偏移 */
        this._$yOffset = 0;
        /** 是否启用精灵显示区域,默认false */
        this._$regionEnable = false;
        /** 精灵显示区域 */
        this._$regionRect = new Rectangle();
        /** 垂直帧数,必须大于0 */
        this._$vFrames = 1;
        /** 水平帧数,必须大于0 */
        this._$hFrames = 1;
        /** 当前显示帧数,下标从0开始,不会大于 (vFrames * hFrames) - 1 */
        this._$frame = 0;
    }
    _$nodeDraw(brush) {
        super._$nodeDraw(brush, () => {
            if (this._$texture) {
                // imW : 图像宽度
                // imH : 图像高度
                // x : 图像绘制x坐标
                // y : 图像绘制y坐标
                let imW, imH, x, y;
                if (!this._$regionEnable) { //判断是否要要启用区域显示
                    imW = this._$texture.width / this._$hFrames;
                    imH = this._$texture.height / this._$vFrames;
                    x = this._$frame % this._$hFrames * imW;
                    y = (this._$frame / this._$hFrames >> 0) * imH;
                }
                else {
                    imW = this._$regionRect.w / this._$hFrames;
                    imH = this._$regionRect.h / this._$vFrames;
                    x = this._$regionRect.x + this._$frame % this._$hFrames * imW;
                    y = this._$regionRect.y + (this._$frame / this._$hFrames >> 0) * imH;
                }
                if (this._$centered) //是否居中
                    brush.context.drawImage(this._$texture, x, y, imW, imH, -imW / 2 + this._$xOffset, -imH / 2 + this._$yOffset, imW, imH);
                else
                    brush.context.drawImage(this._$texture, x, y, imW, imH, this._$xOffset, this._$yOffset, imW, imH);
            }
            // @ts-ignore
            this.draw(brush);
        });
    }
    /** 获取绘制的纹理 */
    get texture() {
        return this._$texture;
    }
    /** 设置绘制的纹理 */
    set texture(image) {
        this._$texture = image;
    }
    /** 获取精灵x轴偏移*/
    get xOffset() {
        return this._$xOffset;
    }
    /** 设置精灵x轴偏移*/
    set xOffset(value) {
        this._$xOffset = value;
    }
    /** 获取精灵y轴偏移 */
    get yOffset() {
        return this._$yOffset;
    }
    /** 设置精灵y轴偏移 */
    set yOffset(value) {
        this._$yOffset = value;
    }
    /** 获取精灵是否居中显示,默认false */
    get centered() {
        return this._$centered;
    }
    /** 设置精灵是否居中显示,默认false */
    set centered(value) {
        this._$centered = value;
    }
    /** 获取是否启用精灵显示区域,默认false */
    get regionEnable() {
        return this._$regionEnable;
    }
    /** 设置是否启用精灵显示区域,默认false */
    set regionEnable(value) {
        this._$regionEnable = value;
    }
    /** 获取精灵显示区域 */
    get regionRect() {
        return this._$regionRect;
    }
    /** 设置精灵显示区域 */
    set regionRect(value) {
        this._$regionRect = value;
    }
    /** 获取垂直帧数,必须大于0 */
    get vFrames() {
        return this._$vFrames;
    }
    /** 设置垂直帧数,必须大于0 */
    set vFrames(value) {
        this._$vFrames = value && value || 0;
    }
    /** 获取水平帧数,必须大于0 */
    get hFrames() {
        return this._$hFrames;
    }
    /** 设置水平帧数,必须大于0 */
    set hFrames(value) {
        this._$hFrames = value && value || 0;
    }
    /** 获取当前显示帧数,下标从0开始,<br>不会大于 (vFrames * hFrames) - 1 */
    get frame() {
        return this._$frame;
    }
    /** 设置当前显示帧数,下标从0开始,<br>不会大于 (vFrames * hFrames) - 1 */
    set frame(value) {
        this._$frame = value !== undefined ? (value >= 0 && value <= (this._$vFrames * this._$hFrames) - 1 ? value : 0) : 0;
    }
}
/**
 * 碰撞检测节点
 */
class Collision extends Node2D {
    constructor() {
        super(...arguments);
        /** 是否禁用碰撞检测 */
        this._$disable = false;
    }
}
/**
 * 节点树类
 */
class Tree {
    constructor(node, child) {
        this.node = node;
        this.child = child;
    }
    /**
     * 遍历当前节点以及子节点
     * @param func 调用方法,如果返回false那么将终止该条线路的循环
     * @param index 当前子节点索引,不需要手动传该参数
     * @param layer 当前层级,不需要手动传该参数
     */
    each(func, index = 0, layer = 1) {
        if (!this.node || !this.child || !func || func(this, index, layer) === false)
            return;
        for (let i = 0; i < this.child.length; i++)
            this.child[i].each(func, i, layer + 1);
    }
    /**
     * 节点树下添加子节点
     * @param tree 节点树
     */
    addChild(tree) {
        if (!tree)
            throw new Error("节点参数是undefined!");
        if (this === tree)
            throw new Error("不能添加自己作为子节点!");
        //判断该节点是否在场景中存在(是否存在父节点)
        if (tree.node.parentTree)
            throw new Error("节点已在场景树中存在!");
        //加入到初始化节点集合,会在该帧结束时加入到场景树
        Tree._$addInitNode(this, tree);
        return this;
    }
    /**
     * 移除一个子节点,返回是否移除成功
     * @param tree 需要移除的节点树
     */
    removeChild(tree) {
        if (!this.child)
            return false;
        let index = this.child.indexOf(tree);
        if (index !== -1) {
            this.child.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * 移除所有子节点
     */
    removeAllChild() {
        this.child = [];
    }
    /** 根据节点名称查找节点,允许使用'/'分割名称 */
    find(name) {
        return [];
    }
    /** 查询一个节点是否存在于节点树中 */
    hasNode(tree) {
        return false;
    }
    /** 控制台打印节点树结构,通常用于debug时调用 */
    printTreePretty() {
        let str = "";
        let map = new Map();
        this.each((tree, index) => {
            let parent = tree.node.parentTree;
            let parStr = parent && map.get(parent.node) || "";
            switch (index) {
                // @ts-ignore
                case parent.child.length - 1:
                    str += parStr + "  ┖╴" + tree.node.name;
                    map.set(tree.node, parStr + "   ");
                    break;
                default:
                    str += parStr + "  ┠╴" + tree.node.name;
                    map.set(tree.node, parStr + "  ┃");
                    break;
            }
            str += " (" + tree.node.constructor.name + ")\n";
        });
        console.log(str);
    }
    /** 添加初始化节点,系统内部调用 */
    static _$addInitNode(parent, child) {
        let pc = { parent: parent, child: child };
        //如果已经存在,就删除之前的并添加到末尾
        let index = this._$initNode.indexOf(pc);
        if (index !== -1)
            this._$initNode.splice(index, 1);
        this._$initNode.push(pc);
    }
    /** 调用节点的start方法,并清理initNode,系统调用 */
    static _$callInitNode() {
        let tempNodes = [...Tree._$initNode];
        Tree._$initNode = [];
        for (let i = 0; i < tempNodes.length; i++) {
            let temp = tempNodes[i];
            //加入到节点树
            if (!temp.parent.child)
                temp.parent.child = [temp.child];
            else
                temp.parent.child.push(temp.child);
            //调用初始化方法++
            tempNodes[i].child.node._$nodeStart();
        }
    }
    /** 添加移除节点,系统内部调用 */
    static _$addRemoveNode(parent, child) {
        let pc = { parent: parent, child: child };
        //如果已经存在,就删除之前的并添加到末尾
        let index = this._$removeNode.indexOf(pc);
        if (index !== -1)
            this._$removeNode.splice(index, 1);
        //移除父节点
        child.node._$parentTree = undefined;
        this._$removeNode.push(pc);
    }
    /** 调用移除节点,系统调用 */
    static _$callRemoveNode() {
        for (let i = 0; i < this._$removeNode.length; i++) {
            let temp = this._$removeNode[i];
            //移除节点树
            temp.parent.removeChild(temp.child);
        }
        Tree._$removeNode = [];
    }
    /** 添加离开的节点,系统内部调用 */
    static _$addRemoveAllNode(node) {
        //如果已经存在,就删除之前的并添加到末尾
        let index = this._$removeAllNode.indexOf(node);
        if (index !== -1)
            this._$removeAllNode.splice(index, 1);
        //将子节点的父节点设置为undefined
        let child = node._$childTree.child;
        // @ts-ignore
        for (let i = 0; i < child.length; i++)
            // @ts-ignore
            child[i].node._$parentTree = undefined;
        this._$removeAllNode.push(node);
    }
    /** 调用移除节点,系统调用 */
    static _$callRemoveAllNode() {
        for (let i = 0; i < this._$removeAllNode.length; i++)
            //移除所有子节点方法
            this._$removeAllNode[i]._$childTree.removeAllChild();
        Tree._$removeAllNode = [];
    }
    /** 添加离开的节点,系统内部调用 */
    static _$addLeaveNode(node) {
        //如果已经存在,就删除之前的并添加到末尾
        let index = this._$leaveNode.indexOf(node);
        if (index !== -1)
            this._$leaveNode.splice(index, 1);
        this._$leaveNode.push(node);
    }
    /** 调用节点的leave方法,并清理leaveNode,系统调用 */
    static _$callLeaveNode() {
        let tempNodes = [...Tree._$leaveNode];
        Tree._$leaveNode = [];
        for (let i = 0; i < tempNodes.length; i++)
            //调用离开节点方法
            tempNodes[i]._$nodeLeave();
    }
}
//*****************************************************
/** 需要调用初始化方法的节点,也就是刚被加入节点树的节点 */
Tree._$initNode = [];
/** 需要移出节树的节点,也就是被removeChild的节点 */
Tree._$removeNode = [];
/** 需要移除所有子节点的节点,也就是调用removeAllChild的节点 */
Tree._$removeAllNode = [];
/** 需要调用leave()化方法的节点,也就是被free()的节点 */
Tree._$leaveNode = [];
