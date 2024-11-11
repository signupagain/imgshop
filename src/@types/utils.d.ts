export type FlattenArray<T> =
	T extends Readonly<Array<infer K>> ? K
	: T extends Array<infer P> ? P
	: T
