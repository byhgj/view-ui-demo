<script setup>
import { Card, Button, Space, Icon } from 'view-ui-plus'
import { Icon as VIcon} from '@vicons/utils'
import { AccessibilitySharp as TestIcon } from '@vicons/ionicons5'
</script>

<template>
	<Card>
		<Space align="center">
			<Button type="primary" icon="md-alarm">测试</Button>
			<VIcon size="24" color="red">
				<TestIcon />
			</VIcon>
			<Button type="primary"><Icon type="md-alarm"></Icon>测试</Button>
		</Space>
	</Card>
</template>