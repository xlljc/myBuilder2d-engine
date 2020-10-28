/**
 * 二维向量
 */
class Vector {

    /** x坐标 */
    public x: number = 0;
    /** y坐标 */
    public y: number = 0;

    /**
     * 创建一个Vector对象,参数为 Vector 或 Point 或 number 或 不填
     * @param arg Vector 或 Point 或 number 或 不填
     */
    constructor(...arg: (number | Point | Vector)[]) {
        let temp = arg[0];
        if (temp !== undefined)
            if (temp instanceof Vector || temp instanceof Point) {
                this.x = temp.x;
                this.y = temp.y;
            } else {
                this.x = temp;
                // @ts-ignore
                this.y = (temp = arg[1]) !== undefined ? temp : this.x;
            }
    }

    /** 向量值为(0,0) */
    public static get zero(): Vector {
        return new Vector(0, 0);
    }

    /** 向量值为(1,0) */
    public static get right(): Vector {
        return new Vector(1, 0);
    }

    /** 向量值为(-1,0) */
    public static get left(): Vector {
        return new Vector(-1, 0);
    }

    /** 向量值为(0,-1) */
    public static get up(): Vector {
        return new Vector(0, -1);
    }

    /** 向量值为(0,1) */
    public static get down(): Vector {
        return new Vector(0, 1);
    }

    /** 向量值为(1,1) */
    public static get one(): Vector {
        return new Vector(1, 1);
    }

    /** 向量值为(-1,-1) */
    public static get negOne(): Vector {
        return new Vector(-1, -1);
    }

    /** 获取向量长度 */
    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /** 获取向量角度(弧度制),返回向量相对于X轴的弧度角,即(1,0)向量 */
    public get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    /** 向量相加 */
    public add(vector: Vector | number): Vector {
        if (vector instanceof Vector)
            return new Vector(this.x + vector.x, this.y + vector.y);
        return new Vector(this.x + vector, this.y + vector);
    }

    /** 向量相减 */
    public reduce(vector: Vector | number): Vector {
        if (vector instanceof Vector)
            return new Vector(this.x - vector.x, this.y - vector.y);
        return new Vector(this.x - vector, this.y - vector);
    }

    /** 向量相乘 */
    public multiply(vector: Vector | number): Vector {
        if (vector instanceof Vector)
            return new Vector(this.x * vector.x, this.y * vector.y);
        return new Vector(this.x * vector, this.y * vector);
    }

    /** 向量相除 */
    public divide(vector: Vector | number): Vector {
        if (vector instanceof Vector)
            return new Vector(this.x / vector.x, this.y / vector.y);
        return new Vector(this.x / vector, this.y / vector);
    }

    /** 向量取模 */
    public mod(vector: Vector | number): Vector {
        if (vector instanceof Vector)
            return new Vector(this.x % vector.x, this.y % vector.y);
        return new Vector(this.x % vector, this.y % vector);
    }

    /** 向量整除 */
    public div(vector: Vector | number): Vector {
        if (vector instanceof Vector)
            return new Vector((this.x / vector.x) >> 0, (this.y / vector.y) >> 0);
        return new Vector((this.x / vector) >> 0, (this.y / vector) >> 0);
    }

    /** 返回与vector的点积 */
    public dot(vector: Vector): number {
        return this.x * vector.x + this.y + vector.y;
    }

    /** 返回与vector的叉积 */
    public cross(vector: Vector): number {
        return this.x * vector.x + this.y + vector.y;
    }

    /** 向量归一化,返回缩放到单位长度的向量,归一化的向量不能为(0,0) */
    public normalization(): Vector {
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
    public angleTo(vector: Vector): number {
        return Math.atan2(this.cross(vector), this.dot(vector));
    }

    /** 返回连接两个点的线和X坐标之间的弧度角. */
    public angleToPoint(vector: Vector | Point): number {
        return Math.atan2(this.y - vector.y, this.x - vector.x);
    }

    /** 根据角度旋转向量 */
    public rotated(angle: number): Vector {
        let s = this.angle + angle;
        return new Vector(Math.cos(s), Math.sin(s)).multiply(this.length);
    }

    /** 返回绝对值向量 */
    public abs(): Vector {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }

    /** 返回向量,其中所有分量都向下取整*/
    public floor(): Vector {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }

    /** 返回向量,其中所有分量都向上取整*/
    public ceil(): Vector {
        return new Vector(Math.ceil(this.x), Math.ceil(this.y));
    }

    /** 返回向量,其中所有分量都四舍五入到最接近的整数 */
    public round(): Vector {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }

    /** 返回向量,其中每个分量设置为一个或一个负数,具体取决于分量的符号 */
    public sign(): Vector {
        return new Vector(this.x == 0 ? 0 : (this.x < 0 ? -1 : 1), this.y == 0 ? 0 : (this.y < 0 ? -1 : 1));
    }

    /** 返回到vector向量的距离 */
    public distanceTo(vector: Vector): number {
        return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
    }

    /** 返回一个角度相同,长度为length的向量 */
    public clamped(length: number): Vector {
        let vector = new Vector(this);
        let num = this.length;
        if (num > 0 && length < num)
            vector = vector.divide(num * length);
        return vector;
    }

    /** 将向量朝vector移动固定的delta数量 */
    public moveToward(vector: Vector, delta: number): Vector {
        let self = new Vector(this);
        let other = vector.reduce(self);
        let num = other.length;
        return num <= delta || num < 9.99999997475243E-07 ? vector : self.add(other.divide(num).multiply(delta));
    }

    /** 比较两个向量值是否相等 */
    public equals(vector: Vector): boolean {
        return vector !== undefined && this.x === vector.x && this.y === vector.y;
    }

    /** 转换为字符串 */
    public toString(): string {
        return "vector : {x : " + this.x + ", y : " + this.y + "}";
    }
}