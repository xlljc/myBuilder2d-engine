namespace MyBuilder {

    /**
     * 输入类
     */
    export class Input {

        /** 一直在按下的key,临时储存 */
        private static _$keyActionTemp: boolean[] = [];
        /** 第一次按下的key,临时储存 */
        private static _$keyDownTemp: boolean[] = [];
        /** 松开的key,临时储存 */
        private static _$keyUpTemp: boolean[] = [];
        /** 鼠标的位置,临时储存 */
        private static _$mousePosTemp: Vector = Vector.zero;
        /** 鼠标的全局位置,临时储存 */
        private static _$mouseGlobalPosTemp: Vector = Vector.zero;
        /** 一直在按下的mouseButton,临时储存 */
        private static _$buttonActionTemp: boolean[] = [];
        /** 第一次按下的mouseButton,临时储存 */
        private static _$buttonDownTemp: boolean[] = [];
        /** 松开的mouseButton,临时储存 */
        private static _$buttonUpTemp: boolean[] = [];
        /** 鼠标滚轮的滚动,临时储存 */
        private static _$mouseWheelTemp: number = 0;

        /** 一直在按下的key */
        private static _$keyAction: boolean[] = [];
        /** 第一次按下的key */
        private static _$keyDown: boolean[] = [];
        /** 松开的key */
        private static _$keyUp: boolean[] = [];
        /** 鼠标的位置 */
        private static _$mousePos: Vector = Vector.zero;
        /** 鼠标的全局位置 */
        private static _$mouseGlobalPos: Vector = Vector.zero;
        /** 一直在按下的mouseButton */
        private static _$buttonAction: boolean[] = [];
        /** 第一次按下的mouseButton */
        private static _$buttonDown: boolean[] = [];
        /** 松开的mouseButton */
        private static _$buttonUp: boolean[] = [];
        /** 鼠标滚轮的滚动 */
        private static _$mouseWheel: number = 0;

        /** 鼠标指针样式 */
        private static _$cursorStyle: string = "default";
        /** 鼠标指针点击时样式 */
        private static _$cursorCheckStyle: string = "default";

        /** 每帧更新方法,由系统调用 */
        public _$beforeUpdate() {
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
        public _$afterUpdate() {
            Input._$keyDownTemp = [];
            Input._$keyUpTemp = [];
            Input._$buttonDownTemp = [];
            Input._$buttonUpTemp = [];
            Input._$mouseWheelTemp = 0;
        }

        /** 监听鼠标的位置,并设置值,系统调用 */
        public static _$setMousePos(x: number, y: number) {
            Input._$mousePosTemp.x = x;
            Input._$mousePosTemp.y = y;
        }

        /** 监听鼠标在页面的位置,并设置值,系统调用 */
        public static _$setMouseGlobalPos(x: number, y: number) {
            Input._$mouseGlobalPosTemp.x = x;
            Input._$mouseGlobalPosTemp.y = y;
        }

        /** 监听鼠标滚轮状态,并设置值,系统调用 */
        public static _$setMouseWheel(type: number) {
            Input._$mouseWheelTemp = type;
        }

        /** 激活键盘上的某个按键,下一帧生效 */
        public static keyDown(keyCode: number) {
            if (!Input._$keyActionTemp[keyCode]) {
                Input._$keyActionTemp[keyCode] = true;
                Input._$keyDownTemp[keyCode] = true;
            }
        }

        /** 取消激活键盘上的某个按键,下一帧生效 */
        public static keyUp(keyCode: number) {
            Input._$keyActionTemp[keyCode] = false;
            //Input._$keyDownTemp[keyCode] = undefined;
            Input._$keyUpTemp[keyCode] = true;
        }

        /** 激活键鼠标的某个按键,下一帧生效 */
        public static buttonDown(button: number) {
            if (!Input._$buttonActionTemp[button]) {
                Input._$buttonActionTemp[button] = true;
                Input._$buttonDownTemp[button] = true;
            }
        }

        /** 取消激活鼠标上的某个按键,下一帧生效 */
        public static buttonUp(button: number) {
            Input._$buttonActionTemp[button] = false;
            //Input._$buttonDownTemp[button] = undefined;
            Input._$buttonUpTemp[button] = true;
        }

        /** 清除按键状态,立即生效 */
        public static clearKey() {
            Input._$keyAction = [];
            Input._$keyDown = [];
            Input._$keyUp = [];
            Input._$buttonAction = [];
            Input._$buttonDown = [];
            Input._$buttonUp = [];
        }

        /** 当定的按键被用户按住时返回1*/
        public static getKey(...key: (number | keyList)[]): number {
            if (key) {
                for (let i = 0; i < key.length; i++)
                    if (!Input._$keyAction[key[i]]) return 0;
                return 1;
            }
            return 0;
        }

        /** 当指定的按键被用户按下的那一帧返回1 */
        public static getKeyDown(...key: (number | keyList)[]): number {
            if (key) {
                for (let i = 0; i < key.length; i++)
                    if (!Input._$keyDown[key[i]]) return 0;
                return 1;
            }
            return 0;
        }

        /** 当指定的按键被用户松开的那一帧返回1 */
        public static getKeyUp(...key: (number | keyList)[]): number {
            if (key) {
                for (let i = 0; i < key.length; i++)
                    if (!Input._$keyUp[key[i]]) return 0;
                return 1;
            }
            return 0;
        }

        /** 获取鼠标坐标 */
        public static getMousePosition(): Vector {
            return Input._$mousePos;
        }

        /** 获取鼠标全局坐标,也就是鼠标在页面的坐标 */
        public static getMouseGlobalPosition(): Vector {
            return Input._$mouseGlobalPos;
        }

        /** 当指定的鼠标按键被用户按住时返回1 */
        public static getButton(...button: (number | buttonList)[]): number {
            if (button) {
                for (let i = 0; i < button.length; i++)
                    if (!Input._$buttonAction[button[i]]) return 0;
                return 1;
            }
            return 0;
        }

        /** 当指定的鼠标按键被用户按下的那一帧返回1 */
        public static getButtonDown(...button: (number | buttonList)[]): number {
            if (button) {
                for (let i = 0; i < button.length; i++)
                    if (!Input._$buttonDown[button[i]]) return 0;
                return 1;
            }
            return 0;
        }

        /** 当指定的鼠标按键被用户松开的那一帧返回1 */
        public static getButtonUp(...button: (number | buttonList)[]): number {
            if (button) {
                for (let i = 0; i < button.length; i++)
                    if (!Input._$buttonUp[button[i]]) return 0;
                return 1;
            }
            return 0;
        }

        /** 获取鼠标滚轮状态,1向上滚动,-1向下滚动,0未滚动 */
        public static getMouseWheel(): number {
            return Input._$mouseWheel;
        }

        /** 获取鼠标指针样式 */
        public static get cursorStyle(): string {
            return Input._$cursorStyle;
        }

        /** 设置鼠标指针样式 */
        public static set cursorStyle(style: string | cursorStyle) {
            Input._$cursorStyle = style;
            World.divNode.style.cursor = style;
        }

        /** 获取鼠标指针点击时样式 */
        public static get cursorCheckStyle(): string {
            return Input._$cursorCheckStyle;
        }

        /** 设置鼠标指针点击时样式 */
        public static set cursorCheckStyle(style: string | cursorStyle) {
            Input._$cursorCheckStyle = style;
        }

        /** 设置鼠标指针图片 */
        public static setCursorImage(url: string, xOffset: number = 0, yOffset: number = 0) {
            Input._$cursorStyle = "url(" + url + ") " + xOffset + " " + yOffset + ",auto";
            World.divNode.style.cursor = Input._$cursorStyle;
        }

        /** 设置鼠标指针点击时图片 */
        public static setCursorCheckImage(url: string, xOffset: number = 0, yOffset: number = 0) {
            Input._$cursorCheckStyle = "url(" + url + ") " + xOffset + " " + yOffset + ",auto";
        }
    }

}