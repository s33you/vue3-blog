import {  reactive } from "vue"
import TaskStore from './useTaskStore'
import { Task } from './useTaskStore'


const _iconList: Array<Task> = [
    {
        title: '相册',
        isActive: false,
        isShow: false,
        img: require('@/assets/images/camera.png'),
        type: 'pic-list'
    },
    {
        title: '博客',
        isActive: false,
        isShow: false,
        type: 'blog-list',
        img: require('@/assets/images/blog.png')
    },
    {
        title: '音乐',
        isActive: false,
        isShow: false,
        img: require('@/assets/images/music.png'),
        type: 'music-list',
        defaultStyle:{
            width:340,
            height: 600,
            left: 40 ,
            top:40
        }
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