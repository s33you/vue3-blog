<template>
  <button class="btn" type="button" :class="sizeClass">
    <span class="btn-text">
      <slot>button</slot>
    </span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { exChangeAtrribe } from "@/utils/tool";
const sizeTable: any = {
  small: "btn-sm",
  large: "btn-lg",
};
export default defineComponent({
  name: "w-button",
  props: {
    size: {
      type: String,
    },
  },
  setup(props, context) {
    const sizeClass = exChangeAtrribe("size", props, context.attrs, sizeTable);
    return { sizeClass };
  },
});
</script>
