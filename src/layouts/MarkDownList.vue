<template>
    <div class="markdown-list">
        <div v-for="(blog,index) in blogs" :key="index">
            <div >{{blog.title}}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent} from "vue"
import blogs from '@/blogs/blog'
export default defineComponent({
    setup(){
        return {blogs}
    }
});
</script>

<style  lang="scss" scoped>
.markdown-list{
    width: 100%;
    height: 100%;
    display: flex;
}
</style>