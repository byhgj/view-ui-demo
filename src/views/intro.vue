<script setup>
import { Alert, Row, Col, Card, Circle, Icon, Space } from 'view-ui-plus'
</script>

<template>
	<Alert>概览</Alert>
	<Row :gutter="gutter">
		<Col span="12">
			<Card>
				<template #title>
					用户信息
				</template>
			</Card>
		</Col>
		<Col span="12">
			<Card>
				<template #title>
					其他信息
				</template>
				<Space align="center">
					<Circle :percent="80">
						<span style="font-size:24px">80%</span>
					</Circle>
					<Circle :percent="100" stroke-color="#5cb85c">
						<Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
					</Circle>
					<Circle :percent="35" stroke-color="#ff5500">
						<span>
							<Icon type="ios-close" size="50" style="color:#ff5500"></Icon>
						</span>
					</Circle>
				</Space>
			</Card>
		</Col>
	</Row>
</template>

<script>
export default {
	data(){
		return {
			gutter: 10
		}
	}
}
</script>