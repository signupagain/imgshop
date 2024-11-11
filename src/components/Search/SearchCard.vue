<template>
	<div
		:class="$style.img_wrap"
		:style="{
			'--ratio': ratio,
		}"
	>
		<template v-if="error">
			<p class="elevation-10" :class="$style.error" v-text="error"></p>
		</template>
		<template v-else>
			<img
				:id
				ref="img"
				v-decode-img
				:alt
				class="w-100 h-100 elevation-10"
				:src
			/>
			<p :class="$style.author">
				{{ t('by') }}
				<a :href target="_blank">
					{{ photographer }}
					<v-icon icon="fas fa-arrow-up-right-from-square" size="12"></v-icon>
				</a>
			</p>
			<div :class="$style.actions">
				<v-btn icon="fas fa-bag-shopping" rounded></v-btn>
				<v-btn icon="fas fa-plus" rounded></v-btn>
			</div>
			<v-skeleton-loader
				v-if="isLoading"
				ref="loader"
				:class="$style.loader"
				:data-id="id"
				elevation="10"
				loading
				type="image"
			></v-skeleton-loader>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { ImgType } from '@/@types/pexels'
	import useDecodeImg from '@/use/directives/useDecodeImg'
	import { useTranslation } from 'i18next-vue'
	import { VSkeletonLoader } from 'vuetify/components'

	const { item, observeLoading } = defineProps<{
		item: ImgType
		observeLoading: (
			loaderRef: Ref<InstanceType<typeof VSkeletonLoader> | null>
		) => void
	}>()

	const {
		ratio,
		alt,
		src,
		photographer,
		photographerUrl: href,
		id,
		isLoading,
	} = toRefs(item)

	const { t } = useTranslation()
	const { vDecodeImg, error } = useDecodeImg()

	observeLoading(useTemplateRef('loader'))
</script>

<style lang="scss" module>
	@use '@/styles/mixin';

	.img_wrap {
		position: relative;
		aspect-ratio: var(--ratio);

		&:hover :is(.author, .actions) {
			visibility: visible;
			transition: visibility 0.3s 0.2s;
		}

		& :global(.v-skeleton-loader__bone) {
			height: 100%;
		}
	}

	%contentShared {
		@include mixin.absolute(false);

		visibility: hidden;
	}

	$offset: 1.5rem;

	.author {
		@extend %contentShared;

		left: $offset;
		bottom: $offset;

		font-weight: 900;
		-webkit-text-stroke: 0.15px darkorange;
	}

	.actions {
		@extend %contentShared;

		top: $offset;
		right: $offset;

		display: flex;
		justify-content: end;
		gap: 0.5rem;

		opacity: 0.5;
		transition: opacity 0.3s 0.2s;

		&:hover {
			opacity: 1;
		}
	}

	.loader {
		@include mixin.absolute;

		border-radius: 0;
	}

	.error {
		@include mixin.absolute;

		display: grid;
		place-content: center;
		border: solid currentColor;
	}
</style>
