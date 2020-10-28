/**
 * 画笔类
 */
class Brush {
    /** 画布的上下文对象 */
    private readonly _$context2D: CanvasRenderingContext2D;

    /** 记录当前对象的全局alpha值,系统内部变量 */
    public _$tempGlobalAlpha: number = 1;

    private static vector: Point = new Point();
    /**
     * 创建画笔类
     * @param context 当前层的画布的上下文对象
     */
    constructor(context: CanvasRenderingContext2D) {
        this._$context2D = context;
    }

    /**
     * 获取画布的上下文对象,<br>
     */
    public get context(): CanvasRenderingContext2D {
        return this._$context2D;
    }

    /** 重置画布坐标,缩放,旋转,让画布transform属性回到默认值 */
    public resetTransform() {
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
    public translate(position: Vector) {
        this._$context2D.translate(position.x, position.y);
    }

    /** 旋转画布 */
    public rotate(angle: number) {
        this._$context2D.rotate(angle);
    }

    /** 缩放画布 */
    public scale(vector: Vector) {
        this._$context2D.scale(vector.x, vector.y);
    }

    /** 设置绘制的alpha值,(0-1) */
    public alpha(alpha: number) {
        this._$context2D.globalAlpha = this._$tempGlobalAlpha * (alpha < 0 ? 0 : alpha > 1 ? 1 : alpha);
    }

    /** 设置画笔颜色 */
    public setColor(color: string | Color) {
        if (color instanceof Color)
            color = color.toRgba();
        // @ts-ignore
        this._$context2D.strokeStyle = color;
        // @ts-ignore
        this._$context2D.fillStyle = color;
    }

    /** 获取画笔颜色 */
    public getColor(): string {
        return this._$context2D.strokeStyle.toString();
    }

    /** 画一个圆 */
    public drawCircle(position: Vector | Point, radius: number) {
        this._$context2D.beginPath();
        this._$context2D.arc(position.x, position.y, radius, 0, Utils.toRadians(360));
        this._$context2D.closePath();
        this._$context2D.stroke();
    }

    /** 画一个填充圆 */
    public drawFillCircle(position: Vector | Point, radius: number) {
        this._$context2D.beginPath();
        this._$context2D.arc(position.x, position.y, radius, 0, Utils.toRadians(360));
        this._$context2D.closePath();
        this._$context2D.fill();
    }

    /** 画一个矩形 */
    public drawRect(position: Vector | Point, size: Vector | Point) {
        this._$context2D.beginPath();
        this._$context2D.rect(position.x, position.y, size.x, size.y);
        this._$context2D.closePath();
        this._$context2D.stroke();
    }

    /** 画一个填充矩形 */
    public drawFillRect(position: Vector | Point, size: Vector | Point) {
        this._$context2D.fillRect(position.x, position.y, size.x, size.y);
    }

    /** 画一个路径 */
    public drawPath(...point: (Vector | Point)[]) {

    }

    /** 画一个填充路径 */
    public drawFillPath(...point: (Vector | Point)[]) {

    }

    /** 画一条线 */
    public drawLine(start: Vector | Point, end: Vector | Point) {
        this._$context2D.beginPath();
        this._$context2D.moveTo(start.x, start.y);
        this._$context2D.lineTo(end.x, end.y);
        this._$context2D.closePath();
        this._$context2D.stroke();
    }

    /** 绘制文字 */
    public drawText(position: Vector | Point, str: string) {
        this._$context2D.fillText(str, position.x, position.y);
    }
}