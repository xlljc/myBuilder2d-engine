
/**
 * 掩码类
 */
class Mask {

    /** 掩码的十进制值 */
    private _$maskNum: number = 0;

    constructor(maskNum: number = 0) {
        this._$maskNum = maskNum;
    }

    /** 获取掩码的十进制值 */
    public get maskNum(): number {
        return this._$maskNum;
    }
    /** 设置掩码的十进制值 */
    public set maskNum(value: number) {
        this._$maskNum = value;
    }
    /** 设置掩码 */
    public setMask(list: number[]) {
        this._$maskNum = 0;
        for (let i = 0; i < list.length; i++) this._$maskNum += list[i] << i;
    }
    /** 获取掩码下标值组 */
    public getMask(): number[] {
        let index = 0, list = [], num = this._$maskNum;
        while (num > 0) {
            num & 1 && list.push(index);
            num >>= 1;
            index++;
        }
        return list;
    }
}
