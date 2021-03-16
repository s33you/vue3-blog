/**
 * 根据TaskType 去渲染相应的元素
 */
import MarkDownList from "@/apps/MarkDownList.vue";
import WMd from "@/components/w-md.vue";
const type2ElementMap = new Map<DialogType, JSX.Element>();

type2ElementMap.set('blog-list',()=>{
  return <MarkDownList></MarkDownList>;
})
type2ElementMap.set('blog',()=>{
  return <WMd></WMd>
})
/**
 * 渲染部分
 */
import useTaskList from "@/hooks/layouts/useTaskList";
import { DialogType } from "./useTaskStore";
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
        isActive={task.isActive}
        onHidden={() => {
          hiddenTask(index);
        }}
        onClose={() => {
          removeTask(index);
        }}
      >
        {type2ElementMap.get(task.type)}
      </w-dialog>
    );
  });
};
export default DialogList;
