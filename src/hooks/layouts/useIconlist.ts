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
    onMounted(() => {
        const desktop = document.querySelector("#desktop") as HTMLElement;
        iconList.forEach(icon => {
            icon.defaultStyle = {
                width: desktop.clientWidth / 2,
                height: desktop.clientHeight / 2,
                left: desktop.clientWidth / 4,
                top: desktop.clientHeight / 4
            }
        })
    })
    const addDialog = (icon: Task) => {
        createTask(icon)
    }
    return { iconList, addDialog }
}