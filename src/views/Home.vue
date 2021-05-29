<template>
  <div class="home" id="desktop">
    <IconList />
    <TaskList />
    <DialogList />
  </div>
</template>
<script lang="ts">
import IconList from "@/layouts/IconList.vue";
import TaskList from "@/layouts/TaskList.vue";
import DialogList from "@/layouts/DialogList.vue";
import { defineComponent, onMounted, provide, shallowReactive } from "vue";
import { Throttle } from "@/utils/tool";

export default defineComponent({
  components: { IconList, TaskList, DialogList },
  name: "Home",

  setup() {
    const container = shallowReactive({
      width: 0,
      height: 0,
    });
    onMounted(() => {
      // FullScreen()
      const desktop = document.querySelector("#desktop") as HTMLElement;

      container.width = desktop.clientWidth;
      container.height = desktop.clientHeight;
      window.onresize = Throttle(() => {
        container.width = desktop.clientWidth;
        container.height = desktop.clientHeight;
        console.log("resize");
      }, 60);
    });
    provide("container", container);
    return container;
  },
});
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  @include container;
  background-color: #00797c;
  overflow:hidden;
  font-family: Pxiel;
}
</style>
