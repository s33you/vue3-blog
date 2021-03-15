::: title lottery-app-global
## /type
### Querry.ts

---

```
//依赖
import {MyBase64} from "@qxlib/base/impl";
import {Foundation} from "@global/utils/Foundation";
import {Configuration} from "@global/Configuration";
//所用属性或方法
MyBase64.Decode,
Foundation.parseUrl,
Configuration.comCode
```
#### 静态属性
属性 | 类型 | 描述
---|---|---
uid|string
option|any|参数
page|string
qrcode|string
params|string
comCode|string
phoneNumber|string
#### 静态方法

方法名 | 参数 | 描述
----|----|----
set|``option:any``|给静态属性赋值的方法，且如果有``comCode``字段，则将其赋值给``Configuration.comCode``,调用``MyBase64.Decode``解析``uid``字段
get|``name:string``|从``option``属性取值
init|无|从``url``中解析参数，调用了``Foundation.parseUrl``
toObject|null|将Query类的静态属性打包成对象返回

### ErrorList.ts

以对象形式定义了错误列表，错误项是自定义的错误类型,错误项,供``@qxlib/net`` 的``Soilder.getMessage`` 和 ``Soilder.errorBuilder``使用



## /utils
### Foundation.ts

#### 静态方法

方法名 | 参数 | 描述
----|----|----
alert |``content``: ``string``, ``title?``: ``string``, ``cb?``:`` () => void``|提示信息
confirm |``content``: ``string``, ``title?``: ``string``, ``cb?``:`` () => void``|对话框提示信息
isEmpty|``value:any``|判定``value``是否为空值(``undefined``,``0``,``''``,``[]``,``null``)
nav|``page: string``, ``data?: any``, ``isReplace: boolean = true``|页面跳转方法，指定跳转页面名，是否带数据，是否替换路由，内部实现依赖``RouterMap``,页面名依赖``routeMap.json``
checkPhoneNumber|``phoneNumber:string``|检查电话号码是否符合规则返回错误信息
parseQrCode|``url:string``|解析url参数，返回参数对象
showPrizeInfo|``uid:string``|获取奖品信息，具体内容不清楚，待修订
formatData|``data?: any, post?: boolean``|将请求参数格式化为指定格式
``getPhoneLoc`` && ``buildPhoneLocation``|``uid: string, phoneNumber: string`` && ``data: any``|获取手机号归属地
``isHavePrize`` && ``isReceivedPrize``|...|作用未知，待修订
modifyAddress|``uid: string, aid: any``|编辑地址？待修订
getPhysicalGiftAddress|``uid: string, pwid: any``|获取自提地址？返回一个地址列表，待修订
dateFormat|``date: any, pattern: string``|格式化时间
selectPrizeTypeDescript|``data:any``|获取单个商品信息，返回一个html拼接字符串
_prizePrice||作用未知，待修订
gainMutipDesc||作用未知，待修订
getInitData ||获取是否需要电话号码这些配置
replaceStr|``content: string, data: any``|中奖结果、二次扫码字符串替换

## Configuration.ts
### 静态属性
属性 | 类型 | 描述
---|---|---
style||自定义样式：custom.css *  仅在小程序模式下有效，用于加载custom.css
config|| 配置文件内容 H5模式下，会每次从config.js中获取最新的配置* 小程序模式下，在打包时就需指定
comCode||公司code,h5模式从url参数中获取，小程序从接口中获取
custom||用户自定义配置，小程序模式下，从接口获取配置

### 静态方法

方法 | 参数 | 描述
---|---|---
defH5||H5模式下静态属性的初始化函数，config.js和custom.js在index.html的script标签获取，custtom.css同样也是，但不会调用Configuration.style属性
defWXMP||小程序模式下静态属性的初始化函数，config.js打包时就被确定，custom与style在接口确定
setCustom||用于小程序从接口获取custom.js配置后，注入配置
setStyle|| 用于小程序从接口获取custom.css配置，注入样式

### 剩下的

懒得写了，自己看定义，qxlib/base 用的比较多。