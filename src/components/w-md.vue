<template>
  <div class="md-container" v-html="blog[0].content"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import blog from "../blogs/blog";
export default defineComponent({
  setup() {
    return { blog };
  },
});
</script>
<style lang="scss" scoped>
.md-container {
  padding: 20px;

  width: calc(100% - 40px);
  height: calc(100% - 40px);
  overflow-y: scroll;
}
</style>
<style lang="scss">
@import "/node_modules/highlight.js/scss/stackoverflow-light";
.md-container {
  
  * {
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
  }
  .hljs {
    background: rgba(3, 56, 52, 0.192);
  }
  p,
  ol li,
  ul li {
    font-size: initial;
  }
  .name {
    color: gray;
    font-style: italic;
  }

}
</style>
