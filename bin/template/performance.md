# 前端性能优化手册

## 减少打包体积

```javascript
splitChunks: {
    // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all 推荐 all
    chunks: "all",
    // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
    minSize: 30000,
    // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
    minChunks: 1,
    // 表示按需加载文件时，并行请求的最大数目。默认为5。
    maxAsyncRequests: 5,
    // 表示加载入口文件时，并行请求的最大数目。默认为3。
    maxInitialRequests: 3,
    // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
    automaticNameDelimiter: '~',
    // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
    name: true,
    // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
```

## 渲染层优化

## 缓存 （浏览器缓存 搭配 webpack hash）

结合 webpack 或其他打包工具来达到前端最佳缓存方案
先说结论
js css 都启用 contenthash 级别来打包
服务器对 html 文件进行协商缓存、对 js、css 进行强制缓存

webpack 中 hash 有三个级别分别是

<strong>hash</strong>
hash 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值

<strong>chunkhash</strong>
它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。

简单来说这种是根据不同入口来配置的，比如 vue-router、vuex、vue 等公共入口文件，只要这些没有改变，那么他对应生成的 js 的 hash 值也不会改变。

<strong>contenthash</strong>
contenthash 主要是处理关联性，比如一个 js 文件中引入 css，但是会生成一个 js 文件，一个 css 文件，但是因为入口是一个，导致他们的 hash 值也相同，所以当只有 js 修改时，关联输出的 css、img 等文件的 hash 值也会改变，这种情况下就需要 contenthash 了。
