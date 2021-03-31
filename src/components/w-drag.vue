<template>
  <div class="w-drag" @mousedown.stop="handleMouseDownOnShape" >
    <div
      class="shape-point"
      v-for="(item, index) in pointList"
      @mousedown.stop="handlePointMouseDown(item, $event)"
      :key="index"
      :style="getPointStyle($props, item)"
    ></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { getPointStyle,handlePointMouseDown,Style} from "@/hooks/components/useDrag";
const pointList: Array<string> = [ "ne", "se", "sw", "nw"];

export default defineComponent({
  name: "w-drag",
  props: {
    defaultStyle: {
      type: Object as PropType<Style>,
      required: true,
    },
    minBox:{
      type:Object as PropType<Style>
    },
  },
  inject:['container'],
  setup() {
    return { getPointStyle, pointList,handlePointMouseDown};
  },
  mounted(){
  }
});
</script>
<style lang="scss" scoped>
.w-drag {
  position: absolute;
  resize: both;
  background-color: #fff;
  .shape-point {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
}
</style>

