::: title lottery-app

## 目录结构
```

│  .gitignore 
│  babel.config.js
│  bootstrap.js
│  global.d.ts //全局声明config和custom变量,供h5模式下配置使用
│  package.json
│  postcss.config.js
│  README.md
│  routemap.json //路由表,打包时由自定义插件生成
│  sfc.d.ts
│  tsconfig.json
│  vue.config.js 
├─configs
│      config.js //config.js 正式服会被正式服的配置取代
│      custom.css //从二维码后台管理系统拿到的生成样式文件，仅用于标准项目
│      custom.js    //同上
├─dist
├─public
│      index.html
└─src
    │  App.vue
    │  main.ts //程序入口
    │  manifest.json
    │  pages.json
    │  uni.scss //uniapp全局样式
    │  
    ├─adapter 
    │  └─scan
    │          error.vue
    │          index.vue //页面入口，当然也可以不用这个，自己写一个
    │          wxmp.vue
    │          
    ├─components      //公用组件
    ├─global
    │  │  AppBoot.ts     //在main.ts中调用，用于初始化Configuration.ts，以及一些默认配置
    │  │  Configuration.ts //初始化配置
    │  │   
    │  ├─api 
    │  │  │  LotteryApi.ts //请求相关api，公有接口
    │  │  │  SystemApi.ts //系统交互方法，已做跨平台自适配,定位之类的
    │  │  │   |
    |  |  |   依赖
    │  │  ├─platform
    │  │  │      H5.ts
    │  │  │      WeChatH5.ts
    │  │  │      WeChatMP.ts
    │  │  │      
    │  │  └─proxy //封装的请求方法
    │  │          LotteryProxy.ts
    │  │          ServerType.ts
    │  │          
    │  ├─style //公共样式
    │  │      common.scss
    │  │      reset.scss
    │  │      
    │  ├─type
    │  │      Decorators.ts
    │  │      ErrorList.ts //错误列表
    │  │      Query.ts //url参数分析相关
    │  │      
    │  └─utils
    │          Foundation.ts //常用方法工具库，如号码验证，路由导航
    │          RouteMap.ts //用于根据路由表匹配路径
    │          UniHttp.ts
    │          
    ├─pages-ctm     //定制项目存放目录
    │  └─huiquan
    |         
    ├─pages-std //标准模板
    │  │  pages.json
    │  │  
    │  ├─logic
    │  │      lotteryLogic.ts
    │  │      
    │  ├─lottery
    │  └─others
    │          history.vue
    │          scaninfo.vue
    │          submitAddr.vue
    │          submitAddrSuccess.vue
    │          success.vue
    │          webView.vue
    │          
    └─static //静态资源存放目录
```
## 项目配置

### vue.config.js
```
 plugins: [
            // 移动静态资源目录
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'configs'),
                    to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'configs')
                }
            ]),
            // 生成路由信息表，给RouteMap使用
            function () {
                let map = {}; //只有一个储存路由的对象
                let pages = require('@dcloudio/uni-cli-shared/lib/pages.js').getPagesJson()

                // 主包
                for (let page of pages.pages) {
                    if (page.hasOwnProperty("name")) {
                        map[page.name] = page.path;
                    }
                }

                // 如果有分包
                for (let sub of pages.subPackages) {
                    for (let subPage of  sub.pages) {
                        if (subPage.hasOwnProperty("name")) {
                            map[subPage.name] = sub.root + "/" + subPage.path;
                        }
                    }
                }

                let fs = require('fs');
                fs.writeFileSync(path.join(__dirname, 'routemap.json'), JSON.stringify(map), {});
            }
        ]
```
在``plugins``中自定义了路由表的处理，根据``pages.json``的配置，自动生成``routemap.json``,供RouteMap使用，因此要重新生成``routemap``需要重启服务。此外需要注意生成方式，所有路径都存在map当中，因此同名路径会被后生成的路径覆盖
### bootstrap.js
项目打包工具函数

### main.ts
```
declare module "vue/types/vue" {
    interface Vue {
        $gRefs: any;
    }
}

new AppBoot(); //调用APPBoot()，AppBoot对程序做初始化，包括Configuration等，不做赘述
new App().$mount();
```

## 流程

程序启动后，跳转到入口页面``adapter/scan/index.vue``，当然这个是根据src目录下的pages.json 来确定的
```
...
export default class Index extends Vue {
  /**
   * app 主入口.
   * H5模式下，直接走常规模式
   * 微信小程序下，需要先获取用户、活动相关的信息
   * @param option
   */
  onLoad(option: any) {  //从url中获取参数
    uni.showLoading({ title: "正在加载" });
    Query.set(option); 如果有参数传入入口页面，则设置参数
    //#ifdef H5
    Query.init(); //从url中获取参数
    Foundation.nav(Query.page ? Query.page : "huiquan");//重定向
    //#endif

    //#ifdef MP-WEIXIN
    Foundation.nav("wxmp"); //如果是微信小程序，重定向到微信小程序入口
    //#endif
  }
}
</script>

<style lang="scss">
</style>
```
#### 特别说明

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
init|无|从``url``中解析参数，调用了``Foundation.parseUrl``,仅h5有效
toObject|null|将Query类的静态属性打包成对象返回


新建一个h5定制项目的通用方式

```javascript
// src/pages.json 项目通过这个读取页面路劲，基于uni
{
    "pages": [
        {
            "name": "index", //
            "path": "pages-ctm/xuehua_add/index"
        },
        {
            "name": "lottery",
            "path": "pages-ctm/xuehua_add/lottery"
        },
        {
            "name": "scaninfo",
            "path": "pages-ctm/xuehua_add/scaninfo"
        },
        {
            "name": "success",
            "path": "pages-ctm/xuehua_add/success" 
        }
    ],
    "subPackages": [],
    "globalStyle": {
        "navigationBarTextStyle": "black",
        "navigationBarTitleText": "",
        "navigationBarBackgroundColor": "#F8F8F8",
        "backgroundColor": "#F8F8F8"
    }
}
```
每个页面需要从url 中拿到想要的参数

```
//在页面初始化生命周期
onLoad(option: any) {
    Query.init() //解析url参数，并保存在Query的静态属性上
    console.log(Query.uid)
    let params = JSON.parse(MyBase64.Decode(Query.params));
    this.uid = Query.uid
    this.pageData = Foundation.getInitData(params) 
    //pageData 是活动配置信息，包括是否需要电话号码，是否定位信息
    this.phoneNumber = this.pageData.phoneNumber || "";
    this.paramsInit();
    console.log(this.pageData)
  }
```
其余页面也是类似，可以参考以往页面，结合控制台输出，和``NetWork``查看具体是什么数据，