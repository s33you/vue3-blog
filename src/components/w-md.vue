<template>
  <div class="md-container" v-html="blog"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["blog"],
});
</script>
<style lang="scss" scoped>
.md-container {
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  text-align: left;
  overflow-y: scroll;
}
</style>
<style lang="scss" >
.md-container {
  font-family: none;
  * {
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
  }
  code{
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 13px;
    
  }
  .hljs {
    background: rgb(56, 56, 56);
    line-height: 30px;
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
  table {
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
    width: 700px;
  }
  table td,
  table th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
    text-align: center;
    padding: 10px;

  }
  table thead th {
    background-color: rgba(3, 56, 52, 0.192);;
    width: 100px;
  }
  table tr:nth-child(odd) {
    background: #fff;
    text-align: center;

  }
  table tr:nth-child(even) {
    background: #f5fafa;
    text-align: center;

  }
}
</style>
