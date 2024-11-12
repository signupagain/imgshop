<template>
	<router-view></router-view>
</template>

<script setup lang="ts">
	definePage({
		path: '/:userID(\\w{5})',
	})
</script>

<style scoped></style>
