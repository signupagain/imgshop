import html2canvas from 'html2canvas'

export const BGSCREENSHOT_KEY = 'bgScreenshot'
export const bgScreenshot = ref('')
export type bgScreenshotType = typeof bgScreenshot

export const searchCardScrollRecord = ref(0)

export const toScreenshot = async () => {
	const canvas = await html2canvas(document.getElementById('app')!, {
		logging: import.meta.env.MODE === 'development',
		x: 0,
		y: searchCardScrollRecord.value,
		width: window.innerWidth,
		height: window.innerHeight,
		useCORS: true,
		scale: 0.1,
	})

	return (bgScreenshot.value = canvas.toDataURL())
}
