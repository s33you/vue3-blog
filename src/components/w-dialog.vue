<template>
  <w-drag
    :defaultStyle="defaultStyle"
    :style="getStyle(defaultStyle)"
    :minBox="minBox"
    class="w-dialog"
    :class="isActive?'card-secondary':''"
    v-show="isShow"
  >
    <div
      class="card-header dialog-header"
      @mousedown.stop="handleMoveDialog"
      @click="selectDialog"
    >
      <img id="icon" :src="icon" v-if="icon" />
      <span id="title">
        {{ title }}
      </span>
      <button class="button-classic icon-button" @click.stop="handleClose">
        x
      </button>
      <button class="button-classic icon-button" @click.stop="handleHidden">
        -
      </button>
    </div>
    <div class="content-block">
      <slot>
        <w-md/>
      </slot>
    </div>
  </w-drag>
</template>
<script lang="ts">
import { defineComponent, inject, ref, shallowReactive } from "vue";
import { getStyle } from "@/utils/style";
import { exChangeAtrribe, Throttle } from "@/utils/tool";
import wDrag from "@/components/w-drag.vue";
import WMd from "./w-md.vue";
const colorTable: any = {
  green: "card-secondary",
  bule: "card-tertiary",
};
export default defineComponent({
  components: {
    wDrag,
    WMd,
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
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    isActive:{
      type:Boolean,
      default:false
    }
  },
  inject: ["container"],
  setup(props, context) {
    const color =
      props.color || exChangeAtrribe("color", props, context.attrs, colorTable);
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
    const selectDialog = ()=>{
      emit("select")
    }
    return {
      selectDialog,
      color,
      getStyle,
      handleMoveDialog,
      minBox,
      handleHidden,
      handleClose,
    };
  },
});
</script>
<style lang="scss" scoped>
.w-dialog {
  z-index: 99;
  position: absolute;
  border-top: 2px solid #efefef;
  border-left: 2px solid #efefef;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;

  .dialog-header {
    width: calc(100% -4px);
    transform: translateX(1px);
    line-height: initial;
    text-align: left;
    height: vpx(30px);
    cursor: move;
    #title {
      font-size: vpx(24px);
    }
    #icon {
      width: vpx(24px);
      margin: 3px 3px 0 0;
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
