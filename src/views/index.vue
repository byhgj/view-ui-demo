<script setup>
import {
	Layout, Sider, Header, Content,
	Icon, Space, Switch, Breadcrumb, BreadcrumbItem
} from 'view-ui-plus'
import SideMenu from '@/components/SideMenu.vue'
import store from '../store';
</script>

<template>
	<Layout>
		<Sider collapsible v-model="collapsed" hide-trigger breakpoint="sm" collapsed-width="64" style="height: 100vh" :class="{light: theme=='light'}">
			<SideMenu ref="sidemenu" :collapsed="collapsed" :menu="menu" width="auto" :theme="theme" :active-name="3-2" :open-names="['2']" />
		</Sider>
		<Layout>
			<Header style="background-color: #fff; height: 45px; line-height: 48px; box-shadow: 1px 1px 2px #ccc;padding: 0 15px">
				<Icon type="md-menu" size="24" @click="collapsedSider" />
                <Space align="center" style="float:right">
                    <Switch @on-change="toggleTheme" class="themeClass">
                        <template #open><span>明亮</span></template>
                        <template #close><span>暗黑</span></template>
                    </Switch>
                    <Icon type="md-exit" size="24" @click="exitSystem" />
                </Space>
			</Header>
			<Content style="background-color: #e8e8e8;padding:10px">
                <Breadcrumb separator="<span class='separator'>/</span>">
                    <BreadcrumbItem v-for="item in breadcrumb" :to="item.path">{{ item.meta.title }}</BreadcrumbItem>
                </Breadcrumb>
				<RouterView />
			</Content>
		</Layout>
	</Layout>
</template>

<script>
export default {
	data() {
		return {
			collapsed: false,
			theme: 'dark',
			menu: [
				{ name: "1", label: "概览", icon: "md-apps", to: "/"},
				{ name: "2", label: "系统设置", icon: "ios-create-outline", children: [
                    { name: "2-1", label: "系统用户", to: '/admin' },
					{ name: "2-2", label: "用户管理", to: "/user" },
					{ name: "2-3", label: "子菜单3", to: '/empty'  },
				]},
				{ name: "3", label: "菜单分类2", icon: "ios-archive-outline", children: [
					{ name: "3-1", label: "子菜单2-1", to: '/empty'  },
					{ name: "3-2", label: "子菜单2-2", to: '/empty'  }
				]}
			]
		}
	},
    computed: {
        breadcrumb(){
            let matched = this.$route.matched.filter(item => {
                return item.meta?.showInBreadcrumb
            })
            if (matched[0]?.name != 'Home'){
                matched.unshift({
                    path: '/',
                    meta: {
                        title: '首页',
                        showInBreadcrumb: true
                    }
                })
            }
            return matched;
        }
    },
	methods: {
		collapsedSider(){
			this.collapsed = !this.collapsed;
		},
		toggleTheme(status){
			this.theme = status ? 'light' : 'dark';
		},
		exitSystem(){
			console.log('exit system')
			store.commit('logined', false);
			this.$router.push('/login');
		}
	}
}
</script>

<style lang="less" scoped>
:deep(.separator) {
    color: #999 !important;
}
.ivu-layout-sider.light {
	background-color: #fff;
	border-right: 1px solid #dcdee2;
	.ivu-menu-vertical {
		&.ivu-menu-light:after {
			background: none;
		}
	}
}
.themeClass {
    :deep(&.ivu-switch) {
        width: 54px;
    }
    :deep(&.ivu-switch-checked:after) {
        left: 33px;
    }
}
</style>
