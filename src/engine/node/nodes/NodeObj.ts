/**
 * 游戏物体基类接口
 */
interface Obj {
    init(): void;
    start(): void;
    update(delta: number): void;
    leave(): void;
    draw?: (brush: Brush) => void;
}