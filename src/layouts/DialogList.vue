<script lang="tsx">
import { defineComponent } from "vue";
import useTaskList from "@/hooks/layouts/useTaskList";
import WDialog from "@/components/w-dialog.vue";
export default defineComponent({
  components: { WDialog },
  setup(props,context) {
    const { taskList, removeTask, selectTask ,hiddenTask} = useTaskList();
    return {
      taskList,
      removeTask,
      selectTask,
      hiddenTask
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
            this.hiddenTask(index)
          }}
          onClose={() => {
            this.removeTask(index); 
          }}
        ></w-dialog>
      );
    });
  },
});
</script>

<style scoped lang="scss"></style>
