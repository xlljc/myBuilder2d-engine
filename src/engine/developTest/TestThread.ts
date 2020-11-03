
namespace MyBuilder {

    /**
     * 线程调试对象,仅供开发使用
     */
    export class TestThread {

        /**
         * 执行delta值测试
         * 测试 delta 值是否正确
         */
        public static testDelta() {
            let testNode = new class extends Node2D {
                private area: Rectangle = World.canvas.area;
                private startTime: number = 0;
                width = 0;
                value = 0;
                speed = 20;
                start() {
                    this.inheritTransform = false;
                    this.startTime = Date.now();
                    this.width = this.area.w;
                    console.log("TestThread => testDelta : start !");
                }
                update(delta: number) {
                    this.value += this.speed * delta;
                    if (this.value >= this.width) {
                        this.free();
                    }
                }
                draw = (brush: Brush) => {
                    brush.setColor(Color.orange);
                    brush.drawFillRect(this.area.position, new Vector(this.value, 30));
                    brush.setColor(Color.green);
                    brush.drawRect(this.area.position, new Vector(this.width, 30));
                }
                leave() {
                    console.log("TestThread => testDelta : ideal time --- " + (this.width / this.speed));
                    console.log("TestThread => testDelta : user time --- " + ((Date.now() - this.startTime) / 1000));
                    console.log("TestThread => testDelta : end !");
                }
            }("testDelta");
            World.worldTree.currentNode.addChild(testNode);
        }

    }

}