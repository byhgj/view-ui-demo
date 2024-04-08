import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', name: 'Home', component: () => import('../views/index.vue'), children: [
		{ path: '/empty', name: 'Empty', component: () => import('../views/empty.vue') },
		{ path: '/user', name: 'User', component: () => import('../views/user.vue') },
	] }
];

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router;