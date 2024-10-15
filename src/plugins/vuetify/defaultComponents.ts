export default {
	VDivider: {
		thickness: 2.75,
	},
	VList: {
		variant: 'tonal',
		rounded: 'lg',
		style: {
			width: 'clamp(100%,150px,400px)',
		},
	},
	VListSubheader: {
		style: {
			fontSize: '20px',
			fontWeight: '700',
		},
		class: ['py-4'],
	},
	VListItemTitle: {
		class: ['font-weight-bold'],
	},
	VListItemSubtitle: {
		class: ['font-weight-bold'],
	},
} as const
