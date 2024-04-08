import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
	{ path: '/', redirect: '/intro' },
	{ path: '/login', name: 'Login', component: () => import('@/views/login.vue') },
	{ path: '/logout', name: 'Logout', component: () => import('@/views/logout.vue') },
	{ path: '/home', name: 'Home', component: () => import('@/views/index.vue'), children: [
		{ path: '/empty', name: 'Empty', component: () => import('@/views/empty.vue') },
		{ path: '/intro', name: 'Intro', component: () => import('@/views/intro.vue') },
		{ path: '/admin', name: 'Admin', component: () => import('@/views/admin.vue'), meta: { title: '系统用户', showInBreadcrumb: true} },
		{ path: '/user', name: 'User', component: () => import('@/views/user.vue'), meta: { title: '用户管理', showInBreadcrumb: true} },
	] }
];

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	// let islogined = localStorage.getItem('islogined') === 'true';
	let islogined = store.state.islogined;
	if (['/login', '/logout'].includes(to.path) || islogined) return next(); // 如果是免登录或者已登录直接访问

	// 否则转登录
	next('/login');
})

export default router;