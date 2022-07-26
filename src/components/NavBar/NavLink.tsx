import { useParams } from 'solid-app-router'

export default (props) => {
	const params = useParams()

	return (
		<a
			class={props.class}
			classList={{ active: props.active || params.routeName === props.route }}
			// href={`#/${props.href || props.route}`}
			href={`${props.href || props.route}`}
			onClick={() => window.scrollTo(0, 0)}
		>
			{props.children}
		</a>
	)
}
