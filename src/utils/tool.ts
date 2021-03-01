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
    const components = require.context('@/components/', false, /w-.*\.vue/)
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
 * @param transTable 对照表
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