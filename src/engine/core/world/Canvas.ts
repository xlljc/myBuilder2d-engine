namespace MyBuilder {

    /**
     * 画布类
     */
    export class Canvas {

        /** 画布的dom对象 */
        private readonly _$canvasElement: HTMLCanvasElement;

        /** 当前画布的笔刷 */
        private readonly _$brush: Brush;

        /** 画布矩形对象,画布区域 */
        private _$area: Rectangle;

        /** 画布z轴索引 */
        private _$zIndex: number = 1000;

        /** 启用图像平滑显示 */
        private _$imageSmoothing: boolean = true;

        /** 画布背景颜色 */
        private _$color: string = "#000";

        /** 画布全局缩放 */
        private _$globalScale: Vector = Vector.one;

        /** 画布全局角度 */
        private _$globalRotation: number = 0;

        /** 画布全局position */
        private _$globalPosition: Vector = Vector.zero;

        /** 画布全局透明度 */
        private _$globalAlpha: number = 1;

        //*********************************************************

        constructor(area: Rectangle) {
            this._$area = area;
            this._$canvasElement = document.createElement("canvas");
            this._$canvasElement.innerHTML = "您的浏览器不支持canvas! 请更换浏览器!"
            this._$canvasElement.style.marginLeft = area.x + "px";
            this._$canvasElement.style.marginTop = area.y + "px";
            this._$canvasElement.width = area.w;
            this._$canvasElement.height = area.h;
            this._$canvasElement.style.position = "absolute";
            // @ts-ignore
            this._$brush = new Brush(this._$canvasElement.getContext("2d"));
        }

        /** 获得笔刷 */
        public get brush(): Brush {
            return this._$brush;
        }

        /** 获取画布原dom对象 */
        public get canvasElement(): HTMLCanvasElement {
            return this._$canvasElement;
        }

        /** 获取画布区域 */
        public get area(): Rectangle {
            return this._$area;
        }

        /** 设置画布区域 */
        public set area(value: Rectangle) {
            this._$area = value;
            this._$canvasElement.style.marginLeft = value.x + "px";
            this._$canvasElement.style.marginTop = value.y + "px";
            this._$canvasElement.width = value.w;
            this._$canvasElement.height = value.h;
        }

        /** 获取z轴索引,不会小于0! */
        public get zIndex(): number {
            if (this._$zIndex < 0) this._$zIndex = 0;
            return this._$zIndex;
        }

        /** 设置z轴索引,不能小于0! */
        public set zIndex(value: number) {
            this._$zIndex = value >= 0 && value || 0;
            this._$canvasElement.style.zIndex = this._$zIndex.toString();
        }

        /** 清空画布,参数rectangle不填的话就会清理全屏 */
        public clear(rectangle?: Rectangle) {
            //如果用到了全局旋转
            if (this._$globalRotation) {
                this._$brush.context.rotate(-this._$globalRotation);
                if (rectangle)
                    this._$brush.context.clearRect(-this._$globalPosition.x, -this._$globalPosition.y, rectangle.w, rectangle.h);
                else
                    this._$brush.context.clearRect(-this._$globalPosition.x, -this._$globalPosition.y, this._$area.w, this._$area.h);
                this._$brush.context.rotate(this._$globalRotation);
            } else {
                if (rectangle)
                    this._$brush.context.clearRect(-this._$globalPosition.x, -this._$globalPosition.y, rectangle.w, rectangle.h);
                else
                    this._$brush.context.clearRect(-this._$globalPosition.x, -this._$globalPosition.y, this._$area.w, this._$area.h);
            }
        }

        /** 获取是否启用图像平滑显示 */
        public get imageSmoothing(): boolean {
            return this._$imageSmoothing;
        }

        /** 设置是否启用图像平滑显示 */
        public set imageSmoothing(value: boolean) {
            this._$imageSmoothing = value;
            this.brush.context.imageSmoothingEnabled = value;
        }

        /** 获取画布背景颜色 */
        public get color(): string {
            return this._$color;
        }

        /** 设置画布背景颜色 */
        public set color(value: string) {
            this._$color = value;
            this._$canvasElement.style.backgroundColor = value;
        }

        /** 设置画布全局缩放 */
        public set globalScale(value: Vector) {
            this._$globalScale = value;
        }

        /** 获取画布全局缩放 */
        public get globalScale(): Vector {
            return this._$globalScale;
        }

        /** 设置画布全局角度,弧度制 */
        public set globalRotation(value: number) {
            this._$globalRotation = value;
        }

        /** 获取画布全局角度,弧度制 */
        public get globalRotation(): number {
            return this._$globalRotation;
        }

        /** 设置画布全局position */
        public set globalPosition(value: Vector) {
            this._$globalPosition = value;
        }

        /** 获取画布全局position */
        public get globalPosition(): Vector {
            return this._$globalPosition;
        }

        /** 设置画布全局透明度 (0-1) */
        public set globalAlpha(value: number) {
            this._$globalAlpha = value;
        }

        /** 获取画布全局透明度 (0-1) */
        public get globalAlpha(): number {
            return this._$globalAlpha;
        }

    }

}