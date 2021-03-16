<script lang="tsx">
import { defineComponent } from "vue";
import WDialog from "@/components/w-dialog.vue";
import DialogList from "@/hooks/layouts/useDialogList";
export default defineComponent({
  components: {
    WDialog,
  },
  setup() {
    return DialogList
  },
});
</script>

<style scoped lang="scss"></style>
