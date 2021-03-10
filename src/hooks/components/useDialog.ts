import { Throttle } from "@/utils/tool";
import { inject, shallowReactive } from "vue";
import { getStyle } from "@/utils/style";
export function useDialog(props: { defaultStyle: any; }, context: { emit: any; }) {
    let { defaultStyle } = props;
    let { emit } = context;
    const minBox = shallowReactive({
        width: 200,
        height: 100,
    });
    const container = inject("container") as any;
    console.log("container", container);
    /**移动 */
    const handleMoveDialog = (downEvent: MouseEvent) => {
        downEvent.stopPropagation();
        downEvent.preventDefault();
        let ele = defaultStyle;
        let startY = downEvent.pageY;
        let startX = downEvent.pageX;
        let startTop = ele["top"];
        let startLeft = ele["left"];

        let move = Throttle((moveEvent: any) => {
            moveEvent.stopPropagation(); //阻止冒泡影响父组件
            let currX = moveEvent.pageX;
            let currY = moveEvent.pageY;
            let top = currY - startY + startTop;
            let left = currX - startX + startLeft;
            if (container) {
                if (top < 0 || top + ele.height > container.height - 10) {
                    top = top < 0 ? 0 : container.height - ele.height - 30;
                }
                if (left < 0 || left + ele.width > container.width - 10) {
                    left = left < 0 ? 0 : container.width - ele.width - 30;
                }
            }
            defaultStyle.top = top;
            defaultStyle.left = left;
        }, 10);
        let up = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        };
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    };
    /**
     * 隐藏
     */
    const handleHidden = () => {
        emit("hidden");
    };
    /**
     * 关闭
     */
    const handleClose = () => {
        emit("close");
    };
    const selectDialog = () => {
        emit("select");
    };
    const handleZoom = () => {
        emit('zoom')
    }
    return {
        selectDialog,
        getStyle,
        handleMoveDialog,
        minBox,
        handleHidden,
        handleClose,
        handleZoom
    };
}