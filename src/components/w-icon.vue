<template>
  <span class="w-icon">
    <i :class="icon" class="iconfont" :style="size" />
  </span>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup(props, { attrs }) {
    let { icon, size } = attrs;
    icon = ref("icon-" + icon);
    size = ref(`font-size:${size}px`);
    return { icon, size };
  },
  inheritAttrs: false,
});
</script>

<style scoped lang="scss">
.w-icon {
    
  display: inline-block;
}
</style>
