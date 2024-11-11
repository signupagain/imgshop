const ALGORITHM = 'SHA-256'

export default async (word: string) => {
	const view = new TextEncoder().encode(word)
	const hashBuffer = await window.crypto.subtle.digest(ALGORITHM, view)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

	return hashHex
}
