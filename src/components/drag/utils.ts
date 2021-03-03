import { onMounted } from "vue";

interface Prop {
    [propName: string]: any
    defaultStyle: {
        width: number,
        height: number,
        top: number,
        left: number,
        [propName: string]: any
    }
}
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
export function handlePointMouseDown(this: any, mark: string, downEvent: MouseEvent) {

    let startX = downEvent.clientX;
    let startY = downEvent.clientY;
    let ele = this.defaultStyle;
    let height = ele["height"];
    let width = ele["width"];
    let top = ele["top"];
    let left = ele["left"];
    let scale = width / height;

    let move = (moveEvent: MouseEvent) => {
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
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
        ele["height"] = newHeight > 0 ? newHeight : 0;
        ele["width"] = newWidth > 0 ? newWidth : 0;
        ele["left"] = + left + (hasW ? disX : 0);
        ele["top"] = + top + (hasN ? disY : 0);
    };
    let up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        this.$emit('resize')

    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);

}