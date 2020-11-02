namespace MyBuilder {

    /**
     * 形状类
     */
    export interface Shape {
        /** 坐标点:x */
        x: number;
        /** 坐标点:y */
        y: number;

        /** 比较两个形状是否相同 */
        equals(shape: Shape): boolean;

        toString(): any;

        //圆与圆的碰撞检测
        /*function isColl(Circle1,Circle2) {
            return Math.sqrt((Circle1.x - Circle2.x) * (Circle1.x - Circle2.x) + (Circle1.y - Circle2.y) * (Circle1.y - Circle2.y)) < Circle1.r + Circle2.r;
        }*/
    }
}