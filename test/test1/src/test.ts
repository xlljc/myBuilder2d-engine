let mb = MyBuilder;

/**
 * 控制器
 */
class Controller extends mb.Node2D {
    start() {
        this.position = new mb.Vector(50, 100);

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
        if (mb.Input.getKeyDown(mb.keyList.Home)) {
            mb.World.worldTree.currentNode.childTree.printTreePretty();
            //this.free();
        }
    }
    leave() {
        console.log("leave()", this.parent);
    }
}


class MyShape extends mb.Sprite {
    speed = 150;

    start() {
        let image = new Image();
        image.src = "./images/demo11_19.png";
        this.texture = image;
        //this.offset = new Vector(50);
    }
    update(delta: number) {
        let px = mb.Input.getKey(mb.keyList.D) - mb.Input.getKey(mb.keyList.A);
        let py = mb.Input.getKey(mb.keyList.S) - mb.Input.getKey(mb.keyList.W);
        this.position = this.position.add(new mb.Vector(px, py).normalization().multiply(delta * this.speed));

    }
    draw = (brush: MyBuilder.Brush) => {
        brush.setColor(mb.Color.green);
        brush.drawCircle(mb.Input.getMousePosition(), 15);
        brush.setColor(mb.Color.black);
        brush.drawText(mb.Vector.zero, this.name);
    }
}


window.onload = function () {
    let window = document.getElementById("main");
    if (window !== null) {
        mb.World.Init(window, 0, 0, 500, 350, 0);
        mb.World.thread.speed = 60;
        mb.World.worldTree.currentNode = new Controller("控制器");
        mb.World.canvas.color = mb.Color.skyB1ueGrey.toHexadecimal();
        mb.World.canvas.imageSmoothing = false;
    }
}