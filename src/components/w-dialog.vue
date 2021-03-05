<template>
  <w-drag
    :defaultStyle="defaultStyle"
    :style="getStyle(defaultStyle)"
    :minBox="minBox"
    class="w-dialog"
    :class="color"
    v-if="!isClose"
    v-show="!isHidden"
  >
    <div class="card-header dialog-header" @mousedown.stop="handleMoveDialog">
      <span id="title">
        {{ title }}
      </span>
      <button class="button-classic icon-button" @click="handleClose">
        x
      </button>
      <button class="button-classic icon-button" @click="handleHidden">
        -
      </button>
    </div>
    <div class="content-block">
      <slot>主区域</slot>
    </div>
  </w-drag>
</template>
<script lang="ts">
import { defineComponent, inject, ref, shallowReactive } from "vue";
import { getStyle } from "@/utils/style";
import { exChangeAtrribe, Throttle } from "@/utils/tool";
import wDrag from "@/components/w-drag.vue";
const colorTable: any = {
  green: "card-secondary",
  bule: "card-tertiary",
};
export default defineComponent({
  components: {
    wDrag,
  },
  props: {
    title: {
      default: "对话框",
    },
    color: {
      type: String,
      default: colorTable.bule,
    },
    defaultStyle: {
      type: Object,
      default: {
        width: 200,
        top: 10,
        left: 10,
        height: 100,
      },
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  inject: ["container"],
  setup(props, context) {
    const color = props.color|| exChangeAtrribe("color", props, context.attrs, colorTable);
    let { defaultStyle } = props;
    let { emit } = context;
    const minBox = shallowReactive({
      width: 200,
      height: 100,
    });
    const isClose = ref(false);
    const container = inject("container") as any;
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
          if (top < 0 || top + ele.height > container.height) {
            top = top < 0 ? 0 : container.height - ele.height;
          }
          if (left < 0 || left + ele.width > container.width) {
            left = left < 0 ? 0 : container.width - ele.width;
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
      isClose.value = true;
      emit("close");
    };
    return {
      color,
      getStyle,
      handleMoveDialog,
      minBox,
      isClose,
      handleHidden,
      handleClose,
    };
  },
});
</script>
<style lang="scss" scoped>
.w-dialog {
  position: relative;
  border-top: 2px solid #efefef;
  border-left: 2px solid #efefef;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;

  .dialog-header {
    position: relative;
    width: calc(100% -4px);
    transform: translateX(1px);
    line-height: initial;
    height: vpx(30px);
    cursor: move;

    #title {
      font-size: vpx(24px);
    }
  }
  .content-block {
    width: calc(100% - 6px);
    transform: translateX(1px);
    height: vpx(calc(100% - 36px));
    border-left: 2px solid #404040;
    border-top: 2px solid #404040;
    border-right: 2px solid #f4f4f4;
    border-bottom: 2px solid #f4f4f4;
  }
  .icon-button {
    float: right;
    width: 20px;
    height: 20px;
    margin: 2px;
  }
}
</style>
