<template>
  <div class="home">
    <IconList />
    <TaskList/>
  </div>
</template>
<script lang="ts">
import IconList from "@/layouts/IconList.vue";
import TaskList from "@/layouts/TaskList.vue";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  components:{IconList, TaskList},
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
