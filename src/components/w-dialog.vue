<template>
  <w-drag
    :defaultStyle="defaultStyle"
    :style="getStyle(defaultStyle)"
    :minBox="minBox"
    class="w-dialog"
    :class="isActive ? 'card-secondary' : ''"
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
       <button class="button-classic icon-button" @click.stop="handleZoom">
        ◻
      </button>
      <button class="button-classic icon-button" @click.stop="handleHidden">
        -
      </button>
    </div>
    <div class="content-block">
      <slot>
        <w-md />
      </slot>
    </div>
  </w-drag>
</template>
<script lang="ts">
import { defineComponent, inject, ref, shallowReactive } from "vue";
import {useDialog} from '@/hooks/components/useDialog'
import wDrag from "@/components/w-drag.vue";
import WMd from "./w-md.vue";

export default defineComponent({
  components: {
    wDrag,
    WMd,
  },
  props: {
    title: {
      default: "对话框",
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
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  inject: ["container"],
  setup(props, context) {
    return {...useDialog(props,context)}
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
