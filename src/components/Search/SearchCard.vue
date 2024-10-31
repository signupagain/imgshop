<template>
	<div
		:class="$style.img_wrap"
		:style="{
			'--ratio': ratio,
		}"
	>
		<template v-if="error">
			<p
				class="elevation-10 text-center"
				:class="$style.error"
				v-text="error"
			></p>
		</template>
		<template v-else>
			<a
				class="d-block w-100 h-100 elevation-10"
				href="/"
				style="cursor: zoom-in"
				@click.prevent="toDetailPage"
			>
				<img
					:id
					ref="img"
					v-decode-img
					:alt
					class="w-100 h-100"
					crossorigin="anonymous"
					:src
				/>
			</a>
			<p class="text-caption" :class="$style.author">
				{{ t('by') }}
				<a :href target="_blank">
					{{ photographer }}
					<v-icon
						icon="fas fa-arrow-up-right-from-square"
						:size="xs ? 8 : 12"
					></v-icon>
				</a>
			</p>
			<div :class="$style.actions">
				<v-btn
					icon="fas fa-bag-shopping"
					rounded
					:size="smAndDown ? 'x-small' : 'default'"
				></v-btn>
				<v-btn
					icon="fas fa-plus"
					rounded
					:size="smAndDown ? 'x-small' : 'default'"
					:title="t('addToList')"
				></v-btn>
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
	import { searchCardScrollRecord, toScreenshot } from '@/provides/bgScreenshot'
	import useDecodeImg from '@/use/directives/useDecodeImg'
	import { useTranslation } from 'i18next-vue'
	import { VSkeletonLoader } from 'vuetify/components'
	import { useDisplay } from 'vuetify'

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
	const { xs, smAndDown } = useDisplay()
	const { vDecodeImg, error } = useDecodeImg()

	observeLoading(useTemplateRef('loader'))

	const router = useRouter()

	const toDetailPage = () => {
		searchCardScrollRecord.value = window.scrollY

		toScreenshot().then(() =>
			router.push({ name: '/photo/[id]', params: { id: id.value } })
		)
	}
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

		@media (max-width: 260px) {
			left: 0.5rem;
			bottom: 0.5rem;
		}
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

		@media (max-width: 260px) {
			top: 0.5rem;
			right: 0.5rem;
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
