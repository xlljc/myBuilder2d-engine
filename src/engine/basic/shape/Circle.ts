namespace MyBuilder {

    /**
     * 圆类
     */
    export class Circle implements Shape {

        /** 坐标点:x */
        public x: number = 0;
        /** 坐标点:y */
        public y: number = 0;
        /** 圆的半径 */
        public r: number = 0;

        /**
         * 创建一个圆形,参数为 Circle 对象 或 (Point,radius) 或 (Vector,radius) 或 number(x,y,radius) 或 不填
         * @param arg Circle 对象 或 (Point,radius) 或 (Vector,radius) 或 number(x,y,radius) 或 不填
         */
        constructor(...arg: (number | Point | Vector | Circle)[]) {
            let temp = arg[0];
            if (temp !== undefined)
                if (temp instanceof Circle) {
                    this.x = temp.x;
                    this.y = temp.y;
                    this.r = temp.r;
                } else if (temp instanceof Point || temp instanceof Vector) {
                    this.x = temp.x;
                    this.y = temp.y;
                    // @ts-ignore
                    this.r = (temp = arg[1]) !== undefined ? temp : 0;
                } else {
                    this.x = temp;
                    // @ts-ignore
                    this.y = (temp = arg[1]) !== undefined ? temp : 0;
                    // @ts-ignore
                    this.r = (temp = arg[2]) !== undefined ? temp : 0;
                }

        }

        /**
         * 获取矩形坐标的向量值
         */
        public get position(): Vector {
            return new Vector(this.x, this.y);
        }

        /** 比较两个圆形的值是否相等 */
        public equals(circle: Circle): boolean {
            return circle !== undefined && this.x === circle.x && this.y === circle.y && this.r === circle.r;
        }
        /** 转换为字符串 */
        public toString(): string {
            return "point : {x : " + this.x + ", y : " + this.y + ", r : " + this.r + "}";
        }

        //圆与圆的碰撞检测
        public isColl(other: Circle): boolean {
            return (this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y) < (this.r + other.r) * (this.r + other.r);
        }
    }
}