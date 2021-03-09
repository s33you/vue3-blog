<script lang="tsx">
import { defineComponent } from "vue";
import useTaskList from "@/hooks/layouts/useTaskList";

import WDialog from "@/components/w-dialog.vue";
export default defineComponent({
  components: { WDialog },
  setup() {
    const { taskList, removeTask, selectTask } = useTaskList();

    return {
      taskList,
      removeTask,
      selectTask,
    };
  },
  render() {
    return this.taskList.map((task, index) => {
      return (
        <w-dialog
          defaultStyle={task.defaultStyle}
          title={task.title}
          color="green"
          isShow={task.isShow}
          icon={task.img}
          style={`zIndex:${task.zIndex}`}
          onSelect={() => {
            this.selectTask(index);
          }}
          onHidden={() => {
            task.isShow = false;
            task.isActive = false;
          }}
          onClose={() => {
            this.removeTask(index);
          }}
        />
      );
    });
  },
});
</script>

<style scoped lang="scss"></style>
