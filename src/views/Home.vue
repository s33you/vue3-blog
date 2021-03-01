<template>
  <div class="home">
   Home Page is Here
    
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  
  name: "Home",
  setup() {
    onMounted(() => {
      // FullScreen()
    });
  },
});
</script>
<style lang="scss">
.home {
  @include container;
  background-color: #00797c;
  font-family: Pxiel;
}
</style>
