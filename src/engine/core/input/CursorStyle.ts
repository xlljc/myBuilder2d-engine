namespace MyBuilder {

    /**
     * 鼠标指针样式
     */
    export enum cursorStyle {
        /** 默认光标（通常是一个箭头） */
        Default = "default",
        /** 默认浏览器设置的光标 */
        Auto = "auto",
        /** 光标呈现为十字线 */
        Crosshair = "crosshair",
        /** 光标呈现为指示链接的指针（一只手） */
        Pointer = "pointer",
        /** 此光标指示某对象可被移动 */
        Move = "move",
        /** 此光标指示矩形框的边缘可被向右（东）移动 */
        E_resize = "e-resize",
        /** 此光标指示矩形框的边缘可被向上及向右移动（北/东） */
        Ne_resize = "ne-resize",
        /** 此光标指示矩形框的边缘可被向上及向左移动（北/西） */
        Nw_resize = "nw-resize",
        /** 此光标指示矩形框的边缘可被向上（北）移动 */
        N_resize = "n-resize",
        /** 此光标指示矩形框的边缘可被向下及向右移动（南/东） */
        Se_resize = "se-resize",
        /** 此光标指示矩形框的边缘可被向下及向左移动（南/西） */
        Sw_resize = "sw-resize",
        /** 此光标指示矩形框的边缘可被向下移动（北/西） */
        S_resize = "s-resize",
        /** 此光标指示矩形框的边缘可被向左移动（西） */
        W_resize = "w-resize",
        /** 此光标指示文本 */
        Text = "text",
        /** 此光标指示程序正忙（通常是一只表或沙漏） */
        Wait = "wait",
        /** 此光标指示可用的帮助（通常是一个问号） */
        Help = "help"
    }

}