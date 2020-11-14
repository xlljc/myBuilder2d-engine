namespace MyBuilder {

    /**
     * 形状类
     */
    export interface Shape {
        /** 坐标点:x */
        x: number;
        /** 坐标点:y */
        y: number;

        /** 获取形状的坐标 */
        readonly position: Vector;

        /** 比较两个形状是否相同 */
        equals(shape: Shape): boolean;

        toString(): any;
    }
}