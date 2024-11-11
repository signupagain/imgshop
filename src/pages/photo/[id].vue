<template>
	<div
		:class="$style.overlay"
		:model-value="true"
		@click="leavePhoto"
		@keydown.down.prevent
		@keydown.up.prevent
	>
		<v-card :class="$style.card" :ripple="false" variant="tonal" @click.stop>
			<v-card-title
				class="align-self-start w-75 text-sm-h4"
				tag="h1"
				:title="photo?.alt"
			>
				{{ photo?.alt || imgStore.activeTheme || t('images.title') }}
			</v-card-title>
			<ZoomPhoto v-if="isZoom" :photo @toggle-zoom="isZoom = !isZoom" />
			<v-img
				v-else
				v-focus
				:alt="photo?.alt"
				:aspect-ratio="photo?.ratio"
				:class="$style.img"
				max-height="65%"
				max-width="100%"
				:src="photo?.src"
				@click="isZoom = !isZoom"
			></v-img>
			<v-card-text>
				<v-list :class="$style.list" tag="ul">
					<v-list-item
						v-for="title of list"
						:key="title"
						:class="$style.item"
						tag="li"
					>
						<v-list-item-title .title>{{ title }}</v-list-item-title>
					</v-list-item>
					<v-list-item :class="$style.item" tag="li">
						<v-list-item-title>
							{{ t('source') }}:
							<a :href="photo?.url" rel="noopener noreferrer" target="_blank">
								{{ t('to') }}
								<v-icon :size="xs ? 8 : 12">
									fas fa-arrow-up-right-from-square
								</v-icon>
							</a>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-card-text>
			<v-card-actions :class="$style.actions">
				<v-speed-dial location="bottom" transition="fade-transition">
					<template #activator="{ props: activatorProps }">
						<v-btn v-bind="activatorProps" icon="fas fa-bars"></v-btn>
					</template>

					<v-btn
						v-for="{ icon, event } of btnList"
						:key="icon"
						:class="[$style.btn, tabClass]"
						:icon
						:size="smAndDown ? 'x-small' : 'default'"
						:title="t('addToList')"
						variant="elevated"
						@click="event"
					></v-btn>
				</v-speed-dial>
			</v-card-actions>
		</v-card>
		<v-btn
			v-if="!mdAndDown"
			:class="[$style.btn, $style.leave_btn, tabClass]"
			icon="fas fa-circle-xmark"
			@click="leavePhoto"
		></v-btn>
	</div>
	<img
		:alt="t('screenshot_alt', { theme: imgStore.activeTheme })"
		:class="$style.bg"
		:src="bg"
	/>
</template>

<script setup lang="ts">
	import { BGSCREENSHOT_KEY, bgScreenshotType } from '@/provides/bgScreenshot'
	import useImageStore from '@/stores/useImageStore'
	import useUserStore from '@/stores/useUserStore'
	import useFocus from '@/use/directives/useFocus'
	import useTabClass from '@/use/feedback/useTabClass'
	import useLeaveId from '@/use/request/useLeave[id]'
	import usePhotoWithId from '@/use/request/usePhotoWithId'
	import { useTranslation } from 'i18next-vue'
	import { useDisplay } from 'vuetify'

	const { vFocus } = useFocus()
	const imgStore = useImageStore()
	const { mdAndDown, smAndDown } = useDisplay()
	const bg = inject<bgScreenshotType>(BGSCREENSHOT_KEY)

	const isZoom = ref(false)
	const photo = usePhotoWithId()
	const tabClass = useTabClass()
	const leavePhoto = useLeaveId()

	const { xs } = useDisplay()
	const { t } = useTranslation()
	const list = [
		`${t('width')}: ${photo.value?.width}`,
		`${t('height')}: ${photo.value?.height}`,
		`${t('by')} ${photo.value?.photographer}`,
	]

	const btnList = computed(() => {
		const list = [
			{
				icon: 'fas fa-plus',
				event: appendShoppingList,
			},
			{
				icon: 'fas fa-circle-xmark',
				event: leavePhoto,
			},
		]

		return mdAndDown.value ? list : list.slice(0, -1)
	})

	const userStore = useUserStore()

	const appendShoppingList = () => {
		if (!photo.value || userStore.historyIdList.includes(photo.value.id)) return

		userStore.appendList('shoppingList', photo.value)
	}
</script>

<style lang="scss" module>
	.bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.overlay {
		position: fixed;
		z-index: 2000;
		inset: 0;
		display: grid;
		place-items: center;
		backdrop-filter: blur(5px);
	}

	.card {
		border: solid transparent;
		border-width: 1.5rem 0;
		width: 75dvw;
		height: 100dvh;
		display: flex;
		gap: 0.8rem;
		flex-flow: column;
		justify-content: space-between;
		position: relative;
		cursor: default;
		overflow: auto;

		@media (max-width: 500px) {
			width: 100%;
			height: 100%;
			border: none;
		}
	}

	.img {
		cursor: zoom-in;
	}

	.list {
		display: flex;
		flex-flow: wrap;
		padding: 0;

		@media (max-width: 300px) {
			flex-flow: column;
		}
	}

	.item {
		flex: 50%;
	}

	.actions {
		position: absolute;
		top: 0;
		right: 0;

		@media (max-width: 599px) {
			padding: 0 8px;
		}
	}

	.btn {
		filter: invert(1);
	}

	.leave_btn {
		position: absolute;

		@media (min-width: 600px) {
			top: 1.5rem;
			right: 1.5rem;
		}
	}
</style>
