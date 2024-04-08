<script setup>
import { Menu, MenuItem, Submenu, Dropdown, DropdownMenu, DropdownItem, Tooltip, Icon } from 'view-ui-plus'
</script>

<template>
	<Menu :theme="theme" :width="width" :class="{collapsed: collapsed}" :accordion="accordion" :active-name="activeName" :open-names="openNames">
	<template v-for="(item, componentIndex) in menu">
		<!-- 展开 -->
		<div v-show="!collapsed">
			<!-- 有子菜单 -->
			<Submenu v-if="item.children?.length" :name="item.name">
				<template #title>
					<Icon :type="item.icon" />
					<span>{{ item.label }}</span>
				</template>
				<MenuItem v-for="(children, index) in item.children" :to="children.to" :name="children.name">
					<Icon :type="children.icon" />
					{{ children.label }}
				</MenuItem>
			</Submenu>

			<!-- 无子菜单 -->
			<MenuItem v-else :name="item.name" :to="item.to">
				<Icon :type="item.icon" />
				{{ item.label }}
			</MenuItem>
		</div>

		<!-- 不展开 -->
		<div v-show="collapsed">
			<!-- 有子菜单 -->
			<Dropdown v-if="item.children?.length" placement="right-start">
				<MenuItem :name="item.name">
					<Icon :type="item.icon" size="24" />
				</MenuItem>
				<template #list>
					<DropdownMenu>
						<DropdownItem v-for="(children, index) in item.children">
							<MenuItem :name="children.name" :to="children.to">
								<Icon :type="children.icon" />
								{{ children.label }}
							</MenuItem>
						</DropdownItem>
					</DropdownMenu>
				</template>
			</Dropdown>

			<!-- 无子菜单 -->
			<Tooltip v-else :theme="theme" :content="item.label" placement="right">
				<MenuItem :name="item.name" :to="item.to">
					<Icon :type="item.icon" size="24"/>
				</MenuItem>
			</Tooltip>
		</div>
	</template>
	</Menu>
</template>

<script>
export default {
	name: "SideMenu",
	props: {
		'collapsed': { type: Boolean, default: false },
		'menu': { type: Array, default: []},
		'theme': { type: String, default: 'light'},
		'accordion': { type: Boolean, default: false },
		'width': { Type: String, default: '200px' },
		'activeName': { Type: String, default: '' },
		'openNames': { Type: Array, default: []}
	}
}
</script>

<style lang="less" scoped>
.ivu-menu-vertical.collapsed {
	.ivu-menu-item, .ivu-menu-submenu-title {
		padding: 14px 15px 14px 20px;
	}
}
.ivu-menu-light {
	@bgcolor: #fff;
	@bgcolor-hover: #0aa5cc;
	/deep/.ivu-select-dropdown {
		padding: 0;
		margin: 0;
		background-color: @bgcolor;
	}
	/deep/.ivu-dropdown-item {
		padding: 0;
		background-color: @bgcolor;
	}
	/deep/.ivu-dropdown-item:hover {
		background-color: @bgcolor-hover;
		.ivu-menu-item {
			color: #fff;
			background-color: @bgcolor-hover;
		}
	}
}
.ivu-menu-dark {
	@bgcolor: #515a63;
	@bgcolor-hover: #0aa5cc;
	/deep/.ivu-select-dropdown {
		padding: 0;
		margin: 0;
		background-color: @bgcolor;
	}
	/deep/.ivu-dropdown-item {
		padding: 0;
		background-color: @bgcolor;
	}
	/deep/.ivu-dropdown-item:hover {
		background-color: @bgcolor-hover;
		.ivu-menu-item {
			background-color: @bgcolor-hover;
		}
	}
}
</style>