<template>
  <loading />
    {{progress}}
  <!-- <router-view v-if="!loading"/> -->
</template>
<script lang="ts">
import { defineComponent,  ref, watch } from "vue";
import loading from '@/components/loading.vue'
export default defineComponent({
  components:{
    loading
  },
  setup() {
    let progress = ref(0);
    let loading  = ref(true)
    let timer = setInterval(() => {
      progress.value = page_progress;
    }, 60);
    watch(progress,(value)=>{
       if (value == 1) {
      clearInterval(timer);
      setTimeout(() => {
        loading.value = false;
      },100);
    }
    })
    return {progress,loading}
  },
  data() {
    return {
      progress: page_progress,
    };
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
