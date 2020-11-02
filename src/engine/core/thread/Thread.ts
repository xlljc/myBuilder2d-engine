
/**
 * 线程类
 */
class Thread {

    /** 游戏每秒运行的帧数 */
    private _$speed: number = 60;

    /** 游戏上一帧运行所用的时间 */
    private _$delta: number = 0;

    /** 记录上一帧的时间戳 */
    private _$prevTime: number = 0;

    /** 游戏运行的fps */
    private _$fps: number = this._$speed;

    /** 游戏已运行的帧数 */
    private _$timeIndex: number = 0;

    /** 线程暂停毫秒数 */
    private _$sleepTime: number = 0;

    /** 上一帧逻辑代码帧运行运行时间 */
    private _$prevUseTime: number = 0;

    constructor(speed: number = 60) {
        this.speed = speed;
        this._$delta = 1000 / this._$speed;
        this._$useTime();
    }

    /** 获取游戏上一帧运行所用的时间 */
    public get delta(): number {
        return this._$delta;
    }

    /** 获取游戏每秒运行的帧数 */
    public get speed(): number {
        return this._$speed;
    }

    /** 设置游戏每秒运行的帧数,默认60 */
    public set speed(speed: number) {
        this._$speed = speed < 0 ? 0 : speed;
    }

    /** 获取游戏Fps */
    public get fps(): number {
        return this._$fps;
    }

    /** 获取游戏已运行的帧数 */
    public get timeIndex(): number {
        return this._$timeIndex;
    }

    /** 获取上一帧逻辑代码帧运行运行时间 */
    public get prevUseTime(): number {
        return this._$prevUseTime;
    }

    /**
     * 开始执行线程,如果方法func返回false,线程结束
     * @param func 执行方法
     * @param useTime 上一帧方法执行时间,选填
     */
    public run(func: (delta: number) => void | boolean, useTime: number = 0) {
        //理想暂停时间
        let stm = 1000 / this._$speed;
        //实际暂停时间
        let stopTime = stm - (useTime ? useTime : 0);
        stopTime = (stopTime < 0 ? 0 : stopTime) + this._$sleepTime;
        this._$prevUseTime = useTime;
        this._$sleepTime = 0;
        setTimeout(() => {
            let time = Date.now();
            let time2 = this._$useTime();
            if (useTime < stm) {
                this._$delta = stm / 1000;
                this._$fps = 1000 / stm;
            } else {
                this._$delta = useTime / 1000;
                this._$fps = 1000 / useTime;
            }
            this._$timeIndex++;
            func(this._$delta) !== false && this.run(func, stopTime > 0 ? (Date.now() - time) : time2);
        }, stopTime);
    }

    /** 返回上一次调用与这一次调用的时间差 */
    public _$useTime(): number {
        let timeTemp = 0;
        let timeNew = Date.now();
        timeTemp = timeNew - this._$prevTime;
        this._$prevTime = timeNew;
        return timeTemp;
    }

    /** 线程暂停毫秒 */
    public sleep(timer: number) {
        this._$sleepTime = timer;
    }
}