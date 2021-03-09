<template>
  <div class="icon_list">
    <div
      class="_icon"
      v-for="(icon, index) in iconList"
      :key="index"
      @dblclick="addDialog(icon)"
    >
      <img :src="icon.img" />
      <div>{{ icon.title }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useIconList } from "@/hooks/layouts/useIconlist";
export default defineComponent({
  setup() {
    const { iconList, addDialog } = useIconList();
    return { iconList, addDialog };
  },
});
</script>

<style  lang="scss" scoped>
.icon_list {
  padding: 20px 0 0 20px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  ._icon {
    cursor: pointer;
    color: white;
    margin: 15px;
    width: vpx(70px);
    img {
      width: vpx(60px);
    }
    font-size: vpx(22px);
  }
}
</style>
