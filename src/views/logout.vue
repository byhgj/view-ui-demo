<template>

</template>

<script>
export default {
	mounted(){
		fetch('/api/logout', {method: 'post'}).then(async res => {
			let r = await res.json();
			// this.$Message.info(r.errmsg);
			sessionStorage.setItem('islogined', false);
			this.$router.replace('/login');
		})
	}
}
</script>