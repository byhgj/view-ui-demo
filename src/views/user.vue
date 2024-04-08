<template>
	<Alert>适用用户数多的场景</Alert>
	<Table :columns="columns" :data="data" width=800 size="small">
		<template #header>
			<Space style="margin-left: 10px">
				<Button type="primary" icon="md-add" @click="newUser">添加</Button>
			</Space>
		</template>
		<template #footer>
			<Page :total="10" style="padding-left: 5px" />
		</template>
		<template #istotp="{row, index}">
			<Switch v-model="row.istotp" @on-change="change_istotp(row)" />
		</template>
		<template #action="{row, index}">
			<ButtonGroup>
				<Button icon="md-create" @click="modifyPassword(row)">修改密码</Button>
				<Button icon="md-build">授权</Button>
				<Button icon="md-close">删除</Button>
			</ButtonGroup>
		</template>
	</Table>

	<Modal v-model="wNewUser" title="新建用户">
		<Input v-model="mNewUser" placeholder="此处填写用户名"/>
	</Modal>

	<Modal v-model="wModifyPassword" title="修改密码">
		<p>{{mModifyPassword.user}}</p>
		<Form :model="mModifyPassword" :label-width=80>
			<FormItem label="密码">
				<Input v-model="mModifyPassword.pass1" placeholder="新密码" />
			</FormItem>
			<FormItem label="确认密码">
				<Input v-model="mModifyPassword.pass2" placeholder="确认密码" />
			</FormItem>
		</Form>
	</Modal>

	<Modal v-model="wCheckTOTP" title="验证TOTP">
		<p>{{mCheckTOTP.user}}</p>
		<div style="text-align:center">
			<Space direction="vertical">
				<QrCode :value="totp(user.username, user.token)"></QrCode>
				<Input v-model="mCheckTOTP.code" search enter-button="校验" placeholder="填写扫描得到的6位数字" />
			</Space>
		</div>
		<template #footer>
			使用FreeOTP或其他OTP工具扫描二维码
		</template>
	</Modal>
</template>

<script setup>
import { Button, Modal, Space, Form, FormItem, Input, Table, ButtonGroup, Switch, Page, Alert } from 'view-ui-plus'
import QrCode from 'qrcode.vue'
</script>

<script>
export default {
	data(){
		return {
			wNewUser: false,
			mNewUser: '',
			wModifyPassword: false,
			mModifyPassword: {
				user: '',
				pass1: '',
				pass2: ''
			},
			wCheckTOTP: false,
			mCheckTOTP: {
				user: '',
				code: ''
			},
			columns: [
				{title: '登录账号', key: 'username', width: 100},
				{title: '开启TOTP验证', slot: 'istotp', width: 200, align: 'center'},
				{title: '操作', slot: 'action'}
			],
			data: [],
			user: {}
		}
	},
	mounted(){
		this.user = {username: '', password: '', totp: false, token: ''};
		this.data = [
			{id: 1, username: 'admin', password: '123456', istotp: true, token: '4XTG3OD56ZRFIWC2FGPXYRJISEHHIEG4'},
			{id: 2, username: 'byhgj', password: 'abcdef', istotp: false, token: 'PRI0EP78P562HZ9EZVEAHHGH2MGH32AJ'}
		];
		// fetch('/api/userlist', {method: 'POST'}).then(async res => {
		// 	let r = await res.json();
		// 	if (r.errno === 0) this.data = r.data;
		// 	else this.$Message.error(r.errmsg);
		// })
	},
	methods: {
		change_istotp(user){
			if (user.istotp) {
				this.mCheckTOTP.user = user.username;
				this.wCheckTOTP = true;
			}
			return user.istotp;
		},
		totp(user, token){
			return `otpauth://totp/${user}?secret=${token}&issuer=AuthIt`
		},
		newUser(){
			this.wNewUser = true
		},
		modifyPassword(user){
			this.mModifyPassword.user = user.username;
			this.wModifyPassword = true;
		}
	}
}
</script>