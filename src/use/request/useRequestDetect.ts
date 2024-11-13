import useImageStore from '@/stores/useImageStore'
import { useEventListener } from '../base/useEvent'
import isAppendImgs from './useIsAppendImgs'

const { appendImgs } = useImageStore()

export default () =>
	useEventListener(window, 'scroll', () => {
		if (!isAppendImgs()) return

		appendImgs()
	})
