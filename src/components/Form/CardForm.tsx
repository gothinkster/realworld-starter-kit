import { JSX } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useNavigate } from 'solid-app-router'

import Button from './Button'
import ListErrors from './ListErrors'

type FormState = {
	inProgress: boolean
	errors?: string[]
}

export default (props: {
	class?: string
	avatarUrl: string
	buttonText?: string
	children?: number | boolean | Node | JSX.ArrayElement | JSX.FunctionElement | (string & {})
	redirect?: string
	submitFn?: (event: Event) => Promise<void>
	postSubmitFn?: () => Promise<void> | void
}) => {
	const { avatarUrl, buttonText, children, submitFn, postSubmitFn } = props

	const [state, setState] = createStore<FormState>({
		inProgress: false
	})

	const navigate = useNavigate()

	const handleSubmit = async (event: Event) => {
		event.preventDefault()
		setState({ inProgress: true })
		submitFn(event)
			.then(() => navigate('/'))
			.catch((errors: string[]) => setState({ errors }))
			.finally(() => setState({ inProgress: false }))

		return postSubmitFn()
	}

	return (
		<>
			<ListErrors errors={state.errors} />
			<form class='card comment-form' onSubmit={handleSubmit}>
				<div class='card-block'>{children}</div>
				<div class='card-footer'>
					<img src={avatarUrl} class='comment-author-img' alt='' />
					<Button textContent={buttonText} type='submit' />
				</div>
			</form>
		</>
	)
}
