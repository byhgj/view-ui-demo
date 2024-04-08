# vite + view-ui-plus

## 创建vite应用
```shell
cnpm init vite@latest viewui-demo -- --template vue
cd viewui-demo
cnpm install
cnpm install -D less
```

## 增加vue路由

### 安装vue-router插件
```shell
cnpm i -S vue-router@4
```

### 添加路由

添加并编辑src/route/index.js
```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', name: 'Home', component: () => import('../views/index.vue'), children: [
		{ path: '/user', name: 'User', component: () => import('../views/user.vue') }
	] }
];

const router = createRouter({
	history: createWebHistory,
	routes
})

export default router;
```

### 修改main.js，导入路由
```js
import route from './route'
app.use(route)
```

## 使用view-ui-plus框架

### 安装view-ui-plus插件
```shell
cnpm i -S view-ui-plus
```

### 修改main.js
>不管是全局应用，还是按需引入，都需要导入css
```js
import 'view-ui-plus/dist/styles/viewuiplus.css'
```

### 编辑app.vue
```js
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
```

### 清理无用文件
```shell
rm -rf src/components/HelloWord.vue
rm -rf src/style.css
```

## 编辑vite.config.js
>解决wsl不能热更新问题
```js
export default defineConfig({
  plugins: [vue()],
  server: {
  	hmr: true,
  	watch: {
  		usePolling: true
  	}
  }
})
```

## 运行
```shell
cnpm run dev
```

## 打包
```shell
cnpm run build
```

---

view-ui-plus菜单不支持collapsed，需要另外的组件
自建components/SideMenu.vue满足需求

---

除view-ui自己调用第三方图标的方法外，还有以下方式，推荐第三方图标 [xicons.org](https://www.xicons.org)
```shell
cnpm i -D @vicons/ionicons5
cnpm i -D @vicons/utils
```

```js
<script setup>
import { Icon } from '@vicons/utils'
import { AccessibilitySharp as TestIcon } from '@vicons/ionicons5'
</script>

<template>
	<Icon size="24" color="red">
		<TestIcon />
	</Icon>
</template>
```
