<template>
  <div class="container">
    <div class="loading">
      <img src="/vue3-blog/NERV_Logo.png" />
      <img src="/vue3-blog/NERV_Logo.png" class="clip" id="loading" />
      <img src="/vue3-blog/NERV_Logo.png" class="shark shark-animation" />
    </div>
    <div class="button" v-if="isLoaded">
      <div class="decrator"></div>
      <div class="text" @click="enter">
        出擊
      </div>
      <div class="decrator"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    loaded: Boolean,
  },
  setup(props,context) {
    const count = ref(0);
    const isLoaded = computed(() => {
      return props.loaded && count.value == 100;
    });
    onMounted(() => {
      const template = (value: number) => {
        return `inset(0% 0% 0% ${value}%)`;
      };
      let loadElement: HTMLElement = document.querySelector(
        "#loading"
      ) as HTMLElement;
      /**
       * 动画函数
       */
      const loading = () => {
        if (count.value < 70 && !props.loaded) {
          count.value++;
        } else if (props.loaded && count.value < 100) {
          count.value++;
        }
        if (loadElement) {
          loadElement.style.clipPath = template(count.value);
        }
        if (count.value < 100) {
          requestAnimationFrame(loading);
        }
      };
      requestAnimationFrame(loading);
    });
    const enter = ()=>{
      context.emit('enter')
    }
    return { isLoaded ,enter};
  },
});
</script>
<style lang="scss" scoped>

html,
body {
  width: 100vw;
  margin: 0;
  padding: 0;
  outline: none;
  height: 100vh;
  overflow: hidden;
}

.container {
  background-color: black;
  width: 100%;
  height: 100%;
  position: relative;
}

.loading {
  width: 40%;
  height: 40%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: darken;
}

.clip {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(8px);
  filter: invert(100%) contrast(90%);
}

.shark {
  z-index: 100;
  /* mix-blend-mode: color-burn; */
  position: absolute;
  top: 0;
  left: 0;
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(0% -6px 5% 0%);
  --slice-2: inset(90% -6px 0 0);
  --slice-3: inset(70% -6px 62% 0);
  --slice-4: inset(60% -6px 75% 0);
  --slice-5: inset(55% -6px 43% 0);
  --slice-6: inset(80% -6px 5% 0);
  --slice-7: inset(90% -6px 5% 0);
  clip-path: var(--slice-1);
}

.shark-animation {
  animation: 2s glitch infinite ease-in-out;
  animation-timing-function: steps(2, end);
  animation-delay: 2s;
}

.button {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  color: red;
  transition: all 1s linear;
  cursor: pointer;
}

.decrator {
  width: rpx(100px);
  height: vpx(40px);

  // @media only screen and (max-width: 1024px) {
  //   height: vpx(20px);
  //   width: rpx(240px);
  //   height: vpx(30px);
  //   background-size: rpx(30px) rpx(30px);
  // }
  background: linear-gradient(
    45deg,
    red 0,
    red 25%,
    transparent 25%,
    transparent 50%,
    red 50%,
    red 75%,
    transparent 75%,
    transparent
  );
  background-size: rpx(15px) rpx(15px);

}
.text {
  font-family: MingChao-Medium;
  font-size: vpx(60px);
   @media only screen and (max-width: 1024px) {
     font-size: vpx(50px);
   line-height: vpx(100px);

  }
  font-weight: bold;
  letter-spacing: 10px;
  line-height: vpx(120px);
  text-align: center;
  &:hover {
    animation: 1.5s shark infinite;
    animation-timing-function: steps(5, end);
  }
}
@keyframes shark {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }

  5% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }

  15% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }

  20% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }

  30% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }

  35% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }

  45% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }

  55% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }

  65% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }

  75% {
    clip-path: var(--slice-6);
    transform: translate(-10px, 0px);
  }

  80% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }

  85% {
    clip-path: var(--slice-7);
    transform: translate(0);
  }

  90% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }

  100% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
}
</style>
