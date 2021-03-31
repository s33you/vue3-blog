<template>
  <div class="form-check" :class="[{ disabled: isExist($attrs.disabled) }]">
    <label class="form-check-label">
      <input
        class="form-check-input"
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:model-value', $event.target.checked)"
        v-bind="$attrs"
      />
      <span class="form-check-x"></span>
      <span class="form-check-sign"></span>
      <span class="text"><slot>Check</slot></span>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { isExist } from "@/utils/filters";

export default defineComponent({
  name: "w-check",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
    },
  },
  setup(props, context) {
    return { isExist };
  },
});
</script>
<style lang ="scss" scoped>
@import "../styles/fonts.css";
@import "../styles/w95.scss";
</style>
<style lang="scss" scoped>
.text {
  font-size: 14px;
}
</style>
