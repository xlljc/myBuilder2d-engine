"use strict";
/**
 * 控制器
 */
class Controller extends Sprite {
    constructor() {
        super(...arguments);
        this.draw = function (brush) {
            brush.setColor(Color.green);
            brush.drawCircle(Input.getMousePosition(), 15);
        };
    }
    init() {
        console.log("init()");
    }
    start() {
        console.log("start()");
    }
    update(delta) {
        console.log(`delta = ${delta}`);
        if (Input.getKeyDown(keyList.D)) {
            this.free();
        }
    }
    leave() {
        console.log("leave()");
    }
}
window.onload = function () {
    let window = document.getElementById("main");
    if (window !== null) {
        World.Init(window, 0, 0, 500, 350, 0);
        World.thread.speed = 2;
        World.worldTree.currentNode = new Controller("控制器");
    }
};
