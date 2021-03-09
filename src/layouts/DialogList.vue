<script lang="tsx">
import { defineComponent } from "vue";
import useTaskList from "@/hooks/layouts/useTaskList";

import WDialog from "@/components/w-dialog.vue";
export default defineComponent({
  components: { WDialog },
  setup(props,context) {
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
          isShow={task.isShow}
          icon={task.img}
          style={`zIndex:${task.zIndex}`}
          onSelect={() => {
            this.selectTask(index);
          }}
          isActive={task.isActive}
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
