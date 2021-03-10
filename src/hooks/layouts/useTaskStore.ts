import { reactive, watch } from 'vue'
import { Style } from '../components/useDrag'
/**
 * Interface
 */
export interface Task {
    title: string,
    defaultStyle?: Style,
    isActive: boolean,
    isShow: boolean,//用于dialog的显示判断
    zIndex?: number,
    img?: string
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

]

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
        /**
         * 是否已经打开
         */
        let flag = true
        tasks.forEach((exist_task, index) => {
            if (exist_task === task) {
                flag = false
                TaskStore.actions.selectTask(index)
            }
        })
        /**
         * 没有打开，新建
         */
        if (flag) {
            task.zIndex = TaskStore.state.maxIndex
            let index = tasks.push(task)
            TaskStore.actions.selectTask(index - 1)
        }

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
        let task = state.tasks[index]

        state.tasks.forEach((task) => {
            task.isActive && (task.isActive = false)
            if (task.zIndex) {
                max = task.zIndex > max ? task.zIndex : max
            }
        })
        //选中必然会展示dialog
        task.isShow = true
        task.isActive = true
        task.zIndex = max + 1
        state.maxIndex = max + 1
        state.activeIndex = index
    }
}


class TaskStore {
    static state = reactive<TaskState>({
        tasks: Tasks,
        activeIndex: 0,
        maxIndex: 99
    })
    static actions = createActions(TaskStore.state)
}

export default TaskStore