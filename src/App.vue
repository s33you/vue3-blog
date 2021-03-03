<template>
  <loading :loaded="loaded" @enter="enter" v-if="!loaded || !entered" />
  <router-view v-if="loaded && entered" />
</template>
<script lang="ts">
import '@/styles/w95.css';
import '@/styles/fonts.css';
import { defineComponent, onMounted, ref, watch } from "vue";
import loading from "@/components/loading.vue";
export default defineComponent({
  components: {
    loading,
  },
  setup() {
    let progress = ref(0);
    let entered = ref(false);
    let loaded = ref(false);
    let timer = setInterval(() => {
      progress.value = page_progress;
    }, 0);

    let enter = () => {
      entered.value = true;
    };

    watch(progress, (value) => {
      if (value == 1 && !loaded.value) {
        clearInterval(timer);
        setTimeout(() => {
          loaded.value = true;
        }, 100);
      }
    });

    return { progress, loaded, enter, entered };
  },
  data() {
    return {
      progress: page_progress,
    };
  },
});
</script>
<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
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
