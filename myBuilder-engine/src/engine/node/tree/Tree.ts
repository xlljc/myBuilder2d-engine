/**
 * 节点树类型
 */
type TreeType = Tree[];

/**
 * 节点键直对
 */
type TreeParChi = { parent: Tree, child: Tree };

/**
 * 节点树类
 */
class Tree {

    /** node节点 */
    public node: NodeBase;
    /** node子节点 */
    public child: TreeType;

    constructor(node: NodeBase, child: TreeType) {
        this.node = node;
        this.child = child;
    }

    /**
     * 遍历当前节点以及子节点
     * @param func 调用方法,如果返回false那么将终止该条线路的循环
     * @param index 当前子节点索引,不需要手动传该参数
     * @param layer 当前层级,不需要手动传该参数
     */
    public each(func: (tree: Tree, index?: number, layer?: number) => void | boolean, index: number = 0, layer: number = 1) {
        if (!this.node || !this.child || !func || func(this, index, layer) === false) return;
        for (let i = 0; i < this.child.length; i++)
            this.child[i].each(func, i, layer + 1);
    }

    /**
     * 节点树下添加子节点
     * @param tree 节点树
     */
    public addChild(tree: Tree): Tree {
        if (!tree) throw new Error("节点参数是undefined!");
        if (this === tree) throw new Error("不能添加自己作为子节点!");
        //判断该节点是否在场景中存在(是否存在父节点)
        if (tree.node.parentTree) throw new Error("节点已在场景树中存在!");
        //加入到初始化节点集合,会在该帧结束时加入到场景树
        Tree._$addInitNode(this, tree);
        return this;
    }

    /**
     * 移除一个子节点,返回是否移除成功
     * @param tree 需要移除的节点树
     */
    public removeChild(tree: Tree): boolean {
        if (!this.child) return false;
        let index = this.child.indexOf(tree);
        if (index !== -1) {
            this.child.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * 移除所有子节点
     */
    public removeAllChild() {
        this.child = [];
    }

    /** 根据节点名称查找节点,允许使用'/'分割名称 */
    public find(name: string): [NodeBase?] {

        return [];
    }

    /** 查询一个节点是否存在于节点树中 */
    public hasNode(tree: Tree): boolean {
        return false;
    }

    /** 控制台打印节点树结构,通常用于debug时调用 */
    public printTreePretty() {
        let str = "";
        let map = new Map<NodeBase, string>();
        this.each((tree, index) => {
            let parent = tree.node.parentTree;
            let parStr = parent && map.get(parent.node) || "";
            switch (index) {
                // @ts-ignore
                case parent.child.length - 1:
                    str += parStr + "  ┖╴" + tree.node.name
                    map.set(tree.node, parStr + "   ");
                    break;
                default:
                    str += parStr + "  ┠╴" + tree.node.name
                    map.set(tree.node, parStr + "  ┃");
                    break;
            }
            str += " (" + tree.node.constructor.name + ")\n";
        });
        console.log(str);
    }

    //*****************************************************

    /** 需要调用初始化方法的节点,也就是刚被加入节点树的节点 */
    private static _$initNode: TreeParChi[] = [];

    /** 需要移出节树的节点,也就是被removeChild的节点 */
    private static _$removeNode: TreeParChi[] = [];

    /** 需要移除所有子节点的节点,也就是调用removeAllChild的节点 */
    private static _$removeAllNode: NodeBase[] = [];

    /** 需要调用leave()化方法的节点,也就是被free()的节点 */
    private static _$leaveNode: NodeBase[] = [];

    /** 添加初始化节点,系统内部调用 */
    public static _$addInitNode(parent: Tree, child: Tree) {
        let pc = { parent: parent, child: child };
        //如果已经存在,就删除之前的并添加到末尾
        let index = this._$initNode.indexOf(pc);
        if (index !== -1) this._$initNode.splice(index, 1);
        this._$initNode.push(pc);
    }

    /** 调用节点的start方法,并清理initNode,系统调用 */
    public static _$callInitNode() {
        let tempNodes: TreeParChi[] = [...Tree._$initNode];
        Tree._$initNode = [];
        for (let i = 0; i < tempNodes.length; i++) {
            let temp = tempNodes[i];
            //加入到节点树
            if (!temp.parent.child) temp.parent.child = [temp.child];
            else temp.parent.child.push(temp.child);
            //调用初始化方法++
            tempNodes[i].child.node._$nodeStart();
        }
    }

    /** 添加移除节点,系统内部调用 */
    public static _$addRemoveNode(parent: Tree, child: Tree) {
        let pc = { parent: parent, child: child };
        //如果已经存在,就删除之前的并添加到末尾
        let index = this._$removeNode.indexOf(pc);
        if (index !== -1) this._$removeNode.splice(index, 1);
        //移除父节点
        child.node._$inside._$parentTree = undefined;
        this._$removeNode.push(pc);
    }

    /** 调用移除节点,系统调用 */
    public static _$callRemoveNode() {
        for (let i = 0; i < this._$removeNode.length; i++) {
            let temp = this._$removeNode[i];
            //移除节点树
            temp.parent.removeChild(temp.child);
        }
        Tree._$removeNode = [];
    }

    /** 添加离开的节点,系统内部调用 */
    public static _$addRemoveAllNode(node: NodeBase) {
        //如果已经存在,就删除之前的并添加到末尾
        let index = this._$removeAllNode.indexOf(node);
        if (index !== -1) this._$removeAllNode.splice(index, 1);
        //将子节点的父节点设置为undefined
        let child = node._$inside._$childTree.child;
        // @ts-ignore
        for (let i = 0; i < child.length; i++)
            // @ts-ignore
            child[i].node._$inside._$parentTree = undefined;
        this._$removeAllNode.push(node);
    }

    /** 调用移除节点,系统调用 */
    public static _$callRemoveAllNode() {
        for (let i = 0; i < this._$removeAllNode.length; i++)
            //移除所有子节点方法
            this._$removeAllNode[i]._$inside._$childTree.removeAllChild();
        Tree._$removeAllNode = [];
    }

    /** 添加离开的节点,系统内部调用 */
    public static _$addLeaveNode(node: NodeBase) {
        //如果已经存在,就删除之前的并添加到末尾
        let index = this._$leaveNode.indexOf(node);
        if (index !== -1) this._$leaveNode.splice(index, 1);
        this._$leaveNode.push(node);
    }

    /** 调用节点的leave方法,并清理leaveNode,系统调用 */
    public static _$callLeaveNode() {
        let tempNodes: NodeBase[] = [...Tree._$leaveNode];
        Tree._$leaveNode = [];
        for (let i = 0; i < tempNodes.length; i++)
            //调用离开节点方法
            tempNodes[i]._$nodeLeave();
    }
}