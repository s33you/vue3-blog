<template>
  <div class="list-bar">
    <!-- Start图标 -->
    <button class="button-classic start">
      <w-icon icon="github" size="20" />
      <a href="https://github.com/s33you" target="blank">github</a>
    </button>
    <!-- 任务区域 -->
    <div class="task-area">
      <div
        class="bar-window"
        v-for="(task, index) in taskList"
        :key="index"
        @click="clickTask(index,task)"
        :class="task.isActive ? 'button-inner' : 'button-classic'"
      >
        <img :src="task.img" v-if="task.img" /> {{ task.title }}
      </div>
    </div>
    <!-- 时间 -->
    <span class="time button-inner">
      {{ time }}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import wIcon from "@/components/w-icon.vue";
import useTaskList from "@/hooks/layouts/useTaskList";
import { Task } from "@/hooks/layouts/useTaskStore";
export default defineComponent({
  name: "w-task-list",
  components: {
    wIcon,
  },
  setup() {
    const { createTask, time, taskList, selectTask,hiddenTask } = useTaskList();
    const clickTask = (index:number,task:Task)=>{
      if(task.isActive){
        hiddenTask(index)
      }
      else{
        selectTask(index)
      }
    }
    return { createTask, time, taskList,clickTask };
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
    flex-shrink: 0;
    height: 30px;
    width: 100px;
    margin: auto 0px;
    background-color: silver;
    margin: auto 10px;
    font-family: Pxiel;
    align-items: center;
  }
  .task-area {
    display: flex;
    width: 100%;
    margin-right: 95px;
  }
  .bar-window {
    flex-shrink: 1;
    height: 28px;
    margin-right: 10px;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    flex-basis: 200px;
    padding: 0 10px 0 6px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAG0lEQVQYV2M8cODAf3t7ewbG/////z948CADAFuqCj64BtLKAAAAAElFTkSuQmCC);
    img {
      width: 20px;
      vertical-align: middle;
    }
  }
  .time {
    position: absolute;
    right: 10px;
    bottom: 2px;
    line-height: 30px;
    padding: 0 10px;
  }
}
</style>
