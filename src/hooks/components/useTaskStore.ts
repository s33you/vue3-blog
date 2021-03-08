import { reactive, watch } from 'vue'
import { DialogProp } from './useDrag'
/**
 * Interface
 */
interface Task {
    title: string,
    defaultStyle?: DialogProp,
    isActive: boolean,
    isShow: boolean,//用于dialog的显示判断
    zIndex?: number
}
interface TaskState {
    maxIndex: number,
    activeIndex: number,
    tasks: Array<Task>
}

/**
 * Init Data
 */
const Tasks: Array<Task> = [
    { title: '相册', isActive: true, isShow: false },
    { title: 'Blog', isActive: false, isShow: false },
    { title: '影像', isActive: false, isShow: false },
]
Tasks.forEach((task, index) => {
    task.zIndex = index + 99
})
/**
 * Actions
 */
//生成器函数
function createActions(state: TaskState) {
    return {
        createTask: createTask(state),
        removeTask: removeTask(state),
        updateTask: updateTask(state),
        selectTask: selectTask(state)
    }
}
//创建任务
function createTask({ tasks }: TaskState) {
    return (task: Task) => {
        tasks.push(task)
    }
}
//删除任务
function removeTask({ tasks }: TaskState) {
    return (index: number) => {
        tasks.splice(index, 1)
    }
}
//更新任务
function updateTask({ tasks }: TaskState) {
    return (index: number, nTask: Task) => {
        tasks[index] = nTask
    }
}
//选择任务 
function selectTask(state: TaskState) {
    return (index: number) => {
        let max = 99
        state.tasks.forEach((task) => {
            task.isActive && (task.isActive = false)
            if (task.zIndex) {
                max = task.zIndex > max ? task.zIndex : max
            }
        })
        //选中必然会展示dialog
        state.tasks[index].isShow = true
        state.tasks[index].isActive = true
        state.tasks[index].zIndex = max + 1
        state.maxIndex = max + 1
        state.activeIndex = index
    }
}


class TaskStore {
    static state = reactive<TaskState>({
        tasks: Tasks,
        activeIndex: 0,
        maxIndex: 0
    })
    static actions = createActions(TaskStore.state)

    static watcher = watch(TaskStore.state, (nVal) => {
        console.log(nVal)
    }, {
        deep: true
    })
}

export default TaskStore