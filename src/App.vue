<template>
  <loading :loaded="loaded" @enter="enter" v-if="!loaded || !entered" />
  <router-view v-if="loaded && entered" />
</template>
<script lang="ts">
import '@/styles/fonts.css';
import { defineComponent} from "vue";
import useLoading from '@/hooks/components/useLoading'
import loading from "@/components/loading.vue";
export default defineComponent({
  components: {
    loading,
  },
  setup() {
    return useLoading()
  }
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
