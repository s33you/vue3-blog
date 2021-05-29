<template>
  <div class="markdown-list">
    <div
      v-for="(blog, index) in blogs"
      :key="index"
      class="mark_down"
      @dblclick.stop="openBlog(blog)"
    >
      <img src="@/assets/images/markdown.png" />
      <div class="title">{{ blog.title }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import blogs, { Blog } from "@/blogs/blog";
import TaskStore, { Task } from "@/hooks/layouts/useTaskStore";
export default defineComponent({
  setup() {
    const { createTask } = TaskStore.actions;
    const openBlog = (blog: Blog) => {
      const task: Task = {
        title: blog.title,
        props: {
          blog: blog.content,
        },
        img:require('@/assets/images/markdown.png'),
        isActive: false,
        isShow: false,
        type: "blog",
      };
      createTask(task);
    };
    return { blogs, openBlog };
  },
});
</script>

<style lang="scss" scoped>
.markdown-list {
  width: 100%;
  height: 100%;
  display: flex;
  .mark_down {
    cursor: pointer;
    margin: 15px;
    width: vpx(70px);
    height: vpx(90px);
    img {
      width: vpx(40px);
      margin-bottom: 5px;
    }
    font-size: vpx(22px);
  }
  .title {
    @include multiline-ellipsis;
  }
}
</style>
