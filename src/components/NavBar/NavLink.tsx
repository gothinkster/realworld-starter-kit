import { useParams } from 'solid-app-router'
import { JSX } from 'solid-js/jsx-runtime'

export default (props: {
	route?: string
	class?: string
	active?: boolean
	href?: string
	children: number | boolean | Node | JSX.ArrayElement | JSX.FunctionElement | (string & {})
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
