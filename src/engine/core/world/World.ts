namespace MyBuilder {

    /**
     * 游戏世界
     */
    export class World {

        /** 游戏世界的画布对象 */
        private static _$canvas: Canvas;

        /** 节点树 */
        private static _$worldTree: WorldTree;

        /** 线程对象 */
        private static _$thread: Thread;

        /** 输入对象 */
        private static _$input: Input;

        /** 画布的父节点 */
        private static _$divNode: HTMLElement;

        /** 是否调用过初始化方法,init方法只能调用一次 */
        private static _$isInit: boolean = false;

        /**
         * 初始化游戏世界,并创建游戏世界
         * @param divNode 要嵌入的标签对象
         * @param x x坐标
         * @param y y坐标
         * @param width 画布宽度
         * @param height 画布高度
         * @param zIndex 画布z轴索引,不能小于0
         */
        public static Init(divNode: HTMLElement, x?: number, y?: number, width?: number, height?: number, zIndex?: number) {
            //如果调用过就不执行了
            if (World._$isInit) return;
            World._$isInit = true;

            World._$canvas = new Canvas(new Rectangle(y, y, width, height));
            zIndex && (World._$canvas.zIndex = zIndex);
            divNode.appendChild(World._$canvas.canvasElement);
            World._$divNode = divNode;
            //禁用右键菜单
            divNode.oncontextmenu = () => {
                return false;
            }
            //鼠标悬停时禁用页面滚动事件
            divNode.addEventListener("mouseover", function () {
                document.body.style.overflow = 'hidden';
            });
            divNode.addEventListener("mouseleave", function () {
                document.body.style.overflow = 'auto';
            });

            World._$input = new Input();

            World._$worldTree = new WorldTree();
            //创建主线程
            World._$thread = new Thread(60);
            //执行线程方法
            World._$thread.run((delta) => {
                //每帧调用方法
                World.updateFunc(delta);
            });

            /** 当用户键盘按下调用 */
            document.onkeydown = (e) => {
                Input.keyDown(e.keyCode);
            }
            /** 当用户键盘按松开调用 */
            document.onkeyup = (e) => {
                Input.keyUp(e.keyCode);
            }
            /** 当用户鼠标移动时调用,局部坐标 */
            divNode.onmousemove = (e) => {
                Input._$setMousePos(e.offsetX, e.offsetY);
            }
            /** 当用户鼠标移动时调用,全局坐标坐标 */
            document.onmousemove = (e) => {
                Input._$setMouseGlobalPos(e.screenX, e.screenY);
            }
            /** 当用户鼠标按钮按下时调用 */
            divNode.onmousedown = (e) => {
                World.divNode.style.cursor = Input.cursorCheckStyle;
                Input.buttonDown(e.button);
            }
            /** 当用户鼠标按钮松开时调用 */
            divNode.onmouseup = (e) => {
                World.divNode.style.cursor = Input.cursorStyle;
                Input.buttonUp(e.button);
            }
            /** 单用户鼠标滚轮滚动时调用 */
            // @ts-ignore
            divNode.onmousewheel = (e) => {
                Input._$setMouseWheel(e.wheelDelta > 0 ? 1 : -1);
            }
        }

        private constructor() {
        }

        /** 获取画布 */
        public static get canvas(): Canvas {
            return World._$canvas;
        }

        /** 获取节点树 */
        public static get worldTree(): WorldTree {
            return World._$worldTree;
        }

        /** 获取线程对象 */
        public static get thread(): Thread {
            return World._$thread;
        }

        /** 获取画布的父节点 */
        public static get divNode(): HTMLElement {
            return World._$divNode;
        }

        /** 每帧调用方法 */
        private static updateFunc(delta: number) {
            //更新按键
            World._$input._$beforeUpdate();
            //遍历节点树,调用update方法
            World._$worldTree.currentNode && this._$worldTree.currentNode.childTree.each((tree) => {
                tree.node._$nodeUpdate(delta);
            });
            //清理画布
            World._$canvas.clear();

            //遍历节点树,排序draw方法
            let nodeDrawList: (NodeBase[])[] = [];
            World._$worldTree.currentNode && this._$worldTree.currentNode.childTree.each((tree) => {
                let node = tree.node;
                //不可见的
                if (!node.visible) return false;
                //没有实现绘制方法
                if (!node.draw) return;

                let list = nodeDrawList[node.zIndex + 1000];
                if (!list) nodeDrawList[node.zIndex + 1000] = [node];
                else list.push(node);
            });
            //调用节点的draw方法
            nodeDrawList.forEach((nodes: NodeBase[]) => {
                for (let i = 0; i < nodes.length; i++)
                    nodes[i]._$inside._$nodeDraw(World._$canvas.brush);
            });
            //调用移除子节点方法
            Tree._$callRemoveNode();
            //调用移除索引子节点方法
            Tree._$callRemoveAllNode();
            //调用离开方法
            Tree._$callLeaveNode();
            //初始化节点
            Tree._$callInitNode();

            //更新按键
            World._$input._$afterUpdate();
        }
    }

}