"use strict";
/**
 * 控制器
 */
class Controller extends Node2D {
    start() {
        let child1 = new MyShape("MyShape1");
        this.addChild(child1);
    }
    update(delta) {
        if (Input.getKeyDown(keyList.D)) {
            World.worldTree.currentNode.childTree.printTreePretty();
            this.free();
            //this.parent.removeAllChild();
        }
    }
    leave() {
        console.log("leave()", this.parent);
    }
}
class MyShape extends Sprite {
    constructor() {
        super(...arguments);
        this.index = 0;
        this.draw = function (brush) {
            brush.setColor(Color.green);
            brush.drawCircle(Input.getMousePosition(), 15);
        };
    }
    start() {
        let image = new Image();
        image.src = "./images/demo11_19.png";
        this.texture = image;
        this.offset = new Vector(50);
        this.regionEnable = true;
        this.regionRect = new Rectangle(32, 32, 32, 32);
        this.hFrames = 2;
        this.vFrames = 2;
    }
    update() {
        this.index++;
        if (this.index % 60 === 0) {
            this.frame++;
        }
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
};
