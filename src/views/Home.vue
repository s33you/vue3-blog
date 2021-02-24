<template>
  <div class="home">
    hello
    <button class="btn   btn-primary" type="button">
      <span class="btn-text">Primary</span>
    </button>
    <button class="btn   btn-primary border-dark" type="button">
      <span class="btn-text">Bordered</span>
    </button>
    <div class="card">
      <div class="card-header">
        Default Primary Card Header Title
      </div>
      <div class="card-body">
        <p class="card-text">
          Windows 95 sold for $89.99 as an upgrade or $179.99 for the full
          version.
        </p>
        <div class="d-flex justify-content-end mt-3">
          <button class="btn btn-sm mr-2 btn-primary border-dark" type="button">
            <span class="btn-text">OK</span>
          </button>
          <button class="btn btn-sm btn-primary" type="button">
            <span class="btn-text">Cancel</span>
          </button>
        </div>
      </div>
    </div>
    <button class="btn  btn-primary" type="button">
      <span class="btn-text">Primary</span>
    </button>
    <button class="btn   btn-secondary" type="button">
      <span class="btn-text">Secondary</span>
    </button>
    <button class="btn   btn-tertiary" type="button">
      <span class="btn-text">Tertiary</span>
    </button>
    <button class="btn   btn-info" type="button">
      <span class="btn-text">Info</span>
    </button>
    <button class="btn   btn-success" type="button">
      <span class="btn-text">Success</span>
    </button>
    <button class="btn   btn-warning" type="button">
      <span class="btn-text">Warning</span>
    </button>
    <button class="btn   btn-danger" type="button">
      <span class="btn-text">Danger</span>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { FullScreen } from "@/utils/tool";
export default defineComponent({
  name: "Home",
  setup() {
    onMounted(() => {
      // FullScreen()
    });
  },
});
</script>
<style lang="scss">
.home {
  @include container;
  background-color: #00797c;
  font-family: Pxiel;
}
</style>
