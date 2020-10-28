/**
 * 世界的节点树
 */
class WorldTree {

    /** 当前活动的节点,根节点 */
    private _$currentNode: NodeBase = new Node2D("root");

    /** 节点树 */
    //private _$nodeTree: Tree = undefined;

    constructor() {
    }
    /** 获取当前活动的节点 */
    public get currentNode(): NodeBase {
        // @ts-ignore
        let child = this._$currentNode.childTree.child[0];
        // @ts-ignore
        return child ? child.node : undefined;
    }
    /** 设置当前活动的节点 */
    public set currentNode(node: NodeBase) {
        //移除之前的节点,并加入新的节点
        this._$currentNode.removeAllChild();
        this._$currentNode.addChild(node);
    }
}