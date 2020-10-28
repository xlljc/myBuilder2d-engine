/**
 * 节点基类
 */
abstract class NodeBase implements Obj {

	/**
	 * 初始化方法,当节点被创建时调用
	 */
	public abstract init(): void;

	/**
	 * 当节点被其他节点指认为子节点时,会在帧结束时调用start()方法
	 */
	public abstract start(): void;

	/**
	 * 当加入到主场景的节点树后,每一帧都会调用该方法,
	 * delta为上一帧执行时间
	 * @param delta 上一帧执行时间
	 */
	public abstract update(delta: number): void;

	/**
	 * 绘制方法,每帧调用,通过brush来画图,
	 * 该方法会在update方法之后调用,zindex越小调用就越早
	 * @param brush 画笔
	 */
	//public abstract draw(brush: Brush): void;
	public draw: ((brush: Brush) => void) | undefined = undefined;

	/**
	 * 当节点离开节点树后再该帧结束时调用,
	 * 也就是调用free()方法后执行该方法
	 */
	public abstract leave(): void;

	/**
	 * 初始化方法,系统内部调用
	 * @private
	 */
	public _$nodeInit() {
		this.init();
	}

	/**
	 * 开始方法,系统内部调用
	 */
	public _$nodeStart() {
		this.start();
	}

	/**
	 * 每帧执行方法,系统调用
	 * @param delta
	 */
	public _$nodeUpdate(delta: number) {
		this.update(delta);
	}

	/**
	 * 绘制方法,系统调用
	 * @param brush 笔刷
	 * @param drawFunc 重写_$nodeDraw方法时执行的绘制方法
	 */
	public _$nodeDraw(brush: Brush, drawFunc?: () => void) {
		let context = brush.context;
		brush._$tempGlobalAlpha = context.globalAlpha;
		let alpha = this.alpha;
		let pos = this.position;

		let nodeList: NodeBase[] = [];
		this.eachParentUp((node) => {
			if (!node._$inheritTransform) return false;
			nodeList.push(node);
		})
		for (let i = nodeList.length - 1; i >= 0; i--) {
			let node: NodeBase = nodeList[i];
			context.translate(node.position.x, node.position.y);
			context.rotate(node.rotation);
			let tempScale: Vector = node.scale;
			context.scale(tempScale.x, tempScale.y);
			alpha *= node.alpha;
		}
		//如果该节点不继承父节点transform,那么重置transform
		if (!this._$inheritTransform) brush.resetTransform();
		context.translate(pos.x, pos.y);
		context.rotate(this.rotation);
		context.scale(this.scale.x, this.scale.y);
		context.globalAlpha = alpha;
		brush._$tempGlobalAlpha = alpha;

		if (drawFunc) drawFunc();
		// @ts-ignore
		else this.draw(brush);

		//重置画布Transform
		brush.resetTransform();
	}

	/**
	 * 离开节点方法,系统调用
	 */
	public _$nodeLeave() {
		this.leave();
	}

	/** 实例化节点 */
	protected constructor(name?: string) {
		this.name = name && name || "";
		this._$nodeInit();
	}

	//************ 节点属性 *************

	/** 节点名称 */
	private _$name: string = "";

	/** 节点相对于父节点的坐标 */
	private _$position: Vector = Vector.zero;
	/** 节点相对于父节点的旋转角度 */
	private _$rotation: number = 0;
	/** 节点相对于父节点的缩放比 */
	private _$scale: Vector = Vector.one;
	/** 节点相对于父节点的绘制透明度 */
	private _$alpha: number = 1;
	/** 节点相对于场景根节点的坐标 */
	private _$globalPosition: Vector = Vector.zero;
	/** 节点相对于场景根节点的旋转角度 */
	private _$globalRotation: number = 0;
	/** 节点相对于场景根节点的缩放比 */
	private _$globalScale: Vector = Vector.one;
	/** 节点相对于场景根节点的绘制透明度 */
	private _$globalAlpha: number = 1;
	/** 节点绘制的z轴坐标 */
	private _$zIndex: number = 0;

	/** 节点是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
	private _$visible: boolean = true;

	/** 是否继承父节点的transform */
	private _$inheritTransform: boolean = true;

	/** 子节点树,内部变量 */
	public _$childTree: Tree = new Tree(this, []);

	/** 父节点树,内部变量 */
	public _$parentTree: Tree | undefined;

	public get name(): string {
		return this._$name;
	}

	public set name(name: string) {
		this._$name = name;
	}

	public get position(): Vector {
		return this._$position;
	}

	public set position(value: Vector) {
		this._$position = value;
	}

	public get rotation(): number {
		return this._$rotation;
	}

	public set rotation(value: number) {
		this._$rotation = value;
	}

	public get scale(): Vector {
		return this._$scale;
	}

	public set scale(value: Vector) {
		this._$scale = value;
	}

	/** 获取节点相对于父节点的绘制透明度,值范围0-1 */
	public get alpha(): number {
		return this._$alpha;
	}

	/** 设置节点相对于父节点的绘制透明度,值范围0-1 */
	public set alpha(value: number) {
		this._$alpha = value < 0 ? 0 : value > 1 ? 1 : value;
	}

	/** 获取节点相对于场景根节点的坐标 */
	public get globalPosition(): Vector {
		let pos = Vector.zero;
		let rotation = 0;
		this.eachParentDown((node) => {
			rotation += node.rotation;
			pos.x += node.position.x + Math.cos(rotation) * node.position.x;
			pos.y += node.position.y + Math.sin(rotation) * node.position.y;
		})
		pos.x += this.position.x + Math.cos(rotation + this.rotation) * this.position.x;
		pos.y += this.position.y + Math.sin(rotation + this.rotation) * this.position.y;
		return pos;
	}

	public set globalPosition(value: Vector) {
		this._$globalPosition = value;
	}

	/** 获取节点相对于场景根节点的旋转角度 */
	public get globalRotation(): number {
		let rotation = this._$rotation;
		this.eachParentUp((node) => {
			rotation += node._$rotation;
		})
		return rotation;
	}

	public set globalRotation(value: number) {
		this._$globalRotation = value;
	}

	public get globalScale(): Vector {
		return this._$globalScale;
	}

	public set globalScale(value: Vector) {
		this._$globalScale = value;
	}

	/** 获取节点相对于场景根节点的绘制透明度 */
	public get globalAlpha(): number {
		let globalAlpha = this._$alpha;
		this.eachParentUp((node) => {
			globalAlpha *= node._$alpha;
		})
		return globalAlpha;
	}

	public set globalAlpha(value: number) {
		this._$globalAlpha = value;
	}

	/** 获取节点是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
	public get visible(): boolean {
		return this._$visible;
	}

	/** 设置是否可见,如果为false,那么不会执行该节点以及所有子节点的draw()函数 */
	public set visible(visible: boolean) {
		this._$visible = visible;
	}

	/** 获取是否继承父节点的transform */
	public get inheritTransform(): boolean {
		return this._$inheritTransform;
	}

	/** 
	 * 设置是否继承父节点的transform
	 */
	public set inheritTransform(value: boolean) {
		this._$inheritTransform = value;
	}

	/** 获取z轴索引,值越小表示越深,不会小于-1000! */
	public get zIndex(): number {
		if (this._$zIndex < -1000) this._$zIndex = -1000;
		return this._$zIndex;
	}

	/** 设置z轴索引,值越小表示越深,不能小于-1000! */
	public set zIndex(value: number) {
		this._$zIndex = value >= -1000 ? value : -1000;
	}

	/** 获取子节点树 */
	public get childTree(): Tree {
		return this._$childTree;
	}

	/** 获取父节点 */
	public get parent(): NodeBase | undefined {
		return this._$parentTree && this._$parentTree.node;
	}

	/** 获取父节点树 */
	public get parentTree(): Tree | undefined {
		return this._$parentTree;
	}

	//************ 节点方法 *************

	/** 将该对象从节点树中脱离,子节点也会被调用free()方法 */
	public free(): NodeBase {
		//调用子节点的free()方法
		let child: Tree;
		// @ts-ignore
		while ((child = this._$childTree.child[0]))
			// @ts-ignore
			child.node.free();
		// @ts-ignore
		this._$parentTree.removeChild(this._$childTree);
		this._$parentTree = undefined;
		Tree._$addLeaveNode(this);
		return this;
	}

	/**
	 * 根据索引获取子节点
	 * @param index
	 */
	public getChild(index: number): NodeBase | undefined {
		let tree;
		// @ts-ignore
		return (tree = this._$childTree.child[index]) && tree.node || undefined;
	}

	/**
	 * 获取子节点个数
	 */
	public getChildCount(): number {
		// @ts-ignore
		return this._$childTree.child.length;
	}

	/**
	 * 获取所有子节点对象
	 */
	public getChildren(): NodeBase[] {
		let children: NodeBase[] = [];
		let child = this._$childTree.child;
		// @ts-ignore
		for (let i = 0; i < child.length; i++)
			// @ts-ignore
			children.push(child[i].node);
		return children;
	}

	/**
	 * 获取所有父级节点对象,按层级排列
	 */
	public getParents(): NodeBase[] {
		let nodeList: NodeBase[] = [];
		this.eachParentUp((node) => {
			nodeList.push(node);
		})
		return nodeList.reverse();
	}

	/**
	 * 向下遍历所有子节点
	 * @param func 调用方法,如果返回false那么将终止该条线路的循环
	 * @param index 当前子节点索引,不需要手动传该参数
	 * @param layer 当前层级,不需要手动传该参数
	 */
	public eachChildren(func: (node: NodeBase, index?: number, layer?: number) => void | boolean, index: number = 0, layer: number = 1) {
		this._$childTree.each((tree, index, layer) => {
			return func(tree.node, index, layer);
		})
	}

	/** 
	 * 向上遍历父节点,到场景根节点为止<br>
	 * func函数返回false则会终止遍历
	 */
	public eachParentUp(func: (node: NodeBase) => void | boolean) {
		if (!this._$parentTree || this._$parentTree.node._$name === 'root' || func(this._$parentTree.node) === false) return;
		this._$parentTree.node.eachParentUp(func);
	}

	/** 
	 * 向下遍历父节点,从场景根节点开始<br>
	 * func函数返回false则会终止遍历
	 */
	public eachParentDown(func: (node: NodeBase) => void | boolean) {
		let nodeList: NodeBase[] = this.getParents();
		for (let i = 0; i < nodeList.length; i++)
			if (func(nodeList[i]) === false) break;
	}

	/**
	 * 添加子节点,注意:调用该方法添加的子节点不会立刻添加到节点树中,而是要等该帧结束才会加入!
	 * @param node 子节点
	 */
	public addChild(node: NodeBase) {
		this._$childTree.addChild(node._$childTree);
		//设置父级节点树
		node._$parentTree = this._$childTree;
	}

	/**
	 * 移除一个子节点
	 * @param node 子节点
	 */
	public removeChild(node: NodeBase) {
		Tree._$addRemoveNode(this._$childTree, node._$childTree);
	}

	/**
	 * 移除所有子节点
	 */
	public removeAllChild() {
		Tree._$addRemoveAllNode(this);
	}

}

/**
 * 2d节点
 */
class Node2D extends NodeBase {
	constructor(name?: string) {
		super(name);
	}

	init(): void {
	}

	start(): void {
	}

	update(delta: number): void {
	}

	/* draw(brush: Brush): void {
	} */

	leave(): void {
	}
}

/**
 * 精灵节点
 */
class Sprite extends Node2D {

	/** 需要绘制的纹理 */
	private _$texture: HTMLImageElement | undefined;

	/** 混合的颜色 */
	private _$blend: Color = new Color();

	/** 精灵是否居中显示,默认false */
	private _$centered: boolean = false;

	/** 精灵x轴偏移 */
	private _$xOffset: number = 0;

	/** 精灵y轴偏移 */
	private _$yOffset: number = 0;

	/** 是否启用精灵显示区域,默认false */
	private _$regionEnable: boolean = false;

	/** 精灵显示区域 */
	private _$regionRect: Rectangle = new Rectangle();

	/** 垂直帧数,必须大于0 */
	private _$vFrames: number = 1;

	/** 水平帧数,必须大于0 */
	private _$hFrames: number = 1;

	/** 当前显示帧数,下标从0开始,不会大于 (vFrames * hFrames) - 1 */
	private _$frame: number = 0;

	public _$nodeDraw(brush: Brush) {
		super._$nodeDraw(brush, () => {
			if (this._$texture) {
				// imW : 图像宽度
				// imH : 图像高度
				// x : 图像绘制x坐标
				// y : 图像绘制y坐标
				let imW, imH, x, y;
				if (!this._$regionEnable) { //判断是否要要启用区域显示
					imW = this._$texture.width / this._$hFrames;
					imH = this._$texture.height / this._$vFrames;
					x = this._$frame % this._$hFrames * imW;
					y = (this._$frame / this._$hFrames >> 0) * imH;
				} else {
					imW = this._$regionRect.w / this._$hFrames;
					imH = this._$regionRect.h / this._$vFrames;
					x = this._$regionRect.x + this._$frame % this._$hFrames * imW;
					y = this._$regionRect.y + (this._$frame / this._$hFrames >> 0) * imH;
				}
				if (this._$centered) //是否居中
					brush.context.drawImage(this._$texture, x, y, imW, imH,
						-imW / 2 + this._$xOffset, -imH / 2 + this._$yOffset,
						imW, imH);
				else brush.context.drawImage(this._$texture, x, y, imW, imH, this._$xOffset, this._$yOffset, imW, imH);
			}
			// @ts-ignore
			this.draw(brush);
		});
	}

	/** 获取绘制的纹理 */
	public get texture(): HTMLImageElement | undefined {
		return this._$texture;
	}

	/** 设置绘制的纹理 */
	public set texture(image: HTMLImageElement | undefined) {
		this._$texture = image;
	}

	/** 获取精灵x轴偏移*/
	public get xOffset(): number {
		return this._$xOffset;
	}
	/** 设置精灵x轴偏移*/
	public set xOffset(value: number) {
		this._$xOffset = value;
	}

	/** 获取精灵y轴偏移 */
	public get yOffset(): number {
		return this._$yOffset;
	}

	/** 设置精灵y轴偏移 */
	public set yOffset(value: number) {
		this._$yOffset = value;
	}

	/** 获取精灵是否居中显示,默认false */
	public get centered(): boolean {
		return this._$centered;
	}

	/** 设置精灵是否居中显示,默认false */
	public set centered(value: boolean) {
		this._$centered = value;
	}
	/** 获取是否启用精灵显示区域,默认false */
	public get regionEnable(): boolean {
		return this._$regionEnable;
	}
	/** 设置是否启用精灵显示区域,默认false */
	public set regionEnable(value: boolean) {
		this._$regionEnable = value;
	}
	/** 获取精灵显示区域 */
	public get regionRect(): Rectangle {
		return this._$regionRect;
	}
	/** 设置精灵显示区域 */
	public set regionRect(value: Rectangle) {
		this._$regionRect = value;
	}
	/** 获取垂直帧数,必须大于0 */
	public get vFrames(): number {
		return this._$vFrames;
	}
	/** 设置垂直帧数,必须大于0 */
	public set vFrames(value: number) {
		this._$vFrames = value && value || 0;
	}
	/** 获取水平帧数,必须大于0 */
	public get hFrames(): number {
		return this._$hFrames;
	}
	/** 设置水平帧数,必须大于0 */
	public set hFrames(value: number) {
		this._$hFrames = value && value || 0;
	}
	/** 获取当前显示帧数,下标从0开始,<br>不会大于 (vFrames * hFrames) - 1 */
	public get frame(): number {
		return this._$frame;
	}
	/** 设置当前显示帧数,下标从0开始,<br>不会大于 (vFrames * hFrames) - 1 */
	public set frame(value: number) {
		this._$frame = value !== undefined ? (value >= 0 && value <= (this._$vFrames * this._$hFrames) - 1 ? value : 0) : 0;
	}
}

/**
 * 碰撞检测节点
 */
class Collision extends Node2D {
	/** 是否禁用碰撞检测 */
	private _$disable: boolean = false;
	/** 碰撞器形状 */
	private _$shape: Shape | undefined;

}