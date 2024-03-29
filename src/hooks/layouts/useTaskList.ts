import { dateFormat } from '@/utils/tool';
import { onMounted, ref } from 'vue'
import TaskStore from './useTaskStore'
function useTaskList(){
    const time = ref(dateFormat("hh:mm:ss", new Date()));
    const taskList = TaskStore.state.tasks
    const maxIndex = TaskStore.state.maxIndex
    const {createTask,selectTask,removeTask,hiddenTask} = TaskStore.actions
    onMounted(() => {
        setInterval(() => {
            time.value = dateFormat("hh:mm:ss", new Date());
        }, 1000);
    });
    return {time,taskList,createTask,selectTask,maxIndex,removeTask,hiddenTask}
}
export default useTaskList