import { reactive, readonly } from 'vue'
import { DialogProp } from './useDrag'
interface Task {
    title: string,
    defaultStyle?: DialogProp,
    isActive: boolean,
    zIndex?: number
}
const Tasks = reactive<Array<Task>>([
    {title:'相册',isActive:true}
])

function createTask(tasks: Array<Task>) {
    return (task: Task) => {
        tasks.push(task)
    }
}
function removeTask(tasks: Array<Task>) {
    return (index: number) => {
        tasks.splice(index, 1)
    }
}

function updateTask(tasks: Array<Task>) {
    return (index: number, nTask: Task) => {
        tasks[index] = nTask
    }
}
function createActions(tasks: Array<Task>) {
    return {
        createTask: createTask(tasks),
        removeTask: removeTask(tasks),
        updateTask: updateTask(tasks)
    }
}
const Store = {
    tasks: readonly(Tasks),
    actions:createActions(Tasks)
}
export default Store