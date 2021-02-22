<template>
  <div class="home">hello</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Home",
  setup() {
    onMounted(() => {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      } catch {
        console.warn('全屏失效')
      }
    });
  },
});
</script>
<style lang="scss" scoped>
.home {
  @include container;
  background-color: #00797c;
}
</style>
