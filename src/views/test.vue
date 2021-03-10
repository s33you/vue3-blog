<template>
  <div class="editor"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Quill from "quill";

export default defineComponent({
  setup() {
    onMounted(() => {
      var toolbarOptions = {
        // toggled buttons
        container: [
          ["bold"], // toggled buttons
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ color: [] }, ], // dropdown with defaults from theme
          [{ align: [] }],
        ],

        handlers: {
          // handlers object will be merged with default handlers object

        },
      };
      const editor = new Quill(".editor", {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
      });
      editor.on('text-change',()=>{
          console.log(editor.root.innerHTML)
      })
    });
  },
});
</script>

<style lang="scss" scoped>
@import url("https://cdn.quilljs.com/1.3.6/quill.snow.css");
@import url("https://cdn.quilljs.com/1.3.6/quill.bubble.css");
</style>
