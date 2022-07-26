import { createSignal, onCleanup, useTransition } from 'solid-js'

export default function createRouteHandler(init: string) {
	const [location, setLocation] = createSignal(window.location.hash.slice(2) || init),
		[read, triggerParams] = createSignal(),
		[, start] = useTransition(),
		locationHandler = () => start(() => setLocation(window.location.hash.slice(2)))
	let params
	window.addEventListener('hashchange', locationHandler)
	onCleanup(() => window.removeEventListener('hashchange', locationHandler))
	return {
		location,
		match: (name, test) => {
			const loc = location().split('?')[0]
			const match = test.exec(loc)
			if (match) {
				params = { params: match.slice(1), routeName: name }
				triggerParams()
			}
			return !!match
		},
		getParams: () => (read(), params)
	}
}
