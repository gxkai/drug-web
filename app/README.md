# drug-web

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
npm run build:prod
npm run build:pre

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


``` javascript
this.pageList.forEach(e => { e.imgUrl = this.$axios.get(this.getImgURL(e.fileId, 'LOGO')); });
```
```
# baidumap
ios Uat07M7GFSHS26TWT7iZwBQdTw3DL3GM
android Z4oRX7Rk2q1eYPSLGvayGy2qz1mAqABx

# AppID： 
vbWoZSftLj6YPopBJDwsZ9
# AppSecret： 
iDyCXOCl7v9NYclxoUuOR9
# AppKey： 
ldkjgGNKhp8wCwvB5XYde
# MasterSecret： 
amYWrFmlaL70UbfqKArW3
```
## TIPs
1. 图标统一使用有赞图标组件
[有赞图标使用文档](https://youzan.github.io/vant/#/zh-CN/icon)
2. node 版本
```
node -v
v10.5.0

npm -v
6.1.0

```

# 主要插件
1. 时间处理[moment](https://github.com/moment/moment)
2. 对象处理[lodash](https://github.com/lodash/lodash)
3. 字符串处理[qs](https://github.com/ljharb/qs)
4. 路由缓存[vue-navigation](https://github.com/zack24q/vue-navigation)
5. 浏览器本地存储(推荐使用)[localForage](https://github.com/localForage/localForage)
6. 浏览器本地存储[good-storage](https://www.npmjs.com/package/good-storage)
7. ui组件[vant](https://youzan.github.io/vant/#/zh-CN/intro)
8. 地图[vue-baidu-map](https://dafrok.github.io/vue-baidu-map/#/zh/index)
# 样式处理
1. sass
  ```
  npm i -D node-sass sass-loader sass-resources-loader
  ```
2. postcss 
  ```
  npm i -D postcss-px2rem px2rem-loader
  ```
# 编译环境配置
1. 跨平台环境配置[cross-env](https://www.npmjs.com/package/cross-env)
# 浏览器降级
1. babel-polyfill,
2. es6-promise
# 浏览器兼容查询[caniuse](https://caniuse.com)
