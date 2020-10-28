/**
 * 矩形类
 */
class Rectangle implements Shape {

    /** 坐标点:x */
    public x: number = 0;
    /** 坐标点:y */
    public y: number = 0;
    /** 矩形宽度 */
    public w: number = 0;
    /** 矩形高度 */
    public h: number = 0;
    /**
     * 创建一个矩形,参数为 Rectangle 或 (Point1,Point2) 或 (Vector1,Vector2) 或 number(x,y,w,h) 或 不填
     * @param arg Rectangle 或 (Point1,Point2) 或 (Vector1,Vector2) 或 number(x,y,w,h) 或 不填
     */
    constructor(...arg: (number | Point | Vector | Rectangle | undefined)[]) {
        let temp = arg[0];
        if (temp !== undefined)
            if (temp instanceof Rectangle) {
                this.x = temp.x;
                this.y = temp.y;
                this.w = temp.w;
                this.h = temp.h;
            } else if (temp instanceof Point || temp instanceof Vector) {
                this.x = temp.x;
                this.y = temp.y;
                if ((temp = arg[1]) === undefined) return;
                // @ts-ignore
                this.w = temp.x;
                // @ts-ignore
                this.h = temp.y;
            } else {
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
    public equals(rectangle: Rectangle): boolean {
        return rectangle !== undefined && this.x === rectangle.x && this.y === rectangle.y &&
            this.w === rectangle.w && this.h === rectangle.h;
    }
    /** 转换为字符串 */
    public toString(): string {
        return "rectangle : {x : " + this.x + ", y : " + this.y + ", w : " + this.w + ", h : " + this.h + "}";
    }
}