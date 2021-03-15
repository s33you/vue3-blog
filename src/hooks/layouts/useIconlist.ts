import { onMounted, reactive } from "vue"
import TaskStore from './useTaskStore'
import { Task } from './useTaskStore'
const _iconList: Array<Task> = [
    {
        title: '相册',
        isActive: false,
        isShow: false,
        img: require('@/assets/images/camera.png')
    },
    {
        title: '博客',
        isActive: false,
        isShow: false,

        img: require('@/assets/images/blog.png')
    },
    {
        title: '音乐',
        isActive: false,
        isShow: false,
        img: require('@/assets/images/music.png')
    }
]

export function useIconList() {
    const iconList = reactive(_iconList)
    const { createTask } = TaskStore.actions
    const addDialog = (icon: Task) => {
        createTask(icon)
    }
    return { iconList, addDialog }
}