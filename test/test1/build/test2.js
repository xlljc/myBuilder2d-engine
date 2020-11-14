"use strict";
/**
 * 控制器
 */
class Controller2 extends MyBuilder.Node2D {
    start() {
        this.position = new MyBuilder.Vector(60, 60);
        this.addChild(new C1());
        this.addChild(new C2());
    }
    update(delta) {
        if (MyBuilder.Input.getKeyDown(MyBuilder.keyList.Home)) {
            MyBuilder.World.worldTree.currentNode.childTree.printTreePretty();
            //this.free();
        }
        //MyBuilder.World.canvas.globalScale = MyBuilder.World.canvas.globalScale.add(delta * MyBuilder.Input.getMouseWheel());
    }
}
class C1 extends MyBuilder.Collision {
    constructor() {
        super(...arguments);
        this.draw = (brush) => {
            brush.setColor(MyBuilder.Color.black);
            brush.drawRect(this.shape.position, this.shape.size);
        };
        this.collision = (other) => {
            console.log("碰撞了!");
        };
    }
    start() {
        let circle = new MyBuilder.Rectangle(0, 0, 60, 30);
        this.shape = circle;
        this.position.x = 100;
        this.position.y = 100;
    }
}
class C2 extends MyBuilder.Collision {
    constructor() {
        super(...arguments);
        this.draw = (brush) => {
            brush.setColor(MyBuilder.Color.black);
            brush.drawRect(this.shape.position, this.shape.size);
        };
        /* collision = (other: MyBuilder.Collision) => {
            console.log("碰撞了!");
        } */
    }
    start() {
        let circle = new MyBuilder.Rectangle(0, 0, 60, 30);
        this.shape = circle;
        this.position.x = 100;
        this.position.y = 100;
    }
    update(delta) {
        this.position = MyBuilder.Input.getMousePosition();
    }
}
window.onload = function () {
    let window = document.getElementById("main");
    if (window !== null) {
        MyBuilder.World.Init(window, 0, 0, 700, 420, 0);
        MyBuilder.World.thread.speed = 60;
        MyBuilder.World.worldTree.currentNode = new Controller2("控制器");
        MyBuilder.World.canvas.color = MyBuilder.Color.skyBlueGrey.toHexadecimal();
        MyBuilder.World.canvas.imageSmoothing = false;
    }
};
