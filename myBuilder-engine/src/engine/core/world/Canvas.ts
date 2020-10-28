/**
 * 画布类
 */
class Canvas {

    /** 画布的dom对象 */
    private readonly _$canvasElement: HTMLCanvasElement;

    /** 当前画布的笔刷 */
    private readonly _$brush: Brush;

    /** 画布矩形对象 */
    private readonly _$rectangle: Rectangle;

    /** 画布z轴索引 */
    private _$zIndex: number = 1000;

    /** 启用图像平滑显示 */
    private _$imageSmoothing: boolean = true;

    /** 画布背景颜色 */
    private _$color: string = "#000";

    //**********************记得填坑:画布缩放

    //*********************************************************

    constructor(rectangle: Rectangle) {
        this._$rectangle = rectangle;
        this._$canvasElement = document.createElement("canvas");
        this._$canvasElement.innerHTML = "您的浏览器不支持canvas! 请更换浏览器!"
        this._$canvasElement.style.marginLeft = rectangle.x + "px";
        this._$canvasElement.style.marginTop = rectangle.y + "px";
        this._$canvasElement.width = rectangle.w;
        this._$canvasElement.height = rectangle.h;
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

    /** 清空画布 */
    public clear(rectangle?: Rectangle) {
        if (rectangle)
            this._$brush.context.clearRect(0, 0, rectangle.w, rectangle.h);
        else
            this._$brush.context.clearRect(0, 0, this._$rectangle.w, this._$rectangle.h);
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
}