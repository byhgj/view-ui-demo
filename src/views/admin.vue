<script setup>
import { Alert, Space, Card } from 'view-ui-plus'
</script>

<template>
	<Alert>适用用户少的场景</Alert>
	<Space wrap>
		<Card class="card">管理员1</Card>
		<Card class="card">管理员2</Card>
		<Card class="card">管理员3</Card>
		<Card class="card">管理员4</Card>
		<Card class="card">管理员5</Card>
		<Card class="card">管理员6</Card>
	</Space>
</template>

<style lang="less" scoped>
.card {
	margin-right: 10px;
	width: 300px;
	height: 200px;
}
</style>