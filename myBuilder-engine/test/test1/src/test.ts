
/**
 * 控制器
 */
class Controller extends Node2D {
    start() {
        this.position = new Vector(50, 100);

        let child1 = new MyShape("MyShape1");
        this.addChild(child1);
        let child2 = new MyShape("MyShape2");
        child1.addChild(child2);

        let child3 = new MyShape("MyShape3");
        child2.addChild(child3);
        let child4 = new MyShape("MyShape4");
        child3.addChild(child4);
        child2.inheritTransform = false;
    }
    update(delta: number) {
        if (Input.getKeyDown(keyList.Home)) {
            World.worldTree.currentNode.childTree.printTreePretty();
            //this.free();
        }
    }
    leave() {
        console.log("leave()", this.parent);
    }
}


class MyShape extends Sprite {
    speed = 150;

    start() {
        let image = new Image();
        image.src = "./images/demo11_19.png";
        this.texture = image;
        //this.offset = new Vector(50);
    }
    update(delta: number) {
        let px = Input.getKey(keyList.D) - Input.getKey(keyList.A);
        let py = Input.getKey(keyList.S) - Input.getKey(keyList.W);
        this.position = this.position.add(new Vector(px, py).normalization().multiply(delta * this.speed));

    }
    draw = function (brush: Brush) {
        brush.setColor(Color.green);
        brush.drawCircle(Input.getMousePosition(), 15);
    }
}


window.onload = function () {
    let window = document.getElementById("main");
    if (window !== null) {
        World.Init(window, 0, 0, 500, 350, 0);
        World.thread.speed = 60;
        World.worldTree.currentNode = new Controller("控制器");
        World.canvas.color = Color.skyB1ueGrey.toHexadecimal();
        World.canvas.imageSmoothing = false;
    }
}