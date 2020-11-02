namespace MyBuilder {
    /**
     * 点对象
     * 相比于Vector对象更加轻量级,没有过多的函数
     */
    export class Point {

        /** 点的x坐标 */
        public x: number = 0;
        /** 点的y坐标 */
        public y: number = 0;

        /**
         * 创建一个Point对象,参数为 Point 或 Vector 或 number 或 不填
         * @param arg Point 或 Vector 或 number 或 不填
         */
        constructor(...arg: (number | Point | Vector)[]) {
            let temp = arg[0];
            if (temp !== undefined)
                if (temp instanceof Point || temp instanceof Vector) {
                    this.x = temp.x;
                    this.y = temp.y;
                } else {
                    this.x = temp;
                    // @ts-ignore
                    this.y = (temp = arg[1]) !== undefined ? temp : this.x;
                }
        }

        /** 比较两个点的值是否相等 */
        public equals(point: Point): boolean {
            return point !== undefined && this.x === point.x && this.y === point.y;
        }

        /** 转换为字符串 */
        public toString(): string {
            return "point : {x : " + this.x + ", y : " + this.y + "}";
        }
    }

}