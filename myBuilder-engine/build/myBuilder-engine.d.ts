/**
 * 静态工具类
 */
declare class Utils {
    /** 弧度制转角度制 */
    static toDegrees(angRad: number): number;
    /** 角度制转弧度制 */
    static toRadians(angDeg: number): number;
    /** 返回一个区间内的随机小数 */
    static randRange(min: number, max: number): number;
    /** 返回一个区间内的随机整数 */
    static randRangeInt(min: number, max: number): number;
    /** 循环拼接一个相同字符串 */
    static loopStr(str: string, num: number): string;
}
/**
 * 颜色类
 */
declare class Color {
    /** 红色通道值 */
    private _$r;
    /** 绿色通道值 */
    private _$g;
    /** 蓝色通道值 */
    private _$b;
    /** 透明通道值 */
    private _$a;
    /**
     * 创建一个Color对象,参数为 Color 对象或者 number (r?,g?,b?,a?) 或者不填
     * @param arg Color 或者 number (r?,g?,b?,a?) 或者不填
     */
    constructor(...arg: (number | Color)[]);
    /** 获取红色通道值,范围:0-255 */
    get r(): number;
    /** 设置红色通道值,范围:0-255 */
    set r(value: number);
    /** 获取绿色通道值,范围:0-255 */
    get g(): number;
    /** 设置绿色通道值,范围:0-255 */
    set g(value: number);
    /** 获取蓝色通道值,范围:0-255 */
    get b(): number;
    /** 设置蓝色通道值,范围:0-255 */
    set b(value: number);
    /** 获取透明通道值,范围:0-1.0 */
    get a(): number;
    /** 设置透明通道值,范围:0-1.0 */
    set a(value: number);
    /** 颜色相加 */
    add(color: Color): Color;
    /** 颜色相减 */
    reduce(color: Color): Color;
    /** 颜色相乘 */
    multiply(color: Color | number): Color;
    /** 颜色相除 */
    divide(color: Color | number): Color;
    /** 混合两种颜色 */
    blend(color: Color): Color;
    /** 根据amount (0-1)获取更暗的颜色 */
    darkened(amount: number): Color;
    /** 根据amount (0-1)获取更亮的颜色 */
    brighter(amount: number): Color;
    /** 获取两个颜色的中间色 */
    middle(color: Color): Color;
    /** 获取两个颜色间的过渡颜色,amount (0-1)为过渡的量 */
    transition(color: Color, amount: number): Color;
    /** 获取当前颜色的灰暗度值 */
    gray(): number;
    /** 获取该颜色的反色 */
    inverted(): Color;
    /** 获取该颜色向#ffffff颜色过渡,参数amount (0-1)为过渡的量 */
    lightened(amount: number): Color;
    /** 线性插入颜色,delta值为:0-1 */
    linearInterpolate(color: Color, delta: number): Color;
    /** 转换为十进制颜色,可能会丢失精度 */
    toDecimalism(): number;
    /** 转换为十六进制字符串,可能会丢失精度 */
    toHexadecimal(): string;
    /** 转换为'rgba(r,g,b,a)'字符串 */
    toRgba(): string;
    /** 转换为字符串 */
    toString(): string;
    /** 从十六进制字符串获取颜色对象,可能会丢失精度 */
    static fromHexadecimal(numStr: string): Color;
    /** 从十进制数字获取颜色对象,可能会丢失精度 */
    static fromDecimalism(num: number): Color;
    /** 从rgba(r,g,b,a)格式字符串获取颜色对象 */
    static fromRgba(rgbaStr: string): Color;
    /** <p color='#000000'>黑色</p><br>十六进制 : #000000<br>RGB : (0,0,0) */
    static get black(): Color;
    /** <p color='#666666'>象牙黑</p><br>十六进制 : #666666<br>RGB : (88,87,86) */
    static get ivoryBlack(): Color;
    /** <p color='#808A87'>冷灰</p><br>十六进制 : #808A87<br>RGB : (128,138,135) */
    static get coolGray(): Color;
    /** <p color='#808069'>暖灰</p><br>十六进制 : #808069<br>RGB : (128,118,105) */
    static get warmGray(): Color;
    /** <p color='#E6E6E6'>石板灰</p><br>十六进制 : #E6E6E6<br>RGB : (118,128,105) */
    static get slateGrey(): Color;
    /** <p color='#F5F5F5'>白烟灰</p><br>十六进制 : #F5F5F5<br>RGB : (245,245,245) */
    static get whiteSmokeGray(): Color;
    /** <p color='#FCE6C9'>蛋壳灰</p><br>十六进制 : #FCE6C9<br>RGB : (252,230,202) */
    static get eggshellGrey(): Color;
    /** <p color='#FF0000'>红色</p><br>十六进制 : #FF0000<br>RGB : (255,0,0) */
    static get red(): Color;
    /** <p color='#E3170D'>镉红</p><br>十六进制 : #E3170D<br>RGB : (227,23,13) */
    static get cadmiumRed(): Color;
    /** <p color='#9C661F'>棕红</p><br>十六进制 : #9C661F<br>RGB : (156,102,31) */
    static get brownishRed(): Color;
    /** <p color='#FF7F50'>珊瑚红</p><br>十六进制 : #FF7F50<br>RGB : (255,127,80) */
    static get coralRed(): Color;
    /** <p color='#FF6347'>番茄红</p><br>十六进制 : #FF6347<br>RGB : (255,99,71) */
    static get tomatoRed(): Color;
    /** <p color='#FFC0CB'>粉红</p><br>十六进制 : #FFC0CB<br>RGB : (255,192,203) */
    static get pink(): Color;
    /** <p color='#B0171F'>印度红</p><br>十六进制 : #B0171F<br>RGB : (176,23,31) */
    static get indianRed(): Color;
    /** <p color='#FF00FF'>紫色</p><br>十六进制 : #FF00FF<br>RGB : (255,0,255) */
    static get purplish(): Color;
    /** <p color='#990033'>黑红</p><br>十六进制 : #990033<br>RGB : (116,0,0) */
    static get blackRed(): Color;
    /** <p color='#00FF00'>绿色</p><br>十六进制 : #00FF00<br>RGB : (0,255,0) */
    static get green(): Color;
    /** <p color='#00FFFF'>青色</p><br>十六进制 : #00FFFF<br>RGB : (0,255,255) */
    static get cyan(): Color;
    /** <p color='#7FFF00'>黄绿</p><br>十六进制 : #7FFF00<br>RGB : (127,255,0) */
    static get yellowGreen(): Color;
    /** <p color='#40E0D0'>蓝绿</p><br>十六进制 : #40E0D0<br>RGB : (64,224,205) */
    static get turquoise(): Color;
    /** <p color='#082E54'>靛蓝</p><br>十六进制 : #082E54<br>RGB : (8,46,84) */
    static get indigo(): Color;
    /** <p color='#228B22'>森林绿</p><br>十六进制 : #228B22<br>RGB : (34,139,34) */
    static get forestGreen(): Color;
    /** <p color='#6B8E23'>草绿</p><br>十六进制 : #6B8E23<br>RGB : (107,142,35) */
    static get grassGreen(): Color;
    /** <p color='#0000FF'>蓝色</p><br>十六进制 : #0000FF<br>RGB : (0,0,255) */
    static get blue(): Color;
    /** <p color='#03A89E'>锰蓝</p><br>十六进制 : #03A89E<br>RGB : (3,168,158) */
    static get manganeseBlue(): Color;
    /** <p color='#191970'>深蓝</p><br>十六进制 : #191970<br>RGB : (25,25,112) */
    static get darkBlue(): Color;
    /** <p color='#00C78C'>土耳其蓝</p><br>十六进制 : #191970<br>RGB : (0,199,140) */
    static get turkeyBlue(): Color;
    /** <p color='#FFFFFF'>白色</p><br>十六进制 : #FFFFFF<br>RGB : (255,255,255) */
    static get white(): Color;
    /** <p color='#F0FFFF'>天蓝灰</p><br>十六进制 : #F0FFFF<br>RGB : (202,235,216) */
    static get skyB1ueGrey(): Color;
    /** <p color='#CCCCCC'>灰色</p><br>十六进制 : #CCCCCC<br>RGB : (192,192,192) */
    static get gray(): Color;
    /** <p color='#FAFFF0'>象牙灰</p><br>十六进制 : #FAFFF0<br>RGB : (251,255,242) */
    static get ivoryGray(): Color;
    /** <p color='#FAF0E6'>亚麻灰</p><br>十六进制 : #FAF0E6<br>RGB : (250,240,230) */
    static get gridelin(): Color;
    /** <p color='#FFFFCD'>杏仁灰</p><br>十六进制 : #FFFFCD<br>RGB : (255,235,205) */
    static get almondGray(): Color;
    /** <p color='#FFF5EE'>贝壳灰</p><br>十六进制 : #FFF5EE<br>RGB : (255,245,238) */
    static get greyShells(): Color;
    /** <p color='#FFFF00'>黄色</p><br>十六进制 : #FFFF00<br>RGB : (255,255,0) */
    static get yellow(): Color;
    /** <p color='#FF9912'>镉黄</p><br>十六进制 : #FF9912<br>RGB : (255,153,18) */
    static get cadmiumYellow(): Color;
    /** <p color='#E3CF57'>香蕉黄</p><br>十六进制 : #E3CF57<br>RGB : (227,207,87) */
    static get bananaYellow(): Color;
    /** <p color='#FF7D40'>肉黄</p><br>十六进制 : #FF7D40<br>RGB : (255,125,64) */
    static get meatYellow(): Color;
    /** <p color='#ED9121'>萝卜黄</p><br>十六进制 : #ED9121<br>RGB : (237,145,33) */
    static get radishYellow(): Color;
    /** <p color='#8B864E'>黑黄</p><br>十六进制 : #8B864E<br>RGB : (85,102,0) */
    static get blackYellow(): Color;
    /** <p color='#C76114'>土色</p><br>十六进制 : #C76114<br>RGB : (199,97,20) */
    static get soil(): Color;
    /** <p color='#F4A460'>沙棕色</p><br>十六进制 : #F4A460<br>RGB : (244,164,95) */
    static get sandyBrown(): Color;
    /** <p color='#D2B48C'>棕褐色</p><br>十六进制 : #D2B48C<br>RGB : (210,180,140) */
    static get sepia(): Color;
    /** <p color='#BC8F8F'>赫色</p><br>十六进制 : #BC8F8F<br>RGB : (188,143,143) */
    static get ocher(): Color;
    /** <p color='#DA70D6'>淡紫色</p><br>十六进制 : #DA70D6<br>RGB : (218,112,214) */
    static get lavender(): Color;
    /** <p color='#8A2BE2'>紫罗兰</p><br>十六进制 : #8A2BE2<br>RGB : (138,43,226) */
    static get violet(): Color;
    /** <p color='#9933FA'>胡紫色</p><br>十六进制 : #9933FA<br>RGB : (153,51,250) */
    static get huPurple(): Color;
}
/**
 * 掩码类
 */
declare class Mask {
    /** 掩码的十进制值 */
    private _$maskNum;
    constructor(maskNum?: number);
    /** 获取掩码的十进制值 */
    get maskNum(): number;
    /** 设置掩码的十进制值 */
    set maskNum(value: number);
    /** 设置掩码 */
    setMask(list: number[]): void;
    /** 获取掩码下标值组 */
    getMask(): number[];
}
/**
 * 点对象
 * 相比于Vector对象更加轻量级,没有过多的函数
 */
declare class Point {
    /** 点的x坐标 */
    x: number;
    /** 点的y坐标 */
    y: number;
    /**
     * 创建一个Point对象,参数为 Point 或 Vector 或 number 或 不填
     * @param arg Point 或 Vector 或 number 或 不填
     */
    constructor(...arg: (number | Point | Vector)[]);
    /** 比较两个点的值是否相等 */
    equals(point: Point): boolean;
    /** 转换为字符串 */
    toString(): string;
}
/**
 * 二维向量
 */
declare class Vector {
    /** x坐标 */
    x: number;
    /** y坐标 */
    y: number;
    /**
     * 创建一个Vector对象,参数为 Vector 或 Point 或 number 或 不填
     * @param arg Vector 或 Point 或 number 或 不填
     */
    constructor(...arg: (number | Point | Vector)[]);
    /** 向量值为(0,0) */
    static get zero(): Vector;
    /** 向量值为(1,0) */
    static get right(): Vector;
    /** 向量值为(-1,0) */
    static get left(): Vector;
    /** 向量值为(0,-1) */
    static get up(): Vector;
    /** 向量值为(0,1) */
    static get down(): Vector;
    /** 向量值为(1,1) */
    static get one(): Vector;
    /** 向量值为(-1,-1) */
    static get negOne(): Vector;
    /** 获取向量长度 */
    get length(): number;
    /** 获取向量角度(弧度制),返回向量相对于X轴的弧度角,即(1,0)向量 */
    get angle(): number;
    /** 向量相加 */
    add(vector: Vector | number): Vector;
    /** 向量相减 */
    reduce(vector: Vector | number): Vector;
    /** 向量相乘 */
    multiply(vector: Vector | number): Vector;
    /** 向量相除 */
    divide(vector: Vector | number): Vector;
    /** 向量取模 */
    mod(vector: Vector | number): Vector;
    /** 向量整除 */
    div(vector: Vector | number): Vector;
    /** 返回与vector的点积 */
    dot(vector: Vector): number;
    /** 返回与vector的叉积 */
    cross(vector: Vector): number;
    /** 向量归一化,返回缩放到单位长度的向量,归一化的向量不能为(0,0) */
    normalization(): Vector;
    /** 返回两个向量间的弧度角 */
    angleTo(vector: Vector): number;
    /** 返回连接两个点的线和X坐标之间的弧度角. */
    angleToPoint(vector: Vector | Point): number;
    /** 根据角度旋转向量 */
    rotated(angle: number): Vector;
    /** 返回绝对值向量 */
    abs(): Vector;
    /** 返回向量,其中所有分量都向下取整*/
    floor(): Vector;
    /** 返回向量,其中所有分量都向上取整*/
    ceil(): Vector;
    /** 返回向量,其中所有分量都四舍五入到最接近的整数 */
    round(): Vector;
    /** 返回向量,其中每个分量设置为一个或一个负数,具体取决于分量的符号 */
    sign(): Vector;
    /** 返回到vector向量的距离 */
    distanceTo(vector: Vector): number;
    /** 返回一个角度相同,长度为length的向量 */
    clamped(length: number): Vector;
    /** 将向量朝vector移动固定的delta数量 */
    moveToward(vector: Vector, delta: number): Vector;
    /** 比较两个向量值是否相等 */
    equals(vector: Vector): boolean;
    /** 转换为字符串 */
    toString(): string;
}
/**
 * 圆类
 */
declare class Circle implements Shape {
    /** 坐标点:x */
    x: number;
    /** 坐标点:y */
    y: number;
    /** 圆的半径 */
    r: number;
    /**
     * 创建一个圆形,参数为 Circle 或 (Point,radius) 或 (Vector,radius) 或 number(x,y,r) 或 不填
     * @param arg Circle 或 (Point,radius) 或 (Vector,radius) 或 number(x,y,r) 或 不填
     */
    constructor(...arg: (number | Point | Vector | Circle)[]);
    /** 比较两个圆形的值是否相等 */
    equals(circle: Circle): boolean;
    /** 转换为字符串 */
    toString(): string;
}
/**
 * 矩形类
 */
declare class Rectangle implements Shape {
    /** 坐标点:x */
    x: number;
    /** 坐标点:y */
    y: number;
    /** 矩形宽度 */
    w: number;
    /** 矩形高度 */
    h: number;
    /**
     * 创建一个矩形,参数为 Rectangle 或 (Point1,Point2) 或 (Vector1,Vector2) 或 number(x,y,w,h) 或 不填
     * @param arg Rectangle 或 (Point1,Point2) 或 (Vector1,Vector2) 或 number(x,y,w,h) 或 不填
     */
    constructor(...arg: (number | Point | Vector | Rectangle | undefined)[]);
    /** 比较两个矩形的值是否相等 */
    equals(rectangle: Rectangle): boolean;
    /** 转换为字符串 */
    toString(): string;
}
/**
 * 形状类
 */
interface Shape {
    /** 坐标点:x */
    x: number;
    /** 坐标点:y */
    y: number;
    /** 比较两个形状是否相同 */
    equals(shape: Shape): boolean;
    toString(): any;
}
/**
 * 鼠标按键映射值
 */
declare enum buttonList {
    Left = 0,
    Middle = 1,
    Right = 2
}
/**
 * 鼠标指针样式
 */
declare enum cursorStyle {
    /** 默认光标（通常是一个箭头） */
    Default = "default",
    /** 默认浏览器设置的光标 */
    Auto = "auto",
    /** 光标呈现为十字线 */
    Crosshair = "crosshair",
    /** 光标呈现为指示链接的指针（一只手） */
    Pointer = "pointer",
    /** 此光标指示某对象可被移动 */
    Move = "move",
    /** 此光标指示矩形框的边缘可被向右（东）移动 */
    E_resize = "e-resize",
    /** 此光标指示矩形框的边缘可被向上及向右移动（北/东） */
    Ne_resize = "ne-resize",
    /** 此光标指示矩形框的边缘可被向上及向左移动（北/西） */
    Nw_resize = "nw-resize",
    /** 此光标指示矩形框的边缘可被向上（北）移动 */
    N_resize = "n-resize",
    /** 此光标指示矩形框的边缘可被向下及向右移动（南/东） */
    Se_resize = "se-resize",
    /** 此光标指示矩形框的边缘可被向下及向左移动（南/西） */
    Sw_resize = "sw-resize",
    /** 此光标指示矩形框的边缘可被向下移动（北/西） */
    S_resize = "s-resize",
    /** 此光标指示矩形框的边缘可被向左移动（西） */
    W_resize = "w-resize",
    /** 此光标指示文本 */
    Text = "text",
    /** 此光标指示程序正忙（通常是一只表或沙漏） */
    Wait = "wait",
    /** 此光标指示可用的帮助（通常是一个问号） */
    Help = "help"
}
/**
 * 输入类
 */
declare class Input {
    /** 一直在按下的key,临时储存 */
    private static _$keyActionTemp;
    /** 第一次按下的key,临时储存 */
    private static _$keyDownTemp;
    /** 松开的key,临时储存 */
    private static _$keyUpTemp;
    /** 鼠标的位置,临时储存 */
    private static _$mousePosTemp;
    /** 鼠标的全局位置,临时储存 */
    private static _$mouseGlobalPosTemp;
    /** 一直在按下的mouseButton,临时储存 */
    private static _$buttonActionTemp;
    /** 第一次按下的mouseButton,临时储存 */
    private static _$buttonDownTemp;
    /** 松开的mouseButton,临时储存 */
    private static _$buttonUpTemp;
    /** 鼠标滚轮的滚动,临时储存 */
    private static _$mouseWheelTemp;
    /** 一直在按下的key */
    private static _$keyAction;
    /** 第一次按下的key */
    private static _$keyDown;
    /** 松开的key */
    private static _$keyUp;
    /** 鼠标的位置 */
    private static _$mousePos;
    /** 鼠标的全局位置 */
    private static _$mouseGlobalPos;
    /** 一直在按下的mouseButton */
    private static _$buttonAction;
    /** 第一次按下的mouseButton */
    private static _$buttonDown;
    /** 松开的mouseButton */
    private static _$buttonUp;
    /** 鼠标滚轮的滚动 */
    private static _$mouseWheel;
    /** 鼠标指针样式 */
    private static _$cursorStyle;
    /** 鼠标指针点击时样式 */
    private static _$cursorCheckStyle;
    /** 每帧更新方法,由系统调用 */
    _$beforeUpdate(): void;
    /** 每帧更新方法,由系统调用 */
    _$afterUpdate(): void;
    /** 监听鼠标的位置,并设置值,系统调用 */
    static _$setMousePos(x: number, y: number): void;
    /** 监听鼠标在页面的位置,并设置值,系统调用 */
    static _$setMouseGlobalPos(x: number, y: number): void;
    /** 监听鼠标滚轮状态,并设置值,系统调用 */
    static _$setMouseWheel(type: number): void;
    /** 激活键盘上的某个按键,下一帧生效 */
    static keyDown(keyCode: number): void;
    /** 取消激活键盘上的某个按键,下一帧生效 */
    static keyUp(keyCode: number): void;
    /** 激活键鼠标的某个按键,下一帧生效 */
    static buttonDown(button: number): void;
    /** 取消激活鼠标上的某个按键,下一帧生效 */
    static buttonUp(button: number): void;
    /** 清除按键状态,立即生效 */
    static clearKey(): void;
    /** 当定的按键被用户按住时返回1*/
    static getKey(...key: (number | keyList)[]): number;
    /** 当指定的按键被用户按下的那一帧返回1 */
    static getKeyDown(...key: (number | keyList)[]): number;
    /** 当指定的按键被用户松开的那一帧返回1 */
    static getKeyUp(...key: (number | keyList)[]): number;
    /** 获取鼠标坐标 */
    static getMousePosition(): Vector;
    /** 获取鼠标全局坐标,也就是鼠标在页面的坐标 */
    static getMouseGlobalPosition(): Vector;
    /** 当指定的鼠标按键被用户按住时返回1 */
    static getButton(...button: (number | buttonList)[]): number;
    /** 当指定的鼠标按键被用户按下的那一帧返回1 */
    static getButtonDown(...button: (number | buttonList)[]): number;
    /** 当指定的鼠标按键被用户松开的那一帧返回1 */
    static getButtonUp(...button: (number | buttonList)[]): number;
    /** 获取鼠标滚轮状态,1向上滚动,-1向下滚动,0未滚动 */
    static getMouseWheel(): number;
    /** 获取鼠标指针样式 */
    static get cursorStyle(): string;
    /** 设置鼠标指针样式 */
    static set cursorStyle(style: string | cursorStyle);
    /** 获取鼠标指针点击时样式 */
    static get cursorCheckStyle(): string;
    /** 设置鼠标指针点击时样式 */
    static set cursorCheckStyle(style: string | cursorStyle);
    /** 设置鼠标指针图片 */
    static setCursorImage(url: string, xOffset?: number, yOffset?: number): void;
    /** 设置鼠标指针点击时图片 */
    static setCursorCheckImage(url: string, xOffset?: number, yOffset?: number): void;
}
/**
 * 键盘映射值
 */
declare enum keyList {
    BackSpace = 8,
    Tab = 9,
    Clear = 12,
    Enter = 13,
    Shift = 16,
    Control = 17,
    Alt = 18,
    Pause = 19,
    Caps_Lock = 20,
    Escape = 27,
    space = 33,
    Prior = 32,
    Next = 34,
    End = 35,
    Home = 36,
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    Select = 41,
    Print = 42,
    Execute = 43,
    Insert = 45,
    Delete = 46,
    Help = 47,
    Num_0 = 48,
    Num_1 = 49,
    Num_2 = 50,
    Num_3 = 51,
    Num_4 = 52,
    Num_5 = 53,
    Num_6 = 54,
    Num_7 = 55,
    Num_8 = 56,
    Num_9 = 57,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    KP_0 = 96,
    KP_1 = 97,
    KP_2 = 98,
    KP_3 = 99,
    KP_4 = 100,
    KP_5 = 101,
    KP_6 = 102,
    KP_7 = 103,
    KP_8 = 104,
    KP_9 = 105,
    KP_Multiply = 106,
    KP_Add = 107,
    KP_Separator = 108,
    KP_Subtract = 109,
    KP_Decimal = 110,
    KP_Divide = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    F13 = 124,
    F14 = 125,
    F15 = 126,
    F16 = 127,
    F17 = 128,
    F18 = 129,
    F19 = 130,
    F20 = 131,
    F21 = 132,
    F22 = 133,
    F23 = 134,
    F24 = 135,
    Num_Lock = 136,
    Scroll_Lock = 137,
    Mode_switch = 254
}
/**
 * 线程类
 */
declare class Thread {
    /** 游戏每秒运行的帧数 */
    private _$speed;
    /** 游戏上一帧运行所用的时间 */
    private _$delta;
    /** 记录上一帧的时间戳 */
    private _$prevTime;
    /** 游戏运行的fps */
    private _$fps;
    /** 游戏已运行的帧数 */
    private _$timeIndex;
    /** 线程暂停毫秒数 */
    private _$sleepTime;
    /** 上一帧逻辑代码帧运行运行时间 */
    private _$prevUseTime;
    constructor(speed?: number);
    /** 获取游戏上一帧运行所用的时间 */
    get delta(): number;
    /** 获取游戏每秒运行的帧数 */
    get speed(): number;
    /** 设置游戏每秒运行的帧数,默认60 */
    set speed(speed: number);
    /** 获取游戏Fps */
    get fps(): number;
    /** 获取游戏已运行的帧数 */
    get timeIndex(): number;
    /** 获取上一帧逻辑代码帧运行运行时间 */
    get prevUseTime(): number;
    /**
     * 开始执行线程,如果方法func返回false,线程结束
     * @param func 执行方法
     * @param useTime 上一帧方法执行时间,选填
     */
    run(func: (delta: number) => void | boolean, useTime?: number): void;
    /** 返回上一次调用与这一次调用的时间差 */
    _$useTime(): number;
    /** 线程暂停毫秒 */
    sleep(timer: number): void;
}
/**
 * 画布类
 */
declare class Canvas {
    /** 画布的dom对象 */
    private readonly _$canvasElement;
    /** 当前画布的笔刷 */
    private readonly _$brush;
    /** 画布矩形对象 */
    private readonly _$rectangle;
    /** 画布z轴索引 */
    private _$zIndex;
    /** 启用图像平滑显示 */
    private _$imageSmoothing;
    /** 画布背景颜色 */
    private _$color;
    constructor(rectangle: Rectangle);
    /** 获得笔刷 */
    get brush(): Brush;
    /** 获取画布原dom对象 */
    get canvasElement(): HTMLCanvasElement;
    /** 获取z轴索引,不会小于0! */
    get zIndex(): number;
    /** 设置z轴索引,不能小于0! */
    set zIndex(value: number);
    /** 清空画布 */
    clear(rectangle?: Rectangle): void;
    /** 获取是否启用图像平滑显示 */
    get imageSmoothing(): boolean;
    /** 设置是否启用图像平滑显示 */
    set imageSmoothing(value: boolean);
    /** 获取画布背景颜色 */
    get color(): string;
    /** 设置画布背景颜色 */
    set color(value: string);
}
/**
 * 游戏世界
 */
declare class World {
    /** 游戏世界的画布对象 */
    private static _$canvas;
    /** 节点树 */
    private static _$worldTree;
    /** 线程对象 */
    private static _$thread;
    /** 输入对象 */
    private static _$input;
    /** 画布的父节点 */
    private static _$divNode;
    /** 是否调用过初始化方法,init方法只能调用一次 */
    private static _$isInit;
    /**
     * 初始化游戏世界,并创建游戏世界
     * @param divNode 要嵌入的标签对象
     * @param x x坐标
     * @param y y坐标
     * @param width 画布宽度
     * @param height 画布高度
     * @param zIndex 画布z轴索引,不能小于0
     */
    static Init(divNode: HTMLElement, x?: number, y?: number, width?: number, height?: number, zIndex?: number): void;
    private constructor();
    /** 获取画布 */
    static get canvas(): Canvas;
    /** 获取节点树 */
    static get worldTree(): WorldTree;
    /** 获取线程对象 */
    static get thread(): Thread;
    /** 获取画布的父节点 */
    static get divNode(): HTMLElement;
    /** 每帧调用方法 */
    private static updateFunc;
}
/**
 * 世界的节点树
 */
declare class WorldTree {
    /** 当前活动的节点,根节点 */
    private _$currentNode;
    /** 节点树 */
    constructor();
    /** 获取当前活动的节点 */
    get currentNode(): NodeBase;
    /** 设置当前活动的节点 */
    set currentNode(node: NodeBase);
}
/**
 * 画笔类
 */
declare class Brush {
    /** 画布的上下文对象 */
    private readonly _$context2D;
    /** 记录当前对象的全局alpha值,系统内部变量 */
    _$tempGlobalAlpha: number;
    private static vector;
    /**
     * 创建画笔类
     * @param context 当前层的画布的上下文对象
     */
    constructor(context: CanvasRenderingContext2D);
    /**
     * 获取画布的上下文对象,<br>
     */
    get context(): CanvasRenderingContext2D;
    /** 重置画布坐标,缩放,旋转,让画布transform属性回到默认值 */
    resetTransform(): void;
    /** 改变画布的初始坐标 */
    translate(position: Vector): void;
    /** 旋转画布 */
    rotate(angle: number): void;
    /** 缩放画布 */
    scale(vector: Vector): void;
    /** 设置绘制的alpha值,(0-1) */
    alpha(alpha: number): void;
    /** 设置画笔颜色 */
    setColor(color: string | Color): void;
    /** 获取画笔颜色 */
    getColor(): string;
    /** 画一个圆 */
    drawCircle(position: Vector | Point, radius: number): void;
    /** 画一个填充圆 */
    drawFillCircle(position: Vector | Point, radius: number): void;
    /** 画一个矩形 */
    drawRect(position: Vector | Point, size: Vector | Point): void;
    /** 画一个填充矩形 */
    drawFillRect(position: Vector | Point, size: Vector | Point): void;
    /** 画一个路径 */
    drawPath(...point: (Vector | Point)[]): void;
    /** 画一个填充路径 */
    drawFillPath(...point: (Vector | Point)[]): void;
    /** 画一条线 */
    drawLine(start: Vector | Point, end: Vector | Point): void;
    /** 绘制文字 */
    drawText(position: Vector | Point, str: string): void;
}
/**
 * 负责存储在其他类中需要调用的系统属性或方法
 * NodeBase类的内部属性方法
 */
interface _$NodeBaseInside {
    /** 子节点树,内部变量 */
    _$childTree: Tree;
    /** 父节点树,内部变量 */
    _$parentTree: Tree | undefined;
    /**
     * 绘制方法,每帧调用,通过brush来画图,
     * 该方法会在update方法之后调用,zindex越小调用就越早
     * @param brush 画笔
     */
    _$nodeDraw: (brush: Brush, drawFunc?: () => void) => void;
}
/**
 * 节点基类
 */
declare abstract class NodeBase implements Obj {
    /**
     * 初始化方法,当节点被创建时调用
     */
    abstract init(): void;
    /**
     * 当节点被其他节点指认为子节点时,会在帧结束时调用start()方法
     */
    abstract start(): void;
    /**
     * 当加入到主场景的节点树后,每一帧都会调用该方法,
     * delta为上一帧执行时间
     * @param delta 上一帧执行时间
     */
    abstract update(delta: number): void;
    /**
     * 当节点离开节点树后再该帧结束时调用,
     * 也就是调用free()方法后执行该方法
     */
    abstract leave(): void;
    /**
     * 初始化方法,系统内部调用
     * @private
     */
    _$nodeInit(): void;
    /**
     * 开始方法,系统内部调用
     */
    _$nodeStart(): void;
    /**
     * 每帧执行方法,系统调用
     * @param delta
     */
    _$nodeUpdate(delta: number): void;
    /**
     * 离开节点方法,系统调用
     */
    _$nodeLeave(): void;
    /** 实例化节点 */
    protected constructor(name?: string);
    /**
     *  负责存储在其他类中需要调用的系统属性或方法
     */
    _$inside: {
        _$childTree: Tree;
        _$parentTree: undefined;
        _$nodeDraw: (brush: Brush, drawFunc?: (() => void) | undefined) => void;
    };
    /**
     * 绘制方法,每帧调用,通过brush来画图,
     * 该方法会在update方法之后调用,zindex越小调用就越早
     * @param brush 画笔
     */
    draw: ((brush: Brush) => void) | undefined;
    /** 节点名称 */
    private _$name;
    /** 节点相对于父节点的坐标 */
    private _$position;
    /** 节点相对于父节点的旋转角度 */
    private _$rotation;
    /** 节点相对于父节点的缩放比 */
    private _$scale;
    /** 节点相对于父节点的绘制透明度 */
    private _$alpha;
    /** 节点相对于场景根节点的坐标 */
    private _$globalPosition;
    /** 节点相对于场景根节点的旋转角度 */
    private _$globalRotation;
    /** 节点相对于场景根节点的缩放比 */
    private _$globalScale;
    /** 节点相对于场景根节点的绘制透明度 */
    private _$globalAlpha;
    /** 节点绘制的z轴坐标 */
    private _$zIndex;
    /** 节点是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
    private _$visible;
    /** 是否继承父节点的transform */
    private _$inheritTransform;
    /** 子节点树,内部变量 */
    /** 父节点树,内部变量 */
    _$parentTree: Tree | undefined;
    get name(): string;
    set name(name: string);
    get position(): Vector;
    set position(value: Vector);
    get rotation(): number;
    set rotation(value: number);
    get scale(): Vector;
    set scale(value: Vector);
    /** 获取节点相对于父节点的绘制透明度,值范围0-1 */
    get alpha(): number;
    /** 设置节点相对于父节点的绘制透明度,值范围0-1 */
    set alpha(value: number);
    /** 获取节点相对于场景根节点的坐标 */
    get globalPosition(): Vector;
    set globalPosition(value: Vector);
    /** 获取节点相对于场景根节点的旋转角度 */
    get globalRotation(): number;
    set globalRotation(value: number);
    get globalScale(): Vector;
    set globalScale(value: Vector);
    /** 获取节点相对于场景根节点的绘制透明度 */
    get globalAlpha(): number;
    set globalAlpha(value: number);
    /** 获取节点是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
    get visible(): boolean;
    /** 设置是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
    set visible(visible: boolean);
    /** 获取是否继承父节点的transform */
    get inheritTransform(): boolean;
    /**
     * 设置是否继承父节点的transform
     */
    set inheritTransform(value: boolean);
    /** 获取z轴索引,值越小表示越深,不会小于-1000! */
    get zIndex(): number;
    /** 设置z轴索引,值越小表示越深,不能小于-1000! */
    set zIndex(value: number);
    /** 获取子节点树 */
    get childTree(): Tree;
    /** 获取父节点 */
    get parent(): NodeBase | undefined;
    /** 获取父节点树 */
    get parentTree(): Tree | undefined;
    /** 将该对象从节点树中脱离,子节点也会被调用free()方法 */
    free(): NodeBase;
    /**
     * 根据索引获取子节点
     * @param index
     */
    getChild(index: number): NodeBase | undefined;
    /**
     * 获取子节点个数
     */
    getChildCount(): number;
    /**
     * 获取所有子节点对象
     */
    getChildren(): NodeBase[];
    /**
     * 获取所有父级节点对象,按层级排列
     */
    getParents(): NodeBase[];
    /**
     * 向下遍历所有子节点
     * @param func 调用方法,如果返回false那么将终止该条线路的循环
     * @param index 当前子节点索引,不需要手动传该参数
     * @param layer 当前层级,不需要手动传该参数
     */
    eachChildren(func: (node: NodeBase, index?: number, layer?: number) => void | boolean, index?: number, layer?: number): void;
    /**
     * 向上遍历父节点,到场景根节点为止<br>
     * func函数返回false则会终止遍历
     */
    eachParentUp(func: (node: NodeBase) => void | boolean): void;
    /**
     * 向下遍历父节点,从场景根节点开始<br>
     * func函数返回false则会终止遍历
     */
    eachParentDown(func: (node: NodeBase) => void | boolean): void;
    /**
     * 添加子节点,注意:调用该方法添加的子节点不会立刻添加到节点树中,而是要等该帧结束才会加入!
     * @param node 子节点
     */
    addChild(node: NodeBase): void;
    /**
     * 移除一个子节点
     * @param node 子节点
     */
    removeChild(node: NodeBase): void;
    /**
     * 移除所有子节点
     */
    removeAllChild(): void;
}
/**
 * 2d节点
 */
declare class Node2D extends NodeBase {
    constructor(name?: string);
    init(): void;
    start(): void;
    update(delta: number): void;
    leave(): void;
}
/**
 * 精灵节点
 */
declare class Sprite extends Node2D {
    /** 需要绘制的纹理 */
    private _$texture;
    /** 混合的颜色 */
    private _$blend;
    /** 精灵是否居中显示,默认false */
    private _$centered;
    /** 精灵x轴偏移 */
    private _$xOffset;
    /** 精灵y轴偏移 */
    private _$yOffset;
    /** 是否启用精灵显示区域,默认false */
    private _$regionEnable;
    /** 精灵显示区域 */
    private _$regionRect;
    /** 垂直帧数,必须大于0 */
    private _$vFrames;
    /** 水平帧数,必须大于0 */
    private _$hFrames;
    /** 当前显示帧数,下标从0开始,不会大于 (vFrames * hFrames) - 1 */
    private _$frame;
    constructor(name: string);
    /** 获取绘制的纹理 */
    get texture(): HTMLImageElement | undefined;
    /** 设置绘制的纹理 */
    set texture(image: HTMLImageElement | undefined);
    /** 获取精灵x轴偏移*/
    get xOffset(): number;
    /** 设置精灵x轴偏移*/
    set xOffset(value: number);
    /** 获取精灵y轴偏移 */
    get yOffset(): number;
    /** 设置精灵y轴偏移 */
    set yOffset(value: number);
    /** 获取精灵是否居中显示,默认false */
    get centered(): boolean;
    /** 设置精灵是否居中显示,默认false */
    set centered(value: boolean);
    /** 获取是否启用精灵显示区域,默认false */
    get regionEnable(): boolean;
    /** 设置是否启用精灵显示区域,默认false */
    set regionEnable(value: boolean);
    /** 获取精灵显示区域 */
    get regionRect(): Rectangle;
    /** 设置精灵显示区域 */
    set regionRect(value: Rectangle);
    /** 获取垂直帧数,必须大于0 */
    get vFrames(): number;
    /** 设置垂直帧数,必须大于0 */
    set vFrames(value: number);
    /** 获取水平帧数,必须大于0 */
    get hFrames(): number;
    /** 设置水平帧数,必须大于0 */
    set hFrames(value: number);
    /** 获取当前显示帧数,下标从0开始,<br>不会大于 (vFrames * hFrames) - 1 */
    get frame(): number;
    /** 设置当前显示帧数,下标从0开始,<br>不会大于 (vFrames * hFrames) - 1 */
    set frame(value: number);
}
/**
 * 碰撞检测节点
 */
declare class Collision extends Node2D {
    /** 是否禁用碰撞检测 */
    private _$disable;
    /** 碰撞器形状 */
    private _$shape;
}
/**
 * 游戏物体基类接口
 */
interface Obj {
}
/**
 * 节点树类型
 */
declare type TreeType = Tree[] | undefined;
/**
 * 节点键直对
 */
declare type TreeParChi = {
    parent: Tree;
    child: Tree;
};
/**
 * 节点树类
 */
declare class Tree {
    /** node节点 */
    node: NodeBase;
    /** node子节点 */
    child: TreeType;
    constructor(node: NodeBase, child: TreeType);
    /**
     * 遍历当前节点以及子节点
     * @param func 调用方法,如果返回false那么将终止该条线路的循环
     * @param index 当前子节点索引,不需要手动传该参数
     * @param layer 当前层级,不需要手动传该参数
     */
    each(func: (tree: Tree, index?: number, layer?: number) => void | boolean, index?: number, layer?: number): void;
    /**
     * 节点树下添加子节点
     * @param tree 节点树
     */
    addChild(tree: Tree): Tree;
    /**
     * 移除一个子节点,返回是否移除成功
     * @param tree 需要移除的节点树
     */
    removeChild(tree: Tree): boolean;
    /**
     * 移除所有子节点
     */
    removeAllChild(): void;
    /** 根据节点名称查找节点,允许使用'/'分割名称 */
    find(name: string): [NodeBase?];
    /** 查询一个节点是否存在于节点树中 */
    hasNode(tree: Tree): boolean;
    /** 控制台打印节点树结构,通常用于debug时调用 */
    printTreePretty(): void;
    /** 需要调用初始化方法的节点,也就是刚被加入节点树的节点 */
    private static _$initNode;
    /** 需要移出节树的节点,也就是被removeChild的节点 */
    private static _$removeNode;
    /** 需要移除所有子节点的节点,也就是调用removeAllChild的节点 */
    private static _$removeAllNode;
    /** 需要调用leave()化方法的节点,也就是被free()的节点 */
    private static _$leaveNode;
    /** 添加初始化节点,系统内部调用 */
    static _$addInitNode(parent: Tree, child: Tree): void;
    /** 调用节点的start方法,并清理initNode,系统调用 */
    static _$callInitNode(): void;
    /** 添加移除节点,系统内部调用 */
    static _$addRemoveNode(parent: Tree, child: Tree): void;
    /** 调用移除节点,系统调用 */
    static _$callRemoveNode(): void;
    /** 添加离开的节点,系统内部调用 */
    static _$addRemoveAllNode(node: NodeBase): void;
    /** 调用移除节点,系统调用 */
    static _$callRemoveAllNode(): void;
    /** 添加离开的节点,系统内部调用 */
    static _$addLeaveNode(node: NodeBase): void;
    /** 调用节点的leave方法,并清理leaveNode,系统调用 */
    static _$callLeaveNode(): void;
}
