<template>
	<v-empty-state
		:class="utils.empty"
		headline="404"
		:image="logo"
		text="The page you were looking for does not exist"
		title="Page not found"
	></v-empty-state>
</template>

<script setup lang="ts">
	import logo from '@/assets/logo.svg'
	import utils from '@/styles/utils.module.scss'
</script>
