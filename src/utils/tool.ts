import path from 'path'
import { computed } from 'vue'
/**
 * @description 全屏
 */
export function FullScreen() {
    try {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    } catch {
        console.warn('全屏失效')
    }
}
/**
 * @description 获取全部win95组件
 */
export function getComponents() {
    const modules: any = {}
    const components = require.context('@/components/', true, /w-.*\.vue/)
    components.keys()
        .forEach((key: string) => {
            let name = path.basename(key).replace(".vue", "")
            let module = components(key)
            modules[name] = module.default
        })
    return modules
}
/**
 * @description 从props和attrs中获取实际存在的值
 * @param key 键值
 * @param props props
 * @param attrs 非props属性
 * @param transTable 对照表，用于值转换
 */
export function exChangeAtrribe(key: string, props: Readonly<any>, attrs: any, transTable?: any) {
    return computed(() => {
        let value = props[key] || attrs[key] as string
        if (typeof value === "string") {
            if (transTable) {
                return transTable[value];
            }
            return value
        }
        return "";
    })
}
export function Throttle(this:any,fn: Function, wait: number) {
    let last = 0
    return (...args: any) => {
        let now = + new Date()
        if(now-last >wait){
            last = now 
            fn.apply(this,args)
        }
    }
}
export function limitInArea(min:number,max:number,value:number){
    if(value>max){
        return max
    }
    if(value<min){
        return min
    }
    return value
}