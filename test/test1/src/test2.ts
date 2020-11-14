

/**
 * 控制器
 */
class Controller2 extends MyBuilder.Node2D {
    start() {
        this.position = new MyBuilder.Vector(60, 60);
        this.addChild(new C1());
        this.addChild(new C2());
    }
    update(delta: number) {
        if (MyBuilder.Input.getKeyDown(MyBuilder.keyList.Home)) {
            MyBuilder.World.worldTree.currentNode.childTree.printTreePretty();
            //this.free();
        }
        //MyBuilder.World.canvas.globalScale = MyBuilder.World.canvas.globalScale.add(delta * MyBuilder.Input.getMouseWheel());
    }
}


class C1 extends MyBuilder.Collision {
    start() {
        let circle = new MyBuilder.Rectangle(0, 0, 60, 30);
        this.shape = circle;
        this.position.x = 100;
        this.position.y = 100;
    }
    draw = (brush: MyBuilder.Brush) => {
        brush.setColor(MyBuilder.Color.black);
        brush.drawRect(this.shape.position, (this.shape as MyBuilder.Rectangle).size);
    }
    collision = (other: MyBuilder.Collision) => {
        console.log("碰撞了!");
    }
}
class C2 extends MyBuilder.Collision {

    start() {
        let circle = new MyBuilder.Rectangle(0, 0, 60, 30);
        this.shape = circle;
        this.position.x = 100;
        this.position.y = 100;
    }
    update(delta: number) {
        this.position = MyBuilder.Input.getMousePosition();
    }
    draw = (brush: MyBuilder.Brush) => {
        brush.setColor(MyBuilder.Color.black);
        brush.drawRect(this.shape.position, (this.shape as MyBuilder.Rectangle).size);
    }
    /* collision = (other: MyBuilder.Collision) => {
        console.log("碰撞了!");
    } */
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
}