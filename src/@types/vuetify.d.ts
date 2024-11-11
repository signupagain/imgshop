export {}

export type VDataTableHeaderArray = {
	readonly key?:
		| (string & {})
		| 'data-table-group'
		| 'data-table-select'
		| 'data-table-expand'
		| undefined
	readonly value?: SelectItemKey<any>
	readonly title?: string | undefined
	readonly fixed?: boolean | undefined
	readonly align?: 'start' | 'end' | 'center' | undefined
	readonly width?: string | number | undefined
	readonly minWidth?: string | undefined
	readonly maxWidth?: string | undefined
	readonly nowrap?: boolean | undefined
	readonly headerProps?: { readonly [x: string]: any } | undefined
	readonly cellProps?:
		| { readonly [x: string]: any }
		| ((
				data: Pick<
					ItemKeySlot<any>,
					'value' | 'item' | 'index' | 'internalItem'
				>
		  ) => Record<string, any>)
		| undefined
	readonly sortable?: boolean | undefined
	readonly sort?: DataTableCompareFunction<any> | undefined
	readonly sortRaw?: DataTableCompareFunction<any> | undefined
	readonly filter?: FilterFunction | undefined
	readonly mobile?: boolean | undefined
	readonly children?: readonly any[] | undefined
}[]
