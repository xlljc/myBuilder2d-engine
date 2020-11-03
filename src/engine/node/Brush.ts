
namespace MyBuilder {

    /**
     * 画笔类
     */
    export class Brush {

        /**
         *  负责存储在其他类中需要调用的系统属性或方法,系统内部调用的
         */
        public get _$inside() {
            return this.__$inside;
        }

        private __$inside: {
            /** 记录当前对象的绘制alpha值,系统内部变量 */
            _$tempGlobalAlpha: number,
            /**设置当前对象的绘制alpha值,系统内部变量 */
            _$setGlobalAlpha: (value: number) => void
        } = {
                _$tempGlobalAlpha: 1,
                _$setGlobalAlpha: (value: number) => {
                    //基于全局Alpha通道
                    this._$context2D.globalAlpha = this._$inside._$tempGlobalAlpha = World.canvas.globalAlpha * value;
                }
            };

        /** 画布的上下文对象 */
        private readonly _$context2D: CanvasRenderingContext2D;

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

        /** 重置画布坐标,缩放,旋转,透明度,让画布transform属性回到默认值 */
        public resetTransform() {
            //this._$context2D.setTransform(1, 0, 0, 1, 0, 0);
            /*
             a	水平缩放
             b	水平倾斜
             c	垂直倾斜
             d	垂直缩放
             e	水平偏移
             f	垂直偏移
             */
            //全局缩放与偏移
            let scale = World.canvas.globalScale;
            let pos = World.canvas.globalPosition;
            this._$context2D.setTransform(scale.x, 0, 0, scale.y, pos.x, pos.y);
            //全局旋转,弧度制
            this._$context2D.rotate(World.canvas.globalRotation);
            //全局透明度 (0-1)
            this._$inside._$setGlobalAlpha(1);
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
            this._$context2D.globalAlpha = World.canvas.globalAlpha * this._$inside._$tempGlobalAlpha * (alpha < 0 ? 0 : alpha > 1 ? 1 : alpha);
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

}