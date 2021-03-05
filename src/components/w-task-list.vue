<template>
  <div class="list-bar">
    <button class="button-classic start">
      <w-icon icon="github" size="20" />
          <a href="https://github.com/s33you" target="blank">github</a>
    </button>
    <div class="bar-window button-inner">相册</div>
    <div class="bar-window button-inner">相册</div>
    <div class="bar-window button-inner">相册</div>
    <span class="time button-inner">
      {{ time }}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
import wIcon from "@/components/w-icon.vue";
import useTaskList from '@/hooks/components/useTaskList'
export default defineComponent({
  name: "w-task-list",
  components: {
    wIcon,
  },
  setup() {
    return useTaskList()
  },
});
</script>
<style lang="scss" scoped>
.list-bar {
  position: fixed;
  width: 100%;
  height: 33px;
  padding: 2px;
  box-shadow: inset 1px 0 #fff;
  display: block;
  background-color: silver;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #4e4e4e;
  user-select: none;
  display: flex;
  .start {
    height: 30px;
    width: 100px;
    margin: auto 0px;
    background-color: silver;
    margin: auto 10px;
    font-family: Pxiel;
    align-items: center;
  }
  .bar-window {
    height: 28px;
    margin-right: 10px;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    flex-basis: 200px;
    padding: 0 10px 0 6px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAG0lEQVQYV2M8cODAf3t7ewbG/////z948CADAFuqCj64BtLKAAAAAElFTkSuQmCC);
  }
  .time {
    position: absolute;
    right: 10px;
    line-height: 30px;
    padding: 0 10px;
  }
}
</style>
