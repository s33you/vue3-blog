<template>
  <div class="card " :class="color">
    <div class="card-header ">
      <span id="title">
        {{ title }}
      </span>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { exChangeAtrribe } from "@/utils/tool";
import { computed, defineComponent } from "vue";
const colorTable: any = {
  green: "card-secondary",
  bule: "card-tertiary",
};
export default defineComponent({
  name: "w-card",
  props: {
    title: {
      type: String,
      default: "title",
    },
    color: {
      type: String,
    },
  },
  setup(props, {attrs}) {
    const color = exChangeAtrribe("color", props,attrs, colorTable);
    const title = exChangeAtrribe("title", props, attrs);
    return { title, color };
  },
});
</script>
<style lang="scss" scoped>

.card {
  .card-header {
    line-height: initial;
    height: vpx(30px);
    #title {
      font-size: vpx(30px);
    }
  }
}
</style>
<style lang ="scss" scoped>
@import "../styles/fonts.css";
@import "../styles/w95.scss";
</style>
