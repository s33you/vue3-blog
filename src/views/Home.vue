<template>
  <div class="home">
    <w-icon-list />
    <w-task-list/>
  </div>
</template>
<script lang="ts">
import WIconList from "@/layouts/w-icon-list.vue";
import WTaskList from "@/layouts/w-task-list.vue";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  components:{WIconList, WTaskList},
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
