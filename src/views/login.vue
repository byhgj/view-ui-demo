<template>
	<div class="login-window"></div>
	<div class="login-dialog">
		<p class="header">
			<Icon type="md-pulse" size="36" color="#2b85e4" />
			AuthIt
		</p>
        <Login @on-submit="handleSubmit">
            <UserName name="username" autofocus/>
            <Password name="password" />
            <Password name="token" placeholder="请输入动态令牌" />
            <Submit type="primary" />
        </Login>
		<p class="footer">Version: {{ appVersion }}</p>
	</div>
</template>

<script setup>
import { Icon, Login, UserName, Password, Submit } from 'view-ui-plus'
</script>

<script>
export default {
	mounted(){
		this.handleGetCaptcha();
	},
	methods: {
		handleSubmit (valid, { username, password, token }) {
			if (valid) {
				// this.$Message.info('正在登录......')
				let data = {username, password: this.$Hash.md5(password), token};
				fetch('/api/login', {method: 'post', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}}).then(async res => {
					let r = await res.json();
					// this.$Message.info(r.errmsg);
					if (r.errno === 0) {
						sessionStorage.setItem('islogined', true);
						this.$router.replace('/');
					}
				})
			}
		},
	}
}
</script>

<style scoped>
.login-window {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: url(/bg.webp) center center no-repeat;
	background-size: cover;
	background-attachment:fixed;
	background-color: white;
}
.login-dialog{
	z-index: 100;
	position: absolute;
	left: 50%;
	top: 50%;
	width: 500px !important;
	transform: translate(-50%, -50%);
	border-radius: 8px;
	padding: 100px 60px;
	background-color: #fff;
	box-shadow: 0 10px 20px 20px rgba(128,134,149, 0.4);
}
.login-dialog .header {
	color: #808695;
	margin-bottom:20px;
	text-align: center;
	font-size: 24px;
	font-weight: bold;
}
.login-dialog .footer {
	text-align: right;
	color: #c5c8ce;
	margin-top: 5px;
}
.login-dialog-captcha .ivu-btn{
	padding: 0;
}
.login-dialog-captcha .ivu-btn span svg{
	height: 28px;
	position: relative;
	top: 4px;
}
</style>