namespace MyBuilder {
    /**
     * 颜色类
     */
    export class Color {

        /** 红色通道值 */
        private _$r: number = 0;
        /** 绿色通道值 */
        private _$g: number = 0;
        /** 蓝色通道值 */
        private _$b: number = 0;
        /** 透明通道值 */
        private _$a: number = 1;

        /**
         * 创建一个Color对象,参数为 Color 对象或者 number (r?,g?,b?,a?) 或者不填
         * @param arg Color 或者 number (r?,g?,b?,a?) 或者不填
         */
        constructor(...arg: (number | Color)[]) {
            let temp = arg[0];
            if (temp !== undefined)
                if (temp instanceof Color) {
                    this.r = temp._$r;
                    this.g = temp._$g;
                    this.b = temp._$b;
                    this.a = temp._$a;
                } else {
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
        public get r(): number {
            return this._$r;
        }
        /** 设置红色通道值,范围:0-255 */
        public set r(value: number) {
            this._$r = value < 0 ? 0 : value > 255 ? 255 : value;
        }
        /** 获取绿色通道值,范围:0-255 */
        public get g(): number {
            return this._$g;
        }
        /** 设置绿色通道值,范围:0-255 */
        public set g(value: number) {
            this._$g = value < 0 ? 0 : value > 255 ? 255 : value;
        }
        /** 获取蓝色通道值,范围:0-255 */
        public get b(): number {
            return this._$b;
        }
        /** 设置蓝色通道值,范围:0-255 */
        public set b(value: number) {
            this._$b = value < 0 ? 0 : value > 255 ? 255 : value;
        }
        /** 获取透明通道值,范围:0-1.0 */
        public get a(): number {
            return this._$a;
        }
        /** 设置透明通道值,范围:0-1.0 */
        public set a(value: number) {
            this._$a = value < 0 ? 0 : value > 1 ? 1 : value;
        }

        /** 颜色相加 */
        public add(color: Color): Color {
            return new Color(this._$r + color._$r, this._$g + color._$g, this._$b + color._$b, this._$a + color._$a);
        }

        /** 颜色相减 */
        public reduce(color: Color): Color {
            return new Color(this._$r - color._$r, this._$g - color._$g, this._$b - color._$b, this._$a - color._$a);
        }

        /** 颜色相乘 */
        public multiply(color: Color | number): Color {
            if (color instanceof Color)
                return new Color(this._$r * color._$r, this._$g * color._$g, this._$b * color._$b, this._$a * color._$a);
            return new Color(this._$r * color, this._$g * color, this._$b * color, this._$a * color);
        }

        /** 颜色相除 */
        public divide(color: Color | number): Color {
            if (color instanceof Color)
                return new Color(this._$r / color._$r, this._$g / color._$g, this._$b / color._$b, this._$a / color._$a);
            return new Color(this._$r / color, this._$g / color, this._$b / color, this._$a / color);
        }

        /** 混合两种颜色 */
        public blend(color: Color): Color {
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
        public darkened(amount: number): Color {
            return new Color(this._$r * (1 - amount), this._$g * (1 - amount), this._$b * (1 - amount), this._$a);
        }

        /** 根据amount (0-1)获取更亮的颜色 */
        public brighter(amount: number): Color {
            let maxNum = this._$r > this._$g ? (this._$r > this._$b ? this._$r : this._$b) : (this._$g > this._$b ? this._$g : this._$b);
            let temp = maxNum / 255;
            return new Color(this._$r + (this._$r / temp) * ((1 - temp) * amount),
                this._$g + (this._$g / temp) * ((1 - temp) * amount),
                this._$b + (this._$b / temp) * ((1 - temp) * amount),
                this._$a);
        }

        /** 获取两个颜色的中间色 */
        public middle(color: Color): Color {
            return new Color((this._$r + color._$r) / 2, (this._$g + color._$g) / 2,
                (this._$b + color._$b) / 2, (this._$a + color._$a) / 2);
        }

        /** 获取两个颜色间的过渡颜色,amount (0-1)为过渡的量 */
        public transition(color: Color, amount: number): Color {
            return new Color(this._$r + (color._$r - this._$r) * amount,
                this._$g + (color._$g - this._$g) * amount,
                this._$b + (color._$b - this._$b) * amount,
                this._$a + (color._$a - this._$a) * amount);
        }

        /** 获取当前颜色的灰暗度值 */
        public gray(): number {
            return (this._$r + this._$g + this._$b) / 3 / 255;
        }

        /** 获取该颜色的反色 */
        public inverted(): Color {
            return new Color(255 - this._$r, 255 - this._$g, 255 - this._$b, this._$a);
        }

        /** 获取该颜色向 #ffffff 颜色过渡,参数 amount (0-1) 为过渡的量 */
        public lightened(amount: number): Color {
            return new Color(this._$r + (255 - this._$r) * amount,
                this._$g + (255 - this._$g) * amount,
                this._$b + (255 - this._$b) * amount, this._$a)
        }

        /** 线性插入颜色,delta值为:0-1 */
        public linearInterpolate(color: Color, delta: number): Color {
            return new Color(this._$r + delta * (color._$r - this._$r),
                this._$g + delta * (color._$g - this._$g),
                this._$b + delta * (color._$b - this._$b),
                this._$a + delta * (color._$a - this._$a))
        }

        /** 转换为十进制颜色,可能会丢失精度 */
        public toDecimalism(): number {
            return ((this._$a * 255) >> 0) * 256 * 256 * 256 + this._$r * 256 * 256 + this._$g * 256 + this._$b;
        }

        /** 转换为十六进制字符串,可能会丢失精度 */
        public toHexadecimal(): string {
            return "#" +
                (this._$r <= 16 ? "0" + this._$r.toString(16) : this._$r.toString(16)) +
                (this._$g <= 16 ? "0" + this._$g.toString(16) : this._$g.toString(16)) +
                (this._$b <= 16 ? "0" + this._$b.toString(16) : this._$b.toString(16)) +
                (this._$a === 1 ? "" : (this._$a * 255 >> 0 <= 16 ? "0" + (this._$a * 255 >> 0).toString(16) : (this._$a * 255 >> 0).toString(16)));
        }

        /** 转换为'rgba(r,g,b,a)'字符串 */
        public toRgba(): string {
            return this._$a === 1 && "rgb(" + this._$r + "," + this._$g + "," + this._$b + ")" ||
                "rgba(" + this._$r + "," + this._$g + "," + this._$b + "," + this._$a + ")";
        }

        /** 转换为字符串 */
        public toString(): string {
            return "color : {r : " + this._$r + ", g : " + this._$g + ", b : " + this._$b + ", a : " + this._$a + "}";
        }

        //***********************静态方法*****************************

        /** 从十六进制字符串获取颜色对象,可能会丢失精度 */
        public static fromHexadecimal(numStr: string): Color {
            if (numStr[0] === '#') numStr = numStr.substring(1);
            switch (numStr.length) {
                case 3:     //#fff  rgb
                    return new Color(parseInt(numStr[0] + numStr[0], 16), parseInt(numStr[1] + numStr[1], 16), parseInt(numStr[2] + numStr[2], 16));
                case 6:     //#ffffff   rgb
                    return new Color(parseInt(numStr.substring(0, 2), 16), parseInt(numStr.substring(2, 4), 16), parseInt(numStr.substring(4), 16));
                case 8:     //#ffffffff     rgba
                    return new Color(parseInt(numStr.substring(0, 2), 16), parseInt(numStr.substring(2, 4), 16), parseInt(numStr.substring(4, 6), 16), parseInt(numStr.substring(6), 16) / 255);
                default:
                    throw new Error("颜色格式不正确!");
            }
        }

        /** 从十进制数字获取颜色对象,可能会丢失精度 */
        public static fromDecimalism(num: number): Color {
            return new Color(num >> 16 & 0xff, num >> 8 & 0xff, num & 0xff, (num >> 24 & 0xff) / 255);
        }
        /** 从rgba(r,g,b,a)格式字符串获取颜色对象 */
        public static fromRgba(rgbaStr: string): Color {
            let startIndex = -1;
            let list;
            if ((startIndex = rgbaStr.indexOf('(')) !== -1) {
                rgbaStr = rgbaStr.substring(startIndex + 1);
                rgbaStr.substring(0, rgbaStr.length - 1);
            }
            list = rgbaStr.split(',');
            // @ts-ignore
            return new Color(list[0] !== undefined && parseInt(list[0]),
                list[1] !== undefined && parseInt(list[1]),
                list[2] !== undefined && parseInt(list[2]),
                list[3] !== undefined && parseFloat(list[3]));
        }

        //*****************提供的基本颜色*************************

        /** <p color='#000000'>黑色</p><br>十六进制 : #000000<br>RGB : (0,0,0) */
        public static get black(): Color {
            return new Color(0, 0, 0);
        }
        /** <p color='#666666'>象牙黑</p><br>十六进制 : #666666<br>RGB : (88,87,86) */
        public static get ivoryBlack(): Color {
            return new Color(88, 87, 86);
        }
        /** <p color='#808A87'>冷灰</p><br>十六进制 : #808A87<br>RGB : (128,138,135) */
        public static get coolGray(): Color {
            return new Color(128, 138, 135);
        }
        /** <p color='#808069'>暖灰</p><br>十六进制 : #808069<br>RGB : (128,118,105) */
        public static get warmGray(): Color {
            return new Color(128, 118, 105);
        }
        /** <p color='#E6E6E6'>石板灰</p><br>十六进制 : #E6E6E6<br>RGB : (118,128,105) */
        public static get slateGrey(): Color {
            return new Color(118, 128, 105);
        }
        /** <p color='#F5F5F5'>白烟灰</p><br>十六进制 : #F5F5F5<br>RGB : (245,245,245) */
        public static get whiteSmokeGray(): Color {
            return new Color(245, 245, 245);
        }
        /** <p color='#FCE6C9'>蛋壳灰</p><br>十六进制 : #FCE6C9<br>RGB : (252,230,202) */
        public static get eggshellGrey(): Color {
            return new Color(252, 230, 202);
        }
        /** <p color='#FF0000'>红色</p><br>十六进制 : #FF0000<br>RGB : (255,0,0) */
        public static get red(): Color {
            return new Color(255, 0, 0);
        }
        /** <p color='#E3170D'>镉红</p><br>十六进制 : #E3170D<br>RGB : (227,23,13) */
        public static get cadmiumRed(): Color {
            return new Color(227, 23, 13);
        }
        /** <p color='#9C661F'>棕红</p><br>十六进制 : #9C661F<br>RGB : (156,102,31) */
        public static get brownishRed(): Color {
            return new Color(156, 102, 31);
        }
        /** <p color='#FF7F50'>珊瑚红</p><br>十六进制 : #FF7F50<br>RGB : (255,127,80) */
        public static get coralRed(): Color {
            return new Color(255, 127, 80);
        }
        /** <p color='#FF6347'>番茄红</p><br>十六进制 : #FF6347<br>RGB : (255,99,71) */
        public static get tomatoRed(): Color {
            return new Color(255, 99, 71);
        }
        /** <p color='#FFC0CB'>粉红</p><br>十六进制 : #FFC0CB<br>RGB : (255,192,203) */
        public static get pink(): Color {
            return new Color(255, 192, 203);
        }
        /** <p color='#B0171F'>印度红</p><br>十六进制 : #B0171F<br>RGB : (176,23,31) */
        public static get indianRed(): Color {
            return new Color(176, 23, 31);
        }
        /** <p color='#FF00FF'>紫色</p><br>十六进制 : #FF00FF<br>RGB : (255,0,255) */
        public static get purplish(): Color {
            return new Color(255, 0, 255);
        }
        /** <p color='#990033'>黑红</p><br>十六进制 : #990033<br>RGB : (116,0,0) */
        public static get blackRed(): Color {
            return new Color(116, 0, 0);
        }
        /** <p color='#00FF00'>绿色</p><br>十六进制 : #00FF00<br>RGB : (0,255,0) */
        public static get green(): Color {
            return new Color(0, 255, 0);
        }
        /** <p color='#00FFFF'>青色</p><br>十六进制 : #00FFFF<br>RGB : (0,255,255) */
        public static get cyan(): Color {
            return new Color(0, 255, 255);
        }
        /** <p color='#7FFF00'>黄绿</p><br>十六进制 : #7FFF00<br>RGB : (127,255,0) */
        public static get yellowGreen(): Color {
            return new Color(127, 255, 0);
        }
        /** <p color='#40E0D0'>蓝绿</p><br>十六进制 : #40E0D0<br>RGB : (64,224,205) */
        public static get turquoise(): Color {
            return new Color(64, 224, 205);
        }
        /** <p color='#082E54'>靛蓝</p><br>十六进制 : #082E54<br>RGB : (8,46,84) */
        public static get indigo(): Color {
            return new Color(8, 46, 84);
        }
        /** <p color='#228B22'>森林绿</p><br>十六进制 : #228B22<br>RGB : (34,139,34) */
        public static get forestGreen(): Color {
            return new Color(34, 139, 34);
        }
        /** <p color='#6B8E23'>草绿</p><br>十六进制 : #6B8E23<br>RGB : (107,142,35) */
        public static get grassGreen(): Color {
            return new Color(107, 142, 35);
        }
        /** <p color='#0000FF'>蓝色</p><br>十六进制 : #0000FF<br>RGB : (0,0,255) */
        public static get blue(): Color {
            return new Color(0, 0, 255);
        }
        /** <p color='#03A89E'>锰蓝</p><br>十六进制 : #03A89E<br>RGB : (3,168,158) */
        public static get manganeseBlue(): Color {
            return new Color(3, 168, 158);
        }
        /** <p color='#191970'>深蓝</p><br>十六进制 : #191970<br>RGB : (25,25,112) */
        public static get darkBlue(): Color {
            return new Color(25, 25, 112);
        }
        /** <p color='#00C78C'>土耳其蓝</p><br>十六进制 : #191970<br>RGB : (0,199,140) */
        public static get turkeyBlue(): Color {
            return new Color(0, 199, 140);
        }
        /** <p color='#FFFFFF'>白色</p><br>十六进制 : #FFFFFF<br>RGB : (255,255,255) */
        public static get white(): Color {
            return new Color(255, 255, 255);
        }
        /** <p color='#F0FFFF'>天蓝灰</p><br>十六进制 : #F0FFFF<br>RGB : (202,235,216) */
        public static get skyB1ueGrey(): Color {
            return new Color(202, 235, 216);
        }
        /** <p color='#CCCCCC'>灰色</p><br>十六进制 : #CCCCCC<br>RGB : (192,192,192) */
        public static get gray(): Color {
            return new Color(192, 192, 192);
        }
        /** <p color='#FAFFF0'>象牙灰</p><br>十六进制 : #FAFFF0<br>RGB : (251,255,242) */
        public static get ivoryGray(): Color {
            return new Color(251, 255, 242);
        }
        /** <p color='#FAF0E6'>亚麻灰</p><br>十六进制 : #FAF0E6<br>RGB : (250,240,230) */
        public static get gridelin(): Color {
            return new Color(250, 240, 230);
        }
        /** <p color='#FFFFCD'>杏仁灰</p><br>十六进制 : #FFFFCD<br>RGB : (255,235,205) */
        public static get almondGray(): Color {
            return new Color(255, 235, 205);
        }
        /** <p color='#FFF5EE'>贝壳灰</p><br>十六进制 : #FFF5EE<br>RGB : (255,245,238) */
        public static get greyShells(): Color {
            return new Color(255, 245, 238);
        }
        /** <p color='#FFFF00'>黄色</p><br>十六进制 : #FFFF00<br>RGB : (255,255,0) */
        public static get yellow(): Color {
            return new Color(255, 255, 0);
        }
        /** <p color='#FF9912'>镉黄</p><br>十六进制 : #FF9912<br>RGB : (255,153,18) */
        public static get cadmiumYellow(): Color {
            return new Color(255, 153, 18);
        }
        /** <p color='#E3CF57'>香蕉黄</p><br>十六进制 : #E3CF57<br>RGB : (227,207,87) */
        public static get bananaYellow(): Color {
            return new Color(227, 207, 87);
        }
        /** <p color='#FF7D40'>肉黄</p><br>十六进制 : #FF7D40<br>RGB : (255,125,64) */
        public static get meatYellow(): Color {
            return new Color(255, 125, 64);
        }
        /** <p color='#ED9121'>萝卜黄</p><br>十六进制 : #ED9121<br>RGB : (237,145,33) */
        public static get radishYellow(): Color {
            return new Color(237, 145, 33);
        }
        /** <p color='#8B864E'>黑黄</p><br>十六进制 : #8B864E<br>RGB : (85,102,0) */
        public static get blackYellow(): Color {
            return new Color(85, 102, 0);
        }
        /** <p color='#C76114'>土色</p><br>十六进制 : #C76114<br>RGB : (199,97,20) */
        public static get soil(): Color {
            return new Color(199, 97, 20);
        }
        /** <p color='#F4A460'>沙棕色</p><br>十六进制 : #F4A460<br>RGB : (244,164,95) */
        public static get sandyBrown(): Color {
            return new Color(244, 164, 95);
        }
        /** <p color='#D2B48C'>棕褐色</p><br>十六进制 : #D2B48C<br>RGB : (210,180,140) */
        public static get sepia(): Color {
            return new Color(210, 180, 140);
        }
        /** <p color='#BC8F8F'>赫色</p><br>十六进制 : #BC8F8F<br>RGB : (188,143,143) */
        public static get ocher(): Color {
            return new Color(188, 143, 143);
        }
        /** <p color='#DA70D6'>淡紫色</p><br>十六进制 : #DA70D6<br>RGB : (218,112,214) */
        public static get lavender(): Color {
            return new Color(218, 112, 214);
        }
        /** <p color='#8A2BE2'>紫罗兰</p><br>十六进制 : #8A2BE2<br>RGB : (138,43,226) */
        public static get violet(): Color {
            return new Color(138, 43, 226);
        }
        /** <p color='#9933FA'>胡紫色</p><br>十六进制 : #9933FA<br>RGB : (153,51,250) */
        public static get huPurple(): Color {
            return new Color(153, 51, 250);
        }
        /** <p color='#FFA500'>橙色</p><br>十六进制 : #FFA500<br>RGB : (255,165,0) */
        public static get orange(): Color {
            return new Color(255, 165, 0);
        }
    }
}