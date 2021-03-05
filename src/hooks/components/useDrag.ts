
import { limitInArea } from '@/utils/tool'
export interface Prop {
    [propName: string]: any
    defaultStyle: {
        width: number,
        height: number,
        top: number,
        left: number,
        [propName: string]: any
    }
    minBox: Style
}
export interface Style {
    width: number;
    height: number;
}
/**
 * @description 根据字符串算出对应的缩放点样式
 * @param props 
 * @param point 点的字符串
 */
export function getPointStyle<T extends Prop>(props: T, point: string) {
    const { width, height } = props.defaultStyle;
    const hasT = /n/.test(point);
    const hasB = /s/.test(point);
    const hasL = /w/.test(point);
    const hasR = /e/.test(point);
    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
    } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
            newLeft = width / 2;
            newTop = hasT ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
            newLeft = hasL ? 0 : width;
            newTop = Math.floor(height / 2);
        }
    }
    const style = {
        marginLeft: hasR ? "-4px" : "-4px",
        marginTop: "-4px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: `${point}-resize`,
    };
    return style;
}
/**
 * @description 缩放点事件
 * @param this 组件实例
 * @param mark 缩放点标志字符串
 * @param downEvent 鼠标事件
 */
export function handlePointMouseDown(this: any, mark: string, downEvent: MouseEvent) {
    downEvent.stopPropagation()
    downEvent.preventDefault()
    let startX = downEvent.clientX;
    let startY = downEvent.clientY;
    let ele = this.defaultStyle;
    let height = ele["height"];
    let width = ele["width"];
    let top = ele["top"];
    let left = ele["left"];
    // let scale = width / height;
    //长宽比例
    let { container, minBox } = this
 
    let move = (moveEvent: MouseEvent) => {
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
        /**
         * 判定是否为对角锚点
         */
        let proportion = /nw|ne|sw|se/.test(mark);

        let currX = moveEvent.clientX;
        let currY = moveEvent.clientY;

        let disY = currY - startY;
        let disX = currX - startX;

        let hasN = /n/.test(mark);
        let hasS = /s/.test(mark);
        let hasW = /w/.test(mark);
        let hasE = /e/.test(mark);

        /**
         * 判断是否大于container
         */

        if (container) {
            if (top < 0 || top + ele.height > container.height) {
                top = top < 0 ? 0 : container.height - ele.height;

            }
            if (left < 0 || left + ele.width > container.width) {
                left = left < 0 ? 0 : container.width - ele.width;
            }
        }
        /**
         * 对角等比缩放
         */
        // if (proportion) {
        //     if (hasN) {
        //         disX = disY * scale * (hasW ? 1 : -1);
        //     }
        //     if (hasS) {
        //         disX = disY * scale * (hasE ? 1 : -1);
        //     }
        // }

        let newHeight = +height + (hasN ? -disY : hasS ? disY : 0);
        let newWidth = +width + (hasW ? -disX : hasE ? disX : 0);
        /**
         * 对值做出限定，从而限定布局
         */
        ele["height"] = limitInArea(minBox.height, container.height, newHeight)
        ele["width"] = limitInArea(minBox.width, container.width, newWidth)
        ele["left"] = limitInArea(0, container.width - ele['width'], left + (hasW ? disX : 0))
        ele["top"] = limitInArea(0, container.height - ele['height'], top + (hasN ? disY : 0))
    };
    let up = () => {
        this.$emit('resize')
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);

    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);

}