#### 1. reactive
```
import { reactive } from 'vue'

// reactive state
const state = reactive({
  count: 0
})
```
vue3暴露了一系列 ``api``用于创建脱离模板的响应式对象,这些内容的本质是Proxy的封装

```javascript
import {ref, reactive,toRefs,} from 'vue'
const state = reactive({
    count :0,
    name:'john'
})
let  num = ref(0)
num.value++
console.log(++state.count)
let {count,name} = toRefs(state) 
console.log(count) //输出ref本身，要访问值请用.value
console.log(name)
```
**自动求值**

1.当 ref 作为setup()的上下文,而且作为 setup ()返回的对象的属性时，它会自动解包到内部值。没有必要附加.value  

2.当ref 作为reactive 对象的属性时，行为与上述一致  

**解构**  
```javascript
import {ref, reactive,toRefs,} from 'vue'
const state = reactive({
    count :0,
    name:'john'
})

let {count,name} = toRefs(state) 
console.log(count) //输出ref本身，要访问值请用.value
```

#### 2.计算属性和监听器

vue3可以将计算属性和监听器分离，暴露为单独的api，建立一个计算属性函数或者监听器
**计算属性**

```javascript
const count = ref(1)
const plusOne = computed(() => count.value + 1)


console.log(plusOne.value) // 2

plusOne.value++ // error
```
plusOne 的值依赖于``()=>count.value + 1``这个getter函数，``computed``函数返回一个reactive对象，且这个对象不可变
但是，一切并非这么绝对，当你传第一个拥有，``get``，``set``函数的对象时，``computed``函数将返回一个可写的响应式对象

```
const count = ref(1)
const plusOne = computed({
    get:()=>value
    set:(val)=> console.log(val)
})

```
**watchEffect**

```
const count = ref(0)

const stop =  watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)


//监听停止
stop()
```



