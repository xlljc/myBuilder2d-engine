
/**
 * 控制器
 */
class Controller extends Sprite {
    init() {
        console.log("init()");

    }
    start() {
        console.log("start()");

    }
    update(delta: number) {
        console.log(`delta = ${delta}`);
        if (Input.getKeyDown(keyList.D)) {
            this.free();
        }
    }
    draw = function (brush: Brush) {
        brush.setColor(Color.green);
        brush.drawCircle(Input.getMousePosition(), 15);
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
}