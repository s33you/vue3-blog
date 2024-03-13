/**
 * 根据TaskType 去渲染相应的元素
 */
import MarkDownList from "@/apps/MarkDownList.vue";
import WMd from "@/components/w-md.vue";
import WDialog from "@/components/w-dialog.vue";
import MusicPlayer from "@/apps/MusicPlayer.vue";
const type2ElementMap = new Map<DialogType, Function>();

type2ElementMap.set("blog-list", (task: Task) => {
  return <MarkDownList></MarkDownList>;
});
type2ElementMap.set("blog", (task: Task) => {
  return <WMd blog={task.props.blog}></WMd>;
});

type2ElementMap.set("music-list", (task:Task)=>{
  return <MusicPlayer></MusicPlayer>;
});
/**
 * 渲染部分
 */
import useTaskList from "@/hooks/layouts/useTaskList";
import { DialogType, Task } from "./useTaskStore";
const { taskList, removeTask, selectTask, hiddenTask } = useTaskList();
const DialogList = () => {
  return taskList.map((task, index) => {
    return (
      <w-dialog
        defaultStyle={task.defaultStyle}
        title={task.title}
        isShow={task.isShow}
        icon={task.img}
        style={`zIndex:${task.zIndex}`}
        onSelect={() => {
          selectTask(index);
        }}
        id={`dialog-${task.id}`}
        isActive={task.isActive}
        onHidden={() => {
          hiddenTask(index);
        }}
        onClose={() => {
          removeTask(index);
        }}
      >
        {type2ElementMap.get(task.type)
          ? (type2ElementMap.get(task.type) as Function)(task)
          : ""}
      </w-dialog>
    );
  });
};
export default DialogList;
