let mb = MyBuilder;

/**
 * 控制器
 */
class Controller extends mb.Node2D {
    start() {
        let canvas = mb.World.canvas;
        //canvas.globalPosition = new mb.Vector(50, 150);
        //canvas.globalRotation = mb.Utils.toRadians(30);
        canvas.globalAlpha = 1;
        //canvas.globalScale = mb.Vector.one.multiply(3);

        //this.position = new mb.Vector(25, 25);

        let temp: MyBuilder.Node2D = this;
        for (let i = 0; i < 10; i++) {
            let childTemp = new MyShape("MyShape" + i);
            temp.addChild(childTemp);
            temp = childTemp;
        }
        //mb.TestThread.testDelta();
        //this.inheritTransform = false;
    }
    update(delta: number) {
        if (mb.Input.getKeyDown(mb.keyList.Home)) {
            mb.World.worldTree.currentNode.childTree.printTreePretty();
            //this.free();
        }
        mb.World.canvas.globalScale = mb.World.canvas.globalScale.add(delta * mb.Input.getMouseWheel());
    }
    leave() {
        console.log("leave()", this.parent);
    }
}


class MyShape extends mb.Sprite {
    speed = 150;

    start() {
        this.alpha = 0.98;
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
        if (this.name === "MyShape1") {
            brush.alpha(0.5);
        }
        brush.setColor(mb.Color.green);
        brush.drawCircle(mb.Input.getMousePosition(), 15);
        brush.setColor(mb.Color.black);
        brush.drawText(mb.Vector.zero, this.name);
    }
}


window.onload = function () {
    let window = document.getElementById("main");
    if (window !== null) {
        mb.World.Init(window, 0, 0, 700, 420, 0);
        mb.World.thread.speed = 60;
        mb.World.worldTree.currentNode = new Controller("控制器");
        mb.World.canvas.color = mb.Color.skyBlueGrey.toHexadecimal();
        mb.World.canvas.imageSmoothing = false;
    }
    let doc = document.getElementById("fps-box");
    setInterval(function () {
        doc.innerText = "fps : " + mb.World.thread.fps + "  ---  delta : " + mb.World.thread.delta;
    }, 200);
}