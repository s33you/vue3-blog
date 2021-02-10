<template>
  <div class="container">
    <div class="loading">
      <img src="@/assets/NERV_Logo.png" />
      <img src="@/assets/NERV_Logo.png" class="clip" id="loading" />
      <img src="@/assets/NERV_Logo.png" class="shark" />
    </div>
    <div class="button" v-if="loading">
      <div class="decrator"></div>
      <div class="text" >
        出擊
      </div>
      <div class="decrator"></div>
    </div>
  </div>
</template>
<style lang="scss">
@font-face {
    font-family: MingChao;
    src: url('../assets/GenWanMinJP-Light-2.ttf');
} 
@font-face {
    font-family: MingChao-Medium;
    src: url('../assets/GenWanMinJP-Medium-3.ttf');
}
html,
body {
  width: 100vw;
  margin: 0;
  padding: 0;
  outline: none;
  height: 100vh;
  overflow: hidden;
  background-color: black;
}

.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading {
  width: 40%;
  height: 40%;
  position: absolute;
  top: 50%;
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
  clip-path: var(--slice-0);
}

.shark {
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
  width: 15%;
  height: 13vh;
  color: red;
}

.decrator {
  width: 100%;
  height: 30%;
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
  background-size: 30px 30px;
}
.text {
  font-family:MingChao-Medium;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 10px;
  line-height: 60px;
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
<script>
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    const template = (value) => {
      return `inset(0% 0% 0% ${value}%)`;
    };
    let count = 0;
    const loading = () => {
      document.querySelector("#loading").style.clipPath = template(count++);

      if (count > 100) {
        // count = 0
      }
      requestAnimationFrame(loading);
    };
    requestAnimationFrame(loading);
  },
});
</script>
