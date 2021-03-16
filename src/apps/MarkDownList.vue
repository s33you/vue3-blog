<template>
  <div class="markdown-list">
    <div v-for="(blog, index) in blogs" :key="index" class="mark_down">
      <img src="@/assets/images/markdown.png" />
      <div class="title" >{{ blog.title }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import blogs from "@/blogs/blog";
export default defineComponent({
  setup() {
    return { blogs };
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
