import { useParams } from 'solid-app-router'

import type { Children } from '~/types'

export default (props: {
	route?: string
	class?: string
	active?: boolean
	href?: string
	children: Children
}) => {
	const { routeName } = useParams()

	const testRoute = props.route && routeName === props.route

	return (
		<a
			class={props.class}
			classList={{
				active: props.active || testRoute
			}}
			// href={`#/${props.href || props.route}`}
			href={`${props.href || props.route}`}
			onClick={() => window.scrollTo(0, 0)}
		>
			{props.children}
		</a>
	)
}
